sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.sample.PatternMatching.Component\",{metadata:{dependencies:{libs:[\"sap.m\"]},config:{sample:{iframe:\"Patterns.html\",stretch:!0,files:[\"patternApp/view/PatternTable.controller.js\",\"patternApp/view/PatternTable.view.xml\",\"patternApp/view/Dialog.fragment.xml\",\"patternApp/model/Pattern.js\",\"patternApp/Component.js\",\"Patterns.html\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/Component-preload.js": "sap.ui.require.preload({\"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/Component.js\":'sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/core/mvc/View\"],function(e,t){\"use strict\";return e.extend(\"patternApp.Component\",{createContent:function(){return sap.ui.view({viewName:\"patternApp.view.PatternTable\",type:\"XML\"})}})});',\"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/model/Pattern.js\":'sap.ui.define([\"jquery.sap.global\",\"sap/ui/model/json/JSONModel\",\"sap/ui/core/routing/HashChanger\",\"jquery.sap.script\"],function(t,a,e){\"use strict\";return a.extend(\"patternApp.model.Pattern\",{constructor:function(t){var r=e.getInstance();this._oPatternData={sampleRoutes:[{pattern:\"Product/5/Detail/3\",description:\"Supplies the two mandatory parameters\"},{pattern:\"Product\",description:\"Matches the optional routes\"},{pattern:\"Product/5\",description:\"Matches the optional routes too\"},{pattern:\"Product?price=desc&category=notebook\",description:\"Prodvides key value pairs\"},{pattern:\"anything\",description:\"will match the all variable\"}]},this._aPatterns=[],this._oPatternData.patterns=this._aPatterns,this._oRouter=t,a.call(this,this._oPatternData),this.addPattern(\"product/{MandatoryProductId}/detail/{DetailId}\"),this.addPattern(\"product/:OptionalProductId:\"),this.addPattern(\"product:?OptionalQueryString:\"),this.addPattern(\":*all:\"),this._oPatternData.currentHash=r.getHash(),r.attachEvent(\"hashChanged\",this._onHashChanged,this)},addPattern:function(a){var e=this._aPatterns.length,r=t.sap.uid();this._aPatterns.push({pattern:a,matched:!1,parameters:\"Did not match!\"}),this._oRouter.addRoute({pattern:a,name:r,greedy:!0}),this._oRouter.getRoute(r).attachMatched(function(t){this._aPatterns[e].matched=!0,this._aPatterns[e].parameters=JSON.stringify(t.getParameter(\"arguments\")),this.setData(this._oPatternData)},this),this.setData(this._oPatternData)},resetMatched:function(){this._aPatterns.forEach(function(t){t.matched=!1,t.parameters=\"Did not match!\"})},_onHashChanged:function(t){this._oPatternData.currentHash=t.getParameter(\"newHash\"),this.setData(this._oPatternData)}})});',\"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/view/PatternTable.controller.js\":'sap.ui.define([\"patternApp/model/Pattern\",\"sap/ui/core/Fragment\",\"sap/ui/core/mvc/Controller\",\"sap/ui/core/routing/HashChanger\",\"sap/ui/core/routing/Router\",\"sap/ui/model/Filter\"],function(e,t,a,i,n,r){\"use strict\";return a.extend(\"patternApp.view.PatternTable\",{onInit:function(){var t=new n;this._oModel=new e(t),this.getView().setModel(this._oModel),t.initialize()},onSetHash:function(){var e=this.getView().byId(\"hash\").getValue();e!==this._sHash&&(this._oModel.resetMatched(),this._sHash=e,i.getInstance().replaceHash(e))},onAddPattern:function(){this._oModel.addPattern(this.getView().byId(\"pattern\").getValue())},handleValueHelp:function(){this._valueHelpDialog||(this._valueHelpDialog=sap.ui.xmlfragment(\"patternApp.view.Dialog\",this),this.getView().addDependent(this._valueHelpDialog)),this._valueHelpDialog.open()},handleValueHelpSearch:function(e){var t=e.getParameter(\"value\"),a=new r(\"pattern\",sap.ui.model.FilterOperator.Contains,t);e.getSource().getBinding(\"items\").filter([a])},handleValueHelpClose:function(e){var t=e.getParameter(\"selectedItem\");t&&this.getView().byId(\"hash\").setValue(t.getTitle());e.getSource().getBinding(\"items\").filter([])},formatMatched:function(e){return e?\"Success\":\"Error\"},formatHash:function(e){return e||\"empty\"}})});',\"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/view/Dialog.fragment.xml\":'<core:FragmentDefinition\\n\\t\\txmlns=\"sap.m\"\\n\\t\\txmlns:core=\"sap.ui.core\"><SelectDialog\\n\\t\\t\\ttitle=\"Sample Routes\"\\n\\t\\t\\titems=\"{/sampleRoutes}\"\\n\\t\\t\\tconfirm=\"handleValueHelpClose\"\\n\\t\\t\\tcancel=\"handleValueHelpClose\"\\n\\t\\t\\tsearch=\"handleValueHelpSearch\"><StandardListItem\\n\\t\\t\\t\\ttitle=\"{pattern}\"\\n\\t\\t\\t\\tdescription=\"{description}\" /></SelectDialog></core:FragmentDefinition>',\"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/view/PatternTable.view.xml\":'<mvc:View controllerName=\"patternApp.view.PatternTable\"\\n\\t\\txmlns=\"sap.m\"\\n\\t\\txmlns:core=\"sap.ui.core\"\\n\\t\\txmlns:mvc=\"sap.ui.core.mvc\"\\n\\t\\txmlns:f=\"sap.ui.layout.form\"\\n\\t\\txmlns:html=\"http://www.w3.org/1999/xhtml\"><f:SimpleForm editable=\"false\" title=\"Hash\"><Label for=\"current\" text=\"Current hash\"></Label><Text for=\"hash\" text=\"{\\n\\t\\t\\t\\t\\tpath: \\'/currentHash\\',\\n\\t\\t\\t\\t\\tformatter: \\'.formatHash\\'\\n\\t\\t\\t\\t}\"></Text></f:SimpleForm><f:SimpleForm editable=\"true\"><Input\\n\\t\\t\\t\\t\\t\\tid=\"hash\"\\n\\t\\t\\t\\t\\t\\tshowSuggestion=\"true\"\\n\\t\\t\\t\\t\\t\\tshowValueHelp=\"true\"\\n\\t\\t\\t\\t\\t\\tvalueHelpRequest=\"handleValueHelp\"\\n\\t\\t\\t\\t\\t\\tsuggestionItems=\"{/sampleRoutes}\"\\n\\t\\t\\t\\t\\t\\tplaceholder=\"Enter new hash\"><suggestionItems><core:Item text=\"{pattern}\" /></suggestionItems></Input><Button text=\"Set Hash\" press=\"onSetHash\"></Button></f:SimpleForm><Title class=\"sapUiSmallMarginBegin sapUiSmallMarginTop\" text=\"Routes\" level=\"H2\"/><Table items=\"{/patterns}\"><headerToolbar><Toolbar><Label for=\"pattern\" text=\"Pattern\"></Label><ToolbarSpacer></ToolbarSpacer><Input\\n\\t\\t\\t\\t\\t\\t\\t\\tid=\"pattern\"\\n\\t\\t\\t\\t\\t\\t\\t\\twidth=\"50%\"\\n\\t\\t\\t\\t\\t\\t\\t\\tplaceholder=\"Enter new pattern\"></Input><Button icon=\"sap-icon://add\" press=\"onAddPattern\"></Button></Toolbar></headerToolbar><columns><Column><Text text=\"Patterns\" /></Column><Column><Text text=\"Match\" /></Column></columns><items><ColumnListItem><cells><Text text=\"{pattern}\"></Text><ObjectStatus\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tstate=\"{\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tpath : \\'matched\\',\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tformatter : \\'.formatMatched\\'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ttext=\"{parameters}\"></ObjectStatus></cells></ColumnListItem></items></Table></mvc:View>\\n'},\"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/Component-preload\");",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/core/mvc/View\"],function(e,t){\"use strict\";return e.extend(\"patternApp.Component\",{createContent:function(){return sap.ui.view({viewName:\"patternApp.view.PatternTable\",type:\"XML\"})}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/model/Pattern.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/model/json/JSONModel\",\"sap/ui/core/routing/HashChanger\",\"jquery.sap.script\"],function(t,a,e){\"use strict\";return a.extend(\"patternApp.model.Pattern\",{constructor:function(t){var r=e.getInstance();this._oPatternData={sampleRoutes:[{pattern:\"Product/5/Detail/3\",description:\"Supplies the two mandatory parameters\"},{pattern:\"Product\",description:\"Matches the optional routes\"},{pattern:\"Product/5\",description:\"Matches the optional routes too\"},{pattern:\"Product?price=desc&category=notebook\",description:\"Prodvides key value pairs\"},{pattern:\"anything\",description:\"will match the all variable\"}]},this._aPatterns=[],this._oPatternData.patterns=this._aPatterns,this._oRouter=t,a.call(this,this._oPatternData),this.addPattern(\"product/{MandatoryProductId}/detail/{DetailId}\"),this.addPattern(\"product/:OptionalProductId:\"),this.addPattern(\"product:?OptionalQueryString:\"),this.addPattern(\":*all:\"),this._oPatternData.currentHash=r.getHash(),r.attachEvent(\"hashChanged\",this._onHashChanged,this)},addPattern:function(a){var e=this._aPatterns.length,r=t.sap.uid();this._aPatterns.push({pattern:a,matched:!1,parameters:\"Did not match!\"}),this._oRouter.addRoute({pattern:a,name:r,greedy:!0}),this._oRouter.getRoute(r).attachMatched(function(t){this._aPatterns[e].matched=!0,this._aPatterns[e].parameters=JSON.stringify(t.getParameter(\"arguments\")),this.setData(this._oPatternData)},this),this.setData(this._oPatternData)},resetMatched:function(){this._aPatterns.forEach(function(t){t.matched=!1,t.parameters=\"Did not match!\"})},_onHashChanged:function(t){this._oPatternData.currentHash=t.getParameter(\"newHash\"),this.setData(this._oPatternData)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/view/PatternTable.controller.js": "sap.ui.define([\"patternApp/model/Pattern\",\"sap/ui/core/Fragment\",\"sap/ui/core/mvc/Controller\",\"sap/ui/core/routing/HashChanger\",\"sap/ui/core/routing/Router\",\"sap/ui/model/Filter\"],function(e,t,a,i,n,r){\"use strict\";return a.extend(\"patternApp.view.PatternTable\",{onInit:function(){var t=new n;this._oModel=new e(t),this.getView().setModel(this._oModel),t.initialize()},onSetHash:function(){var e=this.getView().byId(\"hash\").getValue();e!==this._sHash&&(this._oModel.resetMatched(),this._sHash=e,i.getInstance().replaceHash(e))},onAddPattern:function(){this._oModel.addPattern(this.getView().byId(\"pattern\").getValue())},handleValueHelp:function(){this._valueHelpDialog||(this._valueHelpDialog=sap.ui.xmlfragment(\"patternApp.view.Dialog\",this),this.getView().addDependent(this._valueHelpDialog)),this._valueHelpDialog.open()},handleValueHelpSearch:function(e){var t=e.getParameter(\"value\"),a=new r(\"pattern\",sap.ui.model.FilterOperator.Contains,t);e.getSource().getBinding(\"items\").filter([a])},handleValueHelpClose:function(e){var t=e.getParameter(\"selectedItem\");t&&this.getView().byId(\"hash\").setValue(t.getTitle());e.getSource().getBinding(\"items\").filter([])},formatMatched:function(e){return e?\"Success\":\"Error\"},formatHash:function(e){return e||\"empty\"}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/view/Dialog.fragment.xml": "<core:FragmentDefinition\n\t\txmlns=\"sap.m\"\n\t\txmlns:core=\"sap.ui.core\"><SelectDialog\n\t\t\ttitle=\"Sample Routes\"\n\t\t\titems=\"{/sampleRoutes}\"\n\t\t\tconfirm=\"handleValueHelpClose\"\n\t\t\tcancel=\"handleValueHelpClose\"\n\t\t\tsearch=\"handleValueHelpSearch\"><StandardListItem\n\t\t\t\ttitle=\"{pattern}\"\n\t\t\t\tdescription=\"{description}\" /></SelectDialog></core:FragmentDefinition>",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/patternApp/view/PatternTable.view.xml": "<mvc:View controllerName=\"patternApp.view.PatternTable\"\n\t\txmlns=\"sap.m\"\n\t\txmlns:core=\"sap.ui.core\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns:f=\"sap.ui.layout.form\"\n\t\txmlns:html=\"http://www.w3.org/1999/xhtml\"><f:SimpleForm editable=\"false\" title=\"Hash\"><Label for=\"current\" text=\"Current hash\"></Label><Text for=\"hash\" text=\"{\n\t\t\t\t\tpath: '/currentHash',\n\t\t\t\t\tformatter: '.formatHash'\n\t\t\t\t}\"></Text></f:SimpleForm><f:SimpleForm editable=\"true\"><Input\n\t\t\t\t\t\tid=\"hash\"\n\t\t\t\t\t\tshowSuggestion=\"true\"\n\t\t\t\t\t\tshowValueHelp=\"true\"\n\t\t\t\t\t\tvalueHelpRequest=\"handleValueHelp\"\n\t\t\t\t\t\tsuggestionItems=\"{/sampleRoutes}\"\n\t\t\t\t\t\tplaceholder=\"Enter new hash\"><suggestionItems><core:Item text=\"{pattern}\" /></suggestionItems></Input><Button text=\"Set Hash\" press=\"onSetHash\"></Button></f:SimpleForm><Title class=\"sapUiSmallMarginBegin sapUiSmallMarginTop\" text=\"Routes\" level=\"H2\"/><Table items=\"{/patterns}\"><headerToolbar><Toolbar><Label for=\"pattern\" text=\"Pattern\"></Label><ToolbarSpacer></ToolbarSpacer><Input\n\t\t\t\t\t\t\t\tid=\"pattern\"\n\t\t\t\t\t\t\t\twidth=\"50%\"\n\t\t\t\t\t\t\t\tplaceholder=\"Enter new pattern\"></Input><Button icon=\"sap-icon://add\" press=\"onAddPattern\"></Button></Toolbar></headerToolbar><columns><Column><Text text=\"Patterns\" /></Column><Column><Text text=\"Match\" /></Column></columns><items><ColumnListItem><cells><Text text=\"{pattern}\"></Text><ObjectStatus\n\t\t\t\t\t\t\t\t\tstate=\"{\n\t\t\t\t\t\t\t\t\t\tpath : 'matched',\n\t\t\t\t\t\t\t\t\t\tformatter : '.formatMatched'\n\t\t\t\t\t\t\t\t\t}\"\n\t\t\t\t\t\t\t\t\ttext=\"{parameters}\"></ObjectStatus></cells></ColumnListItem></items></Table></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/sample/PatternMatching/Component-preload");