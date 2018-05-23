
(function () {
    "use strict";
    /*global jQuery, sap, localStorage, window */
    jQuery.sap.log.debug("PluginAddSideBarItem - module loaded");

    jQuery.sap.declare("sap.ushell.demo.PluginAddSideBarItem");

    var oRenderer = jQuery.sap.getObject("sap.ushell.renderers.fiori2.Renderer");

    function applyRenderer() {
        jQuery.sap.log.debug("PluginAddSideBarItem - inserting a sample button onto the shell's side bar after renderer was loaded");

        if (!oRenderer) {
            oRenderer = sap.ushell.Container.getRenderer("fiori2");
        }

        if (oRenderer) {
            oRenderer.addToolAreaItem(
               {
                    id: 'sideBarButton',
                    icon: "sap-icon://documents",
                    expandable: true,
                    press: function (evt) {
                        window.alert('Press' );
                    },
                   expand: function (evt) {
                       window.alert('Expand' );
                   }
                }, true, false, ["home"]);
            oRenderer.addToolAreaItem(
                {
                    id: 'sideBarButton1',
                    icon: "sap-icon://newspaper",
                    expandable: true,
                    press: function (evt) {
                        window.alert('Press' );
                    },
                    expand: function (evt) {
                        window.alert('Expand' );
                    }
                }, true, false, ["home", "app"]);
            oRenderer.addToolAreaItem(
                {
                    id: 'sideBarButton2',
                    icon: "sap-icon://settings",
                    expandable: false,
                    press: function (evt) {
                        window.alert('Press' );
                    }
                }, true, false, ["home", "app"]);
            oRenderer.addToolAreaItem(
                {
                    id: 'sideBarButton3',
                    icon: "sap-icon://wrench",
                    expandable: true,
                    press: function (evt) {
                        window.alert('Press' );
                    },
                    expand: function (evt) {
                        window.alert('Expand' );
                    }
                }, true, false, ["home", "app"]);
            oRenderer.addToolAreaItem(
                {
                    id: 'sideBarButton4',
                    icon: "sap-icon://employee-approvals",
                    expandable: false,
                    press: function (evt) {
                        window.alert('Press' );
                    }
                }, true, false, ["home", "app"]);
            oRenderer.addToolAreaItem(
                {
                    id: 'sideBarButton5',
                    icon: "sap-icon://fallback",
                    expandable: false,
                    press: function (evt) {
                        window.alert('Press' );
                    }

                }, true, false, ["home", "app"]);
            oRenderer.addToolAreaItem(
                {
                    id: 'sideBarButton6',
                    icon: "sap-icon://vertical-bar-chart-2",
                    expandable: false,
                    press: function (evt) {
                        window.alert('Press' );
                    }
                }, true, false, ["home", "app"]);

            var oConfigBtn = sap.ui.getCore().byId("configBtn");
            sap.ushell.renderers.fiori2.RendererExtensions.removeHeaderItem(oConfigBtn, "app", "home");
            oRenderer.addHeaderItem("sap.ushell.ui.shell.ShellHeadItem", {
                id: "toggleToolArea",
                icon: sap.ui.core.IconPool.getIconURI("menu2"),
                press: function (oEvent) {
                    var oSource = oEvent.getSource(),
                        bState = oSource.getModel().getProperty("/currentState/toolAreaVisible");
                    var oRenderer = sap.ushell.Container.getRenderer("fiori2");
                    oRenderer.showToolArea("home", !bState);
                    oRenderer.showToolArea("app", !bState);
                }
            }, true, true);
            jQuery.sap.log.debug("PluginAddSideBarItem - Added a sample button onto the shell's side bar ONLY for Home state");
        } else {
            jQuery.sap.log.error("BootstrapPluginSample - failed to apply renderer extensions, because 'sap.ushell.renderers.fiori2.RendererExtensions' not available");
        }
    }

    // the module could be loaded asynchronously, the shell does not guarantee a loading order;
    // therefore, we have to consider both cases, i.e. renderer is loaded before or after this module
    if (oRenderer) {
        // fiori renderer already loaded, apply extensions directly
        applyRenderer();
    } else {
        // fiori renderer not yet loaded, register handler for the loaded event
        sap.ui.getCore().getEventBus().subscribe("sap.ushell.renderers.fiori2.Renderer", "rendererLoaded", applyRenderer, this);
    }

}());
