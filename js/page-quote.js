var eventsManager={on:function(n,e,t,i){t.addEventListener(n,e,void 0!==i&&i)},no:function(n,e,t){t.removeEventListener(n,e)},apply:function(n){n.on=function(n,e){window.eventsManager.on(n,e,this)},n.no=function(n,e){window.eventsManager.no(n,e,this)}},init:function(){this.apply(window),this.apply(Node.prototype)}};eventsManager.init();var standalone={get support(){return"standalone"in window.navigator},get is(){return!!this.support&&1==window.navigator.standalone},init:function(){this.is&&document.body.setAttribute("data-standalone",!0)}};standalone.init();var links={elements:document.getElementsByTagName("a"),stop:/^(a|html)$/i,relative:/^[a-z\+\.\-]+:/i,transition:300,url:document.location.protocol+"//"+document.location.host,set loading(t){t?document.body.setAttribute("data-loadpage",!0):document.body.removeAttribute("data-loadpage")},onclick:function(t){var e=this;return function(n){n.preventDefault();var o=t.href;o.replace(document.location.href,"").indexOf("#")&&(o.match(e.relative)||o.indexOf(e.url))&&(n.preventDefault(),e.loading=!0,setTimeout(function(){document.location.href=t.href},e.transition))}},init:function(){for(var t=0;t<this.elements.length;t++){var e=this.elements[t];e.on("click",this.onclick(e)),e.on("touchstart",this.onclick(e))}}};links.init();var result={element:null,p:null,duration:4e3,transition:250,timeout:null,get message(){return this.p.innerText},set message(t){this.p.innerHTML="",this.p.appendChild(document.createTextNode(t))},onclick:function(){var t=this;this.element.className="out",clearTimeout(this.timeout),this.timeout=setTimeout(function(){t.out()},this.transition)},out:function(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)},set:function(t){var e=this;this.element.parentNode?(this.element.className="out",clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.out(),e.set(t)},this.transition)):(this.message=t,this.element.className="",document.body.appendChild(this.element),this.timeout=setTimeout(function(){e.out()},this.duration))},init:function(){var t=this;this.element=document.createElement("div"),this.p=document.createElement("p");var e=document.createElement("div");e.className="wrapper",this.element.id="result",this.element.appendChild(e),this.element.on("click",function(){t.onclick()}),this.element.on("touchstart",function(){t.onclick()}),e.appendChild(this.p)}};result.init();var Spinner=function(e){var n=document.createElement("div");n.className="spinner init";var t=!0;Object.defineProperties(this,{element:{get:function(){return n}},center:{get:function(){return t},set:function(e){e=!!e,e!=t&&(t=e,this.element.className+=" center")}},hidden:{get:function(){return this.element.className.match(/\bhidden\b/)}}}),this.hide=function(){var e=this;this.element.className="spinner"+(this.center?" center":"")+" hidden",setTimeout(function(){e.remove()},Spinner.duration)},this.show=function(){this.element.className="spinner"+(this.center?" center":""),this.append()},this.append=function(e){e instanceof Node||(e=document.body),e.appendChild(this.element)},this.remove=function(){this.element.parentNode&&this.element.parentNode.removeChild(this.element)}};Spinner.transition=200;var Request=function(t,e,n,s){var i=this;this.url=t,n="string"==typeof n?n.toUpperCase():"GET",this.data="object"==typeof e?e:{},this.method="GET"!=n&&"POST"!=n?"GET":n,this.xhr=new XMLHttpRequest,this.json=!!s,this.onNotInitialized,this.onConnectionEstablished,this.onRecieved,this.onProcessing,this.onFinished,this.onSuccess,this.onError,this.notInitialized=function(t){return this.onNotInitialized=t,this},this.connectionEstablished=function(t){return this.onConnectionEstablished=t,this},this.recieved=function(t){return this.onRecieved=t,this},this.processing=function(t){return this.onProcessing=t,this},this.finished=function(t){return this.onFinished=t,this},this.success=function(t){return this.onSuccess=t,this},this.error=function(t){return this.onError=t,this},Object.defineProperties(this,{state:{get:function(){return this.xhr.readyState}},status:{get:function(){return this.xhr.status}},response:{get:function(){return this.xhr.responseText}},params:{get:function(){return Request.encodeData(this.data)}}}),this.xhr.onreadystatechange=function(){switch(i.state){case Request.notInitialized:"function"==typeof i.onNotInitialized&&i.onNotInitialized();break;case Request.connectionEstablished:"function"==typeof i.onConnectionEstablished&&i.onConnectionEstablished();break;case Request.recieved:"function"==typeof i.onRecieved&&i.onRecieved();break;case Request.processing:"function"==typeof i.onProcessing&&i.onProcessing();break;case Request.finished:var t=i.response;if(i.json&&"string"==typeof t)try{var t=JSON.parse(t)}catch(e){var t=i.response}"function"==typeof i.onFinished&&i.onFinished(i.status,t),200==i.status?"function"==typeof i.onSuccess&&i.onSuccess(t):"function"==typeof i.onError&&i.onError(i.status)}},this.send=function(t){"object"==typeof t&&null!==t&&(this.data=t),this.xhr.open(this.method,this.url,!0),"POST"==this.method.toUpperCase()?this.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"):this.xhr.setRequestHeader("Content-type",""),this.xhr.send(this.params)}};Request.notInitialized=0,Request.connectionEstablished=1,Request.recieved=2,Request.processing=3,Request.finished=4,Request.to=function(t,e,n){return new Request(t,e,n)},Request.json=function(t,e,n){var s=new Request(t,e,n);return s.json=!0,s},Request.encodeData=function(t,e){"string"!=typeof e&&(e="");var n="";for(var s in t)"string"==typeof t[s]||"number"==typeof t[s]||"boolean"==typeof t[s]?n+=e+(""==e?s:"["+s+"]")+"="+encodeURIComponent(t[s])+"&":"object"==typeof t[s]&&(n+=this.dataEncode(t[s],e+(""==e?s:"["+s+"]")));return n.replace(/&$/,"")};var pageQuote={element:document.getElementsByTagName("form")[0],request:new Request(""),spinner:new Spinner,inputs:{},set sending(e){this.element.className=e?"sending":"",e?this.spinner.show():this.spinner.hide();for(var t in this.inputs)this.inputs[t].blur()},clear:function(){for(var e in this.inputs)this.inputs[e].value=""},send:function(){var e=this;this.sending=!0,this.request.success(function(t){e.sending=!1,result.set(t.message),t.status&&e.clear(),this.sending=!1}).error(function(t){e.sending=!1,t?result.set(t.message):result.set("Erreur du serveur"),this.sending=!1}).send({quote:!0,author:this.inputs.author.value,email:this.inputs.email.value,content:this.inputs.content.value})},onsubmit:function(e){this.send(),e.preventDefault()},init:function(){var e=this;this.request.json=!0,this.request.method="post";for(var t=[this.element.getElementsByTagName("input"),this.element.getElementsByTagName("textarea")],s=0;s<t.length;s++)for(var n=t[s],i=0;i<n.length;i++){var u=n[i];"submit"!=u.type&&(this.inputs[u.name]=u)}this.element.on("submit",function(t){e.onsubmit(t)})}};pageQuote.init();