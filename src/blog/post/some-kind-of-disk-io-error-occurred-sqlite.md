---
layout: post.ect
title: Some kind of disk I/O error occurred - SQLite
tags: [sqlite,.net]
date: 2010-12-14
category: sqlite
image: '/img/SQLite2.png'
disqus_identifier: blog-post-some-kind-of-disk-io-error-occurred-sqlite
disqus_url: http://127.0.0.1:9778/blog/post/some-kind-of-disk-io-error-occurred-sqlite
---

I got the extremely helpful "Some kind of disk I/O error occurred" message using the System.Data.SQLite .net assembly today. This was a big SQLite show stopper. So I thought it was about time I figured out what was causing this. The error was occurring when I tried to post an update to the SQLite database in the local App_Data folder of an asp.net application. As soon as the application attempted to post the update I got the dreaded "Some kind of.." error and a SQLite journal file was created in the database folder. After this, the database became unavailable. It became available again once the journal file was deleted, but I was then back in the same situation once another update was attempted. The curious thing was that this behaviour didn't occur in the development environment, only when uploaded to the live server. My first thought was that the application for some reason didn't have rights to write to the App_Data folder. But the journal file was writing to the location with no troubles. Finally I hit upon a forum post on the System.Data.SQLite forum. This pointed in the direction of using the statement to set the journal_mode value to something other than "DELETE". The PRAGMA statement is executed exactly like a query, so all that needs to be done is to execute the statement using a SQLiteCommand object in the same way you would execute any other SQL statement.

<pre data-type="code" class="js">using(SQLiteConnection conn = new SQLiteConnection(sqliteConnectionString)) {
	conn.Open();
	SQLiteCommand cmd = new SQLiteCommand();
	cmd.Connection = conn;
	string pragma = "PRAGMA journal_mode = OFF";
	cmd.CommandText = pragma;
	cmd.ExecuteNonQuery();
}
</pre>
