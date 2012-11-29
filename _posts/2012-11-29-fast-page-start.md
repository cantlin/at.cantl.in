---
layout: post
title: Food for Thought on Fast Page Start
category: nerd-stuff
---

## The Infamous Blocking Script

Increasingly, our initial response body isn't much more than the shopping list of assets we need to cook up a complete render. There are huge wins to be had optimising how we handle getting all this stuff to the user.

In the past browsers would block on <code>&lt;script&gt;</code> tags to the extent of waiting for each remote piece of Javascript to fully download, parse and execute before downloading the next asset. This was dumb for many reasons.

These days we can count on browsers parallelising requests for most assets. The main offenders amongst the "modern" lot are [Opera 11](http://www.browserscope.org/?category=network&ua=Opera%2011*), which just can't wait to block, and [IE 8](http://www.browserscope.org/?category=network&ua=IE%208*), which blocks downloading of images and iframes while requesting scripts.

When we talk about efficiently requesting assets, we've really got two distinct objectives:

* Leverage the optimum number of concurrent HTTP requests from the client.<br />That is, *get all that good stuff real dang fast.*
* Do not allow loading external assets to block UI painting.<br />Or, *be cool until the stuff gets here*.

If you have a decent number of <code>script</code>, <code>img</code>, <code>link</code>, or <code>iframe</code> tags in the mix, there's a good chance you're hitting the client's per-hostname parallel request cap. For recent builds of Chrome, Firefox, Opera, Safari and IE this is six requests. Old timers like IE 7 max out at the dizzying, [RFC-endorsed](http://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html#sec8.1.4) heights of two.

Choosing to load widely distributed libraries (jQuery) from an external host (Google) can mitigate this effect, though [Douglas Crockford may shed a single tear](https://github.com/douglascrockford/JSON-js/blob/master/json2.js#L15). A subdomain you set up will serve just as well for these purposes, enabling the browser to request more things concurrently. Google [suggest](https://developers.google.com/speed/docs/best-practices/rtt) that the "optimal number of hosts is generally believed to be between 2 and 5, depending on various factors such as the size of the files, bandwidth and so on."

The main penalty we introduce by adding hostnames is in the form of additional DNS lookups, costing us between [20-120ms](http://developer.yahoo.com/performance/rules.html) and [several seconds](http://www.chromium.org/developers/design-documents/dns-prefetching) a pop. Subdomains of the original host may fair better here, since resolving *assets.example.org* benefits from intermediate caches being primed by the initial query for *example.org*. Equally, public CDN hostnames have a naturally higher chance of hitting a relatively local cache. Nonetheless, prioritising early-loading assets by serving them from the origin hostname is worthwhile, since we know it's already resolved.

Beware referencing hostnames for the first time in included files like stylesheets, since they can't be resolved until the referencing files are parsed. [Chrome](http://www.chromium.org/developers/design-documents/dns-prefetching), [Firefox](https://developer.mozilla.org/en-US/docs/Controlling_DNS_prefetching) and [IE9](http://blogs.msdn.com/b/ie/archive/2011/03/17/internet-explorer-9-network-performance-improvements.aspx) give us a meta tag for forced DNS prefetching if we want it.

## Minimizing HTTP request overhead

Although HTTP/1.1 connections are kept alive by default, this is no help to us on the first page load, where we're leveraging many parallel connections. Each connection has to contend with network latency in the form of RTT x 3 ([SYN, SYN-ACK, ACK](http://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment)) and TCP's [congestion control](http://tools.ietf.org/html/rfc5681). Since most clients have asynchronous connections, reducing the [size of our HTTP requests](https://developers.google.com/speed/docs/best-practices/request) is definitely worth considering, especially if it brings them under the approximate 1500byte TCP packet size. A little good news is that the latency penalty is now somewhat offset on mobile by the increased adoption of [HTTP pipelining](http://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html), which as of iOS 5 has made it to Mobile Safari in addition to Android and Opera Mini.

The question of whether to start going the whole hog and [throwing around data-uri's](https://gist.github.com/3828068) in your stylesheets to save HTTP requests is more difficult. As much as we want to avoid latency, there are certainly situations - particularly in editorial contexts - where it's right and proper for images to trickle in after the text and layout. Most conscientious developers stick to using them for glyphs and icons, where they have made spritesheets virtually obselete for all but those who need [IE7](http://www.phpied.com/mhtml-when-you-need-data-uris-in-ie7-and-under/) support.

## Serving script

For any chunk of client-side code, how you deliver it depends on the answers to these questions:

* Can the user use the page without it?
* Does it create functionality that applies to many pages?
* Does it depend on some part of the DOM existing?
* Does it depend on a bunch of other script?

With the answers to these questions we know where to bundle the code, when to load it and whether to block while it loads.

With big sites, deploy hooks and preprocessing come as standard. Client-side tuning can get rolled into an existing deployment infrastructure. If you look at a lot of smaller projects out there in the wild though, it can be astonishing how few are making use of things as basic as [GZIP compression]((https://gist.github.com/3827806). Plenty of here-unnamed corporate sites don't even manage minification.

While irrelevant to fast page start, cache invalidation is also worth considering. There's no point creating a giant <code>app.js</code> on every deploy if it's forcing your regulars to redownload a bunch of unchanged code. We're going to want to do at least some concatenation, if only so we can keep our JS in manageable chunks during development, but this needs to be sensitive to code volatility. Serving a nimble bit of init code followed by one or more larger library files may be a reasonable tradeoff.

## Parallelising UI render

When it comes to CSS, we frequently *want* to block. No one wants to be barfing up a mess of Times New Roman before the beautification can kick in. Throwing a <code>link</code> in the <code>&lt;head&gt;</code> does just that: we're letting the browser know these styles are required reading - it should show nothing to the user until it has that shit *down.* By contrast, any stylesheets we reference in the <code>&lt;body&gt;</code> are <a href="http://cantl.in/pub/blocking/css/">applied asynchronously</a>. Except - and this is where it gets hairy - if they're followed by a script tag. Browsers give scripts the assurance that by default they execute in a determinable environment, which is Good Thing&trade;. Cool story, I know.

### Bootstrap your header (maybe)

Consider these pages:

1. [cantl.in/pub/blocking/bootstrap_off.html](http://cantl.in/pub/blocking/bootstrap_off.html)
2. [cantl.in/pub/blocking/bootstrap_on.html](http://cantl.in/pub/blocking/bootstrap_on.html)

These simulate the perfectly real-world scenario of a stylesheet taking three seconds to arrive. As a result the first page, like most would, takes three seconds to load. In the second page, we inline a couple of crucial CSS rules and let loading our external CSS block UI painting only *after* the header has rendered. The win in responsiveness is huge, but we do pay a price. Our Web Design 101 tells us inlining is evil, since this content is uncacheable. To this I say: *Pshaw!* A few extra K over the wire to get something to the user *as fast as HTTP allows* is more than worth it. If you're concerned about seperating your concerns, remember that the structure of your code when it's served doesn't (and shouldn't) resemble its structure when you're getting your hack on. I've found this approach particularly valuable when using [PJAX](http://pjax.heroku.com/), since it makes the extra weight in the layout irrelevant on subsequent requests.

### Don't let Javascript block the UI

It's well documented that Javascript should appear *at the end of the HTML*. This is because putting it anywhere else will [block UI render](http://cantl.in/pub/blocking/js/js_block.html). Every time a script in the <code>&lt;head&gt;</code> consists of a <code>$(function() { ...</code> call, baby Jesus sheds a tear. If you're considering <code>defer</code> and <code>async</code>, it's worth keeping in mind that you will sacrifice support for [IE &lt;10](http://caniuse.com/#feat=script-async) with little or no difference to the actual client behaviour than if you had achieved the effect with server-side templating.

## Can you live without jQuery?

If your project is small, and you don't need to support IE, or if your project is very large, the answer might just be yes. Disclaimer: it is almost certainly not yes. Still, if you are serious about performance, 32kB over the wire *will* offend you. In the future, I'm certain we'll lean back and laugh heartily in our silver spandex and flying space cars at the idea of [half of all websites](http://www.theregister.co.uk/2012/08/14/jquery_used_by_half_of_all_websites/) relying on a giant <a href="http://en.wikipedia.org/wiki/Shim_(computing)">shim</a>. For the time being, the best we can do is to treat these frameworks as a conscious choice, not a defacto inclusion.

## Don't hit the app

This might as well be the battle-cry of web performance, alongside *"cache everything!"*. Whichever way you spin it, running every request through your whole Ruby or Python or whatever stack is going to hurt response times. Outside of application level performance tuning, it's worth wondering how many of those requests even need the attention of your app. Something like [varnishd](https://www.varnish-cache.org/) can run close to the metal, serving up ready-to-go renders straight out of memory. Static site generating tools like [jekyll](https://github.com/mojombo/jekyll) offer similar wins.  Of course, this gets tricky to impossible when cookies are involved, but user's first point of contact with you is almost certainly as an anonymous browser. First impressions count.

<!-- When every bit of Javascript in a project begins <code>$(function() {...</code>, something is amiss. Sure, there are reasons we might want to do that, but for too many <code>DOMContentLoaded</code> seems to be merely the defacto starting place. A script's goal should generally be to execute at the first moment it won't break, and in a world where it commonly constructs its own DOM, this can often be right away. The question to ask is *what is the desired execution context for this code*. Serving it at the right time trumps programmatically delaying execution.


I don't need to tell you to minify that shit. I don't need to tell you to GZIP it. <span style="font-size:12px;">If you're not doing any of the last three things, anything else I have to say is so much piss in the wind until you sort that shit out.</span>

Loading Javascript is not a simple matter, especially on large projects.


More staggering than this is how many hundreds of articles exist firmly instructing developers to , all of which are ignored.


Some script does need a complete DOM to work with, particularly if you're doing the bulk of your templating on the server side. But: in a world where much JS is minimally coupled to the initial DOM, and commonly responsible for constructing its own UI, executing as soon as we can 

In a world where script is minimally coupled to the initial DOM, and commonly responsible for constructing its own UI, it generally

Not only does it allow you the laziness of including your Javascript before it's time for it to execute, it can imply hard coupling between the rendered DOM and the Javascript. In a world where our JS is as often as not *building* the DOM.


Simply put, the responsiveness of a UI is a measure of how long it takes something to happen after a user has done something. Your website has an invisible button, called "Open this website", which is the first button every user presses, one way or another. How fast we start is everything - 


People got all kinds of upset about the notorious "FOUT" caused by text using a remote @font-face being rendered before the font file had loaded

Stylesheets and scripts may download in paralell, but how they impact page render is a very different matter. In Chrome, IE and Safari, a CSS link tag in the <code>&lt;head&gt;</code> will completely block page render. You might think is would be a good thing - no one wants a mess of Times New Roman flooding the page before the CSS can kick in. Still, I contend that really, we can do better than this. Show a spinner, your page background colour or your logo: anything to let the user know *it's working*. Drop an <code>&lt;img style="background:url(data-uri..." /&gt;</code> if you have to, that little bit of uncacheable inline data pails in comparison to all those bits of network latency your page is waiting on. -->