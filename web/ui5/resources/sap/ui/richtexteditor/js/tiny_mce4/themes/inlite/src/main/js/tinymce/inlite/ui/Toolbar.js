define('tinymce/inlite/ui/Toolbar',['global!tinymce.util.Tools','global!tinymce.ui.Factory','tinymce/inlite/alien/Type'],function(T,F,a){var s=function(e,n){return function(f,h){var j,i=h.parents.length;while(i--){j=h.parents[i].nodeName;if(j=='OL'||j=='UL'){break;}}e.active(f&&j==n);};};var g=function(i,e){var r=function(j,k){return{selector:j,handler:k};};var f=function(j){e.active(j);};var h=function(j){e.disabled(j);};if(i=='bullist'){return r('ul > li',s(e,'UL'));}if(i=='numlist'){return r('ol > li',s(e,'OL'));}if(e.settings.stateSelector){return r(e.settings.stateSelector,f);}if(e.settings.disabledStateSelector){return r(e.settings.disabledStateSelector,h);}return null;};var b=function(e,i,f){return function(){var r=g(i,f);if(r!==null){e.selection.selectorChanged(r.selector,r.handler);}};};var c=function(i){if(a.isArray(i)){return i;}else if(a.isString(i)){return i.split(/[ ,]/);}return[];};var d=function(e,n,i){var t=[],f;if(!i){return;}T.each(c(i),function(h){var j;if(h=='|'){f=null;}else{if(F.has(h)){h={type:h};t.push(h);f=null;}else{if(e.buttons[h]){if(!f){f={type:'buttongroup',items:[]};t.push(f);}j=h;h=e.buttons[j];if(typeof h=='function'){h=h();}h.type=h.type||'button';h=F.create(h);h.on('postRender',b(e,j,h));f.items.push(h);}}}});return F.create({type:'toolbar',layout:'flow',name:n,items:t});};return{create:d};});
