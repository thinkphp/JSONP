function Jsonp(url, callback) {

         this.url = url;
         this.callback = callback
}

Jsonp.prototype.fetch = function() {
   
       var id = new Date().getTime(),
           fn = "callback_" + id,
           url = this.url.replace('=?','=Jsonp.' + fn),
           that = this,
           s = document.createElement('script');
           s.type = 'text/javascript'

           Jsonp[fn] = this.evalJSON(this.callback,that)

           s.src = url

           document.getElementsByTagName('head')[0].appendChild(s)

           this.s = s

           this.fn = fn
}

Jsonp.prototype.evalJSON = function(callback,that) {

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
                 delete Jsonp[that.fn] 
                 document.getElementsByTagName("head")[0].removeChild(that.s); 

              } else {
                 console.log('JSONP call returned invalid JSON or empty JSON')
              }
      }

}