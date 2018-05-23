sap.ui.require.preload({
	"web/ui5/resources/sap/uxap/component/Component-dbg.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"sap/uxap/ObjectPageConfigurationMode\",\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\",\"sap/ui/core/Component\"],function(o,e,t){\"use strict\";return e.extend(\"sap.uxap.component.Component\",{metadata:{},init:function(){switch(this._oModel=null,this._oViewConfig={viewData:{component:this}},this.oComponentData.mode){case o.JsonURL:this._oModel=new e(this.oComponentData.jsonConfigurationURL),this._oViewConfig.viewName=\"sap.uxap.component.ObjectPageLayoutUXDrivenFactory\",this._oViewConfig.type=sap.ui.core.mvc.ViewType.XML;break;case o.JsonModel:this._oViewConfig.viewName=\"sap.uxap.component.ObjectPageLayoutUXDrivenFactory\",this._oViewConfig.type=sap.ui.core.mvc.ViewType.XML;break;default:jQuery.sap.log.error(\"UxAPComponent :: missing bootstrap information. Expecting one of the following: JsonURL, JsonModel and FacetsAnnotation\")}e.prototype.init.call(this)},createContent:function(){var o;return this._oView=sap.ui.view(this._oViewConfig),this._oModel&&((o=this._oView.getController())&&o.connectToComponent&&o.connectToComponent(this._oModel),this._oView.setModel(this._oModel,\"objectPageLayoutMetadata\")),this._oView},propagateProperties:function(t){if(this.oComponentData.mode===o.JsonModel){var n=this._oView.getController();n&&n.connectToComponent&&n.connectToComponent(this.getModel(\"objectPageLayoutMetadata\"))}return e.prototype.propagateProperties.apply(this,arguments)},destroy:function(){this._oView&&(this._oView.destroy(),this._oView=null),this._oModel&&(this._oModel.destroy(),this._oModel=null),e.prototype.destroy&&e.prototype.destroy.call(this)}})});",
	"web/ui5/resources/sap/uxap/component/Component.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"sap/uxap/ObjectPageConfigurationMode\",\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\",\"sap/ui/core/Component\"],function(o,e,t){\"use strict\";return e.extend(\"sap.uxap.component.Component\",{metadata:{},init:function(){switch(this._oModel=null,this._oViewConfig={viewData:{component:this}},this.oComponentData.mode){case o.JsonURL:this._oModel=new e(this.oComponentData.jsonConfigurationURL),this._oViewConfig.viewName=\"sap.uxap.component.ObjectPageLayoutUXDrivenFactory\",this._oViewConfig.type=sap.ui.core.mvc.ViewType.XML;break;case o.JsonModel:this._oViewConfig.viewName=\"sap.uxap.component.ObjectPageLayoutUXDrivenFactory\",this._oViewConfig.type=sap.ui.core.mvc.ViewType.XML;break;default:jQuery.sap.log.error(\"UxAPComponent :: missing bootstrap information. Expecting one of the following: JsonURL, JsonModel and FacetsAnnotation\")}e.prototype.init.call(this)},createContent:function(){var o;return this._oView=sap.ui.view(this._oViewConfig),this._oModel&&((o=this._oView.getController())&&o.connectToComponent&&o.connectToComponent(this._oModel),this._oView.setModel(this._oModel,\"objectPageLayoutMetadata\")),this._oView},propagateProperties:function(t){if(this.oComponentData.mode===o.JsonModel){var n=this._oView.getController();n&&n.connectToComponent&&n.connectToComponent(this.getModel(\"objectPageLayoutMetadata\"))}return e.prototype.propagateProperties.apply(this,arguments)},destroy:function(){this._oView&&(this._oView.destroy(),this._oView=null),this._oModel&&(this._oModel.destroy(),this._oModel=null),e.prototype.destroy&&e.prototype.destroy.call(this)}})});",
	"web/ui5/resources/sap/uxap/component/ObjectPageComponentContainer-dbg.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"sap/ui/core/ComponentContainer\",\"sap/uxap/ObjectPageConfigurationMode\",\"sap/ui/core/Component\"],function(e,o){\"use strict\";return e.extend(\"sap.uxap.component.ObjectPageComponentContainer\",{metadata:{properties:{jsonConfigurationURL:{type:\"string\",group:\"Behavior\"},mode:{type:\"sap.uxap.ObjectPageConfigurationMode\",group:\"Behavior\"}}},init:function(){this.setPropagateModel(!0),this.setName(\"sap.uxap.component\")},onBeforeRendering:function(){this._oComponent=sap.ui.component(\"sap.uxap\"),this._oComponent||(this._oComponent=sap.ui.component({name:this.getName(),url:this.getUrl(),componentData:{jsonConfigurationURL:this.getJsonConfigurationURL(),mode:this.getMode()}}),this.setComponent(this._oComponent,!0)),e.prototype.onBeforeRendering&&e.prototype.onBeforeRendering.call(this)},getObjectPageLayoutInstance:function(){var e=null;return this._oComponent&&this._oComponent._oView?e=this._oComponent._oView.byId(\"ObjectPageLayout\"):jQuery.sap.log.error(\"ObjectPageComponentContainer :: cannot find children ObjectPageLayout, has it been rendered already?\"),e},renderer:\"sap.ui.core.ComponentContainerRenderer\"})});",
	"web/ui5/resources/sap/uxap/component/ObjectPageComponentContainer.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"sap/ui/core/ComponentContainer\",\"sap/uxap/ObjectPageConfigurationMode\",\"sap/ui/core/Component\"],function(e,o){\"use strict\";return e.extend(\"sap.uxap.component.ObjectPageComponentContainer\",{metadata:{properties:{jsonConfigurationURL:{type:\"string\",group:\"Behavior\"},mode:{type:\"sap.uxap.ObjectPageConfigurationMode\",group:\"Behavior\"}}},init:function(){this.setPropagateModel(!0),this.setName(\"sap.uxap.component\")},onBeforeRendering:function(){this._oComponent=sap.ui.component(\"sap.uxap\"),this._oComponent||(this._oComponent=sap.ui.component({name:this.getName(),url:this.getUrl(),componentData:{jsonConfigurationURL:this.getJsonConfigurationURL(),mode:this.getMode()}}),this.setComponent(this._oComponent,!0)),e.prototype.onBeforeRendering&&e.prototype.onBeforeRendering.call(this)},getObjectPageLayoutInstance:function(){var e=null;return this._oComponent&&this._oComponent._oView?e=this._oComponent._oView.byId(\"ObjectPageLayout\"):jQuery.sap.log.error(\"ObjectPageComponentContainer :: cannot find children ObjectPageLayout, has it been rendered already?\"),e},renderer:\"sap.ui.core.ComponentContainerRenderer\"})});",
	"web/ui5/resources/sap/uxap/component/ObjectPageLayoutUXDrivenFactory-dbg.controller.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"sap/ui/layout/GridData\",\"sap/ui/model/BindingMode\",\"sap/uxap/BlockBase\",\"sap/uxap/ModelMapping\",\"sap/ui/model/Context\",\"sap/ui/base/ManagedObject\",\"sap/ui/core/mvc/Controller\"],function(e,t,r,a,o,n,i){\"use strict\";return i.extend(\"sap.uxap.component.ObjectPageLayoutUXDrivenFactory\",{connectToComponent:function(e){var r=jQuery.isEmptyObject(e.getData());e.setDefaultBindingMode(t.OneWay);var a=jQuery.proxy(function(){r&&e.detachRequestCompleted(a);var t=new o(e,\"/headerTitle\"),n=this.getView().byId(\"ObjectPageLayout\");if(t.getProperty(\"\"))try{this._oHeader=this.controlFactory(n.getId(),t),n.setHeaderTitle(this._oHeader)}catch(e){jQuery.sap.log.error(\"ObjectPageLayoutFactory :: error in header creation from config: \"+e)}},this);r?e.attachRequestCompleted(a):a()},controlFactory:function(e,t){var r,a,o=t.getProperty(\"\");try{jQuery.sap.require(o.Type),a=jQuery.sap.getObject(o.Type).getMetadata(),jQuery.each(a._mAllEvents,jQuery.proxy(function(e,t){\"string\"==typeof o[e]&&(o[e]=this.convertEventHandler(o[e]))},this)),r=n.create(o),jQuery.each(a._mAllProperties,jQuery.proxy(function(e,a){o[e]&&r.bindProperty(e,\"objectPageLayoutMetadata>\"+t.getPath()+\"/\"+e)},this))}catch(e){jQuery.sap.log.error(\"ObjectPageLayoutFactory :: error in control creation from config: \"+e)}return r},convertEventHandler:function(e){var t=window,r=e.split(\".\");try{jQuery.each(r,function(e,r){t=t[r]})}catch(r){jQuery.sap.log.error(\"ObjectPageLayoutFactory :: undefined event handler: \"+e+\". Did you forget to require its static class?\"),t=void 0}return t}})},!0);",
	"web/ui5/resources/sap/uxap/component/ObjectPageLayoutUXDrivenFactory.controller.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"sap/ui/layout/GridData\",\"sap/ui/model/BindingMode\",\"sap/uxap/BlockBase\",\"sap/uxap/ModelMapping\",\"sap/ui/model/Context\",\"sap/ui/base/ManagedObject\",\"sap/ui/core/mvc/Controller\"],function(e,t,r,a,o,n,i){\"use strict\";return i.extend(\"sap.uxap.component.ObjectPageLayoutUXDrivenFactory\",{connectToComponent:function(e){var r=jQuery.isEmptyObject(e.getData());e.setDefaultBindingMode(t.OneWay);var a=jQuery.proxy(function(){r&&e.detachRequestCompleted(a);var t=new o(e,\"/headerTitle\"),n=this.getView().byId(\"ObjectPageLayout\");if(t.getProperty(\"\"))try{this._oHeader=this.controlFactory(n.getId(),t),n.setHeaderTitle(this._oHeader)}catch(e){jQuery.sap.log.error(\"ObjectPageLayoutFactory :: error in header creation from config: \"+e)}},this);r?e.attachRequestCompleted(a):a()},controlFactory:function(e,t){var r,a,o=t.getProperty(\"\");try{jQuery.sap.require(o.Type),a=jQuery.sap.getObject(o.Type).getMetadata(),jQuery.each(a._mAllEvents,jQuery.proxy(function(e,t){\"string\"==typeof o[e]&&(o[e]=this.convertEventHandler(o[e]))},this)),r=n.create(o),jQuery.each(a._mAllProperties,jQuery.proxy(function(e,a){o[e]&&r.bindProperty(e,\"objectPageLayoutMetadata>\"+t.getPath()+\"/\"+e)},this))}catch(e){jQuery.sap.log.error(\"ObjectPageLayoutFactory :: error in control creation from config: \"+e)}return r},convertEventHandler:function(e){var t=window,r=e.split(\".\");try{jQuery.each(r,function(e,r){t=t[r]})}catch(r){jQuery.sap.log.error(\"ObjectPageLayoutFactory :: undefined event handler: \"+e+\". Did you forget to require its static class?\"),t=void 0}return t}})},!0);",
	"web/ui5/resources/sap/uxap/component/ObjectPageLayoutUXDrivenFactory.view.xml": "<core:View xmlns:core=\"sap.ui.core\"\n\t\t   xmlns=\"sap.uxap\"\n\t\t   height=\"100%\"\n\t\t   controllerName=\"sap.uxap.component.ObjectPageLayoutUXDrivenFactory\"\n><ObjectPageLayout id=\"ObjectPageLayout\"\n\t\t\t\t\t  subSectionLayout=\"{objectPageLayoutMetadata>/subSectionLayout}\"\n\t\t\t\t\t  showAnchorBar=\"{objectPageLayoutMetadata>/showAnchorBar}\"\n\t\t\t\t\t  height=\"{objectPageLayoutMetadata>/height}\"\n\t\t\t\t\t  enableLazyLoading=\"{objectPageLayoutMetadata>/enableLazyLoading}\"\n\t\t\t\t\t  sections=\"{objectPageLayoutMetadata>/sections}\"\n\t\t\t\t\t  headerContent=\"{path:'objectPageLayoutMetadata>/headerContent', factory:'.controlFactory'}\"\n\t\t\t\t\t  showAnchorBarPopover=\"{objectPageLayoutMetadata>/showAnchorBarPopover}\"\n\t\t\t\t\t  upperCaseAnchorBar=\"{objectPageLayoutMetadata>/upperCaseAnchorBar}\"\n\t\t\t\t\t  useIconTabBar=\"{objectPageLayoutMetadata>/useIconTabBar}\"\n\t\t\t\t\t  showHeaderContent=\"{objectPageLayoutMetadata>/showHeaderContent}\"\n\t\t\t\t\t  useTwoColumnsForLargeScreen=\"{objectPageLayoutMetadata>/useTwoColumnsForLargeScreen}\"\n\t\t\t\t\t  showTitleInHeaderContent=\"{objectPageLayoutMetadata>/showTitleInHeaderContent}\"\n\t\t\t\t\t  showOnlyHighImportance=\"{objectPageLayoutMetadata>/showOnlyHighImportance}\"\n\t\t\t\t\t  isChildPage=\"{objectPageLayoutMetadata>/isChildPage}\"\n\t\t\t\t\t  alwaysShowContentHeader=\"{objectPageLayoutMetadata>/alwaysShowContentHeader}\"\n\t\t\t\t\t  showEditHeaderButton=\"{objectPageLayoutMetadata>/showEditHeaderButton}\"\n\t><sections><ObjectPageSection id=\"ObjectPageSection\"\n\t\t\t\t\t\t\t   title=\"{objectPageLayoutMetadata>title}\"\n\t\t\t\t\t\t\t   importance=\"{objectPageLayoutMetadata>importance}\"\n\t\t\t\t\t\t\t   showTitle=\"{objectPageLayoutMetadata>showTitle}\"\n\t\t\t\t\t\t\t   subSections=\"{objectPageLayoutMetadata>subSections}\"\n\t\t\t\t\t\t\t   visible=\"{objectPageLayoutMetadata>visible}\"><subSections><ObjectPageSubSection id=\"ObjectPageSubSection\"\n\t\t\t\t\t\t\t\t\t\t  title=\"{objectPageLayoutMetadata>title}\"\n\t\t\t\t\t\t\t\t\t\t  visible=\"{objectPageLayoutMetadata>visible}\"\n\t\t\t\t\t\t\t\t\t\t  mode=\"{objectPageLayoutMetadata>mode}\"\n\t\t\t\t\t\t\t\t\t\t  importance=\"{objectPageLayoutMetadata>importance}\"\n\t\t\t\t\t\t\t\t\t\t  actions=\"{path:'objectPageLayoutMetadata>actions', factory:'.controlFactory'}\"\n\t\t\t\t\t\t\t\t\t\t  blocks=\"{path:'objectPageLayoutMetadata>blocks', factory:'.controlFactory'}\"\n\t\t\t\t\t\t\t\t\t\t  moreBlocks=\"{path:'objectPageLayoutMetadata>moreBlocks', factory:'.controlFactory'}\"></ObjectPageSubSection></subSections></ObjectPageSection></sections></ObjectPageLayout></core:View>\n"
}, "web/ui5/resources/sap/uxap/component/Component-preload");