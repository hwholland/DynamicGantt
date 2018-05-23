// @copyright@
/**
 * @fileOverview QUnit tests for ushell-lib project
 */
(function () {
    "use strict";
    /*global sap */

    sap.ui2.srvc.test.qunit.addProject({
        name: 'ushell-lib',
        codebase: "ushell/resources/sap/ushell",
        testbase: "ushell/test-resources/sap/ushell/test",
        scripts: [
            // the code under test (prefer using jQuery.sap.require unless you need testPublishAt)
            "../../../test-resources/sap/ushell/bootstrap/sandbox.js",
            "../../../test-resources/sap/ushell/demoapps/UserDefaultPluginSample/Component.js",
            "../../../test-resources/sap/ushell/demoapps/UserDefaultTestPlugin/Component.js",
            "../../../resources/sap/ushell/adapters/local/ContainerAdapter.js",
            "components/container/ApplicationContainer.js",
            "components/tiles/applauncherdynamic/DynamicTile.controller.js",
            "services/Bookmark.js",
            "services/Container.js",
            "services/Personalization.js"
        ],
        tests: [
            //the unit tests (alphabetic order, please)
            "adapters/local/AppStateAdapter.qunit.js",
            "adapters/local/ClientSideTargetResolutionAdapter.qunit.js",
            "adapters/local/ContainerAdapter.qunit.js",
            "adapters/local/EndUserFeedbackAdapter.qunit.js",
            "adapters/local/NavTargetResolutionAdapter.qunit.js",
            "adapters/local/PersonalizationAdapter.qunit.js",
            "adapters/local/SupportTicketAdapterTest.qunit.js",
            "adapters/local/UserDefaultParameterPersistenceAdapter.qunit.js",
            "adapters/local/UserInfoAdapter.qunit.js",
            "adapters/cdm/CommonDataModelAdapter.qunit.js",
            "bootstrap/sandbox.qunit.js",
            "components/container/ApplicationContainer.qunit.js",
            "components/factsheet/annotation/Mapping.qunit.js",
            "components/factsheet/annotation/ODataURLTemplating.qunit.js",
            "components/tiles/utils.qunit.js",
            "components/tiles/applauncher/StaticTile.qunit.js",
            "components/tiles/applauncherdynamic/DynamicTile.qunit.js",
            "components/userActivity/userActivityLog.qunit.js",
            "services/AppLifeCycle.qunit.js",
            "services/AppState.qunit.js",
            "services/Bookmark.qunit.js",
            "services/ClientSideTargetResolution.qunit.js",
            "services/Container.qunit.js",
            "services/CrossApplicationNavigation.qunit.js",
            "services/LaunchPage.qunit.js",
            "services/Message.qunit.js",
            "services/Notifications.qunit.js",
            "services/NavTargetResolution.qunit.js",
            "services/Personalization.qunit.js",
            "services/AppContext.qunit.js",
            "services/ShellNavigation.qunit.js",
            "services/ShellNavigation.History.qunit.js",
            "services/SupportTicket.qunit.js",
            "services/EndUserFeedback.qunit.js",
            "services/UI5ComponentLoader.qunit.js",
            "services/URLParsing.qunit.js",
            "services/URLShortening.qunit.js",
            "services/UsageAnalytics.qunit.js",
            "services/UserDefaultParameterPersistence.qunit.js",
            "services/UserDefaultPluginSample.qunit.js",
            "services/UserDefaultParameters.qunit.js",
            "services/UserInfo.qunit.js",
            "services/UserRecents.qunit.js",
            "services/PluginManager.qunit.js",
            "services/AppConfiguration.qunit.js",
            "ui5service/ShellUIService.qunit.js",
            "System.qunit.js",
            "User.qunit.js",
            "Layout.qunit.js",
            "utils.qunit.js",
            "FLPAnalytics.qunit.js",
            "ui/footerbar/AboutButton.qunit.js",
            "ui/footerbar/AddBookmarkButton.qunit.js",
            "ui/footerbar/ContactSupportButton.qunit.js",
            "ui/footerbar/EndUserFeedback.qunit.js",
            "ui/footerbar/JamDiscussButton.qunit.js",
            "ui/footerbar/JamShareButton.qunit.js",
            "ui/footerbar/UserPreferencesButton.qunit.js",
            "ui/footerbar/LogoutButton.qunit.js",
            "ui/footerbar/SaveAsTile.qunit.js",
            "ui/footerbar/SettingsButton.qunit.js",
            "ui/launchpad/GroupListItem.qunit.js",
            "ui/launchpad/AnchorItem.qunit.js",
            "ui/launchpad/AnchorNavigationBar.qunit.js",
            "ui/launchpad/TileContainer.qunit.js",
            "ui/launchpad/LoadingDialog.qunit.js",
            "ui/launchpad/LinkTileWrapper.qunit.js",
            "ui/launchpad/ViewPortContainer.qunit.js",
            "ui/launchpad/AccessibilityCustomData.qunit.js",
            "ui/launchpad/EmbeddedSupportErrorMessage.qunit.js",
            "ui/shell/FloatingContainer.qunit.js",
            "ui/shell/RightFloatingContainer.qunit.js",
            "ui/shell/ShellTitle.qunit.js",
            "ui/shell/ShellAppTitle.qunit.js",
            "ui/shell/ShellLayout.qunit.js",
            "ui/shell/SplitContainer.qunit.js",
            "ui/tile/TileBase.qunit.js",
            "ui/tile/DynamicTile.qunit.js",
            "ui/tile/ImageTile.qunit.js",
            "ui/tile/StaticTile.qunit.js",

            "components/flp/FlpApp.qunit.js",
            "components/flp/ComponentKeysHandler.qunit.js",
            "components/flp/launchpad/DashboardManager.qunit.js",
            "components/flp/launchpad/dashboard/DashboardContent.qunit.js",
            "components/flp/launchpad/dashboard/DashboardUIActions.qunit.js",
            "components/flp/launchpad/PagingManager.qunit.js",
            "components/flp/launchpad/appfinder/AppFinder.qunit.js",
            "components/flp/launchpad/appfinder/EasyAccess.qunit.js",
            "renderers/fiori2/RendererExtensions.qunit.js",
            "renderers/fiori2/Renderer.qunit.js",
            "renderers/fiori2/Shell.qunit.js",
            "renderers/fiori2/UIActions.qunit.js",
            "renderers/fiori2/AccessKeysHandler.qunit.js",
            "renderers/fiori2//meArea/meArea.qunit.js",
            "renderers/fiori2//notifications/Notifications.qunit.js"
        ],
        integrationTests: []
    });
}());
