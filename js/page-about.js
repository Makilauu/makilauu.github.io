var eventsManager={on:function(n,e,t){t.addEventListener(n,e,!1)},no:function(n,e,t){t.removeEventListener(n,e)},apply:function(n){n.on=function(n,e){window.eventsManager.on(n,e,this)},n.no=function(n,e){window.eventsManager.no(n,e,this)}},init:function(){this.apply(window),this.apply(Node.prototype)}};eventsManager.init();var scroll={get top(){return document.body.scrollTop||document.documentElement.scrollTop},set top(o){document.body.scrollTop=document.documentElement.scrollTop=o}};var standalone={get is(){return 1==window.navigator.standalone},init:function(){this.is&&document.body.setAttribute("data-standalone",!0)}};standalone.init();