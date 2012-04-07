JSONP
=====

JSONP or JSON with padding is a complement to the base JavaScript Object Notation JSON data format. It provides a method to
request data from a server in a different domain. CORS can be used as a modern alternative to the JSONP pattern.

Syntax:

         new Jsonp(url, callback).fetch() 
         OR
         new jsonp.fetch(url, callback)
         OR
         JSONP.get(url, params, callback)  

How to use:
-----------

         #Example-1
         var username = 'yelf',

         endpoint = 'http://query.yahooapis.com/v1/public/yql?q=',

         yql = 'use "http://thinkphp.ro/apps/lastfm/YQL-open-data-table/recentlastfm.xml" as lastfm;select * from lastfm where username="'+ username +'" and api_key="2993c6e15c91a2890c2f11fa95673067"',

         url = endpoint + encodeURIComponent(yql) + '&format=json&callback=?'
 
         function callback(data) {

                  document.getElementById('result').innerHTML = data.query.results.result;
         } 
    
         new Jsonp(url,callback).fetch();

         #Example-2
         var tpl = "<li><a href='http://twitter.com/{from_user}'>{from_user}</a> {text}<span>{created_at}</span></li>",

         urltwitter = 'http://search.twitter.com/search.json?q=mootools&rpp=5&callback=?';

         new Jsonp(urltwitter, function(data){

               var result = data.results, 

               out = '<ul>'
                
               for(var i in result) {

                   out += template(tpl,result[i])
               } 
               out += '</ul>'

              document.getElementById('result-twitter').innerHTML = out 

         }).fetch();

  
         #example-3
         var url = 'http://search.twitter.com/search.json';

         JSONP.get(url, {q: 'mootools', rpp: 10}, function(data){

                  //do stuff with data
         })
  

**Happy Requesting!**