/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare('sap.apf.utils.startFilter');
sap.apf.utils.StartFilter=function(a,c,b){'use strict';var d;var e;var r=new sap.apf.core.utils.Filter(a.instances.messageHandler);var f;var g;var h=0;var j=0;var k=jQuery.extend(true,[],b);var p;if(c.preselectionDefaults&&c.preselectionDefaults.length>0){p=jQuery.extend(true,[],c.preselectionDefaults);}else if(jQuery.isFunction(c.preselectionFunction)){p=jQuery.extend(true,[],c.preselectionFunction());}var v=false;if(c.valueHelpRequest||(jQuery.isArray(c.valueList)&&c.valueList.length>0)){v=true;}var l=false;var m={};var n={};var o;u=u.bind(this);A=A.bind(this);B=B.bind(this);x=x.bind(this);w=w.bind(this);t=t.bind(this);this.hasValueHelpRequest=function(){return!!c.valueHelpRequest;};this.setContext=function(i){if(c.notConfigured===true){b=i;}else{a.instances.messageHandler.putMessage(a.instances.messageHandler.createMessageObject({code:'5100',aParameters:['Context of configured Startfilter cannot be changed']}));}};this.getPropertyName=function(){return c.property;};this.getLabel=function(){return c.label;};this.getAliasNameIfExistsElsePropertyName=function(){return c.alias||c.property;};this.isMultiSelection=function(){if(c.multiSelection==='true'||c.multiSelection===true){return true;}return false;};this.isVisible=function(){if(b&&b.type==='internalFilter'&&!c.filterResolutionRequest){return false;}return!c.invisible;};this.setRestriction=function(i){r=i.copy();if(!g){g=jQuery.Deferred();}s(++j);};this.setSelectedValues=function(i,C){if(!g){g=jQuery.Deferred();}if(!d){d=jQuery.Deferred();if(!C){w().done(function(D){if(d){d.resolve(D);}});}else{d.resolve(i);}}if(i.type==='internalFilter'){e=i;}else{e=jQuery.extend(true,[],i);}if(!C){s(++j);}};this.getSelectedValues=function(){var i;if(!g){g=jQuery.Deferred();i=g;s(++j);}else if(g.state()==='pending'){i=g;if(d){d.done(function(){s(++j);});}else{s(++j);}}return i.promise();};this.getValues=function(){var i;if(!f||f.state()!=='pending'){f=jQuery.Deferred();}i=f;q(++h);return i.promise();};this.getMetadata=function(){if(c.metadataProperty){return jQuery.Deferred().resolve(c.metadataProperty);}return jQuery.Deferred().resolve({});};this.serialize=function(i,C){var D=jQuery.Deferred();var E={propertyName:this.getPropertyName()};w().done(function(F){if(F&&F.type==='internalFilter'){F=F.mapToSapUI5FilterExpression();}E.selectedValues=F;if(d){d.done(function(F){if(i===true){E.initiallySelectedValues=F;}if(C!==true){d=null;}D.resolve(E);});}else{D.resolve(E);}});return D;};this.deserialize=function(i){if(i.selectedValues&&(i.selectedValues.aFilters||i.selectedValues.sPath)){i.selectedValues=sap.apf.core.utils.Filter.transformUI5FilterToInternal(a.instances.messageHandler,i.selectedValues);}e=null;if(i.initiallySelectedValues){d=jQuery.Deferred().resolve(i.initiallySelectedValues);}else{d=null;}if(jQuery.isArray(i.selectedValues)){k=jQuery.extend(true,[],i.selectedValues);b=jQuery.extend(true,[],i.selectedValues);}else{k=i.selectedValues;b=i.selectedValues;}l=false;};this.reset=function(){if(d){d.done(function(i){e=i;});}};function q(i){t(i,h).done(function(C){if(i===h){f.resolve(C);}});}function s(i){w(i).done(function(C){if(i===j){var D=g;g=jQuery.Deferred();D.resolve(C,g.promise());}});}function t(C,D){var E=jQuery.Deferred();var F=[];G=G.bind(this);if(v&&jQuery.isArray(b)){y(C,D).then(function(i){var F=i.data;var o=u(k,F);E.resolve(o);});}else if(b&&b.type==='internalFilter'&&v&&c.filterResolutionRequest){jQuery.when(y(C,D),x(C,D)).then(function(i,H){var F=i.data;G(H.data,F);E.resolve(F);});}else if(v&&((c.preselectionDefaults&&c.preselectionDefaults.length>0)||jQuery.isFunction(c.preselectionFunction))){y(C,D).then(function(i){var F=i.data;o=u(p,F);E.resolve(o);});}else if(v){y(C,D).then(function(i){E.resolve(i.data);});}else if(b&&b.type==='internalFilter'&&c.filterResolutionRequest){x(C,D).then(function(i){E.resolve(i.data);});}else if(jQuery.isArray(b)&&c.filterResolutionRequest&&!v){x(C,D).then(function(i){E.resolve(i.data);});}else if(jQuery.isArray(b)){F=u(k,F);E.resolve(F);}else if(((c.preselectionDefaults&&c.preselectionDefaults.length>0)||jQuery.isFunction(c.preselectionFunction))&&!v&&!c.filterResolutionRequest&&!b){if(this.isMultiSelection()){o=u(p,F);}else if(p.length>0){o=u([p[0]],F);}E.resolve(o);}else if(((c.preselectionDefaults&&c.preselectionDefaults.length>0)||jQuery.isFunction(c.preselectionFunction))&&c.filterResolutionRequest&&!b){if(this.isMultiSelection()){o=u(p,F);}else if(p.length>0){o=u([p[0]],F);}E.resolve(o);}else if(b&&b.type==='internalFilter'||!b){E.resolve(null);}return E.promise();function G(H,I){var J=B(I);for(var i=H.length-1;i>=0;i--){if(!J[H[i][this.getAliasNameIfExistsElsePropertyName()]]){I.unshift(H[i]);}}}}function u(C,D){var E=jQuery.extend(true,[],D);var F=B(D);var G;for(var i=C.length-1;i>=0;i--){if(!F[C[i]]){G={};G[this.getAliasNameIfExistsElsePropertyName()]=C[i];E.unshift(G);}else if(!l){C.splice(i,1);}}l=true;return E;}function w(i){var C=jQuery.Deferred();var D;var E;var F;var G=this;if(e){if(!c.invisible){I(jQuery.extend(true,[],e),i);}else{D=e;H();}}else if(jQuery.isFunction(c.preselectionFunction)&&!v){D=c.preselectionFunction();H();}else if(b&&b.type==='internalFilter'&&!c.filterResolutionRequest){C.resolve(b);}else if(c.preselectionDefaults===null&&!b){C.resolve([]);}else if(c.filterResolutionRequest&&!b&&!v&&!(c.preselectionDefaults&&c.preselectionDefaults.length>0)){C.resolve(null);}else if(b&&b.type==='internalFilter'&&c.filterResolutionRequest){x(i,j).then(function(J){var K=A(J);I(jQuery.extend(true,[],K),i);});}else if(v&&!jQuery.isArray(b)&&!(c.preselectionDefaults&&c.preselectionDefaults.length>0)&&!c.preselectionFunction){y(i,j).then(function(J){var K=A(J);if(this.isMultiSelection()){D=K;}else{D=[K[0]];}H();}.bind(this));}else if(v&&!jQuery.isArray(b)&&((c.preselectionDefaults&&c.preselectionDefaults.length>0)||c.preselectionFunction)){if(jQuery.isFunction(c.preselectionFunction)){E=c.preselectionFunction();}else{E=c.preselectionDefaults;}I(jQuery.extend(true,[],E),i);}else if(jQuery.isArray(b)){I(b,i);}else if(c.preselectionDefaults&&c.preselectionDefaults.length>0){D=c.preselectionDefaults;I(D,i);}else{C.resolve(null);}return C.promise();function H(){if(D&&D.type==='internalFilter'){C.resolve(D);}else{C.resolve(jQuery.extend(true,[],D));}}function I(J,i){t(i,j).done(function(K){if(K!==null){D=[];F=B(K);J.forEach(function(L){if(F[L]){D.push(L);}});if(J.length!==0&&D.length===0&&c.preselectionDefaults!==null){D=A({data:K});}if(!G.isMultiSelection()){D=[D[0]];}if(e!==null){e=D;}}else{D=null;}H();});}}function x(i,C){var D;var E=jQuery.Deferred();if(i&&i!==C){return E.promise();}var F;if(jQuery.isArray(b)){F=new sap.apf.core.utils.Filter(a.instances.messageHandler);b.forEach(function(H){F.addOr(this.getAliasNameIfExistsElsePropertyName(),'eq',H);}.bind(this));}else if(b instanceof sap.apf.core.utils.Filter){F=b;}else{F=new sap.apf.core.utils.Filter(a.instances.messageHandler);}if(!r.isEmpty()){D=new sap.apf.core.utils.Filter(a.instances.messageHandler);D.addAnd(r).addAnd(F);}else{D=F;}if(m.lastMergedFilter&&m.lastMergedFilter.isEqual(D)){m.lastFilterResolutionPromise.done(function(H){E.resolve(H);});}else{m.lastMergedFilter=D.copy();m.lastFilterResolutionPromise=E;a.functions.createRequest(c.filterResolutionRequest).sendGetInBatch(D,G,undefined);}return E.promise();function G(H){E.resolve(H);}}function y(i,C){var D;if(c.valueHelpRequest){return z(i,C);}else if(c.valueList){D={data:u(c.valueList,[])};return jQuery.Deferred().resolve(D);}}function z(i,C){var D=jQuery.Deferred();if(i&&C!==i){return D.promise();}if(n.lastRestriction&&n.lastRestriction.isEqual(r)){n.lastValueHelpPromise.done(function(F){D.resolve(F);});}else{n.lastRestriction=r.copy();n.lastValueHelpPromise=D;a.functions.createRequest(c.valueHelpRequest).sendGetInBatch(r,E,undefined);}return D.promise();function E(F){D.resolve(F);}}function A(i){var C=[];i.data.forEach(function(D){C.push(D[this.getAliasNameIfExistsElsePropertyName()]);}.bind(this));return C;}function B(i){var C={};i.forEach(function(D){var E=D[this.getAliasNameIfExistsElsePropertyName()];C[E]=true;}.bind(this));return C;}};
