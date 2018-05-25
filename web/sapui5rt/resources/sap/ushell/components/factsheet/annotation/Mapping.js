// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(function(){"use strict";var M={};M.initialized=[];M.parse=function(m,a){var x={},g,b,s,c,d,r,e,f,h,n,o,A,q={},t,u,S={},i,v,w={},y={},z="",B,C,D,E,F,G,H,T,I,J,K,L,N,j,O,P,Q,R,U,V,W,X,Y,Z,$,_,a1,b1,c1,d1,e1,f1,g1;if(sap.ui.Device.browser.internet_explorer){x={setNameSpace:function(k){k.setProperty("SelectionNamespaces",'xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" xmlns:d="http://docs.oasis-open.org/odata/ns/edm"');k.setProperty("SelectionLanguage","XPath");return k;},selectNodes:function(k,x,l){return l.selectNodes(x);},nextNode:function(k){return k.nextNode();},getNodeText:function(k){return k.text;}};}else{x={setNameSpace:function(k){return k;},nsResolver:function(p){var k={"edmx":"http://docs.oasis-open.org/odata/ns/edmx","d":"http://docs.oasis-open.org/odata/ns/edm"};return k[p]||null;},selectNodes:function(k,p,l){var h1=k.evaluate(p,l,this.nsResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);h1.length=h1.snapshotLength;return h1;},nextNode:function(k,l){return k.snapshotItem(l);},getNodeText:function(k){return k.textContent;}};}g=function(k){var l;if(sap.ui.Device.browser.internet_explorer){l=new ActiveXObject("Microsoft.XMLHTTP");l.open("GET",k,false);l.send(null);return l.responseXML;}else{l=jQuery.sap.sjax({url:k,dataType:"xml"});if(l.success){return l.data;}}};b=function(m){var h1={},i1={},j1={},k1=false,i,l1,m1,n1,o1={},j,p1={},q1={},r1=false,s1,l,k,t1,u1,v1,w1,p,x1;for(i=m.dataServices.schema.length-1;i>=0;i-=1){h1=m.dataServices.schema[i];if(h1.entityType){l1=h1.namespace;m1=h1.entityType;n1=h1.complexType;for(j in m1){if(m1.hasOwnProperty(j)){o1=m1[j];q1={};if(o1.hasStream&&o1.hasStream==="true"){continue;}p1={};for(k in o1.property){s1=o1.property[k];if(s1.type.substring(0,l1.length)===l1){for(l in n1){if(n1[l].name===s1.type.substring(l1.length+1)){for(k in n1[l].property){t1=n1[l].property[k];p1[n1[l].name+"/"+t1.name]=t1.type;}}}}else{u1=s1.name;v1=s1.type;for(p in s1.extensions){w1=s1.extensions[p];if((w1.name==="display-format")&&(w1.value==="Date")){v1="Edm.Date";}else{r1=true;if(!q1[u1]){q1[u1]={};}if(w1.namespace&&!q1[u1][w1.namespace]){q1[u1][w1.namespace]={};}q1[u1][w1.namespace][w1.name]=w1.value;}}p1[u1]=v1;}}if(!i1[l1+"."+o1.name]){i1[l1+"."+o1.name]={};}i1[l1+"."+o1.name]=p1;if(r1){if(!j1[l1+"."+o1.name]){k1=true;}j1[l1+"."+o1.name]={};j1[l1+"."+o1.name]=q1;}}}}}if(k1){x1={types:i1,extensions:j1};}else{x1={types:i1};}return x1;};s=function(p,k,l,S){var h1,i1,j1='';for(h1 in p){if(p.hasOwnProperty(h1)){if(p[h1]){i1=p[h1];if(i1.Value&&i1.Value.Path){j1=c(i1.Value.Path,k,l,S);if(j1){p[h1].EdmType=j1;}continue;}if(i1.Path){j1=c(i1.Path,k,l,S);if(j1){p[h1].EdmType=j1;}continue;}if(i1.Facets){p[h1].Facets=s(i1.Facets,k,l,S);continue;}if(i1.Data){p[h1].Data=s(i1.Data,k,l,S);continue;}if(h1==="Data"){p.Data=s(i1,k,l,S);continue;}if(i1.Value&&i1.Value.Apply){p[h1].Value.Apply.Parameters=s(i1.Value.Apply.Parameters,k,l,S);continue;}if(i1.Value&&i1.Type&&(i1.Type==="Path")){j1=c(i1.Value,k,l,S);if(j1){p[h1].EdmType=j1;}}}}}return p;};c=function(p,k,l,S){var h1;if((p.charAt(0)==="@")&&(p.indexOf(S.Alias)===1)){p=p.slice(S.Alias.length+2);}if(p.indexOf("/")>=0){if(k[p.slice(0,p.indexOf("/"))]){l=p.slice(0,p.indexOf("/"));p=p.slice(p.indexOf("/")+1);}}for(h1 in k[l]){if(k[l].hasOwnProperty(h1)){if(p===h1){return k[l][h1];}}}};d=function(k){var l="",p="",i,h1={};for(i=0;i<k.attributes.length;i+=1){if((k.attributes[i].name!=="Property")&&(k.attributes[i].name!=="Term")){l=k.attributes[i].name;p=k.attributes[i].value;}}if(l.length>0){h1[l]=r(p);}return h1;};e=function(t,k){var l={},p,h1,i1,j1,k1,l1;if(k.hasChildNodes()){p=x.selectNodes(t,"./d:String",k);if(p.length>0){h1=x.nextNode(p,0);l["String"]=x.getNodeText(h1);}else{i1=x.selectNodes(t,"./d:Path",k);if(i1.length>0){j1=x.nextNode(i1,0);l["Path"]=x.getNodeText(j1);}else{k1=x.selectNodes(t,"./d:Apply",k);if(k1.length>0){l1=x.nextNode(k1,0);l["Apply"]=n(t,l1);}}}}return l;};f=function(t,k,l){var p={},h1,i1,I,j1,k1,l1,m1,n1,o1={},N,O,X,p1,q1;if(k.hasChildNodes()){h1=x.selectNodes(t,"./d:Record | ./d:Collection/d:Record | ./d:Collection/d:If/d:Record",k);if(h1.length){i1=0;for(I=0;I<h1.length;I+=1){j1=x.nextNode(h1,I);k1=h(t,j1,l);if(j1.getAttribute("Type")){k1["RecordType"]=r(j1.getAttribute("Type"));}if(i1===0){if(j1.nextElementSibling||(j1.parentNode.nodeName==="Collection")||(j1.parentNode.nodeName==="If")){p=[];p.push(k1);}else{p=k1;}}else{p.push(k1);}i1+=1;}}else{l1=x.selectNodes(t,"./d:UrlRef",k);if(l1.length>0){for(I=0;I<l1.length;I+=1){m1=x.nextNode(l1,I);p["UrlRef"]=e(t,m1);}}else{l1=x.selectNodes(t,"./d:Url",k);if(l1.length>0){for(I=0;I<l1.length;I+=1){m1=x.nextNode(l1,I);p["Url"]=e(t,m1);}}else{q1=x.selectNodes(t,"./d:Collection/d:AnnotationPath | ./d:Collection/d:PropertyPath",k);if(q1.length>0){p=[];for(I=0;I<q1.length;I+=1){n1=x.nextNode(q1,I);o1={};o1[n1.nodeName]=x.getNodeText(n1);p.push(o1);}}else{p=d(k);N=x.selectNodes(t,"./d:Annotation",k);O={};for(X=0;X<N.length;X+=1){O=x.nextNode(N,X);if(O.hasChildNodes()===false){p1=r(O.getAttribute("Term"));p[p1]=d(O);}}}}}}}else{p=d(k);}return p;};h=function(t,k,l){var p={},O={},N,X,h1,i1,I,j1,k1,l1,m1,n1;N=x.selectNodes(t,"./d:Annotation",k);for(X=0;X<N.length;X+=1){O=x.nextNode(N,X);if(O.hasChildNodes()===false){h1=r(O.getAttribute("Term"));p[h1]=d(O);}}i1=x.selectNodes(t,"./d:PropertyValue",k);if(i1.length>0){for(I=0;I<i1.length;I+=1){j1=x.nextNode(i1,I);k1=j1.getAttribute("Property");p[k1]=f(t,j1,l);l1=x.selectNodes(t,"./d:Apply",j1);m1=null;for(n1=0;n1<l1.length;n1+=1){m1=x.nextNode(l1,n1);if(m1){p[k1]={};p[k1]['Apply']=n(t,m1);}}}}else{p=f(t,k,l);}return p;};n=function(t,k){var l={},p,h1=null,i1=[],i;p=x.selectNodes(t,"./d:*",k);for(i=0;i<p.length;i+=1){h1=x.nextNode(p,i);switch(h1.nodeName){case"Apply":i1.push({"Type":"Apply","Value":n(t,h1)});break;case"LabeledElement":i1.push({"Name":h1.getAttribute("Name"),"Value":e(t,h1)});break;default:i1.push({"Type":h1.nodeName,"Value":x.getNodeText(h1)});break;}}l['Name']=k.getAttribute('Function');l['Parameters']=i1;return l;};o=function(l,p,h1){var i1,i,j1,k1,j,k;for(i=m.dataServices.schema.length-1;i>=0;i-=1){i1=m.dataServices.schema[i];if(i1.entityType){j1=i1.namespace+".";k1=i1.entityType;for(k=k1.length-1;k>=0;k-=1){if(j1+k1[k].name===l&&k1[k].navigationProperty){for(j=0;j<k1[k].navigationProperty.length;j+=1){if(k1[k].navigationProperty[j].name===p){return true;}}}}}}return false;};r=function(k){for(A in w){if(w.hasOwnProperty(A)){if(k.indexOf(A+".")>=0){k=k.replace(A+".",w[A]+".");return k;}}}return k;};if(this.initialized[a]){return this.initialized[a];}t=g(a);t=x.setNameSpace(t);u=x.selectNodes(t,"//d:Schema",t);for(i=0;i<u.length;i+=1){v=x.nextNode(u,i);S.Alias=v.getAttribute("Alias");S.Namespace=v.getAttribute("Namespace");}B=x.selectNodes(t,"//edmx:Reference",t);for(i=0;i<B.length;i+=1){C=x.nextNode(B,i);D=x.selectNodes(t,"./edmx:Include",C);if(D&&D.length>0){E=x.nextNode(D,0);if(E.getAttribute("Alias")){w[E.getAttribute("Alias")]=E.getAttribute("Namespace");}else{w[E.getAttribute("Namespace")]=E.getAttribute("Namespace");}}F=x.selectNodes(t,"./edmx:IncludeAnnotations",C);if(F.length>0){for(j=0;j<F.length;j+=1){G=x.nextNode(F,j);if(G.getAttribute("TargetNamespace")){z=G.getAttribute("TargetNamespace");if(!y[z]){y[z]={};}y[z][G.getAttribute("TermNamespace")]=C.getAttribute("Uri");}else{y[G.getAttribute("TermNamespace")]=C.getAttribute("Uri");}}}}if(y){q.annotationReferences=y;}q.aliasDefinitions=w;H=x.selectNodes(t,"//d:Term",t);if(H.length>0){T={};for(I=0;I<H.length;I+=1){J=x.nextNode(H,I);K=r(J.getAttribute("Type"));T["@"+S.Alias+"."+J.getAttribute("Name")]=K;}q.termDefinitions=T;}L=b(m);if(L.extensions){q.propertyExtensions=L.extensions;}N=x.selectNodes(t,"//d:Annotations ",t);for(I=0;I<N.length;I+=1){O=x.nextNode(N,I);if(O.hasChildNodes()===false){continue;}P=O.getAttribute("Target");Q=P.split(".")[0];if(Q&&w[Q]){P=P.replace(new RegExp(Q,""),w[Q]);}R=P;U=null;if(P.indexOf("/")>0){R=P.split("/")[0];U=P.replace(R+"/","");}if(!q[R]){q[R]={};}if(U){if(!q.propertyAnnotations){q.propertyAnnotations={};}if(!q.propertyAnnotations[R]){q.propertyAnnotations[R]={};}q.propertyAnnotations[R][U]={};V=x.selectNodes(t,"./d:Annotation",O);for(X=0;X<V.length;X+=1){W=x.nextNode(V,X);if(W.hasChildNodes()===false){Y=r(W.getAttribute("Term"));q.propertyAnnotations[R][U][Y]=d(W);}}}else{$=R.replace(w[Q],Q);V=x.selectNodes(t,"./d:Annotation",O);for(Z=0;Z<V.length;Z+=1){W=x.nextNode(V,Z);_=W.getAttribute("Qualifier");a1=r(W.getAttribute("Term"));if(_){a1+="#"+_;}b1=f(t,W,$);b1=s(b1,L.types,R,S);q[R][a1]=b1;}c1=x.selectNodes(t,"//d:Annotations[contains(@Target, '"+$+"')]//d:PropertyValue[contains(@Path, '/')]//@Path",t);for(i=0;i<c1.length;i+=1){d1=x.nextNode(c1,i);e1=d1.value;if(q.propertyAnnotations){if(q.propertyAnnotations[R]){if(q.propertyAnnotations[R][e1]){continue;}}}f1=e1.split('/');if(o(R,f1[0],m)){if(!q.expand){q.expand={};}if(!q.expand[R]){q.expand[R]={};}q.expand[R][f1[0]]=f1[0];}}g1=x.selectNodes(t,"//d:Annotations[contains(@Target, '"+$+"')]//d:Path[contains(., '/')]",t);for(i=0;i<g1.length;i+=1){d1=x.nextNode(g1,i);e1=x.getNodeText(d1);if(q.propertyAnnotations[R]){if(q.propertyAnnotations[R][e1]){continue;}}if(!q.expand){q.expand={};}if(!q.expand[R]){q.expand[R]={};}f1=e1.split('/');if(o(R,f1[0],m)){if(!q.expand){q.expand={};}if(!q.expand[R]){q.expand[R]={};}q.expand[R][f1[0]]=f1[0];}}}this.initialized[a]=q;}return q;};return M;},true);
