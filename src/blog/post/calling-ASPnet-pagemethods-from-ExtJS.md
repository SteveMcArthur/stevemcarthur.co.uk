---
layout: post.ect
title: Calling ASP.net pagemethods from ExtJS
tags: [ajax,javascript,js,ExtJS]
date: 2010-03-19
category: javascript
img: "/img/asp.net.jpg"
---
I use asp.net PageMethods in conjunction with ExtJS almost on a daily basis. PageMethods are simply server side methods that are callable from client side script. However, Microsoft assumes that you will be using PageMethods in conjunction with its Ajax framework, in particular the ScriptManager control which creates a JavaScript proxy on the client side for the server side PageMethods. If you are using a JavaScript framework like ExtJS then you probably don't want to include the unnecessary clutter and page weight of the MS Ajax framework. Luckily PageMethods are callable like any other Ajax call. The trick is that it is expecting the name of the method as a forward slash parameter after the page name and the methods parameters as jsonData in the postdata. In ExtJS this translates as something like this:


<pre data-code="js"><code class="language-javascript">
Ext.Ajax.request({
	url: 'Default.aspx/myMethod',
	method: 'POST',
	success: onReturn,
	failure: onFailure,
	jsonData: '{Param1:"MyString",Param2: 1}',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
     });
</code></pre>

Note the headers property. This is the final piece in the puzzle. If you forget this then asp.net will think you are asking for the page and return the page itself instead of calling the PageMethod and returning the result of the method call as a json object. A couple of other 'gotchas' to watch out for is to make sure your web.config file has the configurations in it to allow PageMethods to be called from client script. Normally this is done for you when you create an Ajax enabled application, but if you're converting from a non-Ajax application it boils down to entries in the httpHandlers and httpModules sections. httpHandlers:

<pre data-type="code" class="js">	 
<remove verb="*" path="*.asmx"><add verb="*" path="*.asmx" validate="false" type="System.Web.Script.Services.ScriptHandlerFactory, System.Web.Extensions, Version=3.5.0.0, Culture=neutral,PublicKeyToken=31BF3856AD364E35"></add></remove>
</pre>

httpModules:

<pre data-type="code" class="js">	 
<add name="ScriptModule" type="System.Web.Handlers.ScriptModule, System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35"></add> 
</pre>

The last gotcha is a difference between how the json data is returned from a .net 3.5 application and a 2.0 application. In 3.5 the data is returned as a property called "d" of an otherwise empty json object. Whereas in version 2 the returned data was simply the result of the method call in json format.