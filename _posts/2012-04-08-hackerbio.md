---
layout: post
title: hackerb.io
category: work
---

It's been a hacky Easter weekend. Besides finally fixing the backend on [Angus's site](http://angusgreig.com), closing the doors on [Brick](http://brickmedialab.com) and putting together this blog, I've also had a chance to dust off my little CV generating app, [hackerb.io](http://hackerb.io).

![CV example](/blog/images/hbio_cv_2.png)

Despite hosting [my resume](http://hackerb.io/cantlin.pdf) for months, the site hasn't been open to signups before today, so I figured this was the time to blog. Caveat: it is still very <strike>beta</strike> alpha, you can touch it as easy as break it. Please be patient and **[mail me](mailto:cantlin@ashrowan.com) when things fall over.**

## I Hate Mice

Instructing users in plain text always feels a little wrong. Interfaces should be intuitive, right? Still, I'd bet I'm not the only one whose mind gets regularly blown by some hotkey I never knew existed, from Github's ``T`` to Gmail's ``* then A``. What I wouldn't give for **a standard way of letting users know what keyboard shortcuts are available to them**. In the absence of that, hackerb.io's [home screen](http://hackerb.io) is given over more or less entirely to *telling you to press tab.* Do it though, seriously. Then press ``shift+tab``. Then ``tab`` again. Now we're cookin'.

## I Like Coloured Circles

If you've ever wanted to input a list of the technologies you know into a web app through the medium of regex and flying coloured circles, well, do I have good news for you!

![What's your stack?](/blog/images/hbio_stack.png)

Bonus points for expressing your life's learning in a single ``/expression/``!

Once you get behind the fancy reg path, the app isn't much more than a [Prawn](http://prawn.majesticseacreature.com) (&lt;3) renderer (albeit quite a nice one), with a little Markdown parsing thrown in for for good measure. It's running on [Rails 3.1](http://rubyonrails.org) and [MongoDB](http://www.mongodb.org/).

![Editor](/blog/images/hbio_editor.png)

Let me know what you think!