sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/BlockLayoutDefault/Block.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,o){\"use strict\";return t.extend(\"sap.ui.layout.sample.BlockLayoutDefault.Block\",{onInit:function(){var t=new o(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(t)},onSliderMoved:function(e){var t=e.getParameter(\"value\");this.getView().byId(\"containerLayout\").setWidth(t+\"%\")}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/BlockLayoutDefault/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.layout.sample.BlockLayoutDefault.Component\",{metadata:{rootView:\"sap.ui.layout.sample.BlockLayoutDefault.Block\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"Block.view.xml\",\"Block.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/BlockLayoutDefault/Block.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.layout.sample.BlockLayoutDefault.Block\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:form=\"sap.ui.layout.form\"\n\txmlns=\"sap.m\"><form:SimpleForm\n\t\t\teditable=\"true\"><Label text=\"Parent width\" /><Slider id=\"widthSlider\" value=\"100\" liveChange=\"onSliderMoved\" /><Label id=\"backgroundLabel\" text=\"Background\"/><SegmentedButton\n\t\t\t\tselectedKey=\"{/selectedBackground}\"\n\t\t\t\tariaDescribedBy=\"backgroundLabel\"\n\t\t\t\tariaLabelledBy=\"backgroundLabel\"><items><SegmentedButtonItem key=\"Default\" text=\"Default\" /><SegmentedButtonItem key=\"Light\" text=\"Light\" /></items></SegmentedButton></form:SimpleForm><l:VerticalLayout id=\"containerLayout\" width=\"100%\" ><l:BlockLayout id=\"BlockLayout\" background=\"{/selectedBackground}\"><l:BlockLayoutRow><l:BlockLayoutCell\n\t\t\t\t\t\twidth=\"2\"\n\t\t\t\t\t\ttitle=\"Left aligned heading\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/><RadioButtonGroup columns=\"2\" selectedIndex=\"2\" class=\"sapUiMediumMarginTop\"><buttons><RadioButton id=\"RB2-1\" text=\"Option 1\"/><RadioButton id=\"RB2-2\" text=\"Option 2\" editable=\"false\"/><RadioButton id=\"RB2-3\" text=\"Option 3\"/></buttons></RadioButtonGroup></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"25% width cell\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\ttitleAlignment=\"End\"\n\t\t\t\t\t\ttitle=\"End aligned heading\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\"/></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"50% width cell\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"50% width cell\"><FeedInput\n\t\t\t\t\t\t\tshowIcon=\"true\" /><FeedInput\n\t\t\t\t\t\t\tshowIcon=\"true\" /></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow\n\t\t\t\t\tscrollable=\"true\"><l:BlockLayoutCell\n\t\t\t\t\t\twidth=\"50\"\n\t\t\t\t\t\ttitle=\"Cell inside scrollable row\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\twidth=\"100\"\n\t\t\t\t\t\ttitle=\"Centered Heading\"\n\t\t\t\t\t\ttitleAlignment=\"Center\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\"/></l:BlockLayoutCell><l:BlockLayoutCell><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\twidth=\"90\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"75% width cell\"\n\t\t\t\t\t\twidth=\"3\"><form:SimpleForm\n\t\t\t\t\t\t\teditable=\"true\"><Label text=\"Name on card\" required=\"true\" /><Input value=\"{/CreditCard/Name}\" liveChange=\"checkCreditCardStep\" valueLiveUpdate=\"true\" /><Label text=\"Card number\"/><Input value=\"{/CardNumber}\" /><Label text=\"Security code\" /><Input value=\"{/CreditCard/SecurityCode}\" /><Label text=\"Expiration date\" /><DatePicker value=\"{/CreditCard/Expire}\" /></form:SimpleForm><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"25% width cell\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"25% width cell\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"25% width cell\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"25% width cell\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell><l:BlockLayoutCell\n\t\t\t\t\t\ttitle=\"25% width cell\"><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell><MessageStrip text=\"You can use the cells with 100% width, if you set the vertical property of the row to true\" /><Text text=\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"/></l:BlockLayoutCell></l:BlockLayoutRow><l:BlockLayoutRow><l:BlockLayoutCell><Table id=\"idProductsTable\"\n\t\t\t\t\t\t   inset=\"false\"\n\t\t\t\t\t\t   items=\"{\n\t\t\t\tpath: '/ProductCollection',\n\t\t\t\tsorter: {\n\t\t\t\t\tpath: 'Name'\n\t\t\t\t}\n\t\t\t}\"><columns><Column\n\t\t\t\t\t\t\t\t\twidth=\"12em\"><Text text=\"Product\" /></Column><Column\n\t\t\t\t\t\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\t\t\t\t\t\tdemandPopin=\"true\"><Text text=\"Supplier\" /></Column><Column\n\t\t\t\t\t\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\t\t\t\t\t\tdemandPopin=\"true\"\n\t\t\t\t\t\t\t\t\thAlign=\"Right\"><Text text=\"Dimensions\" /></Column><Column\n\t\t\t\t\t\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\t\t\t\t\t\tdemandPopin=\"true\"\n\t\t\t\t\t\t\t\t\thAlign=\"Center\"><Text text=\"Weight\" /></Column><Column\n\t\t\t\t\t\t\t\t\thAlign=\"Right\"><Text text=\"Price\" /></Column></columns><items><ColumnListItem><cells><ObjectIdentifier\n\t\t\t\t\t\t\t\t\t\t\ttitle=\"{Name}\"\n\t\t\t\t\t\t\t\t\t\t\ttext=\"{ProductId}\"/><Text\n\t\t\t\t\t\t\t\t\t\t\ttext=\"{SupplierName}\" /><Text\n\t\t\t\t\t\t\t\t\t\t\ttext=\"{Width} x {Depth} x {Height} {DimUnit}\" /><ObjectNumber\n\t\t\t\t\t\t\t\t\t\t\tnumber=\"{WeightMeasure}\"\n\t\t\t\t\t\t\t\t\t\t\tunit=\"{WeightUnit}\"\n\t\t\t\t\t\t\t\t\t\t\t /><ObjectNumber\n\t\t\t\t\t\t\t\t\t\t\tnumber=\"{\n\t\t\t\t\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency'\n\t\t\t\t\t\t\t\t}\"\n\t\t\t\t\t\t\t\t\t\t\tunit=\"{CurrencyCode}\" /></cells></ColumnListItem></items></Table></l:BlockLayoutCell></l:BlockLayoutRow></l:BlockLayout></l:VerticalLayout></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/layout/demokit/sample/BlockLayoutDefault/Component-preload");