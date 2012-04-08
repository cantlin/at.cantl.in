---
layout: post
title: hackerb.io
category: nerd-stuff
---

It's been a hacky Easter weekend. Besides finally fixing the backend on <a href="http://angusgreig.com/">Angus's site</a>, closing the doors on <a href="http://brickmedialab.com/">Brick</a> and putting together this blog, I've also had a chance to dust off my little CV generating app, <a href="hackerb.io">hackerb.io</a>.

![CV example](/images/hbio_cv.png)

Despite hosting <a href="http://hackerb.io">my resume</a> for months, the site hasn't been open to signups before today, so I figured this was the time to blog. Caveat: it is still very <strike>beta</strike> alpha, you can touch it as easy as break it. Please be patient and **<a href="mailto:cantlin@ashrowan.com">mail me</a> when things fall over.**

## I Hate Mice

The first thing hackerb.io asks you to do is press tab, which is totally weird. *Telling* users what to do always feels wrong - shouldn't it be intuitive? And yet, as a user my mind has been blown many times over by hotkeys I never knew existed, from ``SHIFT+TAB`` to ``CTRL+A``. As a developer, what I wouldn't give for **standard way of letting users know what keyboard shortcuts are available to them**.

## I Like Coloured Circles

If you've ever wanted to input a list of the technologies you know into a web app through the medium of regex and flying coloured circles, well, do I have good news for you!

![What's your stack?](/images/hbio_stack.png)

Once you get behind the fancy registration UI, the app is really nothing more than a <a href="http://prawn.majesticseacreature.com/">Prawn</a> (<3) renderer (albeit quite a nice one), with a little Markdown parsing thrown in for for good measure. It's running on <a href="http://www.mongodb.org/">Rails 3.1</a> backed by <a href="http://www.mongodb.org/">MongoDB</a>.

![Editor](/images/hbio_editor.png)

Let me know what you think!