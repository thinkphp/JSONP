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

         OR

      JSONP.init({callbackName: 'jsoncallback'}) 

      JSONP.get(url, params, callback);

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
       
        #example-4
        var urltwitter = 'http://search.twitter.com/search.json?q=mootools&rpp=5&callback=?'

        jsonp.fetch(urltwitter, function(data){

               var result = data.results, 

               out = '<ul>'
                
               for(var i in result) {

                   out += template(tpl,result[i])
               } 
               out += '</ul>'

              document.getElementById('result-twitter').innerHTML = out 
        })

        #example-5
        //Get flickr photos search
        var tpl = "<li><a href='http://www.flickr.com/photos/{owner}/{id}' target='_blank'><img src='http://farm{farm}.static.flickr.com/{server}/{id}_{secret}.jpg' alt='{title}' width='75' height='75'/></a></li>",
            url = 'http://api.flickr.com/services/rest/';

        //Set Callback Name
        JSONP.init({callbackName: 'jsoncallback'})

        JSONP.get(url, 

                  {api_key: 'e407090ddb7d7c7c36e0a0474289ec74',
                   per_page: 20, 
                   page: 1, 
                   text: 'beach kudos', 
                   has_geo: true, 
                   method: 'flickr.photos.search', 
                   format: 'json'},

                   function(data) {

                      var photos = data.photos.photo,
                          n = photos.length,
                          out = '<ul>';

                      for(var i=0; i<n; i++) {

                          out += template(tpl,photos[i])
                      }  

                      out += '</ul>';

                      $('container').innerHTML = out;  
                   })          

        //we can make multiple requests
        JSONP.get(url, 

                  {api_key: 'e407090ddb7d7c7c36e0a0474289ec74',
                   per_page: 20, 
                   page: 1, 
                   text: 'san francisco', 
                   has_geo: true, 
                   method: 'flickr.photos.search', 
                   format: 'json'},

                   function(data) {

                      var photos = data.photos.photo,
                          n = photos.length,
                          out = '<ul>';

                      for(var i=0; i<n; i++) {

                          out += template(tpl,photos[i])
                      }  

                      out += '</ul>';

                      $('container').innerHTML = out;  
                   })          

**Happy Requesting!**