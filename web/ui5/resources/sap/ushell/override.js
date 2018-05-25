// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(function(){"use strict";var o={};o.updateAggregation=function(n){if(this.isTreeBinding(n)){sap.ui.base.ManagedObject.prototype.updateAggregation.apply(this,arguments);}else{var b=this.mBindingInfos[n],B=b.binding,a=B.getContexts(),f=b.factory,A=this.getMetadata().getJSONKeys()[n],g=A._sMutator+"Group",G=B.isGrouped()&&this[g],i=0,I=[],c=jQuery.proxy(function(C){var s=this.getId()+"-"+jQuery.sap.uid(),d=f(s,C);d.setBindingContext(C,b.model);this[A._sMutator](d);},this);if(G){sap.ui.base.ManagedObject.prototype.updateAggregation.apply(this,arguments);}else{I=this[A._sGetter]();for(i=0;i<a.length;++i){if(i<I.length){I[i].setBindingContext(a[i],b.model);}else{c(a[i]);}}for(;i<I.length;++i){I[i].destroy();}I.length=a.length;}}};o.updateAggregationGrouped=function(n){var b=this.mBindingInfos[n],B=b.binding,f=b.factory,c,N=null,g=null,G=null,t=this,I=t.getItems(),l=0,L=0,i,s,T=[];g=B.isGrouped()&&this.addItemGroup;jQuery.each(B.getContexts(),function(a,C){if(g&&B.aSorters.length>0){N=B.aSorters[0].fnGroup(C);if(typeof N==="string"){N={key:N};}if(N.key!==G){var d,h;if(b.groupHeaderFactory){d=b.groupHeaderFactory(N);}h=d||new sap.m.GroupHeaderListItem({title:N.text||N.key}).addStyleClass("sapMListHdr");t.insertAggregation("items",h,L,true);L=L+1;G=N.key;}}I=t.getItems();for(i=L;i<I.length;i=i+1){if(I[i].constructor===sap.m.GroupHeaderListItem){T.push(t.removeItem(I[i]));I=t.getItems();}}if(L<I.length){I[L].setBindingContext(C,b.model);if(I[L].aDelegates){jQuery.each(I[L].aDelegates,function(i,v){v.vThis=C;});}}else{s=t.getId()+"-"+L;c=f(s,C);c.setBindingContext(C,b.model);t.addItem(c);}L=L+1;l=L;});for(i=I.length-1;i>=l;i=i-1){T.push(t.removeItem(I[i]));}setTimeout(function(){jQuery.each(T,function(i,v){v.destroy();});},1);};o.updateAggregatesFactory=function(n){return function(){jQuery.proxy(o.updateAggregation,this,n)();};};return o;},true);
