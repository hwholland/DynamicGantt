sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/QuickViewCardScrollBar/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.QuickViewCardScrollBar.Component\",{metadata:{rootView:\"sap.m.sample.QuickViewCardScrollBar.QuickView\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"QuickView.view.xml\",\"QuickView.controller.js\",\"QuickView.fragment.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/QuickViewCardScrollBar/QuickView.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/Fragment\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,a,t,i){\"use strict\";return t.extend(\"sap.m.sample.QuickViewCardScrollBar.QuickView\",{_mData:null,_oModel:null,onInit:function(){this._oModel=new i;var e={pages:[{pageId:\"companyPageId\",header:\"Company info\",title:\"Adventure Company\",titleUrl:\"http://sap.com\",icon:\"sap-icon://building\",description:\"John Doe\",groups:[{heading:\"Contact Details\",elements:[{label:\"Phone\",value:\"+001 6101 34869-0\",elementType:sap.m.QuickViewGroupElementType.phone},{label:\"Address\",value:\"550 Larkin Street, 4F, Mountain View, CA, 94102 San Francisco USA\",elementType:sap.m.QuickViewGroupElementType.text}]},{heading:\"Main Contact\",elements:[{label:\"Name\",value:\"John Doe\",elementType:sap.m.QuickViewGroupElementType.pageLink,pageLinkId:\"companyEmployeePageId\"},{label:\"Mobile\",value:\"+001 6101 34869-0\",elementType:sap.m.QuickViewGroupElementType.mobile},{label:\"Phone\",value:\"+001 6101 34869-0\",elementType:sap.m.QuickViewGroupElementType.phone},{label:\"Email\",value:\"main.contact@company.com\",emailSubject:\"Subject\",elementType:sap.m.QuickViewGroupElementType.email}]}]},{pageId:\"companyEmployeePageId\",header:\"Employee Info\",title:\"John Doe\",icon:\"sap-icon://person-placeholder\",description:\"Department Manager\",groups:[{heading:\"Company\",elements:[{label:\"Name\",value:\"Adventure Company\",url:\"http://sap.com\",elementType:sap.m.QuickViewGroupElementType.link},{label:\"Address\",value:\"Sofia, Boris III, 136A\"},{label:\"Slogan\",value:\"Innovation through technology\"}]},{heading:\"Other\",elements:[{label:\"Email\",value:\"john.doe@sap.com\",emailSubject:\"Subject\",elementType:sap.m.QuickViewGroupElementType.email},{label:\"Phone\",value:\"+359 888 888 888\",elementType:sap.m.QuickViewGroupElementType.mobile}]}]}]};this._mData=e,this._oModel.setData(this._mData),this.getView().setModel(this._oModel)},onBeforeRendering:function(){this.getView().byId(\"buttonBack\").setEnabled(!1)},onAfterRendering:function(){this.getView().byId(\"quickViewCardContainer\").$().css(\"maxWidth\",\"320px\")},onButtonBackClick:function(){this.getView().byId(\"quickViewCard\").navigateBack()},onHideScrollClick:function(){this.getView().byId(\"quickViewCard\").setShowVerticalScrollBar(!1)},onShowScrollClick:function(){this.getView().byId(\"quickViewCard\").setShowVerticalScrollBar(!0)},onScrollSwitchChange:function(e){this.getView().byId(\"quickViewCard\").setShowVerticalScrollBar(e.getParameters().state)},onHeaderSwitchChange:function(e){e.getParameters().state?(this._mData.pages[0].title=\"Adventure Company\",this._mData.pages[0].icon=\"sap-icon://building\",this._mData.pages[0].description=\"John Doe\"):(this._mData.pages[0].title=\"\",this._mData.pages[0].icon=\"\",this._mData.pages[0].description=\"\"),this._oModel.setData(this._mData)},onNavigate:function(e){this.getView().byId(\"buttonBack\").setEnabled(!e.getParameter(\"isTopPage\"))}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/QuickViewCardScrollBar/QuickView.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.m\" xmlns:core=\"sap.ui.core\"><Panel id=\"quickViewCardContainer\" width=\"auto\" height=\"264px\"><QuickViewCard id=\"quickViewCard\" pages=\"{path : '/pages', templateShareable : 'true'}\" afterNavigate=\"onNavigate\"><QuickViewPage\n\t\t\t\t\tpageId=\"{pageId}\"\n\t\t\t\t\theader=\"{header}\"\n\t\t\t\t\ticon=\"{icon}\"\n\t\t\t\t\ttitle=\"{title}\"\n\t\t\t\t\ttitleUrl=\"{titleUrl}\"\n\t\t\t\t\tdescription=\"{description}\"\n\t\t\t\t\tgroups=\"{path : 'groups', templateShareable : 'true'}\"><QuickViewGroup heading=\"{heading}\" elements=\"{path : 'elements', templateShareable : 'true'}\"><QuickViewGroupElement\n\t\t\t\t\t\t\tlabel=\"{label}\"\n\t\t\t\t\t\t\tvalue=\"{value}\"\n\t\t\t\t\t\t\turl=\"{url}\"\n\t\t\t\t\t\t\ttype=\"{elementType}\"\n\t\t\t\t\t\t\tpageLinkId=\"{pageLinkId}\"\n\t\t\t\t\t\t\temailSubject=\"{emailSubject}\"\n\t\t\t\t\t\t\ttarget=\"{target}\"\n\t\t\t\t\t\t\t></QuickViewGroupElement></QuickViewGroup></QuickViewPage></QuickViewCard></Panel></core:FragmentDefinition>\n",
	"web/ui5/test-resources/sap/m/demokit/sample/QuickViewCardScrollBar/QuickView.view.xml": "<core:View height=\"100%\"\n\t\t   xmlns:core=\"sap.ui.core\"\n\t\t   xmlns=\"sap.m\"\n\t\t   xmlns:l=\"sap.ui.layout\"\n\t\t   xmlns:html=\"http://www.w3.org/1999/xhtml\"\n\t\t   controllerName=\"sap.m.sample.QuickViewCardScrollBar.QuickView\"><Page showHeader=\"false\" class=\"sapUiContentPadding\" showNavButton=\"false\"><content><Button id=\"buttonBack\"\n\t\t\t\t\tenabled=\"false\"\n\t\t\t\t\ttext=\"Navigate Back\"\n\t\t\t\t\tpress=\"onButtonBackClick\"\n\t\t\t\t\tclass=\"sapUiSmallMarginBottom\"></Button><l:Grid class=\"sapUiNoMarginBegin\"\n\t\t\t\t\thSpacing=\"0\"\n\t\t\t\t\tvSpacing=\"0\"\n\t\t\t\t\tdefaultSpan=\"L6 M6 S10\"><Label text=\"Show Vertical Scroll Bar:\"\n\t\t\t\t\t   class=\"sapUiSmallMarginTop\"><layoutData><l:GridData span=\"L3 M3 S3\"/></layoutData></Label><Switch id=\"showHideScrollSwitch\"\n\t\t\t\t\t\tstate=\"true\"\n\t\t\t\t\t\tclass=\"sapUiSmallMarginBottom\"\n\t\t\t\t\t\tchange=\"onScrollSwitchChange\"><layoutData><l:GridData span=\"L9 M9 S9\"/></layoutData></Switch><Label text=\"Show Header:\"\n\t\t\t\t\t   class=\"sapUiSmallMarginTop\"><layoutData><l:GridData span=\"L3 M3 S3\"/></layoutData></Label><Switch id=\"showHideHeaderSwitch\"\n\t\t\t\t\t\tstate=\"true\"\n\t\t\t\t\t\tclass=\"sapUiSmallMarginBottom\"\n\t\t\t\t\t\tchange=\"onHeaderSwitchChange\"><layoutData><l:GridData span=\"L9 M9 S9\"/></layoutData></Switch></l:Grid><core:Fragment fragmentName=\"sap.m.sample.QuickViewCardScrollBar.QuickView\" type=\"XML\" /></content></Page></core:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/QuickViewCardScrollBar/Component-preload");