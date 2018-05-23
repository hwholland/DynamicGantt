sap.ui.require.preload({
	"web/ui5/test-resources/sap/apf/integration/withServer/SFB/APF/filter.js": "/*!\n * SAP APF Analysis Path Framework\n *\n * (c) Copyright 2012-2014 SAP AG. All rights reserved\n */\njQuery.sap.declare(\"sap.apf.core.utils.filter\"),jQuery.sap.require(\"sap.apf.core.utils.filterTerm\"),jQuery.sap.require(\"sap.apf.core.constants\"),function(){\"use strict\";sap.apf.core.utils.Filter=function(t,e,r,s,i){this.type=\"internalFilter\",this.messageHandler=t,e&&(e instanceof sap.apf.core.utils.FilterTerm||e instanceof sap.apf.core.utils.Filter)?this.leftExpr=e:void 0!==e&&void 0!==r&&void 0!==s?this.leftExpr=new sap.apf.core.utils.FilterTerm(t,e,r,s,i):void 0===e&&void 0===r&&void 0===s||t.check(!1,\"wrong arguments in construction of sap.apf.core.utils.Filter\"),this.restExpr=[]},sap.apf.core.utils.Filter.prototype.getProperties=function(){var t,e=[],r=[],s=\"\";if(void 0===this.leftExpr)return e;for(this.leftExpr instanceof sap.apf.core.utils.FilterTerm?(s=this.leftExpr.getProperty(),e.push(s)):this.leftExpr instanceof sap.apf.core.utils.Filter&&(e=this.leftExpr.getProperties()),t=0;t<this.restExpr.length;t++)this.restExpr[t]instanceof sap.apf.core.utils.FilterTerm?e.push(this.restExpr[t].getProperty()):(r=this.restExpr[t].getProperties(),e=e.concat(r));return sap.apf.utils.eliminateDuplicatesInArray(this.messageHandler,e)},sap.apf.core.utils.Filter.prototype.copy=function(){var t,e;if(void 0===this.leftExpr)return new sap.apf.core.utils.Filter(this.messageHandler);if(t=new sap.apf.core.utils.Filter(this.messageHandler,this.leftExpr),void 0===this.levelOperator)return t;for(e=0;e<this.restExpr.length;e++)this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND?t.addAnd(this.restExpr[e].copy()):t.addOr(this.restExpr[e].copy());return t},sap.apf.core.utils.Filter.prototype.isEmpty=function(){if(void 0===this.leftExpr)return!0;if(this.leftExpr instanceof sap.apf.core.utils.FilterTerm)return!1;if(!this.leftExpr.isEmpty())return!1;if(0===this.restExpr.length)return!0;var t;for(t=0;t<this.restExpr.length;++t)if(!this.restExpr[t].isEmpty())return!1;return!0},sap.apf.core.utils.Filter.prototype.isOr=function(){return this.levelOperator===sap.apf.core.constants.BooleFilterOperators.OR||this.levelOperator!==sap.apf.core.constants.BooleFilterOperators.AND&&(!!(this.leftExpr&&this.leftExpr instanceof sap.apf.core.utils.Filter)&&this.leftExpr.isOr())},sap.apf.core.utils.Filter.prototype.isEqual=function(t){return this===t||void 0!==t&&this.getHash()===t.getHash()},sap.apf.core.utils.Filter.prototype.getHash=function(t){var e=t||1,r=0;if(r=0===this.restExpr.length?e:e+1,void 0===this.leftExpr)return 0;var s,i=this.leftExpr.getHash(r);if(void 0===this.levelOperator)return i;for(this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND?i+=Math.pow(2,e):this.levelOperator===sap.apf.core.constants.BooleFilterOperators.OR&&(i+=Math.pow(3,e)),s=0;s<this.restExpr.length;s++)i+=this.restExpr[s].getHash(r);return i},sap.apf.core.utils.Filter.prototype.getFilterTermsForProperty=function(t){var e,r=[];if(void 0===this.leftExpr)return r;for(this.leftExpr instanceof sap.apf.core.utils.Filter?r=this.leftExpr.getFilterTermsForProperty(t):t===this.leftExpr.getProperty()&&r.push(this.leftExpr),e=0;e<this.restExpr.length;e++)this.restExpr[e]instanceof sap.apf.core.utils.FilterTerm?t===this.restExpr[e].getProperty()&&r.push(this.restExpr[e]):r=r.concat(this.restExpr[e].getFilterTermsForProperty(t));return r},sap.apf.core.utils.Filter.prototype.getFilterTerms=function(){var t,e=[];if(void 0===this.leftExpr)return e;for(this.leftExpr instanceof sap.apf.core.utils.Filter?e=this.leftExpr.getFilterTerms():e.push(this.leftExpr),t=0;t<this.restExpr.length;t++)this.restExpr[t]instanceof sap.apf.core.utils.FilterTerm?e.push(this.restExpr[t]):e=e.concat(this.restExpr[t].getFilterTerms());return e},sap.apf.core.utils.Filter.prototype.isConsistentWithFilter=function(t,e){var r,s=!1;if(void 0===this.leftExpr)return!0;if(void 0===this.levelOperator)return this.leftExpr.isConsistentWithFilter(t,e);if(this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND){if(!this.leftExpr.isConsistentWithFilter(t,e))return!1;for(r=0;r<this.restExpr.length;r++)if(!this.restExpr[r].isConsistentWithFilter(t,e))return!1;return!0}if(this.levelOperator===sap.apf.core.constants.BooleFilterOperators.OR){if(i(this.leftExpr,t)&&(s=!0,this.leftExpr.isConsistentWithFilter(t,e)))return!0;for(r=0;r<this.restExpr.length;r++)if(i(this.restExpr[r],t)&&(s=!0,this.restExpr[r].isConsistentWithFilter(t,e)))return!0;return!s}function i(t,e){return t instanceof sap.apf.core.utils.FilterTerm?t.getProperty()===e:t.getProperties().indexOf(e)>=0}},sap.apf.core.utils.Filter.prototype.removeTermsByProperty=function(t){var e=this.internalRemoveTermsByProperty(t);return void 0===e?new sap.apf.core.utils.Filter(this.messageHandler):e},sap.apf.core.utils.Filter.prototype.internalRemoveTermsByProperty=function(t){var e,r,s;if(void 0===this.leftExpr)return this.copy();if((r=this.leftExpr.internalRemoveTermsByProperty(t))instanceof sap.apf.core.utils.FilterTerm&&(r=new sap.apf.core.utils.Filter(this.messageHandler,r.getProperty(),r.getOp(),r.getValue(),r.getHighValue())),void 0===this.levelOperator)return r;for(e=0;e<this.restExpr.length;e++)s=this.restExpr[e].internalRemoveTermsByProperty(t),void 0===r?r=s instanceof sap.apf.core.utils.FilterTerm?new sap.apf.core.utils.Filter(this.messageHandler,s):s:void 0!==s&&(this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND?r.addAnd(s):r.addOr(s));return r?new sap.apf.core.utils.Filter(this.messageHandler,r):void 0},sap.apf.core.utils.Filter.prototype.removeTerms=function(t,e,r){var s;if(void 0===this.leftExpr)return this.copy();var i,o=this.leftExpr.removeTerms(t,e,r);if(o instanceof sap.apf.core.utils.FilterTerm&&(o=new sap.apf.core.utils.Filter(this.messageHandler,o.getProperty(),o.getOp(),o.getValue(),o.getHighValue())),void 0===this.levelOperator)return o;for(s=0;s<this.restExpr.length;s++)i=this.restExpr[s].removeTerms(t,e,r),void 0===o?o=i instanceof sap.apf.core.utils.FilterTerm?new sap.apf.core.utils.Filter(this.messageHandler,i):i:void 0!==i&&(this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND?o.addAnd(i):o.addOr(i));return o},sap.apf.core.utils.Filter.prototype.addOr=function(t,e,r,s){var i;return t instanceof sap.apf.core.utils.Filter||t instanceof sap.apf.core.utils.FilterTerm?i=t:void 0!==t&&void 0!==e&&void 0!==r?i=new sap.apf.core.utils.FilterTerm(this.messageHandler,t,e,r,s):this.messageHandler.check(!1,\"sap.apf.core.utils.Filter.addOr: wrong arguments in construction of  Filter\"),void 0===this.leftExpr?(this.leftExpr=i,this):(void 0===this.levelOperator&&(this.levelOperator=sap.apf.core.constants.BooleFilterOperators.OR),this.restExpr.push(i),this.messageHandler.check(this.levelOperator===sap.apf.core.constants.BooleFilterOperators.OR,\"sap.apf.core.utils.Filter - addOr wrong operation\"),this)},sap.apf.core.utils.Filter.prototype.addAnd=function(t,e,r,s){var i;return t instanceof sap.apf.core.utils.Filter||t instanceof sap.apf.core.utils.FilterTerm?i=t:void 0!==t&&void 0!==e&&void 0!==r?i=new sap.apf.core.utils.FilterTerm(this.messageHandler,t,e,r,s):this.messageHandler.check(!1,\"sap.apf.core.utils.Filter.addAnd: wrong arguments in construction of  Filter\"),void 0===this.leftExpr?(this.leftExpr=i,this):(void 0===this.levelOperator&&(this.levelOperator=sap.apf.core.constants.BooleFilterOperators.AND),this.messageHandler.check(this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND,\"sap.apf.core.utils.Filter - addAnd wrong operation\"),this.restExpr.push(i),this)},sap.apf.core.utils.Filter.prototype.toUrlParam=function(t){var e=\"\";if(void 0===this.leftExpr)return\"\";e=this.leftExpr.toUrlParam(t);var r=0,s=this.restExpr.length,i=\"\";if(0===s)return e;i=this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND?\"%20and%20\":\"%20or%20\";var o=\"\";for(r=0;r<s;r++)o=this.restExpr[r].toUrlParam(t),\"\"===e?e=o:\"\"!==o&&(e=e+i+o);return\"(\"+e+\")\"},sap.apf.core.utils.Filter.prototype.mapToSapUI5FilterExpression=function(){var t,e=[];if(void 0===this.leftExpr)return{};if(0===this.restExpr.length)return this.leftExpr.mapToSapUI5FilterExpression();for(e.push(this.leftExpr.mapToSapUI5FilterExpression()),t=0;t<this.restExpr.length;t++)e.push(this.restExpr[t].mapToSapUI5FilterExpression());return{filters:e,and:this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND}},sap.apf.core.utils.Filter.prototype.overwriteWith=function(t){var e,r=t.getProperties();return 0!==r.length?void 0===(e=this.removeTermsByProperty(r))?t.copy():(e.addAnd(t),e):this.copy()},sap.apf.core.utils.Filter.prototype.reduceToProperty=function(){var t,e=[];switch(arguments.length){case 1:(t=arguments[0])instanceof Array?e=t:e.push(t);break;default:e=Array.prototype.slice.call(arguments,0)}var r=function(t,e){var r,s=[],i={},o=t?t.length:0,p=e?e.length:0;for(r=0;r<p;r++)i[e[r]]=void 0;for(r=0;r<o;r++)t[r]in i||s.push(t[r]);return s}(this.getProperties(),e);return this.copy().removeTermsByProperty(r)||new sap.apf.core.utils.Filter(this.messageHandler)},sap.apf.core.utils.Filter.prototype.isFilterTerm=function(){return!(this.restExpr.length>0)&&(!!this.leftExpr&&(this.leftExpr instanceof sap.apf.core.utils.FilterTerm||this.leftExpr.isFilterTerm()))},sap.apf.core.utils.Filter.prototype.traverse=function(t){return this.leftExpr?this.leftExpr&&0===this.restExpr.length?this.leftExpr instanceof sap.apf.core.utils.FilterTerm?t.processTerm(this.leftExpr):this.leftExpr.traverse(t):this.levelOperator===sap.apf.core.constants.BooleFilterOperators.AND?t.processAnd(this.leftExpr,this.restExpr,this):this.levelOperator===sap.apf.core.constants.BooleFilterOperators.OR?t.processOr(this.leftExpr,this.restExpr,this):(this.messageHandler.check(!1,\"undefined case in traverse()\"),!1):t.processEmptyFilter()},sap.apf.core.utils.Filter.prototype.isDisjunctionOverEqualities=function(){var t=!0;return this.levelOperator!==sap.apf.core.constants.BooleFilterOperators.AND&&(!(this.getProperties().length>1)&&(!(this.leftExpr instanceof sap.apf.core.utils.Filter&&this.leftExpr.getFilterTerms().length>1&&!this.leftExpr.isOr())&&(this.getFilterTerms().forEach(function(e){e.getOp()!==sap.apf.core.constants.FilterOperators.EQ&&(t=!1)}),this.restExpr.forEach(function(e){e instanceof sap.apf.core.utils.Filter&&e.getFilterTerms().length>1&&(t=!1)}),t)))},sap.apf.core.utils.Filter.prototype.mapToSelectOptions=function(t){var e,r=jQuery.Deferred(),s=this;return t(function(t){e=t;var i=new function(){var t={};function r(e){var r=function(e){var r;t.SelectOptions.forEach(function(t){t.PropertyName===e&&(r=t)}),r||(r={PropertyName:e,Ranges:[]},t.SelectOptions.push(r));return r.Ranges}(e.getProperty());void 0!==e.getHighValue()&&null!==e.getHighValue()?r.push({Sign:\"I\",Option:e.getOp(),Low:e.getValue(),High:e.getHighValue()}):r.push({Sign:\"I\",Option:e.getOp(),Low:e.getValue()})}t.SelectOptions=[],t.Parameters=[],this.getSelectionVariant=function(){return t.SelectOptions.length>0||t.Parameters.length>0?t:{}},this.processEmptyFilter=function(){},this.processTerm=function(s){-1===jQuery.inArray(s.getProperty(),e)?r(s):function(e){t.Parameters.push({PropertyName:e.getProperty(),PropertyValue:e.getValue()})}(s)},this.processAnd=function(t,e){this.process(t),e.forEach(function(t){this.process(t)}.bind(this))},this.processOr=function(t,e){this.process(t),e.forEach(function(t){this.process(t)}.bind(this))},this.process=function(t){t.traverse(this)}};i.process(s),r.resolve(i.getSelectionVariant())}),r.promise()},sap.apf.core.utils.Filter.createFromArray=function(t,e,r,s){var i,o,p,a,l,n,f=e.length;if(t.check(e instanceof Array&&e.length>0,\"sap.apf.core.utils.Filter.createFromArray incorrect argument aProperties\"),t.check(r instanceof Array,\"sap.apf.core.utils.Filter.createFromArray incorrect argument aData\"),s.length>0){for(i=0;i<s.length;++i)if(l=void 0,r[o=s[i]]){for(p=0;p<f;p++)n=new sap.apf.core.utils.Filter(t,e[p],sap.apf.core.constants.FilterOperators.EQ,r[o][e[p]]),void 0===l?l=new sap.apf.core.utils.Filter(t,n):l.addAnd(n);void 0===a?a=new sap.apf.core.utils.Filter(t,l):a.addOr(l)}return a}return new sap.apf.core.utils.Filter(t)},sap.apf.core.utils.Filter.createEmptyFilter=function(t,e){return t.check(jQuery.isArray(e)&&e.length>0,\"sap.apf.core.utils.Filter.createEmptyFilter - array with property names expected\"),new sap.apf.core.utils.Filter(t,e[0],sap.apf.core.constants.FilterOperators.EQ,\"\").addAnd(e[0],sap.apf.core.constants.FilterOperators.NE,\"\")},sap.apf.core.utils.Filter.transformUI5FilterToInternal=function(t,e){return function e(r,s){var i=new sap.apf.core.utils.Filter(t);var o;r.aFilters?r.aFilters.forEach(function(t){t.aFilters?(o=e(t,t.bAnd),s?i.addAnd(o):i.addOr(o)):t.sPath&&(s?i.addAnd(t.sPath,t.sOperator,t.oValue1,t.oValue2):i.addOr(t.sPath,t.sOperator,t.oValue1,t.oValue2))}):i=new sap.apf.core.utils.Filter(t,r.sPath,r.sOperator,r.oValue1,r.oValue2);return i}(e,e.bAnd)}}();",
	"web/ui5/test-resources/sap/apf/integration/withServer/SFB/APF/filterTerm.js": "/*!\n * SAP APF Analysis Path Framework\n * \n * (c) Copyright 2012-2015 SAP SE. All rights reserved\n */\njQuery.sap.declare(\"sap.apf.core.utils.filterTerm\"),jQuery.sap.require(\"sap.apf.core.constants\"),jQuery.sap.require(\"sap.apf.utils.utils\"),function(){\"use strict\";sap.apf.core.utils.FilterTerm=function(e,t,a,r,s){this.type=\"filterTerm\",this.propertyName=t,this.operator=a,this.value=r,this.highValue=s,this.messageHandler=e,2==this.operator.length&&(this.operator=this.operator.toUpperCase()),e.check(void 0!==this.operator,\"sap.apf.utils.FilterTerm.constructor operator undefined\"),e.check(jQuery.inArray(this.operator,sap.apf.core.constants.aSelectOpt)>-1,\"sap.apf.core.utils.FilterTerm operator \"+this.operator+\" not supported\"),e.check(void 0!==this.propertyName,\"sap.apf.utils.core.FilterTerm propertyName undefined\"),e.check(void 0!==this.value,\"sap.apf.utils.FilterTerm value undefined\")},sap.apf.core.utils.FilterTerm.prototype.isConsistentWithFilter=function(e,t){return e!==this.propertyName||(this.operator===sap.apf.core.constants.FilterOperators.EQ?this.value instanceof Date&&t instanceof Date?this.value.valueOf()===t.valueOf():this.value===t:this.operator===sap.apf.core.constants.FilterOperators.LT?this.value instanceof Date&&t instanceof Date?this.value.valueOf()>t.valueOf():this.value>t:this.operator===sap.apf.core.constants.FilterOperators.LE?this.value instanceof Date&&t instanceof Date?this.value.valueOf()>=t.valueOf():this.value>=t:this.operator===sap.apf.core.constants.FilterOperators.GT?this.value instanceof Date&&t instanceof Date?this.value.valueOf()<t.valueOf():this.value<t:this.operator===sap.apf.core.constants.FilterOperators.BT?this.value instanceof Date&&t instanceof Date?this.value.valueOf()<=t.valueOf()&&t.valueOf()<=this.highValue.valueOf():this.value<=t&&t<=this.highValue:this.operator===sap.apf.core.constants.FilterOperators.GE?this.value instanceof Date&&t instanceof Date?this.value.valueOf()<=t.valueOf():this.value<=t:this.operator===sap.apf.core.constants.FilterOperators.NE?this.value instanceof Date&&t instanceof Date?!(this.value.valueOf()===t.valueOf()):!(this.value===t):this.operator===sap.apf.core.constants.FilterOperators.StartsWith?!(this.value.length>t.length)&&t.slice(0,this.value.length)===this.value:this.operator===sap.apf.core.constants.FilterOperators.EndsWith?!(this.value.length>t.length)&&t.slice(-this.value.length)===this.value:this.operator===sap.apf.core.constants.FilterOperators.Contains?t.indexOf(this.value)>-1:void 0)},sap.apf.core.utils.FilterTerm.prototype.toUrlParam=function(e){var t,a,r=\"\";return e&&e.formatValue?(t=e.formatValue(this.propertyName,this.value),this.highValue&&(a=e.formatValue(this.propertyName,this.highValue))):(t=\"number\"==typeof this.value?this.value:\"'\"+sap.apf.utils.escapeOdata(this.value)+\"'\",this.highValue&&(a=\"number\"==typeof this.value?this.highValue:\"'\"+sap.apf.utils.escapeOdata(this.highValue)+\"'\")),this.operator===sap.apf.core.constants.FilterOperators.StartsWith?(r=\"startswith(\"+sap.apf.utils.escapeOdata(this.propertyName)+\",\"+t+\")\",r=jQuery.sap.encodeURL(r)):this.operator===sap.apf.core.constants.FilterOperators.EndsWith?(r=\"endswith(\"+sap.apf.utils.escapeOdata(this.propertyName)+\",\"+t+\")\",r=jQuery.sap.encodeURL(r)):this.operator===sap.apf.core.constants.FilterOperators.Contains?(r=\"substringof(\"+t+\",\"+sap.apf.utils.escapeOdata(this.propertyName)+\")\",r=jQuery.sap.encodeURL(r)):r=this.operator===sap.apf.core.constants.FilterOperators.BT?\"((\"+jQuery.sap.encodeURL(sap.apf.utils.escapeOdata(this.propertyName)+\" ge \"+t)+\")\"+jQuery.sap.encodeURL(\" and \")+\"(\"+jQuery.sap.encodeURL(sap.apf.utils.escapeOdata(this.propertyName)+\" le \"+a)+\"))\":\"(\"+jQuery.sap.encodeURL(sap.apf.utils.escapeOdata(this.propertyName)+\" \"+this.operator.toLowerCase()+\" \"+t)+\")\",r},sap.apf.core.utils.FilterTerm.prototype.getProperty=function(){return this.propertyName},sap.apf.core.utils.FilterTerm.prototype.getOp=function(){return this.operator},sap.apf.core.utils.FilterTerm.prototype.getValue=function(){return this.value},sap.apf.core.utils.FilterTerm.prototype.getHighValue=function(){return this.highValue},sap.apf.core.utils.FilterTerm.prototype.getHash=function(){var e=this.propertyName+this.operator+this.value;return sap.apf.utils.hashCode(e)},sap.apf.core.utils.FilterTerm.prototype.copy=function(){return new sap.apf.core.utils.FilterTerm(this.messageHandler,this.propertyName,this.operator,this.value,this.highValue)},sap.apf.core.utils.FilterTerm.prototype.removeTermsByProperty=function(e){return this.internalRemoveTermsByProperty(e)},sap.apf.core.utils.FilterTerm.prototype.internalRemoveTermsByProperty=function(e){var t=0,a=0;if(e instanceof Array){for(a=e.length,t=0;t<a;t++)if(this.propertyName===e[t])return;return this.copy()}if(this.propertyName!==e)return this.copy()},sap.apf.core.utils.FilterTerm.prototype.removeTerms=function(e,t,a){var r=0,s=0;if(e instanceof Array){for(s=e.length,r=0;r<s;r++)if(this.propertyName===e[r]&&this.operator===t&&this.value===a)return;return this.copy()}if(this.propertyName!==e||this.operator!==t||this.value!==a)return this.copy()},sap.apf.core.utils.FilterTerm.prototype.mapToSapUI5FilterExpression=function(){return this.operator===sap.apf.core.constants.FilterOperators.BT?{path:this.propertyName,operator:this.operator,value1:this.value,value2:this.highValue}:{path:this.propertyName,operator:this.operator,value1:this.value}},sap.apf.core.utils.FilterTerm.prototype.traverse=function(e){return e.processTerm(this)}}();",
	"web/ui5/test-resources/sap/apf/integration/withServer/SFB/Component.js": "jQuery.sap.declare(\"sap.ui.comp.sample.smartfilterbar.Component\"),sap.ui.core.UIComponent.extend(\"sap.ui.comp.sample.smartfilterbar.Component\",{metadata:{rootView:{viewName:\"sap.ui.comp.sample.smartfilterbar.SmartFilterBar\",type:\"JS\"},dependencies:{libs:[\"sap.m\",\"sap.ui.comp\",\"sap.ui.fl\"]},config:{sample:{stretch:!0,files:[\"SmartFilterBar.view.js\",\"SmartFilterBar.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/apf/integration/withServer/SFB/SmartFilterBar.controller.js": "!function(){var t={},o={},e={check:function(){}};sap.ui.controller(\"sap.ui.comp.sample.smartfilterbar.SmartFilterBar\",{onInit:function(){this.getView().setModel(this.getModel())},oModel:void 0,getModel:function(){return this.oModel||(this.oModel=new sap.ui.model.odata.ODataModel(\"/sap/opu/odata/sap/C_PROCMONCOUNTKPIO2C_CDS\",!0),this.oModel.setCountSupported(!1)),this.oModel},onChange:function(t){console.log(\"Search\"),console.log(this.getFilterData())},onExit:function(){this._oMockServer.stop()},init:function(){o=this},save:function(e){t=JSON.stringify(o.fetchVariant(!0)),console.log(t)},load:function(){o.setFilterData(),o.applyVariant(JSON.parse(t)),console.log(t)},internalFilter:{},readFilter:function(){this.internalFilter=sap.apf.core.utils.Filter.transformUI5FilterToInternal(e,o.getFilters()[0])},getSaveData:function(){return t}})}();",
	"web/ui5/test-resources/sap/apf/integration/withServer/SFB/SmartFilterBar.view.js": "sap.ui.jsview(\"sap.ui.comp.sample.smartfilterbar.SmartFilterBar\",{getControllerName:function(){return\"sap.ui.comp.sample.smartfilterbar.SmartFilterBar\"},createContent:function(e){var a=new sap.m.Page({content:[]}),t=new sap.m.Button({text:\"Save\",press:function(){e.save();var a={},t=e.getSaveData();a.filterbar=JSON.parse(t).filterbar,a.filterBarVariant=JSON.parse(JSON.parse(t).filterBarVariant),n.setValue(JSON.stringify(a,void 0,2))}}),r=new sap.m.Button({text:\"Load\",press:function(){e.load()}});a.addContent(t),a.addContent(r);var n=new sap.m.TextArea(\"TextAreaForFilter\",{rows:10,cols:100});n.addStyleClass(\"TextAreaForFilter\"),a.addContent(n);var s=new sap.m.Button({text:\"Read\",press:function(){e.readFilter(),i.setValue(e.internalFilter.toUrlParam())}});a.addContent(s);var i=new sap.m.TextArea(\"TextAreaForPath\",{rows:10,cols:100});n.addStyleClass(\"TextAreaForFilter\"),a.addContent(i);jQuery.sap.require(\"sap.apf.core.instance\");var l=this;this.messageHandler=new sap.apf.core.MessageHandler;var o=new sap.apf.core.utils.Filter(this.messageHandler,\"SalesOrganization\",\"EQ\",\"0001\");o.addOr(\"A\",\"EQ\",\"2\");var p=new sap.apf.core.utils.Filter(this.messageHandler,\"B\",\"BT\",\"1\",\"5\");this.externalContext=new sap.apf.core.utils.Filter(this.messageHandler).addAnd(o).addAnd(p),this.coreInstance=new sap.apf.core.Instance({instace:{messageHandler:this.messageHandler},functions:{getCombinedContext:function(){return jQuery.Deferred().resolve(l.externalContext)}}}),this.coreInstance.getSmartFilterbarDefaultFilterValues().done(function(t){var r=new sap.ui.comp.smartfilterbar.SmartFilterBar(\"smartFilterBar\",{entityType:\"C_ProcMonCountKPIO2CResult\",initialise:e.init,controlConfiguration:t,persistencyKey:\"SmartFilterPersistenceAPF\"});a.addContent(r)});var d=new sap.ui.comp.smarttable.SmartTable(\"smartTable\",{entitySet:\"zjh_inventory\",smartFilterId:\"smartFilterBar\",tableType:sap.ui.comp.smarttable.TableType.ResponsiveTable});a.addContent(d);var m=new sap.m.App(\"myApp\",{initialPage:\"oPage\"});return m.addPage(a),m}});"
}, "web/ui5/test-resources/sap/apf/integration/withServer/SFB/Component-preload");