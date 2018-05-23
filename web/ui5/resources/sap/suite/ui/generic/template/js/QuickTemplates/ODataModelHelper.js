sap.ui.define(["sap/ui/base/Object","./AnnotationHelper","sap/ui/model/odata/AnnotationHelper"],function(B,Q,O){"use strict";var a=B.extend("sap.suite.ui.generic.template.js.QuickTemplates.ODataModelHelper");a.initializeObjectProperties=function(o,p,c){var t=[];var k=o.getModel().getKey(o.getObject());var b=o.getModel().oData[k];if(b){t.push(b);}var C=o.getModel().mChangedEntities[k];if(C){t.push(C);}var d=Q.getMetaDataForContext(o);var i=0;if(p&&Array.isArray(p)){jQuery.each(p,function(e,f){var g=f.split("/");var h=g[0];var j=null;if(g.length>1){j=g.slice(1).join("/");}if(jQuery.isNumeric(h)&&j){a.initializeObjectProperties(o,[j],c);return;}i=0;var l=false;if(d.entityType.navigationProperty){for(;i<d.entityType.navigationProperty.length;i++){if(d.entityType.navigationProperty[i].name===h){l=true;break;}}}if(!l){jQuery.each(t,function(i,n){n[h]="";});}else if(!b[h]){var m=o.getModel().createEntry(o.getPath()+"/"+h,c);b[h]={__deferred:{}};a.restoreNavigationPropertyReferences(o,h,m);if(j){a.initializeObjectProperties(m,[j],c);}}});}};a.restoreLineItemReferences=function(e,c){var i=Q.createFormatterInterface(c);var m=Q.getMetaModelContextForFacetType(i,e,"LineItem");if(m){var C=O.getNavigationPath(m);C=C.replace(/[{}]/g,'');a.restoreNavigationPropertyReferences(c,C);}};a.restoreNavigationPropertyReferences=function(p,n,c){if(!n){return;}if(!p.getObject()){return;}var m=p.getModel().getMetaModel();var o=p.getModel().getKey(p.getObject());var C=p.getModel().oData[o];var e=m.getODataEntityType(C.__metadata.type);var N=m.getODataAssociationEnd(e,n);var s=null;var E=m.getProperty(m.getODataEntityContainer(N.type)).entitySet;jQuery.each(E,function(i,f){if(f.entityType===N.type){s=f.name;}});if(!C[n]){C[n]={};}if(C[n].__list){C[n].__list=[];}var b=function(k){if(C[n].__deferred){delete C[n].__deferred;}if(N.multiplicity==="*"){if(!C[n].__list){C[n].__list=[];}C[n].__list.push(k);}else{C[n].__ref=k;}};if(!c){var d=Object.keys(p.getModel().oData);jQuery.each(d,function(i,k){if(k.indexOf(s)>=0){b(k);}});}else{var k=c.getPath().substring(1);b(k);}};a.findObjects=function(){var p,b,c;if(arguments.length===3){p=arguments[0];b=arguments[1];c=arguments[2];}else if(arguments.length==2){b=arguments[0];c=arguments[1];}var k=c.key||undefined,m=c.matchCallback||undefined,n=c.noMatchCallback||undefined,d=c.maxNestedLevel||3;var e=true;if(!d){d=3;}if(!a.findObjects._recursionCount){a.findObjects._recursionCount=0;}a.findObjects._recursionCount++;if(a.findObjects._recursionCount>d){a.findObjects._recursionCount--;return;}var f=function(o){var s=Object.prototype.toString.call(o);return(s==='[object Array]'||s==='[object Object]');};var h=Object.prototype.hasOwnProperty.bind(b);if(b){for(var i in b){if(h(i)){var I=f(b[i]);if(b[i]&&I){b[i].__nestedKey=i;}e=true;if(i===k&&m){e=m(p,b,b[i]);}else if(n){e=n(p,b,b[i]);}if(e&&I){a.findObjects(b,b[i],{key:k,matchCallback:m,noMatchCallback:n,maxNestedLevel:d});}if(b[i]&&I){delete b[i].__nestedKey;}}}}a.findObjects._recursionCount--;};return a;},true);
