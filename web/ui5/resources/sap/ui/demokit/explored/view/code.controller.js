/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/mvc/Controller','sap/ui/Device','sap/m/MessageToast'],function(C,D,M){"use strict";return C.extend("sap.ui.demokit.explored.view.code",{_aMockFiles:["products.json","supplier.json","img.json"],onInit:function(){this.router=sap.ui.core.UIComponent.getRouterFor(this);this.router.attachRoutePatternMatched(this.onRouteMatched,this);this._viewData=sap.ui.getCore().byId("app").getViewData();this._viewData.component.codeCache={};},onRouteMatched:function(e){if(e.getParameter("name")!=="code"&&e.getParameter("name")!=="code_file"){return;}this._sId=e.getParameter("arguments").id;var f=decodeURIComponent(e.getParameter("arguments").fileName);var s=sap.ui.demokit.explored.data.samples[this._sId];if(!s){this.router.myNavToWithoutHash("sap.ui.demokit.explored.view.notFound","XML",false,{path:this._sId});return;}if(!this._oData||s.id!==this._oData.id){var c='sampleComp-'+this._sId;var a=this._sId;var o=sap.ui.component(c);if(!o){o=sap.ui.getCore().createComponent({id:c,name:a});}var m=o.getMetadata();var b=(m)?m.getConfig():null;this._oData={id:s.id,title:"Code: "+s.name,name:s.name,stretch:b.sample?b.sample.stretch:false,files:[],iframe:b.sample.iframe,fileName:f,includeInDownload:b.sample.additionalDownloadFiles};if(b&&b.sample&&b.sample.files){var r=jQuery.sap.getModulePath(s.id);for(var i=0;i<b.sample.files.length;i++){var F=b.sample.files[i];var d=this.fetchSourceFile(r,F);this._oData.files.push({name:F,raw:d,code:this._convertCodeToHtml(d)});}}}else{this._oData.fileName=f;}this.getView().setModel(new sap.ui.model.json.JSONModel(this._oData));var p=this.getView().byId("page");p.scrollTo(0);},fetchSourceFile:function(r,f){var t=this;var u=r+"/"+f;var s=function(a){t._viewData.component.codeCache[u]=a;};var e=function(a){t._viewData.component.codeCache[u]="not found: '"+u+"'";};if(!(u in this._viewData.component.codeCache)){this._viewData.component.codeCache[u]="";jQuery.ajax(u,{async:false,dataType:"text",success:s,error:e});}return t._viewData.component.codeCache[u];},onDownload:function(e){if(D.browser.internet_explorer&&D.browser.version<10){M.show('Download action is not supported in Internet Explorer 9',{autoClose:true,duration:3000});return;}jQuery.sap.require("sap.ui.thirdparty.jszip");var z=new JSZip();var d=this.getView().getModel().getData();for(var i=0;i<d.files.length;i++){var f=d.files[i],r=f.raw;if(f.name&&(f.name===d.iframe||f.name.split(".").pop()==="html")){r=this._changeIframeBootstrapToCloud(r);}z.file(f.name,r);for(var j=0;j<this._aMockFiles.length;j++){var m=this._aMockFiles[j];if(f.raw.indexOf(m)>-1){z.file("mockdata/"+m,this.downloadMockFile(m));}}}var R=jQuery.sap.getModulePath(this._sId),E=d.includeInDownload||[],t=this;if(!d.iframe){z.file("Component.js",this.fetchSourceFile(R,"Component.js"));z.file("index.html",this._changeIframeBootstrapToCloud(this.createIndexFile(d)));}E.forEach(function(F,a){z.file(F,t.fetchSourceFile(R,F));});var c=z.generate({type:"blob"});this._openGeneratedFile(c);},_openGeneratedFile:function(c){jQuery.sap.require("sap.ui.core.util.File");sap.ui.core.util.File.save(c,this._sId,"zip","application/zip");},createIndexFile:function(d){var h,s;var r=jQuery.sap.getModulePath("sap.ui.demokit.explored.tmpl");var i=this.fetchSourceFile(r,"index.html.tmpl");i=i.replace(/{{TITLE}}/g,d.name);i=i.replace(/{{SAMPLE_ID}}/g,d.id);h=d.stretch?'height : "100%", ':"";i=i.replace(/{{HEIGHT}}/g,h);s=!d.stretch;i=i.replace(/{{SCROLLING}}/g,s);return i;},downloadMockFile:function(f){var r=jQuery.sap.getModulePath("sap.ui.demo.mock");var w="test-resources/sap/ui/demokit/explored/img/";var c="https://openui5.hana.ondemand.com/test-resources/sap/ui/demokit/explored/img/";var R=new RegExp(w,"g");var m=this.fetchSourceFile(r,f);if(m){m=m.replace(R,c);}return m;},onNavBack:function(){this.router.navTo("sample",{id:this._sId},true);},_convertCodeToHtml:function(c){jQuery.sap.require("jquery.sap.encoder");c=c.toString();c=c.replace(/^function.+{/,"");c=c.replace(/}[!}]*$/,"");c=c.replace(/^[\n\s\S]*\/\/\s*CODESNIP_START\n/,"");c=c.replace(/\/\/\s*CODESNIP_END[\n\s\S]*$/,"");c=c.replace(/\t/g,"  ");return c;},_changeIframeBootstrapToCloud:function(r){var a=/src=(?:"[^"]*\/sap-ui-core\.js"|'[^']*\/sap-ui-core\.js')/;var c=new URI(window.location.href).search("");var R=new URI(jQuery.sap.getResourcePath("","/sap-ui-core.js"));var b=R.absoluteTo(c).toString();return r.replace(a,'src="'+b+'"');},handleTabSelectEvent:function(e){var f=e.getParameter("selectedKey");this.router.navTo("code_file",{id:this._sId,fileName:encodeURIComponent(f)},false);}});},true);
