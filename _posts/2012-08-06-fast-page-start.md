---
layout: post
title: Best Practices for Fast Page Start
category: nerd-stuff
---

Let's *Do it right.&trade;*

## The Infamous Blocking Script

Increasingly, the body of our server's initial response is little more than a shopping list of assets needed to cook up our complete render.

Historically, browsers would block on <code>&lt;script&gt;</code> tags to the extent of waiting for each remote piece of Javascript to fully download, parse and execute before downloading the next asset. This was dumb for many reasons.

These days we can count on browsers parallelising requests for most of the assets in our document. The main offenders amongst "modern" browsers are [Opera 11](https://developers.google.com/speed/docs/best-practices/rtt), which just can't wait to block, and [IE 8](http://www.browserscope.org/?category=network&ua=IE%208*), which blocks downloading of images and iframes while requesting scripts. As in so many things, Browserscope is [your bible](http://www.browserscope.org/?category=network).

When we talk about efficiently requesting assets we have two distinct objectives:

* Try and leverage the optimum number of concurrent HTTP requests from the client. That is, *get all the stuff real dang fast.*
* Do not allow loading external assets to block UI painting. Or, *be cool until the stuff gets here*.

If your site contains a reasonable number of <code>script</code>, <code>img</code>, <code>link</code>, or <code>iframe</code> tags, there's a good chance you're hitting the client's per-hostname parallel request cap. For recent builds of Chrome, Firefox, Opera, Safari and IE this is six requests. Old timers like IE 7 max out at the dizzying, [RFC-endorsed](http://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html#sec8.1.4) heights of two.

Choosing to load widely distributed libraries like jQuery from a CDN can mitigate this effect, though [Douglas Crockford may shed a single tear](https://github.com/douglascrockford/JSON-js/blob/master/json2.js#L15). A subdomain you set up will serve just as well for these purposes, enabling the browser to request more things concurrently. Google [suggest](https://developers.google.com/speed/docs/best-practices/rtt) that the "optimal number of hosts is generally believed to be between 2 and 5, depending on various factors such as the size of the files, bandwidth and so on."

The main penalty we introduce by adding hostnames is in the form of additional DNS lookups.