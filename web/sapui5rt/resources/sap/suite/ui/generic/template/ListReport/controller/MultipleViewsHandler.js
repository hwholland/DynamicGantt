sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/suite/ui/generic/template/ListReport/controller/MultipleViewsSingleTableModeHelper","sap/suite/ui/generic/template/ListReport/controller/MultipleViewsMultipleTablesModeHelper","sap/suite/ui/generic/template/lib/BusyHelper","sap/ui/model/Filter"],function(q,B,M,a,b,F){"use strict";var P="/listReport/multipleViews";var c=P+"/selectedKey";var d=P+"/mode";var e=P+"/items";function g(s,C,t){var I;var m;var S;var D;var T=t.oComponentUtils.getTemplatePrivateModel();var f;var h=t.oServices.oApplication.getBusyHelper().getBusyDelay();function r(){if(I&&I.fnRegisterToChartEvents){return I.fnRegisterToChartEvents.apply(null,arguments);}}function o(){if(I&&I.onDetailsActionPress){return I.onDetailsActionPress.apply(null,arguments);}}function k(){if(!I){return;}var i=x();return i.templateSortOrder;}function l(i){var j;if(!i){return"";}if(i.state==="error"){return t.oCommonUtils.getText("SEG_BUTTON_ERROR",i.text);}if(i.state===""||i.state==="busy"){var v=sap.ui.core.format.NumberFormat.getIntegerInstance({groupingEnabled:true});j=v.format(i.count);}return t.oCommonUtils.getText("SEG_BUTTON_TEXT",[i.text,i.state==="busyLong"?"...":j]);}function n(){if(I){var i=T.getProperty(c);var j=I.getContentForIappState(i);return{mode:m,state:j};}}function R(i){if(I){var j=I.getSelectedKeyAndRestoreFromIappState(i);T.setProperty(c,j);}}function p(){return T.getProperty(c);}function u(i){if(!I){return;}var j=function(v,V,W){var X=t.oCommonUtils.getElementCustomData(V);var Y=f[v]||Object.create(null);Y.selectionVariantFilters=W;Y.templateSortOrder=X.TemplateSortOrder;Y.implementingControl=V;if(!!D){Y.entitySet=V.getEntitySet&&V.getEntitySet();Y.properties=N(V);}f[v]=Y;if(S){var Z=e+"/"+v;var $=function(a1,b1,c1){if(Y.numberOfUpdates!==b1){return;}var _=q.extend({},T.getProperty(Z));if(!_.state&&a1=="busy"){setTimeout(function(){if(T.getProperty(Z).state==="busy"){_=q.extend({},T.getProperty(Z));_.state="busyLong";T.setProperty(Z,_);}},h);}_.state=a1;if(!a1){_.count=c1;}T.setProperty(Z,_);};Y.numberOfUpdates=0;Y.updateStartFunction=$.bind(null,"busy");Y.updateSuccessFunction=$.bind(null,"");Y.errorFunction=$.bind(null,"error");var _={text:X.text,count:0,state:""};T.setProperty(Z,_);}};I.init(i,j);}function w(){return m;}function x(){return f[T.getProperty(c)];}function y(i){if(!I){return;}var j=i.getParameter("bindingParams");s.oFiltersWithoutSmartFilterBar=q.extend(true,{},j);if(w()==="multi"){var v=s.oSmartFilterbar.getFilters();s.oFiltersForCounts=z(j);E(s.oSmartTable,j);O(s.oSmartTable,v,j);}else if(w()==="single"){s.oFiltersForCounts=q.extend(true,{},j);}A(j);}function A(j){var v=x();var V=v.selectionVariantFilters;for(var i in V){j.filters.push(V[i]);}}function z(i){var j=q.extend(true,{},i);G(j.filters,s.oMultipleViewsHandler.aTableFilters);return j;}function E(i,j){if(!!D){Q(i,j.filters);}}function G(v,V){for(var i in V){var W=V[i];for(var j=v.length;j--;j>=0){if(JSON.stringify(v[j])===JSON.stringify(W)){v.splice(j,1);break;}}}}function U(){var i=s.oSmartTable.getModel();var j=[],v;var V=s.oSmartFilterbar.getBasicSearchValue();var W={};var X;X=s.oSmartFilterbar.getFilters();if(V){W={search:V};}var Y;for(var Z in f){Y=q.extend(true,{},s.oFiltersForCounts);var $=f[Z];v=$.entitySet;if(!v){v=s.oSmartTable.getEntitySet();}$.numberOfUpdates++;$.updateStartFunction($.numberOfUpdates);if(w()==="multi"){O($.implementingControl,X,Y);}if($.selectionVariantFilters&&$.selectionVariantFilters.length>0){j=Y.filters.concat($.selectionVariantFilters);}else{j=Y.filters;}i.read("/"+v+"/$count",{urlParameters:W,filters:j,groupId:"updateMultipleViewsItemsCounts",success:$.updateSuccessFunction.bind(null,$.numberOfUpdates),error:$.errorFunction.bind(null,$.numberOfUpdates)});}}function H(){if(S){U();}}function J(){return S;}function K(){return I;}function L(i){var j,v,V;j=Array.isArray(i)?[]:{};for(V in i){v=i[V];j[V]=(typeof v==="object")?L(v):v;}return j;}function N(i){var j,v,V,W;j=i.getEntitySet();v=i.getModel().getMetaModel();V=v.getODataEntitySet(j);W=v.getODataEntityType(V.entityType);return W.property;}function O(i,j,v){var V=[],W;if(j.length<1){return;}if(!!D){V=Q(i,j);}else{V=j;}if(V&&V[0]&&V[0].aFilters&&V[0].aFilters.length>0){if(v.filters[0]&&v.filters[0].aFilters&&v.filters[0].aFilters.length>0){W=v.filters[0];v.filters[0]=new F([W,V[0]],true);}else{v.filters.push(V[0]);}}}function Q(i,v){var V,W,X,Y,j,Z;if(!v||v.length<1){return;}for(X in f){if(f[X].implementingControl===i){V=f[X].properties;break;}}var $=L(v);if($[0]&&$[0].aFilters instanceof Array){Z=$[0].aFilters;}else{Z=$;}if(!Z){return;}for(j=Z.length-1;j>=0;j--){W=false;if(Z[j].aFilters instanceof Array){Y=Z[j].aFilters[0].sPath;}else{Y=Z[j].sPath;}V.some(function(_){if(_.name===Y){W=true;return W;}});if(!W){Z.splice(j,1);}}return $;}(function(){var j,v,V,W;j=C.getOwnerComponent().getAppComponent().getConfig();v=j&&j.pages[0]&&j.pages[0].component&&j.pages[0].component.settings;if(!v){return;}V=v.quickVariantSelectionX;W=v.quickVariantSelection;if(V&&W){throw new Error("Defining both QuickVariantSelection and QuickVariantSelectionX in the manifest is not allowed.");}var X=V||W;if(!X){return;}S=X.showCounts;f=Object.create(null);T.setProperty(P,Object.create(null));var Y=true;var Z=function(a1){if(Y){Y=false;T.setProperty(c,a1);}};if(W){I=new M(W,s,C,t,Z,f);m="single";q.sap.log.info("This list supports multiple views with single table");}else{I=new a(V,s,C,t,Z,f);m="multi";q.sap.log.info("This list supports multiple views with multiple tables/charts");for(var i in V.variants){if(!!V.variants[i].entitySet){D=true;break;}else{D=false;break;}}}T.setProperty(d,m);T.setProperty(e,Object.create(null));var $=T.bindProperty(c);var _=C.byId("page");$.attachChange(function(a1){if(_){_.setPreserveHeaderStateOnScroll(true);}if(I.onSelectedKeyChanged){var b1=a1.getSource().getValue();I.onSelectedKeyChanged(b1);}var c1=s.oIappStateHandler.areDataShownInTable();var d1=true;if(typeof I.isTableDirty==='function'){d1=I.isTableDirty(s.oSmartTable);}if(s.oWorklistData.bWorkListEnabled){c1=true;d1=true;}if(c1&&d1){if(t.oCommonUtils.isSmartChart(s.oSmartTable)){s.oSmartTable.rebindChart();if(typeof I.setTableDirty==='function'){I.setTableDirty(s.oSmartTable,false);}}else if(t.oCommonUtils.isSmartTable(s.oSmartTable)){s.oSmartTable.rebindTable();t.oCommonUtils.refreshSmartTable(s.oSmartTable);}}else{t.oCommonUtils.setEnabledToolbarButtons(s.oSmartTable);}s.oIappStateHandler.changeIappState(true,c1);if(t.oCommonUtils.isSmartTable(s.oSmartTable)){if(_&&_.getPreserveHeaderStateOnScroll()){_.setPreserveHeaderStateOnScroll(false);}}});})();return{fnRegisterToChartEvents:r,onDetailsActionPress:o,determineSortOrder:k,onDataRequested:H,formatItemTextForMultipleView:l,getContentForIappState:n,restoreFromIappState:R,getVariantSelectionKey:p,init:u,getMode:w,onRebindContentControl:y,getShowCounts:J,getImplementingHelper:K};}return B.extend("sap.suite.ui.generic.template.ListReport.controller.MultipleViewsHandler",{constructor:function(s,C,t){q.extend(this,g(s,C,t));}});});
