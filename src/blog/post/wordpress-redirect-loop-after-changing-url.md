---
layout: post.ect
title: Wordpress Redirect Loop After Changing URL
category: wordpress
date: 2016-11-09
image: /img/noooo.jpg
---

Ok - you've made a change to your URL settings in your Wordpress dashboard and you go to test your new URL and find that your site is now unavailable with the browser giving you the message that there are "too many redirects". Of course, now that the site is unavailable you are unable to log into your Wordpress admin and change the URL back. Panic sets in.

I've actually done this quite a few times. In this situation, the only option you have is to connect to the database directly and change the URL values in the MySQL table. Not as scary as it first sounds. The admin page settings for your Wordpress URLs map directly on to the "options" table in your Wordpress database. So you need to get access to the Wordpress database. If your site is hosted by a third party, chances are that this will be via [phpMyAdmin](https://www.phpmyadmin.net/). If it is locally hosted, you can probably still use phpMyAdmin, but likely you will have some other MySQL database management application such as MySQL workbench. In any case, log in to MySQL. Find your Wordpress database and find the "~_options" table - where the "~" represents a prefix (often "wp") that was chosen at installation time.

Once "~_options" table is found look for the records with the option_name "siteurl" and "home". They will often be the first two records in the table. The "option_value" is what you want to change and you will almost certainly recognise the values in those fields. Change these values to what you want. In phpMyAdmin, just double click in the field and edit the value. And that's it. Done. You might need to refresh your browser or clear its cache, but the change will be available straight away.

