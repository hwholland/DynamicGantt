sap.ui.require.preload({
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/FileUpload/Component.js": "jQuery.sap.declare(\"sap.ca.ui.sample.FileUpload.Component\"),sap.ui.core.UIComponent.extend(\"sap.ca.ui.sample.FileUpload.Component\",{metadata:{rootView:\"sap.ca.ui.sample.FileUpload.FileUpload\",dependencies:{libs:[\"sap.m\",\"sap.ca.ui\"]},config:{sample:{stretch:!0,files:[\"FileUpload.view.xml\",\"FileUpload.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/FileUpload/FileUpload.controller.js": "jQuery.sap.require(\"sap.ca.ui.model.format.FileSizeFormat\"),jQuery.sap.require(\"sap.ca.ui.message.message\"),jQuery.sap.require(\"sap.ui.thirdparty.sinon\");var Formatter=sap.ca.ui.model.format.FileSizeFormat.getInstance();sap.ui.controller(\"sap.ca.ui.sample.FileUpload.FileUpload\",{onInit:function(){this.oFormatter=sap.ca.ui.model.format.DateFormat.getDateInstance({style:\"medium\"});var e=this.byId(\"fileupload\");e.setUseMultipart(!1),this.server=sinon.fakeServer.create(),sinon.FakeXMLHttpRequest.useFilters=!0,this.server.autoRespond=!0,this.server.autoRespondAfter=3e3,sinon.FakeXMLHttpRequest.addFilter(function(e,t,a,o,i){return!(\"/uilib-sample/upload\"===t)});this.server.respondWith(\"POST\",\"/uilib-sample/upload\",function(e,t){var a=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},o=e.requestHeaders.slug,i=e.requestHeaders[\"Content-Type\"];i.indexOf(\";\")>-1&&(i=i.slice(0,i.indexOf(\";\"))),e.respond(200,{\"Content-Type\":\"application/json\"},'{ \"mimeType\":\"'+i+'\",\"contributor\":\"You\",\"uploaded\":\"'+new Date+'\",\"filename\":\"'+o+'\",\"documentId\":\"'+(a()+a())+\"-\"+a()+\"-\"+a()+\"-\"+a()+\"-\"+a()+a()+a()+'\",\"url\":\"/test-resources/sap/ca/ui/demokit/sample/FileUpload/test.txt\",\"size\":75323}')}),this.server.respond();var t=new Date,a={dataitems:[{mimeType:\"text/plain\",contributor:\"John Smith\",uploaded:t,filename:\"Notes.txt\",documentId:\"ef1d600d-5d2f-4b19-82dd-55575d8daf7a\",url:\"/test-resources/sap/ca/ui/demokit/sample/FileUpload/test.txt\",size:Formatter.format(4645)},{mimeType:\"image/jpg\",contributor:\"Susan Baker\",uploaded:t,filename:\"Screenshot.jpg\",documentId:\"ef1d600d-5d2f-4b19-82dd-55575d8daf7b\",url:\"/test-resources/sap/ca/ui/demokit/sample/FileUpload/test.txt\",size:Formatter.format(47674)},{mimeType:\"application/vnd.ms-powerpoint\",contributor:\"Sean O'Connel\",uploaded:t,filename:\"Third Quarter Results.ppt\",documentId:\"ef1d600d-5d2f-4b19-82dd-55575d8daf7c\",url:\"/test-resources/sap/ca/ui/demokit/sample/FileUpload/test.txt\",size:Formatter.format(445643)},{mimeType:\"application/msword\",contributor:\"Jane Burns\",uploaded:t,filename:\"Business Plan.doc\",documentId:\"ef1d600d-5d2f-4b19-82dd-55575d8daf7d\",url:\"/test-resources/sap/ca/ui/demokit/sample/FileUpload/test.txt\",size:Formatter.format(874)},{mimeType:\"application/pdf\",contributor:\"David Keane\",uploaded:t,filename:\"Instructions.pdf\",documentId:\"ef1d600d-5d2f-4b19-82dd-55575d8daf7e\",url:\"/test-resources/sap/ca/ui/demokit/sample/FileUpload/test.txt\",size:Formatter.format(46786)}]},o=new sap.ui.model.json.JSONModel(a);e.setModel(o)},onDeleteFile:function(e){this.byId(\"fileupload\").removeFile(e.mParameters.documentId)},onRenameFile:function(e){},onUploadFile:function(e){var t=e.getParameters();this.byId(\"fileupload\").commitFileUpload(t)},onBeforeUploadFile:function(e){this.byId(\"fileupload\").setCustomHeader(\"slug\",e.getParameters().name)},onFileUploadFailed:function(e){sap.ca.ui.message.showMessageBox({type:sap.ca.ui.message.Type.ERROR,message:e.getParameters().exception.message})},onSaveClicked:function(){var e=this.byId(\"fileupload\");setTimeout(jQuery.proxy(function(){e.commitPendingRenames()},this),3e3)},onCancelClicked:function(){}});",
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/FileUpload/FileUpload.view.xml": "<core:View xmlns:core=\"sap.ui.core\"\n           xmlns=\"sap.m\" xmlns:ui=\"sap.ca.ui\" controllerName=\"sap.ca.ui.sample.FileUpload.FileUpload\" height=\"100%\"><Page id=\"page\" showHeader=\"false\"><content><ui:FileUpload\n                    acceptRequestHeader=\"application/json\"\n                    id=\"fileupload\"\n                    items=\"/dataitems\"\n                    uploadUrl=\"/uilib-sample/upload\"\n                    encodeUrl=\"/sap/bc/ui2/encode_file\"\n                    fileName=\"filename\"\n                    size=\"size\"\n                    url=\"url\"\n                    uploadedDate=\"uploaded\"\n                    contributor=\"contributor\"\n                    mimeType=\"mimeType\"\n                    fileId=\"documentId\"\n                    deleteFile=\"onDeleteFile\"\n                    renameFile=\"onRenameFile\"\n                    uploadFile=\"onUploadFile\"\n                    saveClicked=\"onSaveClicked\"\n                    cancelClicked=\"onCancelClicked\"\n                    fileUploadFailed=\"onFileUploadFailed\"\n                    useMultipart=\"true\"\n                    beforeUploadFile=\"onBeforeUploadFile\"\n                    renameEnabled=\"true\"\n                    showNoData=\"false\"\n                    useEditControls=\"true\"\n                    uploadEnabled=\"true\"\n                    editMode=\"false\"\n                    showAttachmentsLabelInEditMode=\"true\"></ui:FileUpload></content><footer><Bar id=\"footerBar\"></Bar></footer></Page></core:View>\n"
}, "web/ui5/test-resources/sap/ca/ui/demokit/sample/FileUpload/Component-preload");