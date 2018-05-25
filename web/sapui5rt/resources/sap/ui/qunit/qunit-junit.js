/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";if(typeof QUnit!=="undefined"){var l=!(parseFloat(QUnit.version)>=2.0);var d=document.location.href.replace(/\?.*|#.*/g,""),s=document.getElementsByTagName("script"),b=null,f=null;for(var i=0;i<s.length;i++){var S=s[i].getAttribute("src");if(S){var B=S.match(/(.*)qunit\/qunit-junit\.js$/i);if(B&&B.length>1){b=B[1];break;}}}if(b===null){if(typeof jQuery!=='undefined'&&jQuery.sap&&jQuery.sap.getModulePath){f=jQuery.sap.getModulePath("sap.ui.thirdparty.qunit-reporter-junit",".js");}else{throw new Error("qunit-junit.js: The script tag seems to be malformed!");}}else{f=b+"thirdparty/qunit-reporter-junit.js";}var t=document.location.pathname.substr(1).replace(/\./g,"_").replace(/\//g,".")+document.location.search.replace(/\./g,'_');var a=function(n){return String(n||'default').replace(/\./g,"_");};QUnit.config.callbacks.begin.unshift(function(){var q=document.querySelector("#qunit");var c=document.querySelectorAll('#qunit-header,#qunit-banner,#qunit-userAgent,#qunit-testrunner-toolbar,#qunit-tests');var e=document.querySelector("#qunit-fixture");if(q==null&&c.length>0){q=document.createElement('DIV');q.id='qunit';c[0].parentNode.insertBefore(q,c[0]);for(var i=0;i<c.length;i++){q.appendChild(c[i]);}}if(e==null){e=document.createElement('DIV');e.id='qunit-fixture';if(q.nextSibling){q.parentNode.insertBefore(e,q.nextSibling);}else{q.parentNode.appendChild(e);}}});if(l){QUnit.equals=window.equals=window.equal;QUnit.raises=window.raises=window["throws"];}QUnit.moduleStart(function(D){D.name=t+"."+a(D.name);});QUnit.testStart(function(D){D.module=t+"."+a(D.module);if(l){window.assert=QUnit.config.current.assert;}});QUnit.testDone(function(c){if(l){try{delete window.assert;}catch(e){if(!window._$cleanupFailed){QUnit.test("A script loaded via script tag defines a global assert function!",function(c){c.ok(QUnit.config.ignoreCleanupFailure,e);});window._$cleanupFailed=true;}}}});QUnit.log(function(c){if(!c.result&&c.source){c.___message=c.message;c.message+='\n'+'Source: '+c.source;}});var r=new window.XMLHttpRequest();r.open('GET',f,false);r.onreadystatechange=function(){if(r.readyState==4){var c=r.responseText;if(typeof window.URI!=="undefined"){c+="\n//# sourceURL="+URI(f).absoluteTo(d);}window.eval(c);}};r.send(null);QUnit.log(function(c){if(!c.result&&c.source){c.message=c.___message;c.___message=undefined;}});QUnit.jUnitReport=function(D){window._$jUnitReport.results=D.results;window._$jUnitReport.xml=D.xml;};QUnit.log(function(D){window._$jUnitReport.tests=window._$jUnitReport.tests||[];var T=String(D.message)||(D.result?"okay":"failed");if(!D.result){if(D.expected!==undefined){T+="\nExpected: "+D.expected;}if(D.actual!==undefined){T+="\nResult: "+D.actual;}if(D.expected!==undefined&&D.actual!==undefined){T+="\nDiff: "+D.expected+" != "+D.actual;}if(D.source){T+="\nSource: "+D.source;}}window._$jUnitReport.tests.push({module:D.module,name:D.name,text:T,pass:D.result});});window._$jUnitReport={};}else{throw new Error("qunit-junit.js: QUnit is not loaded yet!");}})();
