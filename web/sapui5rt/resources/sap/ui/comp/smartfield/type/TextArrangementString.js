/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/CompositeType","sap/ui/comp/smartfield/type/String","sap/ui/comp/util/FormatUtil","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/FormatException"],function(q,C,S,F,P,V,a){"use strict";var T=C.extend("sap.ui.comp.smartfield.type.TextArrangementString",{constructor:function(o,c,s){C.call(this,o,c);S.call(this,o,c);this.bParseWithValues=true;this.oSettings=q.extend({data:[],valueListAnnotation:null,control:null},s);this.oFormatOptions=q.extend({textArrangement:"idOnly"},o);this.fnPreParser=this.getValidator({textArrangement:this.oFormatOptions.textArrangement,prefix:"preParse"});this.fnParser=this.getValidator({textArrangement:this.oFormatOptions.textArrangement,prefix:"parse"});this.fnValidator=this.getValidator({textArrangement:this.oFormatOptions.textArrangement,prefix:"validate"});this.bNewDataLoaded=false;this.bRawValue=false;this.bValueValidated=false;this.vRawValue="";this.vRawID="";this.vRawDescription="";this.sDescription=undefined;}});T.prototype.parseValue=function(v,s,c){if(v===""){return[S.prototype.parseValue.call(this,v,s),null];}var t=this.oFormatOptions.textArrangement;if(t==="idOnly"){return this.parseIDOnly(v,s);}this.vRawValue=v;if(!this.bNewDataLoaded){if(typeof this.fnPreParser==="function"){var r=this.fnPreParser.call(this,v,s,this.oFormatOptions);this.vRawID=r[0];this.vRawDescription=r[1];}else{this.vRawID=v;}this.bRawValue=true;return[undefined,undefined];}this.bNewDataLoaded=false;this.bRawValue=false;return this.fnParser(v,s,this.oSettings);};T.prototype.parseIDOnly=function(v,s){return[S.prototype.parseValue.call(this,v,s),undefined];};T.prototype.preParseIDAndDescription=function(v,s,o){var r=/.*\s\(.*\)/i;if(r.test(v)){var b=/\s\(/gi;if(v.match(b).length>1){throw new P(sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTFIELD_NOT_FOUND"));}var c=T.splitIDAndDescription(v,{separator:b,textArrangement:o.textArrangement});c[0]=S.prototype.parseValue.call(this,c[0],s);return c;}v=S.prototype.parseValue.call(this,v,s);return[v];};T.prototype.parseIDAndDescription=function(v,s,o){var r=/.*\s\(.*\)/i;if(r.test(v)){v=this.preParseIDAndDescription(v,s,this.oFormatOptions)[0];}else if(o.data.length){var d=f(v,{key:o.valueListAnnotation.keyField,value:o.valueListAnnotation.descriptionField,data:o.data});if(d.length===0){throw new V(sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTFIELD_NOT_FOUND"));}if(d.length>1){throw new V(sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTFIELD_DUPLICATE_VALUES"));}this.sDescription=d[0];return[v,undefined];}else if(v!==""){throw new V(sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTFIELD_NOT_FOUND"));}return[v,undefined];};T.prototype.parseDescriptionOnly=function(v,s,o){var i,k=o.valueListAnnotation.keyField,d=o.valueListAnnotation.descriptionField,r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");var I=f(v,{key:d,value:k,data:o.data});var b=I.length;if(b===1){i=S.prototype.parseValue.call(this,I[0],s);this.sDescription=v;return[i,undefined];}if(b===0){I=f(v,{key:k,value:d,data:o.data});b=I.length;}if(b===0){throw new V(r.getText("SMARTFIELD_NOT_FOUND"));}if(b>1){throw new V(r.getText("SMARTFIELD_DUPLICATE_VALUES"));}i=S.prototype.parseValue.call(this,v,s);this.sDescription=I[0];return[i,undefined];};T.prototype.validateValue=function(v){if(this.bRawValue){this.bValueValidated=false;this.oSettings.control.onBeforeValidateValue(this.vRawID);return;}S.prototype.validateValue.call(this,v[0]);if(v[0]!==null){this.fnValidator(v,this.oSettings);}this.bValueValidated=true;this.oSettings.control.onAfterValidateValue(v[0]);};T.prototype.validateIDOnly=function(v,s){};T.prototype.validateIDAndDescription=function(v,s){};T.prototype.validateDescriptionOnly=function(v,s){};T.prototype.formatValue=function(v,t){if(this.bRawValue){return this.vRawValue;}var k=S.prototype.formatValue.call(this,v[0],t);if(k===""){return k;}var d=v[1];if(this.bValueValidated){d=(this.sDescription===undefined)?v[1]:this.sDescription;}else{this.oSettings.control.onBeforeValidateValue(k);return"";}return F.getFormattedExpressionFromDisplayBehaviour(this.oFormatOptions.textArrangement,k,d);};T.prototype.destroy=function(){this.oFormatOptions=null;this.oSettings=null;this.fnPreParser=null;this.fnParser=null;this.fnValidator=null;this.vRawValue="";this.vRawID="";this.vRawDescription="";this.sDescription="";};T.prototype.getName=function(){return"sap.ui.comp.smartfield.type.TextArrangementString";};T.prototype.getValidator=function(s){switch(s.textArrangement){case"idAndDescription":case"descriptionAndId":return this[s.prefix+"IDAndDescription"];case"descriptionOnly":return this[s.prefix+"DescriptionOnly"];default:return this[s.prefix+"IDOnly"];}};function f(k,s){var v=[];s.data.forEach(function(d,i,D){if(d[s.key]===k){v.push(d[s.value]);}});return v;}T.splitIDAndDescription=function(v,s){var b=s.separator.exec(v),i=b["index"];switch(s.textArrangement){case"idAndDescription":return[v.slice(0,i),v.slice(i+2,-1)];case"descriptionAndId":return[v.slice(i+2,-1),v.slice(0,i)];default:return["",""];}};return T;});
