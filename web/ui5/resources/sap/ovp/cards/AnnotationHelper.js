// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ovp.cards.AnnotationHelper");sap.ovp.cards.AnnotationHelper={};sap.ovp.cards.AnnotationHelper.formatFunctions={count:0};sap.ovp.cards.AnnotationHelper.NumberFormatFunctions={};sap.ovp.cards.AnnotationHelper.criticalityConstants={StateValues:{None:"None",Negative:"Error",Critical:"Warning",Positive:"Success"},ColorValues:{None:"Neutral",Negative:"Error",Critical:"Critical",Positive:"Good"}};function g(i,k){if(i.getSetting){var j=i.getSetting("_ovpCache");if(j){return j[k];}}return undefined;}function s(i,k,j){if(i.getSetting){var W=i.getSetting("_ovpCache");if(W){W[k]=j;}}}function a(i,j){if(!sap.ovp.cards.AnnotationHelper.formatFunctions[j]){sap.ovp.cards.AnnotationHelper.formatFunctions[j]=0;}sap.ovp.cards.AnnotationHelper.formatFunctions[j]++;var k=j+sap.ovp.cards.AnnotationHelper.formatFunctions[j];sap.ovp.cards.AnnotationHelper.formatFunctions[k]=i;return"sap.ovp.cards.AnnotationHelper.formatFunctions."+k;}function c(i,j){var k;if(j){k=j.None;if(i&&i.EnumMember){var W=i.EnumMember;if(e(W,'Negative')){k=j.Negative;}else if(e(W,'Critical')){k=j.Critical;}else if(e(W,'Positive')){k=j.Positive;}}}return k;}function e(i,j){return i&&i.indexOf(j,i.length-j.length)!==-1;}function b(i,j,k,W,X,Y,Z){var $={};$.EnumMember="None";if(i!==undefined){i=Number(i);if(e(j,"Minimize")||e(j,"Minimizing")){if((Y!==undefined&&Y!==null)&&(W!=undefined&&W!=null)){if(i<=Y){$.EnumMember="Positive";}else if(i>W){$.EnumMember="Negative";}else{$.EnumMember="Critical";}}}else if(e(j,"Maximize")||e(j,"Maximizing")){if((X!==undefined&&X!==null)&&(k!==undefined&&k!==null)){if(i>=X){$.EnumMember="Positive";}else if(i<k){$.EnumMember="Negative";}else{$.EnumMember="Critical";}}}else if(e(j,"Target")){if((Y!==undefined&&Y!==null)&&(W!=undefined&&W!=null)&&(X!==undefined&&X!==null)&&(k!==undefined&&k!==null)){if(i>=X&&i<=Y){$.EnumMember="Positive";}else if(i<k||i>W){$.EnumMember="Negative";}else{$.EnumMember="Critical";}}}}return c($,Z);}function d(i,j,k,W){if(!i||!j){return;}i=Number(i);if(!k&&(i-j>=0)){return"Up";}if(!W&&(i-j<=0)){return"Down";}if(j&&k&&(i-j>=k)){return"Up";}if(j&&W&&(i-j<=W)){return"Down";}}function f(i,j){var k=i.getPath()+"-DataFields-Sorted";var W=g(i,k);if(!W){var X=h(i,j);var Y=X.map(function(Z){return Z.Value.Path;});Y=Y.filter(function(Z){return!!Z;});W=j.filter(function(Z){if(Z.RecordType==="com.sap.vocabularies.UI.v1.DataField"&&Y.indexOf(Z.Value.Path)===-1){return true;}return false;});W=o(W);s(i,k,W);}return W;}function h(j,k){var W=j.getPath()+"-DataPoints-Sorted";var X=g(j,W);if(!X){X=k.filter(l);X=o(X);var Y;for(var i=0;i<X.length;i++){Y=j.getPath().substr(0,j.getPath().lastIndexOf("/")+1);X[i]=j.getModel().getProperty(m(Y,X[i]));Y="";}s(j,W,X);}return X;}function l(i){if(i.RecordType==="com.sap.vocabularies.UI.v1.DataFieldForAnnotation"&&i.Target.AnnotationPath.match(/@com.sap.vocabularies.UI.v1.DataPoint.*/)){return true;}return false;}function m(i,j){if(i&&!e(i,'/')){i+='/';}return i+j.Target.AnnotationPath.slice(1);}function n(i){var j,k;if(i["com.sap.vocabularies.UI.v1.Importance"]){j=i["com.sap.vocabularies.UI.v1.Importance"].EnumMember;switch(j){case"com.sap.vocabularies.UI.v1.ImportanceType/High":k=1;break;case"com.sap.vocabularies.UI.v1.ImportanceType/Medium":k=2;break;case"com.sap.vocabularies.UI.v1.ImportanceType/Low":k=3;break;}}else{k=4;}return k;}function o(i){if(i.length<2){return i;}var j=parseInt(i.length/2,10);var k=i.slice(0,j);var W=i.slice(j,i.length);return p(o(k),o(W));}function p(i,j){var k=[];while(i.length&&j.length){var W=n(i[0]),X=n(j[0]);if(W<=X){k.push(i.shift());}else{k.push(j.shift());}}while(i.length){k.push(i.shift());}while(j.length){k.push(j.shift());}return k;}function q(i,j,k){var W=f(i,j)[k];if(W){return v(i,W);}return"";}function r(i,j,k){var W=f(i,j)[k];if(W){return W.Label.String;}return"";}function t(i,j,k){var W=h(i,j)[k];if(W&&W.Title){return W.Title.String;}return"";}function u(i,j,k){var W=h(i,j)[k];if(!W){return"";}var X=i.getSetting('ovpCardProperties');var Y=X.getProperty("/entityType");var Z=X.getProperty("/metaModel");return _(i,W,Y,Z);}function _(i,j,k,W){if(!j||!j.Value){return"";}var X=i.getSetting('ovpCardProperties');var Y=false;if(X){var Z=X.getProperty("/ignoreSapText");Y=Z==undefined?Y:Z;}var $=W.getODataProperty(k,j.Value.Path);var a1=false;if(Y==true){if($&&$["sap:aggregation-role"]=="measure"){a1=true;}}if(!a1){if($&&$["sap:text"]){$=W.getODataProperty(k,$["sap:text"]);j={Value:{Path:$.name}};}}return v(i,j);}function v(i,j,k,W){if(j.Value.Apply){return sap.ui.model.odata.AnnotationHelper.format(i,j.Value);}var X=i.getSetting('ovpCardProperties');var Y=X.getProperty("/entityType");var Z=X.getProperty("/metaModel");return w(i,j,Y,Z,k,W);}function w(i,j,k,W,X,Y,Z){if(j.Value.Apply){return sap.ui.model.odata.AnnotationHelper.format(i,j.Value);}var $=W.getODataProperty(k,j.Value.Path);var a1="";var b1;if(!Y){if(j.Value.Path.split("/").length>1){$=z(W,k,j.Value.Path);}if(!$){return"";}if(j.ValueFormat&&j.ValueFormat.NumberOfFractionalDigits){b1=x(j.ValueFormat.NumberOfFractionalDigits.Int);a1="{path:'"+j.Value.Path+"', formatter: '"+b1+"'}";}else if($["scale"]){b1=x($["scale"]);a1="{path:'"+$.name+"', formatter: '"+b1+"'}";}else{if(Z){a1=sap.ui.model.odata.AnnotationHelper.simplePath(i,j.Value);}else{a1=sap.ui.model.odata.AnnotationHelper.format(i,j.Value);}}}if(!X){if($["Org.OData.Measures.V1.ISOCurrency"]){var c1=$["Org.OData.Measures.V1.ISOCurrency"];if(c1.Path){a1=a1+" {path: '"+c1.Path+"'}";}else if(c1.String){a1=a1+" "+c1.String;}}if($["Org.OData.Measures.V1.Unit"]){var d1=$["Org.OData.Measures.V1.Unit"];if(d1.Path){a1=a1+" {path: '"+d1.Path+"'}";}else if(d1.String){a1=a1+" "+d1.String;}}}if(a1[0]===" "){a1=a1.substring(1);}return a1;}function x(i){var j="formatNumberCalculation"+i;if(!sap.ovp.cards.AnnotationHelper.NumberFormatFunctions[j]){sap.ovp.cards.AnnotationHelper.NumberFormatFunctions[j]=y(Number(i));}return"sap.ovp.cards.AnnotationHelper.NumberFormatFunctions."+j;}function y(i){return function(j){jQuery.sap.require("sap.ui.core.format.NumberFormat");var k=sap.ui.core.format.NumberFormat.getFloatInstance({style:'short',showMeasure:false,minFractionDigits:i,maxFractionDigits:i});return k.format(Number(j));};}function z(j,k,W){var X=W.split("/");if(X.length>1){for(var i=0;i<(X.length-1);i++){var Y=j.getODataAssociationEnd(k,X[i]);if(Y){k=j.getODataEntityType(Y.type);}}return j.getODataProperty(k,X[X.length-1]);}}function A(i,j,k){var W=h(i,j);var X="None";if(W.length>k){var Y=W[k];X=B(i,Y,sap.ovp.cards.AnnotationHelper.criticalityConstants.StateValues);}return X;}function B(i,j,k){var W=k.None;if(j.Criticality){W=c(j.Criticality,k);}else if(j.CriticalityCalculation&&j.Value&&j.Value&&j.Value.Path){W=C(i,j,k);}return W;}function C(i,j,k){var W=N(j.Value);var X=j.CriticalityCalculation.ImprovementDirection.EnumMember;var Y=N(j.CriticalityCalculation.DeviationRangeLowValue);var Z=N(j.CriticalityCalculation.DeviationRangeHighValue);var $=N(j.CriticalityCalculation.ToleranceRangeLowValue);var a1=N(j.CriticalityCalculation.ToleranceRangeHighValue);var b1=D(Y);var c1=D(Z);var d1=D($);var e1=D(a1);var f1="parts: ["+W;f1+=b1?","+Y:"";f1+=c1?","+Z:"";f1+=d1?","+$:"";f1+=e1?","+a1:"";f1+="]";var g1=function(){var i1=1;return b(arguments[0],X,b1?arguments[i1++]:Y,c1?arguments[i1++]:Z,d1?arguments[i1++]:$,e1?arguments[i1++]:a1,k);};var h1=a(g1,"formatCriticalityCalculation");return"{"+f1+", formatter: '"+h1+"'}";}function D(i){return(typeof i==="string")&&i.charAt(0)==="{";}function E(j,k,W){var X="";var Y=W.split("/");if(Y.length>1){for(var i=0;i<(Y.length-1);i++){var Z=j.getODataAssociationEnd(k,Y[i]);if(Z){k=j.getODataEntityType(Z.type);if(X){X=X+"/";}X=X+Y[i];}else{return X;}}}return X;}sap.ovp.cards.AnnotationHelper.formatField=function(i,j){return v(i,j);};sap.ovp.cards.AnnotationHelper.formatItems=function(i,j){var k=i.getSetting('ovpCardProperties');var W=k.getProperty("/addODataSelect");var X=k.getProperty("/metaModel");var Y=X.getODataEntityType(j.entityType);var Z=Y[k.getProperty('/selectionAnnotationPath')];var $=Y[k.getProperty('/presentationAnnotationPath')];var a1="/"+j.name;var b1=Array.prototype.slice.call(arguments,2);if(Z){if(Z&&Z.Parameters&&Z.Parameters.length>0){a1=sap.ovp.cards.AnnotationHelper.resolveParameterizedEntitySet(i.getSetting('dataModel'),j,Z);}}var c1="{path: '"+a1+"', length: "+P(k);var d1=[];if(W){d1=G(i,X,Y,b1);}var e1=F(X,Y,b1);if(d1.length>0||e1.length>0){c1=c1+", parameters: {";if(d1.length>0){c1=c1+"select: '"+d1.join(',')+"'";}if(e1.length>0){if(d1.length>0){c1=c1+", ";}c1=c1+"expand: '"+e1.join(',')+"'";}c1=c1+"}";}var f1=I(k,$);if(f1.length>0){c1=c1+", sorter:"+JSON.stringify(f1);}var g1=J(k,Z);if(g1.length>0){c1=c1+", filters:"+JSON.stringify(g1);}c1=c1+"}";return c1;};function F(k,W,X){var Y=[];var Z,$,a1,b1;for(var i=0;i<X.length;i++){if(!X[i]){continue;}Z=W.$path+"/"+X[i];$=k.createBindingContext(Z);a1=$.getObject();a1=a1?a1:[];for(var j=0;j<a1.length;j++){if(a1[j].Value&&a1[j].Value.Path){b1=E(k,W,a1[j].Value.Path);if(b1&&Y.indexOf(b1)===-1){Y.push(b1);}}}}return Y;}function G(W,X,Y,Z){var $=[];var a1,b1,c1;for(var i=0;i<Z.length;i++){if(!Z[i]){continue;}a1=Y.$path+"/"+Z[i];b1=X.createBindingContext(a1);var d1={};if(W&&W.bDummyContext){jQuery.extend(d1,W,b1,true);}else{d1=W;}c1=b1.getObject();if(!c1){c1=[];}else if(jQuery.isPlainObject(c1)){if(c1.Data){c1=c1.Data;}else{c1=[];}}var e1;var f1;var g1;var h1;for(var j=0;j<c1.length;j++){f1=[];e1=c1[j];g1="";h1=e1.RecordType;if(h1==="com.sap.vocabularies.UI.v1.DataField"){g1=w(d1,e1,Y,X,undefined,undefined,true);}else if(h1==="com.sap.vocabularies.UI.v1.DataFieldForAnnotation"){var i1=m(Y.$path,e1);g1=_(d1,X.getProperty(i1),Y,X);}else if(h1==="com.sap.vocabularies.UI.v1.DataFieldWithUrl"&&e1.Url){var j1;if(!e1.Url.UrlRef){j1=sap.ui.model.odata.AnnotationHelper.format(d1,e1.Url);}if(j1&&j1.substring(0,2)==="{="){g1=j1;}}if(g1){f1=H(g1);}if(f1&&f1.length>0){var k1;for(var k=0;k<f1.length;k++){k1=f1[k];if(!$[k1]){$[k1]=true;var l1=S(k1,Y);if(l1&&l1!==k1){$[l1]=true;}var m1=U(X,Y,k1);if(m1&&m1!==k1){$[m1]=true;}}}}}}return Object.keys($);}function H(i){var j=/\${([a-zA-Z0-9\_|\/]*)/g;var k=/[^[{]*[a-zA-Z0-9\_]/g;var W=/path *\: *\'([a-zA-Z0-9\_]+)*\'/g;var X,Y,Z=[];if(i.substring(0,2)==="{="){X=j;Y=1;}else if(i.indexOf("path")!==-1){var $=k.exec(i);while($){if($[0].indexOf("path")===-1){Z.push($[0]);}$=k.exec(i);}X=W;Y=1;}else{X=k;Y=0;}var a1=X.exec(i);while(a1){if(a1[Y]){Z.push(a1[Y]);}a1=X.exec(i);}return Z;}function I(j,k){var W=[];var X,Y;var Z=j.getProperty("/sortBy");if(Z){var $=j.getProperty('/sortOrder');if($&&$.toLowerCase()!=='descending'){Y=false;}else{Y=true;}X={path:Z,descending:Y};W.push(X);}var a1=k&&k.SortOrder||undefined;var b1,Z;if(a1){for(var i=0;i<a1.length;i++){b1=a1[i];Z=b1.Property.PropertyPath;Y=K(b1.Descending,true);X={path:Z,descending:Y};W.push(X);}}return W;}sap.ovp.cards.AnnotationHelper.getCardFilters=function(i){var j=i.getProperty('/entityType');var k=j[i.getProperty('/selectionAnnotationPath')];return J(i,k);};function J(k,W){var X=[];var Y=k.getProperty("/filters");if(Y){X=X.concat(Y);}var Z=W&&W.SelectOptions;var $,a1,b1;if(Z){for(var i=0;i<Z.length;i++){$=Z[i];a1=$.PropertyName.PropertyPath;for(var j=0;j<$.Ranges.length;j++){b1=$.Ranges[j];if(b1.Sign.EnumMember==="com.sap.vocabularies.UI.v1.SelectionRangeSignType/I"){var c1={path:a1,operator:b1.Option.EnumMember.split("/")[1],value1:M(b1.Low),value2:M(b1.High)};X.push(c1);}}}}return X;}function K(i,j){if(i&&i.Boolean){if(i.Boolean.toLowerCase()==="true"){return true;}else if(i.Boolean.toLowerCase()==="false"){return false;}}return j;}function L(i){var j;if(i){if(i.String){j=Number(i.String);}else if(i.Int){j=Number(i.Int);}else if(i.Decimal){j=Number(i.Decimal);}else if(i.Double){j=Number(i.Double);}else if(i.Single){j=Number(i.Single);}}return j;}function M(i){var j;if(i){if(i.String){j=i.String;}else if(i.Boolean){j=K(i);}else{j=L(i);}}return j;}function N(i){if(i){if(i.Path){return"{path:'"+i.Path+"'}";}else{return M(i);}}else{return"";}}var O={"List_condensed":{phone:5,tablet:5,desktop:5},"List_extended":{phone:3,tablet:3,desktop:3},"List_condensed_bar":{phone:5,tablet:5,desktop:5},"List_extended_bar":{phone:3,tablet:3,desktop:3},"Table":{phone:5,tablet:5,desktop:5},"Stack_simple":{phone:20,tablet:20,desktop:20},"Stack_complex":{phone:5,tablet:5,desktop:5}};function P(i){var j=i.getProperty('/contentFragment');var k=i.getProperty('/listType');var W=i.getProperty('/listFlavor');var X;var Y="desktop";if(sap.ui.Device.system.phone){Y="phone";}else if(sap.ui.Device.system.tablet){Y="tablet";}if(j=="sap.ovp.cards.list.List"){if(k=="extended"){if(W=="bar"){X=O["List_extended_bar"];}else{X=O["List_extended"];}}else if(W=="bar"){X=O["List_condensed_bar"];}else{X=O["List_condensed"];}}else if(j=="sap.ovp.cards.table.Table"){X=O["Table"];}else if(j=="sap.ovp.cards.stack.Stack"){if(i.getProperty('/objectStreamCardsNavigationProperty')){X=O["Stack_complex"];}else{X=O["Stack_simple"];}}if(X){return X[Y];}return 5;}sap.ovp.cards.AnnotationHelper.formatUrl=function(i,j){if(j.charAt(0)==='/'||j.indexOf("http")===0){return j;}var k=i.getModel().getProperty("/baseUrl");if(k){return k+"/"+j;}return j;};sap.ovp.cards.AnnotationHelper.getDataPointsCount=function(i,j){var k=h(i,j);return k.length;};sap.ovp.cards.AnnotationHelper.getFirstDataPointValue=function(i,j){return sap.ovp.cards.AnnotationHelper.getDataPointValue(i,j,0);};sap.ovp.cards.AnnotationHelper.getSecondDataPointValue=function(i,j){return sap.ovp.cards.AnnotationHelper.getDataPointValue(i,j,1);};sap.ovp.cards.AnnotationHelper.getDataPointValue=function(i,j,k){var W=h(i,j),X=W[k];if(X&&X.Value&&X.Value.Path){return X.Value.Path;}return"";};sap.ovp.cards.AnnotationHelper.getFirstDataFieldName=function(i,j){return r(i,j,0);};sap.ovp.cards.AnnotationHelper.getSecondDataFieldName=function(i,j){return r(i,j,1);};sap.ovp.cards.AnnotationHelper.getThirdDataFieldName=function(i,j){return r(i,j,2);};sap.ovp.cards.AnnotationHelper.formatFirstDataFieldValue=function(i,j){return q(i,j,0);};sap.ovp.cards.AnnotationHelper.formatSecondDataFieldValue=function(i,j){return q(i,j,1);};sap.ovp.cards.AnnotationHelper.formatThirdDataFieldValue=function(i,j){return q(i,j,2);};sap.ovp.cards.AnnotationHelper.formatFourthDataFieldValue=function(i,j){return q(i,j,3);};sap.ovp.cards.AnnotationHelper.formatFifthDataFieldValue=function(i,j){return q(i,j,4);};sap.ovp.cards.AnnotationHelper.formatSixthDataFieldValue=function(i,j){return q(i,j,5);};sap.ovp.cards.AnnotationHelper.getFirstDataPointName=function(i,j){return t(i,j,0);};sap.ovp.cards.AnnotationHelper.getSecondDataPointName=function(i,j){return t(i,j,1);};sap.ovp.cards.AnnotationHelper.getThirdDataPointName=function(i,j){return t(i,j,2);};sap.ovp.cards.AnnotationHelper.formatFirstDataPointValue=function(i,j){return u(i,j,0);};sap.ovp.cards.AnnotationHelper.formatSecondDataPointValue=function(i,j){return u(i,j,1);};sap.ovp.cards.AnnotationHelper.formatThirdDataPointValue=function(i,j){return u(i,j,2);};sap.ovp.cards.AnnotationHelper.formatFirstDataPointState=function(i,j){return A(i,j,0);};sap.ovp.cards.AnnotationHelper.formatSecondDataPointState=function(i,j){return A(i,j,1);};sap.ovp.cards.AnnotationHelper.formatThirdDataPointState=function(i,j){return A(i,j,2);};sap.ovp.cards.AnnotationHelper.formatKPIHeaderState=function(i,j){return B(i,j,sap.ovp.cards.AnnotationHelper.criticalityConstants.ColorValues);};sap.ovp.cards.AnnotationHelper.hasActions=function(j,k){var W;for(var i=0;i<k.length;i++){W=k[i];if(W.RecordType==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"||W.RecordType==="com.sap.vocabularies.UI.v1.DataFieldForAction"||W.RecordType==="com.sap.vocabularies.UI.v1.DataFieldWithUrl"){return 1;}}return 0;};sap.ovp.cards.AnnotationHelper.isFirstDataPointPercentageUnit=function(i,j){var k=h(i,j)[0];if(k&&k.Value&&k.Value.Path){var W=i.getPath().substr(0,i.getPath().lastIndexOf("/")+1);var X=i.getModel();var Y=X.getProperty(W);var Z=X.getODataProperty(Y,k.Value.Path);if(Z&&Z["Org.OData.Measures.V1.Unit"]){return Z["Org.OData.Measures.V1.Unit"].String==="%";}}return false;};sap.ovp.cards.AnnotationHelper.resolveEntityTypePath=function(i){var j=i.getObject();var k=i.getModel();var W=k.getProperty("/metaModel");var X=W.getODataEntitySet(k.getProperty("/entitySet"));var Y=W.getODataEntityType(X.entityType);j=Y.$path+"/"+j;return W.createBindingContext(j);};sap.ovp.cards.AnnotationHelper.resolveParameterizedEntitySet=function(i,j,k){jQuery.sap.require("sap.ui.model.analytics.odata4analytics");var W="";var X=new sap.ui.model.analytics.odata4analytics.Model(sap.ui.model.analytics.odata4analytics.Model.ReferenceByModel(i));var Y=X.findQueryResultByName(j.name);var Z=new sap.ui.model.analytics.odata4analytics.QueryResultRequest(Y);var $=Y.getParameterization();if($){Z.setParameterizationRequest(new sap.ui.model.analytics.odata4analytics.ParameterizationRequest($));jQuery.each(k.Parameters,function(){if(this.RecordType==="com.sap.vocabularies.UI.v1.IntervalParameter"){Z.getParameterizationRequest().setParameterValue(this.PropertyName.PropertyPath,this.PropertyValueFrom.String,this.PropertyValueTo.String);}else{Z.getParameterizationRequest().setParameterValue(this.PropertyName.PropertyPath,this.PropertyValue.String);}});}try{W=Z.getURIToQueryResultEntitySet();}catch(a1){Y=Z.getQueryResult();W="/"+Y.getEntitySet().getQName();jQuery.sap.log.error("getEntitySetPathWithParameters","binding path with parameters failed - "+a1||a1.message);}return W;};sap.ovp.cards.AnnotationHelper.getAssociationObject=function(j,k,W){var X=j.getServiceMetadata().dataServices.schema[0].association;for(var i=0;i<X.length;i++){if(W+"."+X[i].name===k){return X[i];}}};sap.ovp.cards.AnnotationHelper.getAggregateNumber=function(i,j,k,W){var X=k.Value.Path;var Y="";var Z=W&&W.Parameters;var $="";if(Z){var a1=i.getSetting("dataModel");var b1=sap.ovp.cards.AnnotationHelper.resolveParameterizedEntitySet(a1,j,W);Y+="{path: '"+b1+"'";}else{Y+="{path: '/"+j.name+"'";}Y+=", length: 1";var c1=i.getSetting('ovpCardProperties');var d1=c1.getProperty("/entityType");var e1=S(X,d1);var f1=J(c1,W);if(f1.length>0){$+=", filters: "+JSON.stringify(f1);}var g1=[];g1.push(X);if(e1){g1.push(e1);}if(k.TrendCalculation&&k.TrendCalculation.ReferenceValue&&k.TrendCalculation.ReferenceValue.Path){g1.push(k.TrendCalculation.ReferenceValue.Path);}return Y+", parameters:{select:'"+g1.join(",")+"'}"+$+"}";};sap.ovp.cards.AnnotationHelper.formThePathForAggregateNumber=function(i,j){if(!j||!j.Value||!j.Value.Path){return"";}return v(i,j,true,false);};sap.ovp.cards.AnnotationHelper.formThePathForTrendIcon=function(i,j){if(!j||!j.Value||!j.Value.Path||!j.TrendCalculation){return"";}var k=N(j.Value);var W=N(j.TrendCalculation.ReferenceValue);var X=N(j.TrendCalculation.DownDifference);var Y=N(j.TrendCalculation.UpDifference);var Z=D(W);var $=D(X);var a1=D(Y);var b1="parts: ["+k;b1+=Z?","+W:"";b1+=$?","+X:"";b1+=a1?","+Y:"";b1+="]";var c1=function(){var e1=1;return d(arguments[0],Z?arguments[e1++]:W,$?arguments[e1++]:X,a1?arguments[e1++]:Y);};var d1=a(c1,"formatTrendDirection");return"{"+b1+", formatter: '"+d1+"'}";};sap.ovp.cards.AnnotationHelper.formThePathForUOM=function(i,j){if(!j||!j.Value||!j.Value.Path){return"";}return v(i,j,false,true);};sap.ovp.cards.AnnotationHelper.formPathForPercentageChange=function(i){if(!i||!i.TrendCalculation||!i.TrendCalculation.ReferenceValue){return"";}if(i.TrendCalculation.ReferenceValue.Path){return"{parts: [{path:'"+i.Value.Path+"'}, {path:'"+i.TrendCalculation.ReferenceValue.Path+"'}], formatter: 'sap.ovp.cards.AnnotationHelper.returnPercentageChange'}";}else{return"{parts: [{path:'"+i.Value.Path+"'}], formatter: 'sap.ovp.cards.AnnotationHelper.returnPercentageChange'}";}};sap.ovp.cards.AnnotationHelper.returnPercentageChange=function(i,j){jQuery.sap.require("sap.ui.core.format.NumberFormat");var k="";i=Number(i);var W=this.getModel("ovpCardProperties");if(!W){return k;}var X=W.getProperty("/dataPointAnnotationPath");var Y=W.getProperty("/entityType")[X];var Z;if(!Y.TrendCalculation){return k;}if(Y.TrendCalculation.ReferenceValue){if(Y.TrendCalculation.ReferenceValue.String){Z=Number(Y.TrendCalculation.ReferenceValue.String);}if(Y.TrendCalculation.ReferenceValue.Path){Z=Number(j);}if(!Z||Z==0){return k;}var $=((Number(i)-Z)/Z);var a1=sap.ui.core.format.NumberFormat.getPercentInstance({style:'short',minFractionDigits:2,maxFractionDigits:2});return a1.format($);}};sap.ovp.cards.AnnotationHelper.listGroupBy=function(i){var j="";var k=i&&i.GroupBy;if(!k){return j;}var W=this.getModel('ovpCardProperties').getProperty("/metaModel");var X=this.getModel('ovpCardProperties').getProperty("/entityType");var Y;if(i.GroupBy.constructor===Array){Y=i.GroupBy;}else if(!i.GroupBy.Collection){return j;}else{Y=i.GroupBy.Collection;}var Z;jQuery.each(Y,function(){Z=T(W,X,this.PropertyPath);if(!Z){return;}j+=Z;j+=", ";});if(j[j.length-1]===" "&&j[j.length-2]===","){j=j.substring(0,j.length-2);}return j==""?"":sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("By",[j]);};sap.ovp.cards.AnnotationHelper.formTheFilterByString=function(k,W){var X=k.getSetting('ovpCardProperties');var Y=X.getProperty("/entityType");var Z=X.getProperty("/metaModel");var $=J(X,W);var a1;var b1;for(var i=0;i<$.length;i++){a1=$[i].path;b1=U(Z,Y,a1);if(b1!==a1){for(var j=0;j<$.length;j++){if(($[j].path==b1)){$.splice(i,1);break;}}}}return Q($);};function Q(j){var k=[];for(var i=0;i<j.length;i++){k.push(R(j[i]));}return k.join(', ');}function R(i){var j=false;var k=i.value1;if(i.operator[0]==="N"){j=true;}if(i.value2){k+=" - "+i.value2;}if(j){k=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("kpiHeader_Filter_NotOperator",[k]);}return k;}function S(j,k){var W=k.property;for(var i=0,X=W.length;i<X;i++){if(W[i].name==j){if(W[i].hasOwnProperty("sap:unit")){return W[i]["sap:unit"];}break;}}return null;}function T(i,j,k){return V(i,j,k,"com.sap.vocabularies.Common.v1.Label");}function U(i,j,k){return V(i,j,k,"sap:text");}function V(i,j,k,W){var X=i.getODataProperty(j,k);if(!X){jQuery.sap.log.error("No Property Found for with Name '"+k+" For Entity-Type '"+j.name+"'");return;}var Y=X[W];if(Y){if(W==="com.sap.vocabularies.Common.v1.Label"){return Y.String;}return Y;}return X.name;}sap.ovp.cards.AnnotationHelper._criticality2state=c;sap.ovp.cards.AnnotationHelper._calculateCriticalityState=b;sap.ovp.cards.AnnotationHelper._calculateTrendDirection=d;sap.ovp.cards.AnnotationHelper._getPropertiesFromBindingString=H;sap.ovp.cards.AnnotationHelper.sortCollectionByImportance=o;sap.ovp.cards.AnnotationHelper.formatField.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formThePathForAggregateNumber.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formThePathForTrendIcon.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formThePathForUOM.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formTheFilterByString.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getAggregateNumber.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getFirstDataFieldName.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getSecondDataFieldName.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getThirdDataFieldName.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatFirstDataFieldValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatSecondDataFieldValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatThirdDataFieldValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatFourthDataFieldValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatFifthDataFieldValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatSixthDataFieldValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getDataPointsCount.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getFirstDataPointName.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getSecondDataPointName.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getThirdDataPointName.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatFirstDataPointValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatSecondDataPointValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatThirdDataPointValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatFirstDataPointState.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatSecondDataPointState.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatThirdDataPointState.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatKPIHeaderState.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatItems.requiresIContext=true;sap.ovp.cards.AnnotationHelper.formatUrl.requiresIContext=true;sap.ovp.cards.AnnotationHelper.hasActions.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getFirstDataPointValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.getSecondDataPointValue.requiresIContext=true;sap.ovp.cards.AnnotationHelper.isFirstDataPointPercentageUnit.requiresIContext=true;}());
