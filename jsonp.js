var jsonp = {
 
    counter: 0,

    fetch: function(url, callback) {
 
           var fn = "jsoncallback_" + this.counter++;

           window[fn] = this.evalJsonp(callback);

           url = url.replace('=?','=' + fn) 
 
           var s = document.createElement('script');
               s.type = 'text/javascript';
               s.src = url;
               document.getElementsByTagName('head')[0].appendChild(s);
    },

    evalJsonp: function(callback) {

           return function(data) {

              var validjson = false

              if(typeof data == 'string') {
                 try {
                  validjson = JSON.parse(data)
                 }catch(e) {
                 } 
              } else if(typeof data == 'object') {
                 validjson = data
              } else {
                 validjson = JSON.parse(JSON.stringify(data));
                 console.log('response data was not a JSON string')
              }

              if(validjson) {
                 callback(validjson)
              } else {
                 console.log('JSONP call returned invalid JSON or empty JSON')
              }
           }
    }

};
