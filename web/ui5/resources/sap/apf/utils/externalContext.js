/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2015 SAP AG. All rights reserved
 */
jQuery.sap.declare('sap.apf.utils.externalContext');jQuery.sap.require('sap.apf.core.utils.filter');
sap.apf.utils.ExternalContext=function(a){'use strict';var d=jQuery.Deferred();var s=a.instances.startParameter.getEvaluationId();var x=a.instances.startParameter.getXappStateId();var m=a.instances.messageHandler;var r;var c;var b;var e=this;this.getCombinedContext=function(){if(x){sap.ushell.Container.getService("CrossApplicationNavigation").getAppState(a.instances.component,x).done(function(f){var g=f.getData();if(g&&g.sapApfCumulativeFilter){d.resolve(n(sap.apf.core.utils.Filter.transformUI5FilterToInternal(m,g.sapApfCumulativeFilter)));}else if(g&&g.selectionVariant){d.resolve(n(e.convertSelectionVariantToFilter(g.selectionVariant)));}else{d.resolve(new sap.apf.core.utils.Filter(m));}});}else if(s){c=a.functions.getConfigurationProperties();b=c&&c.smartBusiness&&c.smartBusiness.runtime;if(b&&b.service){r=b.service+"/EVALUATIONS('"+s+"')/FILTERS?$format=json";jQuery.ajax({url:r,success:function(f){var p;var m=a.instances.messageHandler;var o;var g=new sap.apf.core.utils.Filter(m);var h=[];var t={};f.d.results.forEach(i);for(p in t){if(t.hasOwnProperty(p)){o=new sap.apf.core.utils.Filter(m);t[p].forEach(j);h.push(o);}}h.forEach(k);d.resolve(n(g));function i(l){if(!t[l.NAME]){t[l.NAME]=[];}t[l.NAME].push(new sap.apf.core.utils.Filter(m,l.NAME,l.OPERATOR,l.VALUE_1,l.VALUE_2));}function j(l){o.addOr(l);}function k(l){g.addAnd(l);}},error:function(j,t,f){}});}else{d.resolve(new sap.apf.core.utils.Filter(m));}}else{d.resolve(new sap.apf.core.utils.Filter(m));}return d.promise();function n(f){if(f.levelOperator===sap.apf.core.constants.BooleFilterOperators.OR){return new sap.apf.core.utils.Filter(m,f);}return f;}};this.convertParameterObject=function(p){if(!p.PropertyName||p.PropertyValue===undefined||p.PropertyValue===null){return null;}return new sap.apf.core.utils.FilterTerm(m,p.PropertyName,sap.apf.core.constants.FilterOperators.EQ,p.PropertyValue);};this.convertSelectOption=function(f){var e=this;var g=null;var i;if(!f.PropertyName||!f.Ranges||!(jQuery.isArray(f.Ranges))){return null;}g=new sap.apf.core.utils.Filter(m);for(i=0;i<f.Ranges.length;i++){var h=e.convertRange(f.Ranges[i],f.PropertyName);if(!h){return null;}g.addOr(h);}return g;};this.convertRange=function(f,p){if(f.Sign!='I'){return null;}if(f.Option==='BT'&&(f.High===undefined||f.High===null)){return null;}return new sap.apf.core.utils.FilterTerm(m,p,f.Option,f.Low,f.High);};this.convertSelectionVariantToFilter=function(f){var e=this;var g=new sap.apf.core.utils.Filter(m);var i;if(!f){return g;}if(f.Parameters&&!(jQuery.isArray(f.Parameters))){return g;}if(f.SelectOptions&&!(jQuery.isArray(f.SelectOptions))){return g;}if(f.Parameters){for(i=0;i<f.Parameters.length;i++){var h=e.convertParameterObject(f.Parameters[i]);if(!h){return new sap.apf.core.utils.Filter(m);}g.addAnd(h);}}if(f.SelectOptions){for(i=0;i<f.SelectOptions.length;i++){var j=e.convertSelectOption(f.SelectOptions[i]);if(!j){return new sap.apf.core.utils.Filter(m);}g.addAnd(j);}}return g;};};
