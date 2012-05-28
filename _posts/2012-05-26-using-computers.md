---
layout: post
title: On Using Computers
category: nerd-stuff
---

How do people use computers?

They drag and drop. Sometimes, it works. They minimize. If they close things, the things might take a long time to find again. They save to the Desktop, so they have the things right there. Still, the OS's search is their primary thing retrieval method, Outlook's search is their primary email retrieval method. They email, because email is like writing a letter, or sending a text message. Email is shit, but they don't care. It works OK.

I hate how people use computers. Hell, it's our fault.

Most user interfaces provide a means of accessing underlying functionality through one or more visual metaphors. Folders, for example, are a good metaphor for the filesystem (admittedly arguable whether they're a metaphor at all). Early Windows Explorer incarnations worked great. The mismatch between the underlying functionality and the visual metaphor can be a measure of a bad interface. Later Windows file browsers... not so great. The importance of this mismatch is not to do with efficiency or gracefulness - it's about providing the user with the means to build an internal model of the system.

![Magic dog](/images/explorer.png)

*An intelligible system*

![Magic dog](/images/tree.png)

*An intelligible system*

![Magic dog](/images/magic_dog.png)

*Some kind of inexplicably omnipotent dog*

In website navigation the page you're currently on is often highlighted. Having made another selection, we notice the highlight change. We intuit that we are in one place at a time. When we click a navigation item with child pages, a menu expands below it. Visual clues as simple as emboldened text or an indented list are all that are needed to let us grasp the rules of the game.

In reality, applying deep hierarchy to websites with masses of content is a pain to implement nicely, especially since clients invariably demand numerous special cases in the logic to pop this or that page up in all sorts of places it doesn't belong. Here we're coercing our flat, relational data into a hierarchy. But that's OK: our data doesn't define the function of our application, and so cannot define its interface. When we talk about underlying function, we are careful to define function strictly in a human sense: we are not talking necessarily about exposing application primitives in the UI, as `git` does.

The internet is amuck with discussion over whether learning to code is a worthwhile effort for those with no immediate need to do so.

For me, and I suspect for most technical people, this is a seductive proposition. Why of course, what I do day in day out is so vital! It would be almost a revenge for the never ending need to translate between technical language and the semi-comprehensible programmer's pidgin in which we talk about what we do to anyone who doesn't do it. Let's teach everyone to code! Then maybe they'll understand why this ostensibly trivial feature request is going to run into the weeks...

There's a personal level here as well: my IT education, such as it was, amounted to exploring the tool palettes of Microsoft Publisher, jewel of the Office suite.

(Except, of course, that what it really amounted to was finding amusing ways to tamper with autoexec, or else writing primitive choose your own adventure games in batch. The more I think about it, the more I realise it was the stupidity and brokenness of all the software I ever tried to use that was just what made me a hacker. First inklings of networking? Trying to run Command and Conquer two player over parallel ports. First variable? How do I make it so when you have put on the hat, you will keep wearing it...)

Like bad user interfaces, bad education is a leaky abstraction. The subject must be exposed in such a way as to give the user the means to, you guessed it, build an internal model of the system. This is particularly painful in IT: you might be able to have a good go opting out of using chemistry or biology in your day to day life, but you would struggle to do it with computing. Coupled with a long line of software interfaces that offer no clues to the rules of their underlying function, users are turned from potentially confident instructors of the computer into anxious, uncomprehending consumers.

