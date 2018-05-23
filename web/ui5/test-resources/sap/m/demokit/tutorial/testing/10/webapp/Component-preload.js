sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/resource/ResourceModel\",\"sap/ui/demo/bulletinboard/model/models\",\"sap/ui/Device\"],function(e,i,t,o){\"use strict\";return e.extend(\"sap.ui.demo.bulletinboard.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments),this.getModel().setDefaultBindingMode(\"TwoWay\"),this.setModel(t.createDeviceModel(),\"device\"),this.getRouter().initialize()}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/demo/bulletinboard/controller/BaseController\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.bulletinboard.controller.App\",{onInit:function(){var e=new t({busy:!0,delay:0});this.setModel(e,\"appView\"),this.getOwnerComponent().getModel().metadataLoaded().then(function(){e.setProperty(\"/busy\",!1)})}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/controller/BaseController.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/routing/History\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.bulletinboard.controller.BaseController\",{getEventBus:function(){return this.getOwnerComponent().getEventBus()},getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel(\"i18n\").getResourceBundle()},myNavBack:function(e,n){if(void 0!==t.getInstance().getPreviousHash())history.go(-1);else{this.getRouter().navTo(e,n,!0)}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/controller/Post.controller.js": "sap.ui.define([\"sap/ui/demo/bulletinboard/controller/BaseController\",\"sap/ui/model/json/JSONModel\",\"sap/ui/demo/bulletinboard/model/formatter\"],function(t,e,o){\"use strict\";return t.extend(\"sap.ui.demo.bulletinboard.controller.Post\",{formatter:o,onInit:function(){var t=new e({busy:!1});this.getRouter().getRoute(\"post\").attachPatternMatched(this._onPostMatched,this),this.setModel(t,\"postView\")},onNavBack:function(){this.myNavBack(\"worklist\")},_onPostMatched:function(t){var e=this.getModel(\"postView\"),o=this.getModel();this.getView().bindElement({path:\"/Posts('\"+t.getParameter(\"arguments\").postId+\"')\",events:{dataRequested:function(){o.metadataLoaded().then(function(){e.setProperty(\"/busy\",!0)})},dataReceived:function(){e.setProperty(\"/busy\",!1)}}})}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/controller/Worklist.controller.js": "sap.ui.define([\"sap/ui/demo/bulletinboard/controller/BaseController\",\"sap/ui/model/json/JSONModel\",\"sap/ui/demo/bulletinboard/model/formatter\",\"sap/ui/demo/bulletinboard/model/FlaggedType\"],function(e,t,i,l){\"use strict\";return e.extend(\"sap.ui.demo.bulletinboard.controller.Worklist\",{types:{flagged:new l},formatter:i,onInit:function(){var e,i,l=this.byId(\"table\");i=l.getBusyIndicatorDelay(),e=new t({worklistTableTitle:this.getResourceBundle().getText(\"worklistTableTitle\"),shareSendEmailSubject:this.getResourceBundle().getText(\"shareSendEmailWorklistSubject\"),shareSendEmailMessage:this.getResourceBundle().getText(\"shareSendEmailWorklistMessage\",[window.location.href]),tableBusyDelay:0}),this.setModel(e,\"worklistView\"),l.attachEventOnce(\"updateFinished\",function(){e.setProperty(\"/tableBusyDelay\",i)})},onUpdateFinished:function(e){var t,i=e.getSource(),l=e.getParameter(\"total\");t=l&&i.getBinding(\"items\").isLengthFinal()?this.getResourceBundle().getText(\"worklistTableTitleCount\",[l]):this.getResourceBundle().getText(\"worklistTableTitle\"),this.getModel(\"worklistView\").setProperty(\"/worklistTableTitle\",t)},onPress:function(e){this.getRouter().navTo(\"post\",{postId:e.getSource().getBindingContext().getProperty(\"PostID\")})},_updateListItemCount:function(e){var t;this._oTable.getBinding(\"items\").isLengthFinal()&&(t=this.getResourceBundle().getText(\"worklistTableTitleCount\",[e]),this.oViewModel.setProperty(\"/worklistTableTitle\",t))},onShareEmailPress:function(){var e=this.getModel(\"worklistView\");sap.m.URLHelper.triggerEmail(null,e.getProperty(\"/shareSendEmailSubject\"),e.getProperty(\"/shareSendEmailMessage\"))}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/localService/mockserver.js": "sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";var a;return{init:function(){var t=jQuery.sap.getUriParameters(),r=jQuery.sap.getModulePath(\"sap/ui/demo/bulletinboard/localService/mockdata\"),i=jQuery.sap.getModulePath(\"sap/ui/demo/bulletinboard/manifest\",\".json\"),s=jQuery.sap.syncGetJSON(i).data[\"sap.app\"].dataSources.mainService,o=jQuery.sap.getModulePath(\"sap/ui/demo/bulletinboard/\"+s.settings.localUri.replace(\".xml\",\"\"),\".xml\"),u=/.*\\/$/.test(s.uri)?s.uri:s.uri+\"/\";a=new e({rootUri:u}),e.config({autoRespond:!0,autoRespondAfter:t.get(\"serverDelay\")||1e3}),a.simulate(o,{sMockdataBaseUrl:r,bGenerateMissingMockData:!0}),a.start(),jQuery.sap.log.info(\"Running the app with mock data\")}}});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/model/FlaggedType.js": "sap.ui.define([\"sap/ui/model/SimpleType\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.bulletinboard.model.FlaggedType\",{formatValue:function(e){return 1===e},parseValue:function(e){return e?1:0},validateValue:function(){return!0}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/model/formatter.js": "sap.ui.define([],function(){\"use strict\";return{numberUnit:function(n){return n?parseFloat(n).toFixed(2):\"\"},priceState:function(n){return n<50?\"Success\":n>=50&&n<250?\"None\":n>=250&&n<2e3?\"Warning\":\"Error\"}}});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/model/models.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/Device\"],function(e,n){\"use strict\";return{createDeviceModel:function(){var i=new e(n);return i.setDefaultBindingMode(\"OneWay\"),i}}});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/integration/AllJourneys.js": "jQuery.sap.require(\"sap.ui.qunit.qunit-css\"),jQuery.sap.require(\"sap.ui.thirdparty.qunit\"),jQuery.sap.require(\"sap.ui.qunit.qunit-junit\"),QUnit.config.autostart=!1,sap.ui.require([\"sap/ui/test/Opa5\",\"sap/ui/demo/bulletinboard/test/integration/pages/Common\",\"sap/ui/demo/bulletinboard/test/integration/pages/Worklist\",\"sap/ui/demo/bulletinboard/test/integration/pages/Browser\",\"sap/ui/demo/bulletinboard/test/integration/pages/Post\"],function(t,e){\"use strict\";t.extendConfig({arrangements:new e,viewNamespace:\"sap.ui.demo.bulletinboard.view.\"}),sap.ui.require([\"sap/ui/demo/bulletinboard/test/integration/WorklistJourney\",\"sap/ui/demo/bulletinboard/test/integration/PostJourney\"],function(){QUnit.start()})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/integration/PostJourney.js": "sap.ui.require([\"sap/ui/test/opaQunit\"],function(e){\"use strict\";QUnit.module(\"Post\"),e(\"Should see the post page when a user clicks on an entry of the list\",function(e,o,t){e.iStartMyApp(),o.onTheWorklistPage.iPressOnTheItemWithTheID(\"PostID_15\"),t.onThePostPage.theTitleShouldDisplayTheName(\"Jeans\")}),e(\"Should go back to the TablePage\",function(e,o,t){o.onThePostPage.iPressTheBackButton(),t.onTheWorklistPage.iShouldSeeTheTable()}),e(\"Should be on the post page again when browser forwards is pressed\",function(e,o,t){o.onTheBrowser.iPressOnTheForwardButton(),t.onThePostPage.theTitleShouldDisplayTheName(\"Jeans\").and.iTeardownMyAppFrame()})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/integration/WorklistJourney.js": "sap.ui.require([\"sap/ui/test/opaQunit\"],function(e){\"use strict\";QUnit.module(\"Posts\"),e(\"Should see the table with all Posts\",function(e,t,o){e.iStartMyApp(),t.onTheWorklistPage.iLookAtTheScreen(),o.onTheWorklistPage.theTitleShouldDisplayTheTotalAmountOfItems()}),e(\"Should be able to load more items\",function(e,t,o){t.onTheWorklistPage.iPressOnMoreData(),o.onTheWorklistPage.theTableShouldHaveAllEntries().and.iTeardownMyAppFrame()})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/integration/pages/Browser.js": "sap.ui.require([\"sap/ui/test/Opa5\",\"sap/ui/demo/bulletinboard/test/integration/pages/Common\"],function(t,s){\"use strict\";t.createPageObjects({onTheBrowser:{baseClass:s,actions:{iPressOnTheForwardButton:function(){return this.waitFor({actions:function(){t.getWindow().history.forward()}})}},assertions:{}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/integration/pages/Common.js": "sap.ui.define([\"sap/ui/test/Opa5\",\"sap/ui/test/matchers/PropertyStrictEquals\"],function(t,e){\"use strict\";return t.extend(\"sap.ui.demo.bulletinboard.test.integration.pages.Common\",{constructor:function(e){t.apply(this,arguments),this._oConfig=e},iStartMyApp:function(t){var e;e=\"serverDelay=\"+(t=t||{delay:0}).delay,this.iStartMyAppInAFrame(function(t,e){t=t||\"\";var r=jQuery.sap.getResourcePath(\"sap/ui/demo/bulletinboard/app\",\".html\");return e&&(e=\"?\"+e),r+e+\"#\"+t}(t.hash,e))},iLookAtTheScreen:function(){return this}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/integration/pages/Post.js": "sap.ui.require([\"sap/ui/test/Opa5\",\"sap/ui/test/matchers/Properties\",\"sap/ui/demo/bulletinboard/test/integration/pages/Common\",\"sap/ui/test/actions/Press\"],function(e,t,s,a){\"use strict\";e.createPageObjects({onThePostPage:{baseClass:s,actions:{iPressTheBackButton:function(){return this.waitFor({id:\"page\",viewName:\"Post\",actions:new a,errorMessage:\"Did not find the nav button on object page\"})}},assertions:{theTitleShouldDisplayTheName:function(s){return this.waitFor({id:\"objectHeader\",viewName:\"Post\",matchers:new t({title:s}),success:function(t){e.assert.ok(!0,\"was on the remembered detail page\")},errorMessage:\"The Post \"+s+\" is not shown\"})}}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/integration/pages/Worklist.js": "sap.ui.require([\"sap/ui/test/Opa5\",\"sap/ui/test/matchers/AggregationLengthEquals\",\"sap/ui/test/matchers/PropertyStrictEquals\",\"sap/ui/test/matchers/BindingPath\",\"sap/ui/demo/bulletinboard/test/integration/pages/Common\",\"sap/ui/test/actions/Press\"],function(e,t,s,a,i,r){\"use strict\";e.createPageObjects({onTheWorklistPage:{baseClass:i,actions:{iPressOnMoreData:function(){return this.waitFor({id:\"table\",viewName:\"Worklist\",actions:new r,errorMessage:\"The Table does not have a trigger\"})},iPressOnTheItemWithTheID:function(e){return this.waitFor({controlType:\"sap.m.ColumnListItem\",viewName:\"Worklist\",matchers:new a({path:\"/Posts('\"+e+\"')\"}),actions:new r,errorMessage:\"No list item with the id \"+e+\" was found.\"})}},assertions:{theTableShouldHaveAllEntries:function(){return this.waitFor({id:\"table\",viewName:\"Worklist\",matchers:new t({name:\"items\",length:23}),success:function(){e.assert.ok(!0,\"The table has 23 items\")},errorMessage:\"Table does not have all entries.\"})},theTitleShouldDisplayTheTotalAmountOfItems:function(){return this.waitFor({id:\"tableHeader\",viewName:\"Worklist\",matchers:function(e){var t=e.getModel(\"i18n\").getResourceBundle().getText(\"worklistTableTitleCount\",[23]);return new s({name:\"text\",value:t}).isMatching(e)},success:function(){e.assert.ok(!0,\"The table header has 23 items\")},errorMessage:\"The Table's header does not container the number of items: 23\"})},iShouldSeeTheTable:function(){return this.waitFor({id:\"table\",viewName:\"Worklist\",success:function(){e.assert.ok(!0,\"The table is visible\")},errorMessage:\"Was not able to see the table.\"})}}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/unit/allTests.js": "sap.ui.define([\"test/unit/model/models\",\"test/unit/model/formatter\",\"test/unit/model/FlaggedType\"],function(){\"use strict\"});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/unit/model/FlaggedType.js": "sap.ui.require([\"sap/ui/demo/bulletinboard/model/FlaggedType\"],function(t){\"use strict\";QUnit.module(\"FlaggedType - formatting\"),QUnit.test(\"Should convert 1 to true\",function(e){var r=(new t).formatValue(1);e.strictEqual(r,!0,\"The formatting conversion was correct\")}),QUnit.test(\"Should convert other values to false\",function(e){var r=new t,a=r.formatValue(0),n=r.formatValue(-666);e.strictEqual(a,!1,\"The formatting conversion was correct\"),e.strictEqual(n,!1,\"The formatting conversion was correct\")}),QUnit.module(\"FlaggedType - parsing\"),QUnit.test(\"Should parse false to 0\",function(e){var r=(new t).parseValue(!1);e.strictEqual(r,0,\"The parsing conversion matched the input\")}),QUnit.test(\"Should parse true to 1\",function(e){var r=(new t).parseValue(!0);e.strictEqual(r,1,\"The parsing conversion matched the input\")})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/unit/model/formatter.js": "sap.ui.require([\"sap/ui/demo/bulletinboard/model/formatter\"],function(t){\"use strict\";function e(e,i,r){var n=t.numberUnit(i);e.strictEqual(n,r,\"The rounding was correct\")}function i(e){var i=t.priceState(e.price);e.assert.strictEqual(i,e.expected,\"The price state was correct\")}QUnit.module(\"Number unit\"),QUnit.test(\"Should round down a 3 digit number\",function(t){e.call(this,t,\"3.123\",\"3.12\")}),QUnit.test(\"Should round up a 3 digit number\",function(t){e.call(this,t,\"3.128\",\"3.13\")}),QUnit.test(\"Should round a negative number\",function(t){e.call(this,t,\"-3\",\"-3.00\")}),QUnit.test(\"Should round an empty string\",function(t){e.call(this,t,\"\",\"\")}),QUnit.test(\"Should round a zero\",function(t){e.call(this,t,\"0\",\"0.00\")}),QUnit.module(\"Price State\"),QUnit.test(\"Should format the products with a price lower than 50 to Success\",function(t){i.call(this,{assert:t,price:42,expected:\"Success\"})}),QUnit.test(\"Should format the products with a price of 50 to Normal\",function(t){i.call(this,{assert:t,price:50,expected:\"None\"})}),QUnit.test(\"Should format the products with a price between 50 and 250 to Normal\",function(t){i.call(this,{assert:t,price:112,expected:\"None\"})}),QUnit.test(\"Should format the products with a price between 250 and 2000 to Warning\",function(t){i.call(this,{assert:t,price:798,expected:\"Warning\"})}),QUnit.test(\"Should format the products with a price higher than 2000 to Error\",function(t){i.call(this,{assert:t,price:2001,expected:\"Error\"})})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/test/unit/model/models.js": "sap.ui.require([\"sap/ui/demo/bulletinboard/model/models\",\"sap/ui/thirdparty/sinon\",\"sap/ui/thirdparty/sinon-qunit\"],function(e){\"use strict\";function i(i,t){this.stub(sap.ui.Device,\"system\",{phone:t}),this.oDeviceModel=e.createDeviceModel(),i.strictEqual(this.oDeviceModel.getData().system.phone,t,\"IsPhone property is correct\")}function t(i,t){this.stub(sap.ui.Device,\"support\",{touch:t}),this.oDeviceModel=e.createDeviceModel(),i.strictEqual(this.oDeviceModel.getData().support.touch,t,\"IsTouch property is correct\")}QUnit.module(\"createDeviceModel\",{afterEach:function(){this.oDeviceModel.destroy()}}),QUnit.test(\"Should initialize a device model for desktop\",function(e){i.call(this,e,!1)}),QUnit.test(\"Should initialize a device model for phone\",function(e){i.call(this,e,!0)}),QUnit.test(\"Should initialize a device model for non touch devices\",function(e){t.call(this,e,!1)}),QUnit.test(\"Should initialize a device model for touch devices\",function(e){t.call(this,e,!0)}),QUnit.test(\"The binding mode of the device model should be one way\",function(i){this.oDeviceModel=e.createDeviceModel(),i.strictEqual(this.oDeviceModel.getDefaultBindingMode(),\"OneWay\",\"Binding mode is correct\")})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/view/App.view.xml": "<mvc:View\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tcontrollerName=\"sap.ui.demo.bulletinboard.controller.App\"\n\tdisplayBlock=\"true\"\n\txmlns=\"sap.m\"><App id=\"app\"\n\t\t busy=\"{appView>/busy}\"\n\t\t busyIndicatorDelay=\"{appView>/delay}\"/></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/view/Post.view.xml": "<mvc:View\n\t\tcontrollerName=\"sap.ui.demo.bulletinboard.controller.Post\"\n\t\txmlns=\"sap.m\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns:semantic=\"sap.m.semantic\"><semantic:FullscreenPage\n\t\t\tid=\"page\"\n\t\t\tbusy=\"{postView>/busy}\"\n\t\t\tbusyIndicatorDelay=\"0\"\n\t\t\tnavButtonPress=\"onNavBack\"\n\t\t\tshowNavButton=\"true\"\n\t\t\ttitle=\"{i18n>objectTitle}\"><semantic:content><ObjectHeader\n\t\t\t\t\tid=\"objectHeader\"\n\t\t\t\t\ttitle=\"{Title}\"\n\t\t\t\t\tnumber=\"{Price}\"\n\t\t\t\t\tnumberUnit=\"{Currency}\"></ObjectHeader></semantic:content></semantic:FullscreenPage></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/view/Worklist.view.xml": "<mvc:View\n\t\tcontrollerName=\"sap.ui.demo.bulletinboard.controller.Worklist\"\n\t\txmlns=\"sap.m\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns:semantic=\"sap.m.semantic\"><semantic:FullscreenPage\n\t\t\tid=\"page\"\n\t\t\ttitle=\"{i18n>worklistViewTitle}\"><semantic:content><Table\n\t\t\t\t\tid=\"table\"\n\t\t\t\t\twidth=\"auto\"\n\t\t\t\t\tclass=\"sapUiResponsiveMargin\"\n\t\t\t\t\tgrowing=\"true\"\n\t\t\t\t\titems=\"{\n\t\t\t\t\tpath: '/Posts',\n\t\t\t\t\tsorter: {\n\t\t\t\t\t\tpath: 'Title',\n\t\t\t\t\t\tdescending: false\n\t\t\t\t\t\t}\n\t\t\t\t\t}\"\n\t\t\t\t\tbusyIndicatorDelay=\"{worklistView>/tableBusyDelay}\"\n\t\t\t\t\tupdateFinished=\"onUpdateFinished\"><headerToolbar><Toolbar><Label id=\"tableHeader\" text=\"{worklistView>/worklistTableTitle}\"/></Toolbar></headerToolbar><columns><Column width=\"33%\" id=\"nameColumn\" vAlign=\"Middle\"><Text text=\"{i18n>TableNameColumnTitle}\" id=\"nameColumnTitle\"/></Column><Column width=\"33%\" id=\"categoryColumn\" vAlign=\"Middle\"><Text text=\"{i18n>TableCategoryColumnTitle}\" id=\"categoryColumnTitle\"/></Column><Column width=\"33%\" id=\"unitNumberColumn\" hAlign=\"End\" vAlign=\"Middle\"><Text text=\"{i18n>TableUnitNumberColumnTitle}\" id=\"unitNumberColumnTitle\"/></Column><Column width=\"80px\" id=\"flaggedColumn\" demandPopin=\"true\" vAlign=\"Middle\"/></columns><items><ColumnListItem\n\t\t\t\t\t\t\tvAlign=\"Middle\"\n\t\t\t\t\t\t\ttype=\"Navigation\"\n\t\t\t\t\t\t\tpress=\"onPress\"><cells><ObjectIdentifier\n\t\t\t\t\t\t\t\t\ttitle=\"{Title}\"/><Text\n\t\t\t\t\t\t\t\t\ttext=\"{Category}\"/><ObjectNumber\n\t\t\t\t\t\t\t\t\tnumber=\"{\n\t\t\t\t\t\t\t\t\t\tpath: 'Price',\n\t\t\t\t\t\t\t\t\t\tformatter: '.formatter.numberUnit'\n\t\t\t\t\t\t\t\t\t}\"\n\t\t\t\t\t\t\t\t\tstate=\"{\n\t\t\t\t\t\t\t\t\t\tpath: 'Price',\n\t\t\t\t\t\t\t\t\t\tformatter: '.formatter.priceState'\n\t\t\t\t\t\t\t\t\t}\"\n\t\t\t\t\t\t\t\t\tunit=\"{Currency}\"/><ToggleButton\n\t\t\t\t\t\t\t\t\tid=\"flaggedButton\"\n\t\t\t\t\t\t\t\t\ttooltip=\"{i18n>flaggedTooltip}\"\n\t\t\t\t\t\t\t\t\ticon=\"sap-icon://flag\"\n\t\t\t\t\t\t\t\t\tpressed=\"{\n\t\t\t\t\t\t\t\t\t\tpath: 'Flagged',\n\t\t\t\t\t\t\t\t\t\ttype: '.types.flagged'\n\t\t\t\t\t\t\t\t\t}\"\n\t\t\t\t\t\t\t\t\tclass=\"sapUiMediumMarginBeginEnd\"/></cells></ColumnListItem></items></Table></semantic:content><semantic:sendEmailAction><semantic:SendEmailAction id=\"shareEmail\" press=\"onShareEmailPress\"/></semantic:sendEmailAction></semantic:FullscreenPage></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/i18n/i18n.properties": "# This is the resource bundle for the worklist app\n\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Table view title\nworklistViewTitle=Bulletin Board\n\n#XTIT: Table view title\nworklistTableTitle=Posts\n\n#XTIT: Table view title with placeholder for the number of items\nworklistTableTitleCount=Posts ({0})\n\n#XTIT: The title of the column containing the Names of objects\nTableNameColumnTitle=Name\n\n#XTIT: The title of the column containing the Category of objects\nTableCategoryColumnTitle=Category\n\n#XTIT: The title of the column containing the unit number and the unit of measure\nTableUnitNumberColumnTitle=Price\n\n#XTOL: tooltip for the flagged button\nflaggedTooltip=Mark this post as flagged\n\n#~~~ Object View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Object view title\nobjectTitle=Post\n\n#~~~ Footer Options ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Send E-Mail subject\nshareSendEmailWorklistSubject=<Email subject PLEASE REPLACE ACCORDING TO YOUR USE CASE>\n\n#YMSG: Send E-Mail message\nshareSendEmailWorklistMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE>\\r\\n{0}\n\n"
}, "web/ui5/test-resources/sap/m/demokit/tutorial/testing/10/webapp/Component-preload");