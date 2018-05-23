sap.ui.require.preload({
	"web/ui5/test-resources/sap/ushell/demoapps/AppLifeCyclePlugIn/Component.js": "!function(){\"use strict\";jQuery.sap.declare(\"sap.ushell.demo.AppLifeCyclePlugIn.Component\"),jQuery.sap.require(\"sap.ui.core.Component\");sap.ui.core.Component.extend(\"sap.ushell.demo.AppLifeCyclePlugIn.Component\",{metadata:{version:\"@version@\",library:\"sap.ushell.demo.AppLifeCyclePlugIn\"},_getRenderer:function(){var e,n=new jQuery.Deferred;return this._oShellContainer=jQuery.sap.getObject(\"sap.ushell.Container\"),this._oShellContainer?(e=this._oShellContainer.getRenderer())?n.resolve(e):(this._onRendererCreated=function(t){(e=t.getParameter(\"renderer\"))?n.resolve(e):n.reject(\"Illegal state: shell renderer not available after recieving 'rendererLoaded' event.\")},this._oShellContainer.attachRendererCreatedEvent(this._onRendererCreated)):n.reject(\"Illegal state: shell container not available; this component must be executed in a unified shell runtime context.\"),n.promise()},init:function(){var e=sap.ushell.Container.getService(\"AppLifeCycle\");e.attachAppLoaded(function(e){e.mParameters&&e.mParameters.componentInstance&&sap.m.MessageToast.show(e.mParameters.componentInstance.getId())}),this._getRenderer().fail(function(e){jQuery.sap.log.error(e,void 0,\"sap.ushell.demo.AppLifeCyclePlugIn\")}).done(function(n){n.addHeaderEndItem(\"sap.ushell.ui.shell.ShellHeadItem\",{icon:sap.ui.core.IconPool.getIconURI(\"question-mark\"),press:function(){var n=e.getCurrentApplication(),t=n&&n.applicationType,r=n&&n.homePage?\"a\":\"not a\",a=n&&n.componentInstance&&n.componentInstance.sId;sap.m.MessageToast.show(\"Component \"+a+\" of type \"+t+\" is \"+r+\" homepage\")}},!0,!1)})},exit:function(){this._oShellContainer&&this._onRendererCreated&&this._oShellContainer.detachRendererCreatedEvent(this._onRendererCreated)}})}();"
}, "web/ui5/test-resources/sap/ushell/demoapps/AppLifeCyclePlugIn/Component-preload");