sap.ui.require.preload({
	"web/ui5/resources/sap/ovp/cards/generic/Card-dbg.controller.js": "!function(){\"use strict\";jQuery.sap.require(\"sap.ovp.cards.ActionUtils\"),jQuery.sap.require(\"sap.ui.generic.app.navigation.service.NavigationHandler\"),jQuery.sap.require(\"sap.ovp.cards.CommonUtils\");var t=sap.ovp.cards.ActionUtils;sap.ui.controller(\"sap.ovp.cards.generic.Card\",{onInit:function(){var t=this.getView().byId(\"ovpCardHeader\");t.attachBrowserEvent(\"click\",this.onHeaderClick.bind(this)),t.addEventDelegate({onkeydown:function(t){t.shiftKey||13!=t.keyCode&&32!=t.keyCode||(t.preventDefault(),this.onHeaderClick())}.bind(this)});var e=this.getView().byId(\"kpiNumberValue\");e&&e.addEventDelegate({onAfterRendering:function(){var t=e.$(),a=t.find(\".sapMNCValueScr\"),n=t.find(\".sapMNCScale\");a.attr(\"aria-label\",a.text()),n.attr(\"aria-label\",n.text())}});try{var a=this.getOwnerComponent().getComponentData();if(a.appComponent&&a.appComponent.getDashboardLayoutUtil){var n=a.appComponent.getDashboardLayoutUtil();n&&n.isCardAutoSpan(a.cardId)&&(this.resizeHandlerId=sap.ui.core.ResizeHandler.register(this.getView(),function(t){jQuery.sap.log.info(\"DashboardLayout autoSize:\"+t.target.id+\" -> \"+t.size.height),n.setAutoCardSpanHeight(t)}))}}catch(t){jQuery.sap.log.error(\"DashboardLayout autoSpan check failed.\")}},onAfterRendering:function(){this.getCardPropertiesModel().getProperty(\"/footerFragment\")&&this._handleCountFooter()},onHeaderClick:function(){this.doNavigation(this.getView().getBindingContext())},resizeCard:function(t){jQuery.sap.log.info(t),this.resizeHandlerId&&(sap.ui.core.ResizeHandler.deregister(this.resizeHandlerId),this.resizeHandlerId=null)},_handleCountFooter:function(){var t=this.getView().byId(\"ovpCountFooter\");if(t){var e=this.getCardItemsBinding();e&&e.attachDataReceived(function(){var a=e.getLength(),n=e.getCurrentContexts().length,i=sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\").getText(\"Count_Zero_Footer\");0!==a&&(i=sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\").getText(\"Count_Footer\",[n,a])),t.setText(i),t.data(\"aria-label\",i)})}},getCardItemsBinding:function(){},onActionPress:function(t){var e=t.getSource(),a=this._getActionObject(e),n=e.getBindingContext();-1!==a.type.indexOf(\"DataFieldForAction\")?this.doAction(n,a):this.doNavigation(n,a)},_getActionObject:function(t){for(var e=t.getCustomData(),a={},n=0;n<e.length;n++)a[e[n].getKey()]=e[n].getValue();return a},doNavigation:function(t,e){if(e||(e=this.getEntityNavigationEntries(t)[0]),e)switch(e.type){case\"com.sap.vocabularies.UI.v1.DataFieldWithUrl\":this.doNavigationWithUrl(t,e);break;case\"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation\":this.doIntentBasedNavigation(t,e,!1)}},doNavigationWithUrl:function(t,e){var a=sap.ushell.Container.getService(\"URLParsing\");if(a.isIntentUrl(e.url)){var n=a.parseShellHash(e.url);this.doIntentBasedNavigation(t,n,!0)}else window.open(e.url)},doIntentBasedNavigation:function(t,e,a){var n,i,o,r=t?t.getObject():null;r&&r.__metadata&&delete r.__metadata;var s=sap.ovp.cards.CommonUtils.getNavigationHandler();if(s&&e){n=this._getEntityNavigationParameters(r),i={target:{semanticObject:e.semanticObject,action:e.action},appSpecificRoute:e.appSpecificRoute,params:n.newSelectionVariant};var c={selectionVariant:n.oldSelectionVariant};a?e&&e.semanticObject&&e.action&&(o=e.semanticObject+\"-\"+e.action,sap.ushell.Container.getService(\"CrossApplicationNavigation\").isIntentSupported([o]).done(function(t){!0===t[o].supported&&sap.ushell.Container.getService(\"CrossApplicationNavigation\").toExternal(i)}).fail(function(){jQuery.sap.log.error(\"Could not get authorization from isIntentSupported\")})):s.navigate(i.target.semanticObject,i.target.action,i.params,c,function(t){t instanceof Error&&t.showMessageBox()})}},doAction:function(e,a){this.actionData=t.getActionInfo(e,a,this.getEntityType()),this.actionData.allParameters.length>0?this._loadParametersForm():this._callFunction()},getEntityNavigationEntries:function(t,e){var a=[],n=this.getEntityType();e||(e=this.getCardPropertiesModel().getProperty(\"/identificationAnnotationPath\"));var i=n[e];if(Array.isArray(i)){i=sap.ovp.cards.AnnotationHelper.sortCollectionByImportance(i);for(var o=0;o<i.length;o++)if(\"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation\"===i[o].RecordType&&a.push({type:i[o].RecordType,semanticObject:i[o].SemanticObject.String,action:i[o].Action.String,label:i[o].Label?i[o].Label.String:null}),\"com.sap.vocabularies.UI.v1.DataFieldWithUrl\"===i[o].RecordType&&!i[o].Url.UrlRef){var r=this.getView().getModel(),s=r.oMetaModel.createBindingContext(n.$path),c=sap.ui.model.odata.AnnotationHelper.format(s,i[o].Url),l=new sap.ui.core.CustomData({key:\"url\",value:c});l.setModel(r),l.setBindingContext(t);var d=l.getValue();a.push({type:i[o].RecordType,url:d,value:i[o].Value.String,label:i[o].Label?i[o].Label.String:null})}}return a},getModel:function(){return this.getView().getModel()},getMetaModel:function(){return this.getModel().getMetaModel()},getCardPropertiesModel:function(){return this.getView().getModel(\"ovpCardProperties\")},getEntitySet:function(){if(!this.entitySet){var t=this.getCardPropertiesModel().getProperty(\"/entitySet\");this.entitySet=this.getMetaModel().getODataEntitySet(t)}return this.entitySet},getEntityType:function(){return this.entityType||this.getMetaModel()&&this.getEntitySet()&&(this.entityType=this.getMetaModel().getODataEntityType(this.getEntitySet().entityType)),this.entityType},getCardContentContainer:function(){return this.cardContentContainer||(this.cardContentContainer=this.getView().byId(\"ovpCardContentContainer\")),this.cardContentContainer},_getEntityNavigationParameters:function(t){var e,a,n={},i=this.getOwnerComponent().getComponentData(),o=i?i.globalFilter:void 0,r=sap.ovp.cards.AnnotationHelper.getCardFilters(this.getCardPropertiesModel());if(r&&r[0]&&r[0].path&&(r[0].path=r[0].path.replace(\"/\",\".\")),t){var s;e=this.getEntityType();for(var c=0;e.property&&c<e.property.length;c++){var l=t[s=e.property[c].name];t.hasOwnProperty(s)&&(window.Array.isArray(t[s])&&1===t[s].length?n[s]=t[s][0]:\"object\"!==jQuery.type(l)&&(n[s]=l))}}a=this._buildSelectionVariant(o,r);var d=sap.ovp.cards.CommonUtils.getNavigationHandler(),p=null;return d&&(p=d.mixAttributesAndSelectionVariant(n,a.toJSONString())),{oldSelectionVariant:a?a.toJSONString():null,newSelectionVariant:p?p.toJSONString():null}},_buildSelectionVariant:function(t,e){for(var a,n,i,o=t?t.getFilterDataAsString():\"{}\",r=new sap.ui.generic.app.navigation.service.SelectionVariant(o),s=0;s<e.length;s++)(a=e[s]).path&&a.operator&&void 0!==a.value1&&(n=a.value1.toString(),i=void 0!==a.value2?a.value2.toString():void 0,r.addSelectOption(a.path,\"I\",a.operator,n,i));return r},_loadParametersForm:function(){var e=new sap.ui.model.json.JSONModel;e.setData(this.actionData.parameterData);var a=this,n=new sap.m.Dialog(\"ovpCardActionDialog\",{title:this.actionData.sFunctionLabel,afterClose:function(){n.destroy()}}).addStyleClass(\"sapUiNoContentPadding\"),i=new sap.m.Button({text:this.actionData.sFunctionLabel,press:function(e){var i=t.getParameters(e.getSource().getModel(),a.actionData.oFunctionImport);n.close(),a._callFunction(i)}}),o=new sap.m.Button({text:\"Cancel\",press:function(){n.close()}});n.setBeginButton(i),n.setEndButton(o);var r=t.buildParametersForm(this.actionData,function(e){var n=t.mandatoryParamsMissing(e.getSource().getModel(),a.actionData.oFunctionImport);i.setEnabled(!n)});n.addContent(r),n.setModel(e),n.open()},_callFunction:function(t){var e={batchGroupId:\"Changes\",changeSetId:\"Changes\",urlParameters:t,forceSubmit:!0,context:this.actionData.oContext,functionImport:this.actionData.oFunctionImport},a=this;new Promise(function(t,n){var i,o=a.actionData.oContext.getModel();i=\"/\"+e.functionImport.name,o.callFunction(i,{method:e.functionImport.httpMethod,urlParameters:e.urlParameters,batchGroupId:e.batchGroupId,changeSetId:e.changeSetId,headers:e.headers,success:function(e,a){t(a)},error:function(t){n(t)}})}).then(function(t){return sap.m.MessageToast.show(sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\").getText(\"Toast_Action_Success\"),{duration:1e3})},function(t){return sap.m.MessageToast.show(sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\").getText(\"Toast_Action_Error\"),{duration:1e3})})},setErrorState:function(){var t=this.getOwnerComponent(),e=t.oContainer,a=this.getCardPropertiesModel(),n={name:\"sap.ovp.cards.loading\",componentData:{model:this.getView().getModel(),settings:{category:a.getProperty(\"/category\"),title:a.getProperty(\"/title\"),description:a.getProperty(\"/description\"),entitySet:a.getProperty(\"/entitySet\"),state:sap.ovp.cards.loading.State.ERROR}}},i=sap.ui.component(n);e.setComponent(i),setTimeout(function(){t.destroy()},0)}})}();",
	"web/ui5/resources/sap/ovp/cards/generic/Card.controller.js": "!function(){\"use strict\";jQuery.sap.require(\"sap.ovp.cards.ActionUtils\"),jQuery.sap.require(\"sap.ui.generic.app.navigation.service.NavigationHandler\"),jQuery.sap.require(\"sap.ovp.cards.CommonUtils\");var t=sap.ovp.cards.ActionUtils;sap.ui.controller(\"sap.ovp.cards.generic.Card\",{onInit:function(){var t=this.getView().byId(\"ovpCardHeader\");t.attachBrowserEvent(\"click\",this.onHeaderClick.bind(this)),t.addEventDelegate({onkeydown:function(t){t.shiftKey||13!=t.keyCode&&32!=t.keyCode||(t.preventDefault(),this.onHeaderClick())}.bind(this)});var e=this.getView().byId(\"kpiNumberValue\");e&&e.addEventDelegate({onAfterRendering:function(){var t=e.$(),a=t.find(\".sapMNCValueScr\"),n=t.find(\".sapMNCScale\");a.attr(\"aria-label\",a.text()),n.attr(\"aria-label\",n.text())}});try{var a=this.getOwnerComponent().getComponentData();if(a.appComponent&&a.appComponent.getDashboardLayoutUtil){var n=a.appComponent.getDashboardLayoutUtil();n&&n.isCardAutoSpan(a.cardId)&&(this.resizeHandlerId=sap.ui.core.ResizeHandler.register(this.getView(),function(t){jQuery.sap.log.info(\"DashboardLayout autoSize:\"+t.target.id+\" -> \"+t.size.height),n.setAutoCardSpanHeight(t)}))}}catch(t){jQuery.sap.log.error(\"DashboardLayout autoSpan check failed.\")}},onAfterRendering:function(){this.getCardPropertiesModel().getProperty(\"/footerFragment\")&&this._handleCountFooter()},onHeaderClick:function(){this.doNavigation(this.getView().getBindingContext())},resizeCard:function(t){jQuery.sap.log.info(t),this.resizeHandlerId&&(sap.ui.core.ResizeHandler.deregister(this.resizeHandlerId),this.resizeHandlerId=null)},_handleCountFooter:function(){var t=this.getView().byId(\"ovpCountFooter\");if(t){var e=this.getCardItemsBinding();e&&e.attachDataReceived(function(){var a=e.getLength(),n=e.getCurrentContexts().length,i=sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\").getText(\"Count_Zero_Footer\");0!==a&&(i=sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\").getText(\"Count_Footer\",[n,a])),t.setText(i),t.data(\"aria-label\",i)})}},getCardItemsBinding:function(){},onActionPress:function(t){var e=t.getSource(),a=this._getActionObject(e),n=e.getBindingContext();-1!==a.type.indexOf(\"DataFieldForAction\")?this.doAction(n,a):this.doNavigation(n,a)},_getActionObject:function(t){for(var e=t.getCustomData(),a={},n=0;n<e.length;n++)a[e[n].getKey()]=e[n].getValue();return a},doNavigation:function(t,e){if(e||(e=this.getEntityNavigationEntries(t)[0]),e)switch(e.type){case\"com.sap.vocabularies.UI.v1.DataFieldWithUrl\":this.doNavigationWithUrl(t,e);break;case\"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation\":this.doIntentBasedNavigation(t,e,!1)}},doNavigationWithUrl:function(t,e){var a=sap.ushell.Container.getService(\"URLParsing\");if(a.isIntentUrl(e.url)){var n=a.parseShellHash(e.url);this.doIntentBasedNavigation(t,n,!0)}else window.open(e.url)},doIntentBasedNavigation:function(t,e,a){var n,i,o,r=t?t.getObject():null;r&&r.__metadata&&delete r.__metadata;var s=sap.ovp.cards.CommonUtils.getNavigationHandler();if(s&&e){n=this._getEntityNavigationParameters(r),i={target:{semanticObject:e.semanticObject,action:e.action},appSpecificRoute:e.appSpecificRoute,params:n.newSelectionVariant};var c={selectionVariant:n.oldSelectionVariant};a?e&&e.semanticObject&&e.action&&(o=e.semanticObject+\"-\"+e.action,sap.ushell.Container.getService(\"CrossApplicationNavigation\").isIntentSupported([o]).done(function(t){!0===t[o].supported&&sap.ushell.Container.getService(\"CrossApplicationNavigation\").toExternal(i)}).fail(function(){jQuery.sap.log.error(\"Could not get authorization from isIntentSupported\")})):s.navigate(i.target.semanticObject,i.target.action,i.params,c,function(t){t instanceof Error&&t.showMessageBox()})}},doAction:function(e,a){this.actionData=t.getActionInfo(e,a,this.getEntityType()),this.actionData.allParameters.length>0?this._loadParametersForm():this._callFunction()},getEntityNavigationEntries:function(t,e){var a=[],n=this.getEntityType();e||(e=this.getCardPropertiesModel().getProperty(\"/identificationAnnotationPath\"));var i=n[e];if(Array.isArray(i)){i=sap.ovp.cards.AnnotationHelper.sortCollectionByImportance(i);for(var o=0;o<i.length;o++)if(\"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation\"===i[o].RecordType&&a.push({type:i[o].RecordType,semanticObject:i[o].SemanticObject.String,action:i[o].Action.String,label:i[o].Label?i[o].Label.String:null}),\"com.sap.vocabularies.UI.v1.DataFieldWithUrl\"===i[o].RecordType&&!i[o].Url.UrlRef){var r=this.getView().getModel(),s=r.oMetaModel.createBindingContext(n.$path),c=sap.ui.model.odata.AnnotationHelper.format(s,i[o].Url),l=new sap.ui.core.CustomData({key:\"url\",value:c});l.setModel(r),l.setBindingContext(t);var d=l.getValue();a.push({type:i[o].RecordType,url:d,value:i[o].Value.String,label:i[o].Label?i[o].Label.String:null})}}return a},getModel:function(){return this.getView().getModel()},getMetaModel:function(){return this.getModel().getMetaModel()},getCardPropertiesModel:function(){return this.getView().getModel(\"ovpCardProperties\")},getEntitySet:function(){if(!this.entitySet){var t=this.getCardPropertiesModel().getProperty(\"/entitySet\");this.entitySet=this.getMetaModel().getODataEntitySet(t)}return this.entitySet},getEntityType:function(){return this.entityType||this.getMetaModel()&&this.getEntitySet()&&(this.entityType=this.getMetaModel().getODataEntityType(this.getEntitySet().entityType)),this.entityType},getCardContentContainer:function(){return this.cardContentContainer||(this.cardContentContainer=this.getView().byId(\"ovpCardContentContainer\")),this.cardContentContainer},_getEntityNavigationParameters:function(t){var e,a,n={},i=this.getOwnerComponent().getComponentData(),o=i?i.globalFilter:void 0,r=sap.ovp.cards.AnnotationHelper.getCardFilters(this.getCardPropertiesModel());if(r&&r[0]&&r[0].path&&(r[0].path=r[0].path.replace(\"/\",\".\")),t){var s;e=this.getEntityType();for(var c=0;e.property&&c<e.property.length;c++){var l=t[s=e.property[c].name];t.hasOwnProperty(s)&&(window.Array.isArray(t[s])&&1===t[s].length?n[s]=t[s][0]:\"object\"!==jQuery.type(l)&&(n[s]=l))}}a=this._buildSelectionVariant(o,r);var d=sap.ovp.cards.CommonUtils.getNavigationHandler(),p=null;return d&&(p=d.mixAttributesAndSelectionVariant(n,a.toJSONString())),{oldSelectionVariant:a?a.toJSONString():null,newSelectionVariant:p?p.toJSONString():null}},_buildSelectionVariant:function(t,e){for(var a,n,i,o=t?t.getFilterDataAsString():\"{}\",r=new sap.ui.generic.app.navigation.service.SelectionVariant(o),s=0;s<e.length;s++)(a=e[s]).path&&a.operator&&void 0!==a.value1&&(n=a.value1.toString(),i=void 0!==a.value2?a.value2.toString():void 0,r.addSelectOption(a.path,\"I\",a.operator,n,i));return r},_loadParametersForm:function(){var e=new sap.ui.model.json.JSONModel;e.setData(this.actionData.parameterData);var a=this,n=new sap.m.Dialog(\"ovpCardActionDialog\",{title:this.actionData.sFunctionLabel,afterClose:function(){n.destroy()}}).addStyleClass(\"sapUiNoContentPadding\"),i=new sap.m.Button({text:this.actionData.sFunctionLabel,press:function(e){var i=t.getParameters(e.getSource().getModel(),a.actionData.oFunctionImport);n.close(),a._callFunction(i)}}),o=new sap.m.Button({text:\"Cancel\",press:function(){n.close()}});n.setBeginButton(i),n.setEndButton(o);var r=t.buildParametersForm(this.actionData,function(e){var n=t.mandatoryParamsMissing(e.getSource().getModel(),a.actionData.oFunctionImport);i.setEnabled(!n)});n.addContent(r),n.setModel(e),n.open()},_callFunction:function(t){var e={batchGroupId:\"Changes\",changeSetId:\"Changes\",urlParameters:t,forceSubmit:!0,context:this.actionData.oContext,functionImport:this.actionData.oFunctionImport},a=this;new Promise(function(t,n){var i,o=a.actionData.oContext.getModel();i=\"/\"+e.functionImport.name,o.callFunction(i,{method:e.functionImport.httpMethod,urlParameters:e.urlParameters,batchGroupId:e.batchGroupId,changeSetId:e.changeSetId,headers:e.headers,success:function(e,a){t(a)},error:function(t){n(t)}})}).then(function(t){return sap.m.MessageToast.show(sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\").getText(\"Toast_Action_Success\"),{duration:1e3})},function(t){return sap.m.MessageToast.show(sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\").getText(\"Toast_Action_Error\"),{duration:1e3})})},setErrorState:function(){var t=this.getOwnerComponent(),e=t.oContainer,a=this.getCardPropertiesModel(),n={name:\"sap.ovp.cards.loading\",componentData:{model:this.getView().getModel(),settings:{category:a.getProperty(\"/category\"),title:a.getProperty(\"/title\"),description:a.getProperty(\"/description\"),entitySet:a.getProperty(\"/entitySet\"),state:sap.ovp.cards.loading.State.ERROR}}},i=sap.ui.component(n);e.setComponent(i),setTimeout(function(){t.destroy()},0)}})}();",
	"web/ui5/resources/sap/ovp/cards/generic/Component-dbg.js": "!function(){\"use strict\";jQuery.sap.declare(\"sap.ovp.cards.generic.Component\"),jQuery.sap.require(\"sap.ui.core.UIComponent\"),jQuery.sap.require(\"sap.ovp.cards.AnnotationHelper\"),sap.ui.core.UIComponent.extend(\"sap.ovp.cards.generic.Component\",{metadata:{properties:{contentFragment:{type:\"string\"},headerExtensionFragment:{type:\"string\"},contentPosition:{type:\"string\",defaultValue:\"Middle\"},footerFragment:{type:\"string\"},identificationAnnotationPath:{type:\"string\",defaultValue:\"com.sap.vocabularies.UI.v1.Identification\"},selectionAnnotationPath:{type:\"string\"},filters:{type:\"object\"},addODataSelect:{type:\"boolean\",defaultValue:!1}},version:\"1.38.10\",library:\"sap.ovp\",includes:[],dependencies:{libs:[\"sap.m\"],components:[]},config:{}},getCustomPreprocessor:function(){},getPreprocessors:function(e){var t,o,n,a,i=this.getComponentData(),s=i.settings,r=i.model;if(s.description&&!s.subTitle&&(s.subTitle=s.description),r&&(t=r.getMetaModel(),s.entitySet)){var p=t.getODataEntitySet(s.entitySet),u=t.getODataEntitySet(s.entitySet,!0);o=t.getODataEntityType(p.entityType),a=t.createBindingContext(u),n=t.createBindingContext(o.$path)}var l=this._getCardPropertyDefaults(),d=this._completeLayoutDefaults(l,s),c={metaModel:t,entityType:o};l.densityStyle=this._setCardpropertyDensityAttribute(),d&&(c.cardLayout=d.cardLayout),l=jQuery.extend(!0,c,l,s);var y=new sap.ui.model.json.JSONModel(l),C=(e=this.getOvplibResourceBundle(),new sap.ui.model.json.JSONModel(sap.ui.Device));C.setDefaultBindingMode(\"OneWay\");var g={xml:{bindingContexts:{entityType:n,entitySet:a},models:{device:C,entityType:t,entitySet:t,ovpMeta:t,ovpCardProperties:y,ovplibResourceBundle:e},ovpCardProperties:y,dataModel:r,_ovpCache:{}}};return jQuery.extend(!0,{},this.getCustomPreprocessor(),g)},_completeLayoutDefaults:function(e,t){var o=null,n=this.getComponentData(),a=null,i=null,s=null;if(n.appComponent&&(a=n.appComponent.getModel(\"ui\"),i=n.appComponent.getOvpConfig()),!i)return null;if(\"dashboard\"===i.containerLayout){s=n.appComponent.getDashboardLayoutUtil().getRowHeightPx(),o=t.defaultSpan?{cardLayout:{colSpan:t.defaultSpan.cols,rowSpan:t.defaultSpan.rows}}:{cardLayout:{colSpan:1,rowSpan:1}};for(var r=a.getProperty(\"/initialDashboardLayout\"),p=n.cardId,u=0;u<r.length;u++){var l=r[u];if(l[p]){o.cardLayout=l[p];break}}s&&(o.cardLayout.iRowHeigthPx=s)}else\"sap.ovp.cards.linklist\"===i.cards[n.cardId].template&&(o={cardLayout:{items:5}});return o},_getCardPropertyDefaults:function(){var e,t={},o=this.getMetadata().getAllProperties();for(var n in o)void 0!==(e=o[n]).defaultValue&&(t[e.name]=e.defaultValue);return t},getOvplibResourceBundle:function(){if(!this.ovplibResourceBundle){var e=sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\");this.ovplibResourceBundle=e?new sap.ui.model.resource.ResourceModel({bundleUrl:e.oUrlInfo.url}):null}return this.ovplibResourceBundle},createContent:function(){var e,t=this.getComponentData&&this.getComponentData(),o=t.model,n=this.getPreprocessors();return(e=sap.ui.view({preprocessors:n,type:sap.ui.core.mvc.ViewType.XML,viewName:\"sap.ovp.cards.generic.Card\"})).setModel(o),t.i18n&&e.setModel(t.i18n,\"@i18n\"),e.setModel(n.xml.ovpCardProperties,\"ovpCardProperties\"),e.setModel(this.getOvplibResourceBundle(),\"ovplibResourceBundle\"),e},getContentDensityClass:function(){return void 0===this._sContentDensityClass&&(jQuery(document.body).hasClass(\"sapUiSizeCozy\")||jQuery(document.body).hasClass(\"sapUiSizeCompact\")?this._sContentDensityClass=\"\":sap.ui.Device.support.touch?this._sContentDensityClass=\"sapUiSizeCozy\":this._sContentDensityClass=\"sapUiSizeCompact\"),this._sContentDensityClass},_setCardpropertyDensityAttribute:function(){var e=this.getContentDensityClass();return\"sapUiSizeCompact\"===e?\"compact\":\"sapUiSizeCozy\"===e?\"cozy\":sap.ui.Device.support.touch?\"cozy\":\"compact\"}})}();",
	"web/ui5/resources/sap/ovp/cards/generic/Component.js": "!function(){\"use strict\";jQuery.sap.declare(\"sap.ovp.cards.generic.Component\"),jQuery.sap.require(\"sap.ui.core.UIComponent\"),jQuery.sap.require(\"sap.ovp.cards.AnnotationHelper\"),sap.ui.core.UIComponent.extend(\"sap.ovp.cards.generic.Component\",{metadata:{properties:{contentFragment:{type:\"string\"},headerExtensionFragment:{type:\"string\"},contentPosition:{type:\"string\",defaultValue:\"Middle\"},footerFragment:{type:\"string\"},identificationAnnotationPath:{type:\"string\",defaultValue:\"com.sap.vocabularies.UI.v1.Identification\"},selectionAnnotationPath:{type:\"string\"},filters:{type:\"object\"},addODataSelect:{type:\"boolean\",defaultValue:!1}},version:\"1.38.10\",library:\"sap.ovp\",includes:[],dependencies:{libs:[\"sap.m\"],components:[]},config:{}},getCustomPreprocessor:function(){},getPreprocessors:function(e){var t,o,n,a,i=this.getComponentData(),s=i.settings,r=i.model;if(s.description&&!s.subTitle&&(s.subTitle=s.description),r&&(t=r.getMetaModel(),s.entitySet)){var p=t.getODataEntitySet(s.entitySet),u=t.getODataEntitySet(s.entitySet,!0);o=t.getODataEntityType(p.entityType),a=t.createBindingContext(u),n=t.createBindingContext(o.$path)}var l=this._getCardPropertyDefaults(),d=this._completeLayoutDefaults(l,s),c={metaModel:t,entityType:o};l.densityStyle=this._setCardpropertyDensityAttribute(),d&&(c.cardLayout=d.cardLayout),l=jQuery.extend(!0,c,l,s);var y=new sap.ui.model.json.JSONModel(l),C=(e=this.getOvplibResourceBundle(),new sap.ui.model.json.JSONModel(sap.ui.Device));C.setDefaultBindingMode(\"OneWay\");var g={xml:{bindingContexts:{entityType:n,entitySet:a},models:{device:C,entityType:t,entitySet:t,ovpMeta:t,ovpCardProperties:y,ovplibResourceBundle:e},ovpCardProperties:y,dataModel:r,_ovpCache:{}}};return jQuery.extend(!0,{},this.getCustomPreprocessor(),g)},_completeLayoutDefaults:function(e,t){var o=null,n=this.getComponentData(),a=null,i=null,s=null;if(n.appComponent&&(a=n.appComponent.getModel(\"ui\"),i=n.appComponent.getOvpConfig()),!i)return null;if(\"dashboard\"===i.containerLayout){s=n.appComponent.getDashboardLayoutUtil().getRowHeightPx(),o=t.defaultSpan?{cardLayout:{colSpan:t.defaultSpan.cols,rowSpan:t.defaultSpan.rows}}:{cardLayout:{colSpan:1,rowSpan:1}};for(var r=a.getProperty(\"/initialDashboardLayout\"),p=n.cardId,u=0;u<r.length;u++){var l=r[u];if(l[p]){o.cardLayout=l[p];break}}s&&(o.cardLayout.iRowHeigthPx=s)}else\"sap.ovp.cards.linklist\"===i.cards[n.cardId].template&&(o={cardLayout:{items:5}});return o},_getCardPropertyDefaults:function(){var e,t={},o=this.getMetadata().getAllProperties();for(var n in o)void 0!==(e=o[n]).defaultValue&&(t[e.name]=e.defaultValue);return t},getOvplibResourceBundle:function(){if(!this.ovplibResourceBundle){var e=sap.ui.getCore().getLibraryResourceBundle(\"sap.ovp\");this.ovplibResourceBundle=e?new sap.ui.model.resource.ResourceModel({bundleUrl:e.oUrlInfo.url}):null}return this.ovplibResourceBundle},createContent:function(){var e,t=this.getComponentData&&this.getComponentData(),o=t.model,n=this.getPreprocessors();return(e=sap.ui.view({preprocessors:n,type:sap.ui.core.mvc.ViewType.XML,viewName:\"sap.ovp.cards.generic.Card\"})).setModel(o),t.i18n&&e.setModel(t.i18n,\"@i18n\"),e.setModel(n.xml.ovpCardProperties,\"ovpCardProperties\"),e.setModel(this.getOvplibResourceBundle(),\"ovplibResourceBundle\"),e},getContentDensityClass:function(){return void 0===this._sContentDensityClass&&(jQuery(document.body).hasClass(\"sapUiSizeCozy\")||jQuery(document.body).hasClass(\"sapUiSizeCompact\")?this._sContentDensityClass=\"\":sap.ui.Device.support.touch?this._sContentDensityClass=\"sapUiSizeCozy\":this._sContentDensityClass=\"sapUiSizeCompact\"),this._sContentDensityClass},_setCardpropertyDensityAttribute:function(){var e=this.getContentDensityClass();return\"sapUiSizeCompact\"===e?\"compact\":\"sapUiSizeCozy\"===e?\"cozy\":sap.ui.Device.support.touch?\"cozy\":\"compact\"}})}();",
	"web/ui5/resources/sap/ovp/cards/generic/Action.fragment.xml": "<core:FragmentDefinition\nxmlns=\"sap.m\" xmlns:core=\"sap.ui.core\"\nxmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><template:if test=\"{=  ${dataField>RecordType} === 'com.sap.vocabularies.UI.v1.DataFieldForAction' ||\n                           ${dataField>RecordType} === 'com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation'||\n                           ${dataField>RecordType} === 'com.sap.vocabularies.UI.v1.DataFieldWithUrl'}\"><Button text=\"{path: 'dataField>Label', formatter: 'sap.ui.model.odata.AnnotationHelper.format'}\"\n                press=\"onActionPress\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData moveToOverflow=\"true\"\n                                           stayInOverflow=\"false\"/></layoutData><customData><core:CustomData key=\"type\" value=\"{dataField>RecordType}\"/><template:if test=\"{= ${dataField>SemanticObject}}\"><core:CustomData key=\"semanticObject\"\n                                     value=\"{path: 'dataField>SemanticObject', formatter: 'sap.ui.model.odata.AnnotationHelper.format'}\"/></template:if><template:if test=\"{= ${dataField>Url}}\"><core:CustomData key=\"url\"\n                                     value=\"{path: 'dataField>Url', formatter: 'sap.ui.model.odata.AnnotationHelper.format'}\"/></template:if><template:if test=\"{= ${dataField>Action}}\"><core:CustomData key=\"action\"\n                                 value=\"{path: 'dataField>Action', formatter: 'sap.ui.model.odata.AnnotationHelper.format'}\"/></template:if><core:CustomData key=\"label\"\n                                 value=\"{path: 'dataField>Label', formatter: 'sap.ui.model.odata.AnnotationHelper.format'}\"/></customData></Button></template:if></core:FragmentDefinition>",
	"web/ui5/resources/sap/ovp/cards/generic/ActionsFooter.fragment.xml": "<core:FragmentDefinition\n        xmlns=\"sap.m\" xmlns:core=\"sap.ui.core\" xmlns:ovp=\"sap.ovp.ui\"\n        xmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><template:with path='ovpCardProperties>/identificationAnnotationPath' helper=\"sap.ovp.cards.AnnotationHelper.resolveEntityTypePath\" var='identification'><template:if test=\"{path: 'identification>', formatter: 'sap.ovp.cards.AnnotationHelper.hasActions'}\"><OverflowToolbar id=\"ovpActionFooter\" class=\"sapOvpActionFooter\"><customData><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"toolbar\" writeToDom=\"true\" /></customData><ToolbarSpacer/><template:repeat\n                        list=\"{path:'identification>',\n                                filters: [\n                                    {path:'com.sap.vocabularies.UI.v1.Importance/EnumMember', operator: 'EndsWith', value1: 'High'},\n                                    {path:'com.sap.vocabularies.UI.v1.Importance/EnumMember', operator: 'EndsWith', value1: 'Medium'}\n                                ],\n                                sorter: [{path:'com.sap.vocabularies.UI.v1.Importance/EnumMember'}]\n                             }\" var=\"dataField\"><core:Fragment fragmentName=\"sap.ovp.cards.generic.Action\" type=\"XML\"/></template:repeat><template:repeat\n                        list=\"{path:'identification>',\n                                filters: [\n                                    {path:'com.sap.vocabularies.UI.v1.Importance/EnumMember', operator: 'EndsWith', value1: 'Low'}\n                                ]\n                             }\" var=\"dataField\"><core:Fragment fragmentName=\"sap.ovp.cards.generic.Action\" type=\"XML\"/></template:repeat><template:repeat list=\"{path:'identification>'}\" var=\"dataField\"><template:if test=\"{=  !${dataField>com.sap.vocabularies.UI.v1.Importance/EnumMember} }\"><core:Fragment fragmentName=\"sap.ovp.cards.generic.Action\" type=\"XML\"/></template:if></template:repeat></OverflowToolbar></template:if></template:with></core:FragmentDefinition>",
	"web/ui5/resources/sap/ovp/cards/generic/ContentMiddle.fragment.xml": "<core:FragmentDefinition\n        controllerName=\"sap.ovp.cards.generic.Card\"\n        xmlns=\"sap.m\"\n        xmlns:core=\"sap.ui.core\"\n        xmlns:mvc=\"sap.ui.core.mvc\"\n        xmlns:ovp=\"sap.ovp.ui\"\n        xmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><VBox class=\"sapOvpBaseCard\"><core:Fragment fragmentName=\"sap.ovp.cards.generic.Header\" type=\"XML\"/><ovp:CardContentContainer id=\"ovpCardContentContainer\"><template:if test=\"{ovpCardProperties>/contentFragment}\"><core:Fragment fragmentName=\"{ovpCardProperties>/contentFragment}\" type=\"XML\" /></template:if></ovp:CardContentContainer><template:if test=\"{ovpCardProperties>/footerFragment}\"><core:Fragment fragmentName=\"{ovpCardProperties>/footerFragment}\" type=\"XML\" /></template:if></VBox></core:FragmentDefinition>",
	"web/ui5/resources/sap/ovp/cards/generic/ContentRight.fragment.xml": "<core:FragmentDefinition\n        controllerName=\"sap.ovp.cards.generic.Card\"\n        xmlns=\"sap.m\"\n        xmlns:core=\"sap.ui.core\"\n        xmlns:mvc=\"sap.ui.core.mvc\"\n        xmlns:ovp=\"sap.ovp.ui\"\n        xmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><HBox class=\"sapOvpBaseCard sapOvpCardRightContent\"><FlexBox class=\"sapOvpCardContentRightHeader\"><core:Fragment fragmentName=\"sap.ovp.cards.generic.Header\" type=\"XML\"/><layoutData><FlexItemData growFactor=\"1\" baseSize=\"1rem\"/></layoutData></FlexBox><ovp:CardContentContainer id=\"ovpCardContentContainer\"><template:if test=\"{ovpCardProperties>/contentFragment}\"><core:Fragment fragmentName=\"{ovpCardProperties>/contentFragment}\" type=\"XML\"/></template:if></ovp:CardContentContainer></HBox></core:FragmentDefinition>",
	"web/ui5/resources/sap/ovp/cards/generic/CountFooter.fragment.xml": "<core:FragmentDefinition\r\nxmlns=\"sap.m\" xmlns:core=\"sap.ui.core\"\r\nxmlns:ovp=\"sap.ovp.ui\"><Text id=\"ovpCountFooter\" class=\"sapOvpCardFooter\"><customData><ovp:CustomData key=\"aria-label\" value=\"\" writeToDom=\"true\" /><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"toolbar\" writeToDom=\"true\" /></customData></Text></core:FragmentDefinition>",
	"web/ui5/resources/sap/ovp/cards/generic/Header.fragment.xml": "<core:FragmentDefinition\n        xmlns=\"sap.m\"\n        xmlns:core=\"sap.ui.core\"\n        xmlns:build=\"sap.build\"\n        xmlns:ovp=\"sap.ovp.ui\"\n        xmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><VBox id=\"ovpCardHeader\" class=\"{= ${ovpCardProperties>/category} || ${ovpCardProperties>/title} || ${ovpCardProperties>/subTitle} ? 'sapOvpCardHeader' : 'sapOvpCardHeader sapOvpCardHideHeader' }\"\n          build:metadata=\"#pattern:GenericCard;isAbstract;prop::EntitySet:\\{ovpCardProperties>/entitySet\\}\"><customData><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"button\" writeToDom=\"true\" /></customData><template:if test=\"{ovpCardProperties>/title}\"><Text\n                text=\"{ovpCardProperties>/title}\"\n                class=\"sapOvpCardTitle\"\n                build:metadata=\"#pattern:GenericCard;prop:text:Title\"><customData><ovp:CustomData key=\"aria-label\" value=\"{ovpCardProperties>/title}\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"heading\" writeToDom=\"true\" /><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /></customData></Text></template:if><template:if test=\"{ovpCardProperties>/subTitle}\"><FlexBox class=\"sapOvpCardSubtitleContainer\"><Text\n                        text=\"{ovpCardProperties>/subTitle}\"\n                        class=\"sapOvpCardSubtitle\"\n                        build:metadata=\"#pattern:GenericCard;prop:text:subTitle\"><customData><ovp:CustomData key=\"aria-label\" value=\"{ovpCardProperties>/subTitle}\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"heading\" writeToDom=\"true\" /></customData></Text></FlexBox></template:if><template:if test=\"{ovpCardProperties>/headerExtensionFragment}\"><core:Fragment fragmentName=\"{ovpCardProperties>/headerExtensionFragment}\" type=\"XML\" /></template:if></VBox></core:FragmentDefinition>",
	"web/ui5/resources/sap/ovp/cards/generic/KPIHeader.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\" xmlns:ovp=\"sap.ovp.ui\"\n\txmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\" ><template:with path=\"ovpCardProperties>/dataPointAnnotationPath\"\n\t\thelper=\"sap.ovp.cards.AnnotationHelper.resolveEntityTypePath\" var='dataPoint'><template:with path=\"ovpCardProperties>/selectionAnnotationPath\"\n\t\t\thelper=\"sap.ovp.cards.AnnotationHelper.resolveEntityTypePath\" var='selVar'><template:with path=\"ovpCardProperties>/presentationAnnotationPath\"\n\t\t\t\thelper=\"sap.ovp.cards.AnnotationHelper.resolveEntityTypePath\" var='preVar'><template:if test=\"{dataPoint>}\"><VBox id=\"ovp\" class=\"sapOVPKpiHeaderVbox\"><template:if test=\"{dataPoint>Title}\"><FlexBox alignItems=\"Start\" justifyContent=\"SpaceBetween\"><Text maxLines=\"1\" text=\"{path: 'dataPoint>Title', formatter: 'sap.ui.model.odata.AnnotationHelper.format'}\" class=\"sapOvpKPIHeaderTitleStyle tabindex0\" ><customData><ovp:CustomData key=\"aria-label\" value=\"{path: 'dataPoint>Title', formatter: 'sap.ui.model.odata.AnnotationHelper.format'}\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"heading\" writeToDom=\"true\" /><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /></customData></Text></FlexBox></template:if><template:if test=\"{dataPoint>Value/Path}\"><FlexBox items=\"{parts:[{path:'entitySet>'}, {path:'dataPoint>'}, {path:'selVar>'}], formatter: 'sap.ovp.cards.AnnotationHelper.getAggregateNumber'}\"\n\t\t\t\t\t\t\t\t  id=\"kpiHBoxNumeric\" class=\"numericContentHbox sapOvpKPIHeaderAggregateNumber tabindex0\" ><items><HBox class=\"innerNumericContentHbox tabindex0\" alignItems=\"End\"><NumericContent id=\"kpiNumberValue\"\n\t\t\t\t\t\t\t\t\t\t\tsize=\"M\" truncateValueTo=\"5\"\n\t\t\t\t\t\t\t\t\t\t\tvalue=\"{path:'dataPoint>', formatter: 'sap.ovp.cards.AnnotationHelper.formThePathForAggregateNumber'}\"\n\t\t\t\t\t\t\t\t\t\t\tformatterValue=\"true\"\n\t\t\t\t\t\t\t\t\t\t\tvalueColor=\"{path:'dataPoint>', formatter: 'sap.ovp.cards.AnnotationHelper.formatKPIHeaderState'}\"\n\t\t\t\t\t\t\t\t\t\t\tindicator=\"{path:'dataPoint>', formatter: 'sap.ovp.cards.AnnotationHelper.formThePathForTrendIcon'}\"\n\t\t\t\t\t\t\t\t\t\t\tstate=\"Loaded\" class=\"sapOvpKPIHeaderNumberValueStyle tabindex0\"\n\t\t\t\t\t\t\t\t\t\t\tpress=\"press\"\n\t\t\t\t\t\t\t\t\t\t\twithMargin=\"false\"></NumericContent><Text\n\t\t\t\t\t\t\t\t\t\t\tid=\"kpiNumberUOM\"\n\t\t\t\t\t\t\t\t\t\t\ttext=\"{path:'dataPoint>', formatter: 'sap.ovp.cards.AnnotationHelper.formThePathForUOM'}\"\n\t\t\t\t\t\t\t\t\t\t\tclass=\"sapOvpKPIHeaderUnitOfMeasureStyle tabindex0\"><customData><ovp:CustomData key=\"aria-label\" value=\"{path:'dataPoint>', formatter: 'sap.ovp.cards.AnnotationHelper.formThePathForUOM'}\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"heading\" writeToDom=\"true\" /><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /></customData></Text><Text\n\t\t\t\t\t\t\t\t\t\t\tid=\"kpiNumberPercentage\"\n\t\t\t\t\t\t\t\t\t\t\ttext=\"{path:'dataPoint>', formatter: 'sap.ovp.cards.AnnotationHelper.formPathForPercentageChange'}\"\n\t\t\t\t\t\t\t\t\t\t\tclass=\"sapOvpKPIHeaderTrendPercentStyle tabindex0\"><customData><ovp:CustomData key=\"aria-label\" value=\"{path:'dataPoint>', formatter: 'sap.ovp.cards.AnnotationHelper.formPathForPercentageChange'}\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"heading\" writeToDom=\"true\" /><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /></customData><layoutData><FlexItemData growFactor=\"1\"/></layoutData></Text></HBox></items></FlexBox></template:if><template:if test=\"{preVar>GroupBy}\"><FlexBox alignItems=\"Start\" justifyContent=\"SpaceBetween\"><Text maxLines=\"1\"\n\t\t\t\t\t\t\t\t\ttext=\"{path:'preVar>', formatter:'sap.ovp.cards.AnnotationHelper.listGroupBy'}\"\n\t\t\t\t\t\t\t\t\tclass=\"sapOvpKPIHeaderDimensionStyle tabindex0\"><customData><ovp:CustomData key=\"aria-label\" value=\"{path:'preVar>', formatter:'sap.ovp.cards.AnnotationHelper.listGroupBy'}\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"heading\" writeToDom=\"true\" /><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /></customData></Text></FlexBox></template:if><template:if test=\"{selVar>}\"><Text id=\"headerFilterText\" text=\"{path:'selVar>', formatter:'sap.ovp.cards.AnnotationHelper.formTheFilterByString'}\" maxLines=\"1\" class=\"sapOvpKPIHeaderFilterStyle tabindex0\"><customData><ovp:CustomData key=\"aria-label\" value=\"{path:'selVar>', formatter:'sap.ovp.cards.AnnotationHelper.formTheFilterByString'}\" writeToDom=\"true\" /><ovp:CustomData key=\"role\" value=\"heading\" writeToDom=\"true\" /><ovp:CustomData key=\"tabindex\" value=\"0\" writeToDom=\"true\" /></customData></Text></template:if></VBox></template:if></template:with></template:with></template:with></core:FragmentDefinition>\n",
	"web/ui5/resources/sap/ovp/cards/generic/Card.view.xml": "<mvc:View\n        controllerName=\"sap.ovp.cards.generic.Card\"\n        xmlns=\"sap.m\"\n        xmlns:core=\"sap.ui.core\"\n        xmlns:mvc=\"sap.ui.core.mvc\"\n        xmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><template:if test=\"{= ${ovpCardProperties>/contentPosition} === 'Right'}\" ><template:then><core:Fragment fragmentName=\"sap.ovp.cards.generic.ContentRight\" type=\"XML\"/></template:then><template:else><core:Fragment fragmentName=\"sap.ovp.cards.generic.ContentMiddle\" type=\"XML\"/></template:else></template:if><template:if test=\"{device>/support/touch}\"><template:then><core:HTML content=\"&lt;div&gt;&lt;/div&gt;\"></core:HTML></template:then><template:else><core:HTML content=\"&lt;div;&gt;&lt;/div&gt;\"></core:HTML></template:else></template:if></mvc:View>"
}, "web/ui5/resources/sap/ovp/cards/generic/Component-preload");