sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/UploadCollectionForPendingUpload/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.UploadCollectionForPendingUpload.Component\",{metadata:{rootView:\"sap.m.sample.UploadCollectionForPendingUpload.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.unified\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/UploadCollectionForPendingUpload/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/m/MessageToast\",\"sap/m/UploadCollectionParameter\",\"sap/ui/core/mvc/Controller\"],function(e,t,o,a){\"use strict\";return a.extend(\"sap.m.sample.UploadCollectionForPendingUpload.Page\",{onChange:function(e){var a=e.getSource(),n=new o({name:\"x-csrf-token\",value:\"securityTokenFromModel\"});a.addHeaderParameter(n),t.show(\"Event change triggered\")},onFileDeleted:function(e){t.show(\"Event fileDeleted triggered\")},onFilenameLengthExceed:function(e){t.show(\"Event filenameLengthExceed triggered\")},onFileSizeExceed:function(e){t.show(\"Event fileSizeExceed triggered\")},onTypeMissmatch:function(e){t.show(\"Event typeMissmatch triggered\")},onStartUpload:function(e){var o=this.getView().byId(\"UploadCollection\"),a=this.getView().byId(\"TextArea\"),n=o.getItems().length,i=\"\";o.upload(),i=n+\" file(s)\",0===a.getValue().length?i+=\" without notes\":i+=\" with notes\",t.show(\"Method Upload is called (\"+i+\")\"),sap.m.MessageBox.information(\"Uploaded \"+i),a.setValue(\"\")},onBeforeUploadStarts:function(e){var o=new sap.m.UploadCollectionParameter({name:\"slug\",value:e.getParameter(\"fileName\")});e.getParameters().addHeaderParameter(o),setTimeout(function(){t.show(\"Event beforeUploadStarts triggered\")},4e3)},onUploadComplete:function(e){var o=e.getParameter(\"files\")[0].fileName;setTimeout(function(){for(var e=this.getView().byId(\"UploadCollection\"),a=0;a<e.getItems().length;a++)if(e.getItems()[a].getFileName()===o){e.removeItem(e.getItems()[a]);break}t.show(\"Event uploadComplete triggered\")}.bind(this),8e3)},onSelectChange:function(e){this.getView().byId(\"UploadCollection\").setShowSeparators(e.getParameters().selectedItem.getProperty(\"key\"))}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/UploadCollectionForPendingUpload/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.UploadCollectionForPendingUpload.Page\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Page id=\"Page\" showHeader=\"false\"><content><OverflowToolbar><ToolbarSpacer/><Label\n\t\t\t\t\ttext=\"Layout:\"></Label><Select\n\t\t\t\t\tid=\"tbSelect\"\n\t\t\t\t\tselectedKey=\"All\"\n\t\t\t\t\tchange=\"onSelectChange\" ><core:Item key=\"All\" text=\"sap.m.ListSeparators.All\"/><core:Item key=\"None\" text=\"sap.m.ListSeparators.None\"/></Select></OverflowToolbar><Label text=\"Notes\"/><TextArea\n\t\t\t\tid=\"TextArea\"\n\t\t\t\tcols=\"200\"\n\t\t\t\theight=\"100px\" /><UploadCollection\n\t\t\t\tid=\"UploadCollection\"\n\t\t\t\tmaximumFilenameLength=\"55\"\n\t\t\t\tmaximumFileSize=\"10\"\n\t\t\t\tmultiple=\"true\"\n\t\t\t\tsameFilenameAllowed=\"true\"\n\t\t\t\tinstantUpload=\"false\"\n\t\t\t\tshowSeparators=\"All\"\n\t\t\t\tchange=\"onChange\"\n\t\t\t\tfileDeleted=\"onFileDeleted\"\n\t\t\t\tfilenameLengthExceed=\"onFilenameLengthExceed\"\n\t\t\t\tfileSizeExceed=\"onFileSizeExceed\"\n\t\t\t\ttypeMissmatch=\"onTypeMissmatch\"\n\t\t\t\tuploadComplete=\"onUploadComplete\"\n\t\t\t\tbeforeUploadStarts=\"onBeforeUploadStarts\"></UploadCollection><Button\n\t\t\t\tid=\"Button\"\n\t\t\t\ttext=\"Upload Now\"\n\t\t\t\tpress=\"onStartUpload\"></Button></content></Page></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/UploadCollectionForPendingUpload/Component-preload");