sap.ui.require.preload({
	"web/ui5/test-resources/sap/ushell/demoapps/AppContextSample/App.controller.js": "// @copyright@\nsap.ui.controller(\"sap.ushell.demo.AppContextSample.App\",{getComponent:function(){\"use strict\";var t=sap.ui.core.Component.getOwnerIdFor(this.getView());return sap.ui.component(t)},onInit:function(){\"use strict\";var t,e;this.sKeyPrefix=\"/UI2/USHELL/AppCSmp\",e=this.getComponent(),this.initFruitFavorites(e),t=this.getInnerAppStateKey(),this.restoreAppState(t),this.oURLModel=new sap.ui.model.json.JSONModel({toApp_href:\"<dummy>\"}),this.makeURLModel(\"\"),this.getView().setModel(this.oURLModel),this.oAppContext=sap.ushell.Container.getService(\"CrossApplicationNavigation\").createEmptyAppState(this.getMyComponent()),this.sOurAppInstanceContextKey=this.oAppContext.getKey(),sap.ui.core.routing.HashChanger.getInstance().replaceHash(\"/key/\"+this.sOurAppInstanceContextKey),this.onSelectedFruitChanged()},getMyComponent:function(){\"use strict\";var t=sap.ui.core.Component.getOwnerIdFor(this.getView());return sap.ui.component(t)},getInnerAppStateKey:function(){\"use strict\";var t=sap.ui.core.routing.HashChanger.getInstance().getHash();return t&&t.match(\"/key/(.*)\")?new RegExp(\"/key/(.*)\").exec(t)[1]:\"\"},makeURLModel:function(t){\"use strict\";var e=sap.ushell.Container.getService(\"CrossApplicationNavigation\").hrefForExternal({target:{semanticObject:\"Action\",action:\"toappcontextsample\"},appStateKey:t})||\"\";this.oURLModel.setData({toApp_href:e})},generateId:function(){\"use strict\";return String(Number(new Date))+this.createId(\"ctx\")},initFruitFavorites:function(t){\"use strict\";var e,n=this,i=n.getView().byId(\"PanelFruitFavorites\").getContent();for(e=0;e<i.length;e+=1)i[e].setEnabled(!1);sap.ushell.Container.getService(\"CrossApplicationNavigation\").getStartupAppState(t).done(function(t){n.transferAppStateToPanel(t,\"PanelFruitFavorites\",\"Fruits\")})},restoreAppState:function(t){\"use strict\";var e,n,i=this;for(this.disableInput(\"PanelSelectedFruitFavorites\"),this.disableInput(\"PanelMilkshakeFavorites\"),n=i.getView().byId(\"PanelMilkshakeFavorites\").getContent(),e=0;e<n.length;e+=1)n[e].setEnabled(!1);sap.ushell.Container.getService(\"CrossApplicationNavigation\").getAppState(this.getMyComponent(),t).done(function(t){i.disableInput(\"PanelSelectedFruitFavorites\",!0),i.disableInput(\"PanelMilkshakeFavorites\",!0),i.transferAppStateToPanel(t,\"PanelSelectedFruitFavorites\",\"Fruits\"),i.transferAppStateToPanel(t,\"PanelMilkshakeFavorites\",\"Milkshakes\")})},transferContainerToPanel:function(t,e,n){\"use strict\";var i,a,s=this.getView().byId(e).getContent();for(i=0;i<s.length;i+=1)a=t&&t.getItemValue(n+String(i))||!1,s[i].setSelected(a)},transferPanelToContainer:function(t,e,n){\"use strict\";var i,a=this.getView().byId(e).getContent();for(i=0;i<a.length;i+=1)t.setItemValue(n+String(i),a[i].getSelected())},transferAppStateToPanel:function(t,e,n){\"use strict\";var i,a,s=this.getView().byId(e).getContent();for(i=0;i<s.length;i+=1)a=t&&t.getData()&&t.getData()[n+String(i)]||!1,s[i].setSelected(a)},transferPanelToAppState:function(t,e,n){\"use strict\";var i,a,s=this.getView().byId(e).getContent();for(a=t.getData()||{},i=0;i<s.length;i+=1)a[n+String(i)]=s[i].getSelected();t.setData(a)},disableInput:function(t,e){\"use strict\";var n,i=this.getView().byId(t).getContent();for(e=e||!1,n=0;n<i.length;n+=1)i[n].setEnabled(e)},applyExistingFruitFavorites:function(t){\"use strict\";this.oPersonalizer.getPersData().done(this.onFruitFavoritesRead.bind(this)).fail(function(){jQuery.sap.log.error(\"Reading personalization data failed.\")})},onMilkshakeChanged:function(){\"use strict\";this.transferPanelToAppState(this.oAppContext,\"PanelMilkshakeFavorites\",\"Milkshakes\"),this.oAppContext.save()},onSelectedFruitChanged:function(){\"use strict\";this.transferPanelToAppState(this.oAppContext,\"PanelSelectedFruitFavorites\",\"Fruits\"),this.oAppContext.save(),this.updateURLTargets()},updateURLTargets:function(){\"use strict\";var t,e=this.getComponent();t=sap.ushell.Container.getService(\"CrossApplicationNavigation\").createEmptyAppState(e),this.transferPanelToAppState(t,\"PanelSelectedFruitFavorites\",\"Fruits\"),this.makeURLModel(t.getKey()),t.save()},onDestroy:function(){\"use strict\"}});",
	"web/ui5/test-resources/sap/ushell/demoapps/AppContextSample/Component.js": "jQuery.sap.declare(\"sap.ushell.demo.AppContextSample.Component\"),jQuery.sap.require(\"sap.ui.core.UIComponent\"),sap.ui.core.UIComponent.extend(\"sap.ushell.demo.AppContextSample.Component\",{oMainView:null,metadata:{version:\"@version@\",library:\"sap.ushell.demo.AppContextSample\",dependencies:{libs:[\"sap.m\"],components:[]},config:{title:\"App Context Sample\",icon:\"sap-icon://Fiori2/F0429\"}},createContent:function(){\"use strict\";var e=this.getComponentData&&this.getComponentData();return jQuery.sap.log.info(\"sap.ushell.demo.AppNavSample: app was started with parameters \"+JSON.stringify(e.startupParameters||{})),this.sFruitFavsContextKey=e.startupParameters&&e.startupParameters.fruitfavscontextkey&&e.startupParameters.fruitfavscontextkey[0]||\"\",this.oMainView=sap.ui.xmlview(\"sap.ushell.demo.AppContextSample.App\"),this.oMainView}});",
	"web/ui5/test-resources/sap/ushell/demoapps/AppContextSample/App.view.xml": "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><core:View controllerName=\"sap.ushell.demo.AppContextSample.App\" xmlns:core=\"sap.ui.core\"\n\txmlns=\"sap.m\" xmlns:table=\"sap.ui.table\"><VBox><Panel headerText=\"Sample Application for App Context\"><Panel headerText=\"Favorites List of Fruit as received by Invocation (startup parameters)\" id=\"PanelFruitFavorites\"><CheckBox text=\"Apple\" id=\"checkFavorites0\" /><CheckBox text=\"Banana\" id=\"checkFavorites1\" /><CheckBox text=\"Peach\" id=\"checkFavorites2\" /><CheckBox text=\"Orange\" id=\"checkFavorites3\" /><CheckBox text=\"Strawberry\" id=\"checkFavorites4\" /></Panel><Panel headerText=\"Favorites List of Fruits selected in this app (for passing to next app!)\" id=\"PanelSelectedFruitFavorites\"><CheckBox text=\"Apple\" id=\"checkIceCreamShakeFavorites0\" select=\"onSelectedFruitChanged\"/><CheckBox text=\"Banana\" id=\"checkIceCreamFavorites1\" select=\"onSelectedFruitChanged\"/><CheckBox text=\"Peach\" id=\"checkIceCreamFavorites2\" select=\"onSelectedFruitChanged\"/><CheckBox text=\"Orange\" id=\"checkIceCreamFavorites3\" select=\"onSelectedFruitChanged\"/><CheckBox text=\"Strawberry\" id=\"checkIceCreamFavorites4\" select=\"onSelectedFruitChanged\"/></Panel><Panel><Link href=\"{/toApp_href}\" text=\"Start with new selection\" tooltip=\"to View 2 (via link, note the href generation)\"></Link></Panel><Panel headerText=\"Favorites List of Milkshakes within our app, not shared, but restored on browser back (validity 0 [FLP Window content])\" id=\"PanelMilkshakeFavorites\"><CheckBox text=\"Apple\" id=\"checkMilkshakeFavorites0\"  select=\"onMilkshakeChanged\" /><CheckBox text=\"Banana\" id=\"checkMilkshakeFavorites1\" select=\"onMilkshakeChanged\" /><CheckBox text=\"Peach\" id=\"checkMilkshakeFavorites2\" select=\"onMilkshakeChanged\" /><CheckBox text=\"Orange\" id=\"checkMilkshakeFavorites3\"  select=\"onMilkshakeChanged\" /><CheckBox text=\"Strawberry\" id=\"checkMilkshakeFavorites4\" select=\"onMilkshakeChanged\" /></Panel></Panel></VBox></core:View>\n"
}, "web/ui5/test-resources/sap/ushell/demoapps/AppContextSample/Component-preload");