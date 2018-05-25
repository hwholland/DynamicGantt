tinymce.PluginManager.add("fullscreen",function(e){function t(){var e,t,n=window,r=document,i=r.body;return i.offsetWidth&&(e=i.offsetWidth,t=i.offsetHeight),n.innerWidth&&n.innerHeight&&(e=n.innerWidth,t=n.innerHeight),{w:e,h:t}}function n(){var e=tinymce.DOM.getViewPort();return{x:e.x,y:e.y}}function r(e){scrollTo(e.x,e.y)}function i(){function i(){f.setStyle(g,"height",t().h-(m.clientHeight-g.clientHeight))}var p,m,g,h,v=document.body,b=document.documentElement;d=!d,m=e.getContainer(),p=m.style,g=e.getContentAreaContainer().firstChild,h=g.style,d?(u=n(),o=h.width,a=h.height,h.width=h.height="100%",l=p.width,c=p.height,p.width=p.height="",f.addClass(v,"mce-fullscreen"),f.addClass(b,"mce-fullscreen"),f.addClass(m,"mce-fullscreen"),f.bind(window,"resize",i),i(),s=i):(h.width=o,h.height=a,l&&(p.width=l),c&&(p.height=c),f.removeClass(v,"mce-fullscreen"),f.removeClass(b,"mce-fullscreen"),f.removeClass(m,"mce-fullscreen"),f.unbind(window,"resize",s),r(u)),e.fire("FullscreenStateChanged",{state:d})}var o,a,s,l,c,u,d=!1,f=tinymce.DOM;if(!e.settings.inline)return e.on("init",function(){e.addShortcut("Ctrl+Shift+F","",i)}),e.on("remove",function(){s&&f.unbind(window,"resize",s)}),e.addCommand("mceFullScreen",i),e.addMenuItem("fullscreen",{text:"Fullscreen",shortcut:"Ctrl+Shift+F",selectable:!0,onClick:function(){i(),e.focus()},onPostRender:function(){var t=this;e.on("FullscreenStateChanged",function(e){t.active(e.state)})},context:"view"}),e.addButton("fullscreen",{tooltip:"Fullscreen",shortcut:"Ctrl+Shift+F",onClick:i,onPostRender:function(){var t=this;e.on("FullscreenStateChanged",function(e){t.active(e.state)})}}),{isFullscreen:function(){return d}}});