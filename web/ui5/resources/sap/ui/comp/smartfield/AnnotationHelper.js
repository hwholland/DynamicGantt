/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define([],function(){"use strict";var A=function(){};A.prototype.getText=function(p){return p["sap:text"]||this._getObject("com.sap.vocabularies.Common.v1.Text/Path",p);};A.prototype.getTextArrangement=function(p,e){var E=null,P=null;P=this._getObject("com.sap.vocabularies.Common.v1.Text",p);if(P){E=P["com.sap.vocabularies.UI.v1.TextArrangement"];}if(!E){E=this._getObject("com.sap.vocabularies.UI.v1.TextArrangement",e);}if(E&&E.EnumMember){if(E.EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextFirst"){return"descriptionAndId";}else if(E.EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextLast"){return"idAndDescription";}else if(E.EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextSeparate"){return"idOnly";}else if(E.EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly"){return"descriptionOnly";}}return null;};A.prototype.getUnit=function(p){return p["sap:unit"]||this._getObject("Org.OData.Measures.V1.ISOCurrency/Path",p)||this._getObject("Org.OData.Measures.V1.Unit/Path",p);};A.prototype.getLabel=function(p){var l=this._getObject("com.sap.vocabularies.UI.v1.DataFieldWithUrl/Label/String",p);return l||p["sap:label"]||this._getObject("com.sap.vocabularies.Common.v1.Label/String",p);};A.prototype.isCurrency=function(p){return(p["sap:semantics"]==="currency-code")||!!this._getObject("Org.OData.Measures.V1.ISOCurrency/Path",p);};A.prototype.getQuickInfo=function(p){return p["sap:quickinfo"]||this._getObject("com.sap.vocabularies.Common.v1.QuickInfo/String",p);};A.prototype.isMasked=function(p){return(!!this._getObject("com.sap.vocabularies.Common.v1.Masked",p));};A.prototype.isMultiLineText=function(p){return(!!this._getObject("com.sap.vocabularies.UI.v1.MultiLineText",p));};A.prototype.isUpperCase=function(p){return(p["sap:display-format"]==="UpperCase")||(this._getObject("com.sap.vocabularies.Common.v1.IsUpperCase/Bool",p)==="true");};A.prototype.canCreateEntitySet=function(e){var n=(e["sap:creatable"]==="false")||(this._getObject("Org.OData.Capabilities.V1.InsertRestrictions/Insertable/Bool",e)==="false");return!n;};A.prototype.canCreateProperty=function(p){if(this._getObject("Org.OData.Core.V1.Computed/Bool",p)==="true"){return false;}if(p["sap:creatable"]==="false"){return false;}return true;};A.prototype.canUpdateEntitySet=function(e){var n=(e["sap:updatable"]==="false")||(this._getObject("Org.OData.Capabilities.V1.UpdateRestrictions/Updatable/Bool",e)==="false");return!n;};A.prototype.getUpdateEntitySetPath=function(e){return e["sap:updatable"]||this._getObject("Org.OData.Capabilities.V1.UpdateRestrictions/Updatable/Path",e);};A.prototype.canUpdateProperty=function(p){var n=(p["sap:updatable"]==="false")||(this._getObject("Org.OData.Core.V1.Immutable/Bool",p)==="true")||(this._getObject("com.sap.vocabularies.Common.v1.FieldControl/EnumMember",p)==="com.sap.vocabularies.Common.v1.FieldControlType/ReadOnly");return!n;};A.prototype.getFieldControlPath=function(p){return p["sap:field-control"]||this._getObject("com.sap.vocabularies.Common.v1.FieldControl/Path",p);};A.prototype.getVisible=function(p){var v;if(p["sap:visible"]){return p["sap:visible"];}v=this._getObject("com.sap.vocabularies.Common.v1.FieldControl/EnumMember",p);if(v==="com.sap.vocabularies.Common.v1.FieldControlType/Hidden"){return"false";}return"true";};A.prototype._getObject=function(p,o){var n=o,P=p.split("/"),i=0;while(n&&P[i]){n=n[P[i]];i++;}return n;};A.prototype.destroy=function(){};return A;},true);
