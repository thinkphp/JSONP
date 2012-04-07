var JSONP = (function(){

   /*private members*/
   var counter = 0,
       query,
       key,
       head,
       context = this;

   /*private method that becomes public method through return object*/ 
   function jsonp(url, params, callback) {
 
        query = '?';
        params = params || {}

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                 query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&"
            } 
        }   

        var fnHandler = "JSONP_" + (new Date().getTime()) + "_" + (++counter);

        context[fnHandler] = function(data) {

               //call function callback with accurate data from service 
               callback(data)
               try {
                   delete context[ fnHandler ] 
               }catch(e){}
               context[ fnHandler ] = null
        }

        url = url + query + "callback=" + fnHandler

        //for debug url
        //console.log(url)

        loadScript(url);    
   }

   /*private method*/
   function loadScript(url) {

            var s = document.createElement('script');
                s.src = url,
                s.async = true,
                done = false;

                s.onload = s.onreadystatechange = function() {

                           if(!done && (!this.readyState || 
                                         this.readyState == 'loaded' || 
                                         this.readyState == 'complete')) {

                                done = true

                                s.onload = s.onreadystatechange = null

                                if(s && s.parentNode) {

                                   s.parentNode.removeChild(s) 
                                } 
                           }
                }

                if(!head) {

                    head = document.getElementsByTagName("head")[0] 
                }  

                head.appendChild(s)
   }
  
   return {get: jsonp}; 
})()