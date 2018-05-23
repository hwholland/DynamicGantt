sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/unified/sample/ShellBasic/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.unified.sample.ShellBasic.Component\",{metadata:{rootView:\"sap.ui.unified.sample.ShellBasic.View\",dependencies:{libs:[\"sap.ui.unified\",\"sap.ui.layout\",\"sap.m\"]},includes:[\"../style.css\"],config:{sample:{files:[\"View.view.xml\",\"Controller.controller.js\",\"ShellOverlay.fragment.xml\"]}}}})});",
	"web/ui5/test-resources/sap/ui/unified/sample/ShellBasic/Controller.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/m/MessageToast\",\"sap/ui/core/Fragment\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,s,a,o){\"use strict\";return a.extend(\"sap.ui.unified.sample.ShellBasic.Controller\",{onInit:function(){var t={logo:e.sap.getModulePath(\"sap.ui.core\",\"/\")+\"mimes/logo/sap_50x26.png\"},s=new o;s.setData(t),this.getView().setModel(s)},handlePressConfiguration:function(e){var t=e.getSource(),s=this.getView().byId(\"myShell\"),a=s.getShowPane();s.setShowPane(!a),t.setShowMarker(!a),t.setSelected(!a)},handleLogoffPress:function(e){t.show(\"Logoff Button Pressed\")},handleUserItemPressed:function(e){t.show(\"User Button Pressed\")},handleSearchItemSelect:function(e){t.show(\"Search Entry Selected: \"+e.getSource().getTitle())},handleShellOverlayClosed:function(){t.show(\"Overlay closed\")},handleSearchPressed:function(e){var t=e.getParameter(\"query\");if(\"\"!=t){this._overlay||(this._overlay=sap.ui.xmlfragment(\"sap.ui.unified.sample.ShellBasic.ShellOverlay\",this),this.getView().addDependent(this._overlay));for(var s=[],a=0;a<10;a++)s.push({title:a+1+\". \"+t,text:\"Lorem ipsum sit dolem\"});var l={searchFieldContent:t,resultData:s},r=new o;r.setData(l),this._overlay.setModel(r),this._overlay.setShell(this.getView().byId(\"myShell\")),this._overlay.open()}}})});",
	"web/ui5/test-resources/sap/ui/unified/sample/ShellBasic/ShellOverlay.fragment.xml": "<core:FragmentDefinition\n\txmlns:l=\"sap.ui.layout\"\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:u=\"sap.ui.unified\"\n\tclass=\"viewPadding\"><u:ShellOverlay\n\t\t\tclosed=\"handleShellOverlayClosed\"><u:content><l:VerticalLayout\n\t\t\t\t\twidth=\"100%\"><l:HorizontalLayout><Label text=\"Your Search: \" class=\"labelMarginLeft\" /><Text\n\t\t\t\t\t\t\ttext=\"{/searchFieldContent}\" class=\"labelMarginLeft\" /></l:HorizontalLayout><List\n\t\t\t\t\t\twidth=\"100%\"\n\t\t\t\t\t\titems=\"{path:'/resultData'}\"><StandardListItem\n\t\t\t\t\t\t\t\ttype=\"Active\"\n\t\t\t\t\t\t\t\tpress=\"handleSearchItemSelect\"\n\t\t\t\t\t\t\t\ttitle=\"{title}\"\n\t\t\t\t\t\t\t\ticon=\"sap-icon://display\"\n\t\t\t\t\t\t\t\tdescription=\"{text}\" /></List></l:VerticalLayout></u:content></u:ShellOverlay></core:FragmentDefinition>",
	"web/ui5/test-resources/sap/ui/unified/sample/ShellBasic/View.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.unified.sample.ShellBasic.Controller\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:u=\"sap.ui.unified\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"\n\tclass=\"viewPadding\"><u:Shell\n\t\t\tid=\"myShell\"\n\t\t\ticon=\"{/logo}\"><u:headItems><u:ShellHeadItem\n\t\t\t\t\ttooltip=\"Configuration\"\n\t\t\t\t\ticon=\"sap-icon://menu2\"\n\t\t\t\t\tpress=\"handlePressConfiguration\" /><u:ShellHeadItem\n\t\t\t\t\ttooltip=\"Home\"\n\t\t\t\t\ticon=\"sap-icon://home\"\n\t\t\t\t\tvisible=\"false\"\n\t\t\t\t\tpress=\"handlePressHome\" /></u:headItems><u:headEndItems><u:ShellHeadItem\n\t\t\t\t\ticon=\"sap-icon://log\"\n\t\t\t\t\ttooltip=\"Logoff\"\n\t\t\t\t\tpress=\"handleLogoffPress\" /></u:headEndItems><u:user><u:ShellHeadUserItem\n\t\t\t\t\timage=\"sap-icon://person-placeholder\"\n\t\t\t\t\tusername=\"Karl Mustermann\"\n\t\t\t\t\tpress=\"handleUserItemPressed\" /></u:user><u:search><SearchField\n\t\t\t\t\tsearch=\"handleSearchPressed\"/></u:search><u:paneContent><Text text=\"Lorem ipsum\" /></u:paneContent></u:Shell></mvc:View>"
}, "web/ui5/test-resources/sap/ui/unified/sample/ShellBasic/Component-preload");