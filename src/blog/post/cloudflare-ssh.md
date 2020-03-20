---
layout: post.ect
title: Using Cloudflare for HTTPS
category: ssh
date: 2018-05-20
image: /img/cloudflare-universal-ssl.jpg
---

I've been using Cloudflare for a number of years to manage DNS settings for the various websites I look after. It's handy having all your DNS stuff in the one location and user interface rather than having to hop around to different hosts/domain providers and always having to look up which domain provider handles which domain. And, you know, some of those user interfaces are not that user-friendly, let alone consistent between providers. Not to mention that I do have a deeps seated suspicion about having your host also controlling your domain - but maybe that's just me.

Of course, the big selling point for Cloudflare is its use as a Content Delivery Network (CDN) and the tools it has for speeding up your website. Since it channels your website through its own Nameservers it caches your site on its network and can even display your site when your host itself is down.

Because it is channelling your website, Cloudflare is able to provide HTTPS/SSL with what it calls ["Universal SSL"](https://blog.cloudflare.com/introducing-universal-ssl/). This means that it is able to provide an SSL certificate for any site using its nameservers - including its free customers.

This requires two settings on your Cloudflare dashboard.
1. Ensure that SSL is turned on in the "Crypto" page for your site. Chances are that it will be turned on by default - most likely set to "flexible".

![Cloudflare Crypto Panel](/img/cloudflare-crypto-panel.jpg)

2. Add a page rule on the "Page Rules" page to ensure all traffic is redirected from HTTP to HTTPS. 

![Page Rule for HTTPS](/img/page-rule-https.jpg)

Careful with this one if you want to catch subdomains like www.mywebsite.com or blog.mywebsite.com. Don't forget the star before the domain name as this is what will catch the subdomain. I did forget this and couldn't work out why some URLs were going to https and some weren't