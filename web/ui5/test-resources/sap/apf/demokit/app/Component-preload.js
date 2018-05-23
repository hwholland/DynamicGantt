sap.ui.require.preload({
	"web/ui5/test-resources/sap/apf/demokit/app/Component.js": "jQuery.sap.declare(\"sap.apf.demokit.app.Component\"),sap.ui.getCore().loadLibrary(\"sap.apf\"),jQuery.sap.require(\"sap.apf.base.Component\"),jQuery.sap.require(\"sap.apf.demokit.app.helper.contextMediator\"),jQuery.sap.require(\"sap.apf.demokit.app.helper.formatter\"),jQuery.sap.require(\"sap.apf.demokit.app.helper.preselectionFunction\"),jQuery.sap.require(\"sap.apf.demokit.app.representation.barChart\"),jQuery.sap.require(\"sap.apf.demokit.app.representation.stackedBarChart\"),jQuery.sap.require(\"sap.ui.fl.FakeLrepConnector\"),jQuery.sap.require(\"sap.apf.demokit.app.model.initializeMockServer\"),sap.apf.base.Component.extend(\"sap.apf.demokit.app.Component\",{oApi:null,metadata:{manifest:\"json\",config:{fullWidth:!0},name:\"Component\",version:\"1.3.0\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\",\"sap.ui.comp\"]}},init:function(){var e=jQuery.sap.getModulePath(\"sap.apf.demokit.app\");jQuery.sap.includeStyleSheet(e+\"/resources/css/app.css\"),this.oComponentData={},this.oComponentData.startupParameters={evaluationId:[\"com.sap.apf.receivables.america\"]};var a=sap.apf.demokit.app.model.initializeMockServer.getInstance();a.startApplicationMockServer(),a.startPersistencyMockServer(),a.startSmartBusinessMockServer(),a.startModelerMockServer(),a.startApplicationAnnotationMockServer(),a.startPersistencyAnnotationMockServer(),sap.ui.fl.FakeLrepConnector.enableFakeConnector(\"component-changes.json\"),sap.apf.base.Component.prototype.init.apply(this,arguments)},createContent:function(){this.oApi=this.getApi();var e=sap.apf.base.Component.prototype.createContent.apply(this,arguments);try{var a=sap.ui.view({viewName:\"sap.apf.demokit.app.controls.view.exchangeRate\",type:sap.ui.core.mvc.ViewType.JS,viewData:{oApi:this.oApi},width:\"70%\"}),p=sap.ui.view({viewName:\"sap.apf.demokit.app.controls.view.reportingCurrency\",type:sap.ui.core.mvc.ViewType.JS,viewData:{oApi:this.oApi}});this.oApi.addMasterFooterContent(p),this.oApi.addMasterFooterContent(a),sap.apf.demokit.app.helper.formatter.getInstance(this.oApi)}catch(e){}return e},destroy:function(){sap.apf.demokit.app.helper.ContextMediator.destroyInstance(),sap.apf.demokit.app.helper.formatter.destroyInstance(),sap.apf.demokit.app.model.initializeMockServer.destroyInstance(),sap.apf.base.Component.prototype.destroy.apply(this,arguments)}});",
	"web/ui5/test-resources/sap/apf/demokit/app/controls/controller/exchangeRate.controller.js": "jQuery.sap.require(\"sap.apf.demokit.app.helper.contextMediator\"),sap.ui.controller(\"sap.apf.demokit.app.controls.controller.exchangeRate\",{onInit:function(){this.oView=this.getView(),this.oApi=this.oView.oApi,sap.ui.Device.system.desktop&&this.oView.addStyleClass(\"sapUiSizeCompact\"),this.mDatasets={oExchangeRateDataset:{aExchangeRateTypes:[],sSelectedExchangeRateKey:this.oApi.getApplicationConfigProperties().defaultExchangeRateType},oDateTypeDataset:{aDateTypes:[{text:this.oApi.getTextNotHtmlEncoded(\"postingDate\"),key:\"postingDate\"},{text:this.oApi.getTextNotHtmlEncoded(\"keyDateKey\"),key:\"keyDate\"}],sSelectedDateType:\"postingDate\"},oDateDataset:{sSelectedDate:\"\"}},this.mModels={oExchangeRateModel:new sap.ui.model.json.JSONModel(this.mDatasets.oExchangeRateDataset),oDateTypeModel:new sap.ui.model.json.JSONModel(this.mDatasets.oDateTypeDataset),oDateModel:new sap.ui.model.json.JSONModel(this.mDatasets.oDateDataset)},this.oView.oExchangeRateDropdown.setModel(this.mModels.oExchangeRateModel),this.oView.oDateTypeDropdown.setModel(this.mModels.oDateTypeModel),this.oView.oDatePicker.setModel(this.mModels.oDateModel);this._setFilters(!0),sap.apf.demokit.app.helper.ContextMediator.getInstance(this.oApi).onContextChange(this.contextChanged.bind(this))},_populateMasterContent:function(){var e=this;this.oApi.getPropertyValuesOfExternalContext(\"SAPClient\").then(function(t){var a=t[0].Low,s=e.oApi.createReadRequest({type:\"request\",id:\"requestExchangeRateInitialStep\",service:\"/sap/hba/apps/wca/dso/s/odata/wca.xsodata\",entityType:\"ExchangeRateQuery\",selectProperties:[\"ExchangeRateType\",\"ExchangeRateTypeName\"]}),i=e.oApi.createFilter();i.getTopAnd().addOr().addExpression({name:\"SAPClient\",operator:\"EQ\",value:a}),s.send(i,function(t,a,s){if(!s&&t&&t.length)e.mDatasets.oExchangeRateDataset.aExchangeRateTypes=[],t.forEach(function(t){e.mDatasets.oExchangeRateDataset.aExchangeRateTypes.push({key:t.ExchangeRateType,text:t.ExchangeRateTypeName?t.ExchangeRateType+\" - \"+t.ExchangeRateTypeName:t.ExchangeRateType})}),e.mModels.oExchangeRateModel.updateBindings();else{var i=e.oApi.createMessageObject({code:\"12003\",aParameters:[e.oApi.getTextNotHtmlEncoded(\"P_ExchangeRateType\")]});e.oApi.putMessage(i)}})})},contextChanged:function(){var e=this.oApi.getPathFilter(this.sExchangeRateTypeFilterId),t=e.getInternalFilter().getFilterTerms()[0].getValue();this._populateMasterContent(),this.mDatasets.oExchangeRateDataset.sSelectedExchangeRateKey=t,this.mModels.oExchangeRateModel.updateBindings();var a=(e=this.oApi.getPathFilter(this.sExchangeRateDateFilterId)).getInternalFilter().getFilterTerms()[0].getValue();switch(a){case\"00000000\":this._selectPostingDate();break;default:this._selectKeyDate(),this.mDatasets.oDateDataset.sSelectedDate=this._convertToUIDateFormat(a),this.mModels.oDateModel.updateBindings()}},handleOkPress:function(){this.oView.oDatePicker.getValueState()===sap.ui.core.ValueState.None&&(this._setFilters(),this.oView.oDialog.close())},handleChangeForDatePicker:function(e){!0===e.getParameter(\"valid\")?e.getSource().setValueState(sap.ui.core.ValueState.None):e.getSource().setValueState(sap.ui.core.ValueState.Error)},_setFilters:function(e){this._updateExchangeRateFilter(e),this._updateDateFilter(e),this.oApi.selectionChanged(!0)},_updateExchangeRateFilter:function(e){var t=this.oApi.createFilter();t.getTopAnd().addOr().addExpression({name:\"P_ExchangeRateType\",operator:\"EQ\",value:this.mDatasets.oExchangeRateDataset.sSelectedExchangeRateKey}),e?this.sExchangeRateTypeFilterId=this.oApi.addPathFilter(t):this.oApi.updatePathFilter(this.sExchangeRateTypeFilterId,t)},_updateDateFilter:function(e){var t=null;t=\"postingDate\"===this.mDatasets.oDateTypeDataset.sSelectedDateType?\"00000000\":this._convertToFilterDateFormat(this.mDatasets.oDateDataset.sSelectedDate);var a=this.oApi.createFilter();a.getTopAnd().addOr().addExpression({name:\"P_ExchangeRateDate\",operator:\"EQ\",value:t}),e?this.sExchangeRateDateFilterId=this.oApi.addPathFilter(a):this.oApi.updatePathFilter(this.sExchangeRateDateFilterId,a)},handleCancelPress:function(){this.oView.oDatePicker.setValueState(sap.ui.core.ValueState.None),this._restoreInitialState(),this.oView.oDialog.close()},handleDialogOpen:function(){this._saveInitialState(),\"postingDate\"===this.mModels.oDateTypeModel.getData().sSelectedDateType?this.oView.hideDatePicker():this.oView.showDatePicker()},_convertToUIDateFormat:function(e){return e.slice(0,4)+\".\"+e.slice(4,6)+\".\"+e.slice(6,8)},_convertToFilterDateFormat:function(e){var t=new Date(e),a=t.getFullYear().toString(),s=(t.getMonth()+1).toString();1===s.length&&(s=\"0\"+s);var i=t.getDate().toString();return 1===i.length&&(i=\"0\"+i),a+s+i},_selectPostingDate:function(){this.mDatasets.oDateTypeDataset.sSelectedDateType=\"postingDate\",this.mModels.oDateTypeModel.updateBindings(),this.oView.hideDatePicker()},_selectKeyDate:function(){this.mDatasets.oDateTypeDataset.sSelectedDateType=\"keyDate\",this.mModels.oDateTypeModel.updateBindings(),this.oView.showDatePicker()},_saveInitialState:function(){this.aInitialDatasets=[];var e=null;for(e in this.mModels)if(this.mModels.hasOwnProperty(e)){var t=jQuery.extend(!0,{},this.mModels[e].getData());this.aInitialDatasets.push(t)}},_restoreInitialState:function(){var e=null,t=0;for(e in this.mDatasets)this.mDatasets.hasOwnProperty(e)&&(this.mDatasets[e]=this.aInitialDatasets[t++]);for(e in t=0,this.mModels)this.mModels.hasOwnProperty(e)&&this.mModels[e].setData(this.aInitialDatasets[t++])}});",
	"web/ui5/test-resources/sap/apf/demokit/app/controls/controller/reportingCurrency.controller.js": "/*\n * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n */\njQuery.sap.require(\"sap.apf.demokit.app.helper.contextMediator\"),sap.ui.controller(\"sap.apf.demokit.app.controls.controller.reportingCurrency\",{onInit:function(){this.oView=this.getView(),this.oApi=this.oView.oApi,sap.ui.Device.system.desktop&&this.oView.addStyleClass(\"sapUiSizeCompact\"),this.aDataset=[],this.oModel=new sap.ui.model.json.JSONModel(this.aDataset),this.oView.oDialog.setModel(this.oModel),this.sSelectedCurrency=this.oApi.getApplicationConfigProperties().defaultReportingCurrency;this._setFilter(!0),sap.apf.demokit.app.helper.ContextMediator.getInstance(this.oApi).onContextChange(this.contextChanged.bind(this))},_populateMasterList:function(){var e=this;this.oApi.getPropertyValuesOfExternalContext(\"SAPClient\").then(function(t){var i=t[0].Low,r=e.oApi.createReadRequest({type:\"request\",id:\"requestCurrencyInitialStep\",service:\"/sap/hba/apps/wca/dso/s/odata/wca.xsodata\",entityType:\"CurrencyQuery\",selectProperties:[\"Currency\",\"CurrencyShortName\"]}),s=e.oApi.createFilter();s.getTopAnd().addOr().addExpression({name:\"SAPClient\",operator:\"EQ\",value:i}),r.send(s,function(t,i,r){if(!r&&t&&t.length)e.aDataset=[],t.forEach(function(t){e.aDataset.push({key:t.Currency,text:t.CurrencyShortName?t.Currency+\" - \"+t.CurrencyShortName:t.Currency,selected:t.Currency===e.sSelectedCurrency})}),e.oModel.setData(e.aDataset);else{var s=e.oApi.createMessageObject({code:\"12003\",aParameters:[e.oApi.getTextNotHtmlEncoded(\"reportingCurrency\")]});e.oApi.putMessage(s)}})})},contextChanged:function(){var e=this.oApi.getPathFilter(this.sDisplayCurrencyFilterId);this.sSelectedCurrency=e.getInternalFilter().getFilterTerms()[0].getValue(),this._populateMasterList(),this.oModel.updateBindings()},onConfirmPress:function(e){var t=this,i=e.getParameter(\"selectedItem\");this.sSelectedCurrency=i.getBindingContext().getProperty(\"key\"),this.aDataset.forEach(function(e){e.selected=!1,e.key===t.sSelectedCurrency&&(e.selected=!0)}),this._setFilter(),this._applySearchFilters([])},doSearchItems:function(e){var t=e.getParameter(\"value\"),i=new sap.ui.model.Filter(\"text\",sap.ui.model.FilterOperator.Contains,t);this._applySearchFilters([i])},onCancelPress:function(){this._applySearchFilters([])},_applySearchFilters:function(e){this.oView.oDialog.getBinding(\"items\").filter(e,!1),this.oModel.updateBindings()},_setFilter:function(e){var t=this.oApi.createFilter();t.getTopAnd().addOr().addExpression({name:\"P_DisplayCurrency\",operator:\"EQ\",value:this.sSelectedCurrency}),e?this.sDisplayCurrencyFilterId=this.oApi.addPathFilter(t):this.oApi.updatePathFilter(this.sDisplayCurrencyFilterId,t),this.oApi.selectionChanged(!0)}});",
	"web/ui5/test-resources/sap/apf/demokit/app/controls/view/exchangeRate.view.js": "sap.ui.jsview(\"sap.apf.demokit.app.controls.view.exchangeRate\",{getControllerName:function(){return\"sap.apf.demokit.app.controls.controller.exchangeRate\"},createContent:function(e){var t=this;this.oApi=this.getViewData().oApi;var a=new sap.m.Label({text:this.oApi.getTextNotHtmlEncoded(\"P_ExchangeRateType\"),tooltip:{visible:!1},design:sap.m.LabelDesign.Bold}),n=new sap.m.Select({width:\"100%\",items:{path:\"/aExchangeRateTypes\",template:new sap.ui.core.ListItem({key:\"{key}\",text:\"{text}\"})},selectedKey:\"{/sSelectedExchangeRateKey}\"}),o=new sap.ui.layout.VerticalLayout({width:\"80%\",content:[a,n]}).addStyleClass(\"dropdownLayout\"),i=new sap.m.Label({text:t.oApi.getTextNotHtmlEncoded(\"P_ExchangeRateDate\"),tooltip:{visible:!1},design:sap.m.LabelDesign.Bold}),s=new sap.m.DatePicker({placeholder:t.oApi.getTextNotHtmlEncoded(\"enterDate\")+\"(dd.mm.yyyy)\",width:\"100%\",enabled:!1,editable:!1,value:\"{/sSelectedDate}\",valueFormat:\"dd.MM.yyyy\",displayFormat:\"dd.MM.yyyy\",change:e.handleChangeForDatePicker.bind(e)}),d=new sap.m.Select({width:\"100%\",items:{path:\"/aDateTypes\",template:new sap.ui.core.Item({text:\"{text}\",key:\"{key}\"})},selectedKey:\"{/sSelectedDateType}\",change:function(e){\"keyDate\"===e.getParameter(\"selectedItem\").getKey()?t.showDatePicker():t.hideDatePicker()}}),l=new sap.ui.layout.VerticalLayout({width:\"80%\",content:[i,d]}).addStyleClass(\"dropdownLayout\"),p=new sap.ui.layout.VerticalLayout({width:\"100%\",content:[o,l]}).addStyleClass(\"exchangeRateLayout\"),c=new sap.m.Dialog({type:sap.m.DialogType.Standard,title:this.oApi.getTextNotHtmlEncoded(\"exchangeRateSettings\"),content:p,beginButton:new sap.m.Button({text:t.oApi.getTextNotHtmlEncoded(\"ok\"),press:e.handleOkPress.bind(e)}),endButton:new sap.m.Button({text:t.oApi.getTextNotHtmlEncoded(\"cancel\"),press:e.handleCancelPress.bind(e)}),beforeOpen:e.handleDialogOpen.bind(e)}),r=new sap.m.Button({text:this.oApi.getTextNotHtmlEncoded(\"exchangeRate\"),type:\"Transparent\",width:\"100%\",press:function(){sap.ui.Device.system.desktop&&c.addStyleClass(\"sapUiSizeCompact\"),c.setInitialFocus(c),c.open()}});return jQuery.extend(this,{oExchangeRateDropdown:n,oDateTypeDropdown:d,oDatePicker:s,oDateTypeContent:l,oDialog:c}),r},showDatePicker:function(){this.oDateTypeContent.addContent(this.oDatePicker),this.oDatePicker.setEnabled(!0),this.oDatePicker.setEditable(!0)},hideDatePicker:function(){this.oDateTypeContent.removeContent(this.oDatePicker),this.oDatePicker.setEnabled(!1),this.oDatePicker.setEditable(!1)}});",
	"web/ui5/test-resources/sap/apf/demokit/app/controls/view/reportingCurrency.view.js": "sap.ui.jsview(\"sap.apf.demokit.app.controls.view.reportingCurrency\",{getControllerName:function(){return\"sap.apf.demokit.app.controls.controller.reportingCurrency\"},createContent:function(e){var t=this;return this.oApi=this.getViewData().oApi,this.oDialog=new sap.m.SelectDialog({title:this.oApi.getTextNotHtmlEncoded(\"reportingCurrency\"),rememberSelections:!0,growingThreshold:500,items:{path:\"/\",template:new sap.m.StandardListItem({title:\"{text}\",selected:\"{selected}\"})},confirm:e.onConfirmPress.bind(e),search:e.doSearchItems.bind(e),liveChange:e.doSearchItems.bind(e),cancel:e.onCancelPress.bind(e)}),this.oButton=new sap.m.Button({text:this.oApi.getTextNotHtmlEncoded(\"reportingCurrency\"),width:\"100%\",type:\"Transparent\",press:function(){sap.ui.Device.system.desktop&&t.oDialog.addStyleClass(\"sapUiSizeCompact\"),t.oDialog.open()}}),this.oButton}});",
	"web/ui5/test-resources/sap/apf/demokit/app/helper/contextMediator.js": "jQuery.sap.declare(\"sap.apf.demokit.app.helper.contextMediator\"),sap.apf.demokit.app.helper.ContextMediator=function(){var n=null;return{name:\"ContextMediator\",getInstance:function(t){return n||(n=new function(n){var t=[];return n.setEventCallback(n.constants.eventTypes.contextChanged,function(){var n=this;t.forEach(function(t){t.apply(n)})}),{onContextChange:function(n){\"function\"==typeof n?t.push(n):jQuery.sap.log.error(\"Wrong argument for onContextChanged.\")}}}(t)),n},destroyInstance:function(){n=null}}}();",
	"web/ui5/test-resources/sap/apf/demokit/app/helper/formatter.js": "jQuery.sap.declare(\"sap.apf.demokit.app.helper.formatter\"),sap.apf.demokit.app.helper.formatter=function(){var e;return{name:\"FormatHelper\",getInstance:function(t){return void 0===e&&(e=new function(e){this.oApi=e;this.oApi.setEventCallback(e.constants.eventTypes.format,function(e,t,n,a){var r;if(\"Edm.DateTime\"===e.type){if(null===n)return\"-\";if(\"Invalid Date\"===(r=(r=n instanceof Date?n:new Date(parseInt(n.slice(6,n.length-2),10))).toLocaleDateString(\"de\")))return\"-\";a=r}return a})}(t)),e},destroyInstance:function(){e=void 0}}}();",
	"web/ui5/test-resources/sap/apf/demokit/app/helper/preselectionFunction.js": "jQuery.sap.declare(\"sap.apf.demokit.app.helper.preselectionFunction\"),sap.apf.demokit.app.helper.preselectionFunction=function(){var e,t,r=new Date,n=function(e,t){var r=[31,28,31,30,31,30,31,31,30,31,30,31];return 1!==e?r[e]:t%4!=0||t%400!=0&&t%100==0?r[1]:r[1]+1};return{preselectedFromDate:function(){var t=[],n=(r.getFullYear()-1).toString(),o=(r.getMonth()+1).toString();return e=o/10<1?n+\"0\"+o+\"01\":n+o+\"01\",t.push(e),t},preselectedToDate:function(){var e=[],o=r.getFullYear().toString(),a=r.getMonth(),p=n(a,o).toString(),i=(r.getMonth()+1).toString();return t=i/10<1?o+\"0\"+i+p:o+i+p,e.push(t),e}}}();",
	"web/ui5/test-resources/sap/apf/demokit/app/model/initializeMockServer.js": "/*!\n * SAP APF Analysis Path Framework\n * \n * (c) Copyright 2012-2014 SAP AG. All rights reserved\n */\njQuery.sap.declare(\"sap.apf.demokit.app.model.initializeMockServer\"),jQuery.sap.require(\"sap.ui.core.util.MockServer\"),sap.apf.demokit.app.model.initializeMockServer=function(){var e,a,t=function(){var a,t=jQuery.sap.getModulePath(\"sap.apf.demokit.app\"),r=t+\"/model/data/\",o=t+\"/model/metadata/\",s=\"/sap/hba/apps/wca/dso/s/odata/wca.xsodata/\",n={sAppOdataPath:s,sPersistencyOdataPath:\"/sap/opu/odata/sap/BSANLY_APF_RUNTIME_SRV/\",sSmartBusinessOdataPath:\"/sap/hba/r/sb/core/odata/runtime/SMART_BUSINESS.xsodata/\"};e=function(){a.fnRestore()};return{startApplicationMockServer:function(){var e=new sap.ui.core.util.MockServer({rootUri:s}),t=o+\"applicationMetadata.xml\";e.simulate(t,r),e.start(),jQuery.sap.require(\"sap.apf.demokit.app.model.stubbedMethods\"),(a=new sap.apf.demokit.app.model.stubbedMethods(n)).fnStub()},startPersistencyMockServer:function(){var e=new sap.ui.core.util.MockServer({rootUri:\"/sap/opu/odata/sap/BSANLY_APF_RUNTIME_SRV/\"}),a=o+\"persistencyMetadata.xml\",t=r;window.location.pathname.search(\"apf-test\")>=0&&(t+=\"local/\"),e.simulate(a,t),e.start()},startSmartBusinessMockServer:function(){var e=new sap.ui.core.util.MockServer({rootUri:\"/sap/hba/r/sb/core/odata/runtime/SMART_BUSINESS.xsodata/\"}),a=o+\"smartBusinessMetadata.xml\";e.simulate(a,r),e.start()},startModelerMockServer:function(){var e=new sap.ui.core.util.MockServer({rootUri:\"/tmp/apf/config/odata/AnalyticalConfiguration/apf.xsodata/\"}),a=o+\"AnalyticalConfiguration.xml\";e.simulate(a,r),e.start()},startApplicationAnnotationMockServer:function(){new sap.ui.core.util.MockServer({rootUri:\"/sap/hba/apps/wca/dso/s/odata/\",requests:[{method:\"GET\",path:new RegExp(\".*annotation.xml$\"),response:function(e){jQuery.sap.require(\"jquery.sap.xml\"),jQuery.sap.log.debug(\"MockServer: incoming request for url: \"+e.url);var a=jQuery.sap.sjax({url:o+\"annotation.xml\",type:\"GET\"});a.success&&(e.respondXML(200,{\"Content-Type\":\"application/xml\"},jQuery.sap.serializeXML(a.data)),jQuery.sap.log.debug(\"MockServer: response sent with: 200, \"+jQuery.sap.serializeXML(a.data)))}},{method:\"HEAD\",path:new RegExp(\".*annotation.xml\"),response:function(e,a){var t=o+\"annotation.xml\";return e.respondFile(200,{},t)}}]}).start()},startPersistencyAnnotationMockServer:function(){new sap.ui.core.util.MockServer({rootUri:\"/sap/opu/odata/sap/\",requests:[{method:\"GET\",path:new RegExp(\".*annotation.xml$\"),response:function(e){jQuery.sap.require(\"jquery.sap.xml\"),jQuery.sap.log.debug(\"MockServer: incoming request for url: \"+e.url);var a=jQuery.sap.sjax({url:o+\"persistencyAnnotation.xml\",type:\"GET\"});a.success?(e.respondXML(200,{\"Content-Type\":\"application/xml\"},jQuery.sap.serializeXML(a.data)),jQuery.sap.log.debug(\"MockServer: response sent with: 200, \"+jQuery.sap.serializeXML(a.data))):jQuery.sap.log.debug(\"MockServer: error reading persistence annotations\")}},{method:\"HEAD\",path:new RegExp(\".*annotation.xml\"),response:function(e,a){var t=o+\"annotation.xml\";return e.respondFile(200,{},t)}}]}).start()}}};return{name:\"initializeMockServer\",getInstance:function(){return void 0===a&&(a=new t),a},destroyInstance:function(){a=void 0,e()}}}();",
	"web/ui5/test-resources/sap/apf/demokit/app/model/stubbedMethods.js": "jQuery.sap.declare(\"sap.apf.demokit.app.model.stubbedMethods\"),sap.apf.demokit.app.model.stubbedMethods=function(a){return{fnStub:function(){var t=jQuery.ajax;this.stubJqueryAjax=sinon.stub(jQuery,\"ajax\",function(e){var s=e.success,r={getResponseHeader:function(a){return\"x-sap-login-page\"===a?null:a}},u=jQuery.sap.getModulePath(\"sap.apf.demokit.app\"),n=jQuery.sap.getUriParameters().mParams;if(e.url!==a.sAppOdataPath&&e.url!==a.sPersistencyOdataPath)return void 0!=n.smartFilterBar&&\"true\"===n.smartFilterBar[0]&&e.url===u+\"/config/AnalyticalConfiguration.json\"&&(e.url=u+\"/config/AnalyticalConfigurationWithSFB.json\"),t(e);s([],\"success\",r)});var e=jQuery.sap.sjax;this.stubJquerySjax=sinon.stub(jQuery.sap,\"sjax\",function(a){return e(a)})},fnRestore:function(){this.stubJquerySjax.restore(),this.stubJqueryAjax.restore()}}};",
	"web/ui5/test-resources/sap/apf/demokit/app/representation/barChart.js": "jQuery.sap.declare(\"sap.apf.demokit.app.representation.barChart\"),jQuery.sap.require(\"sap.apf.ui.representations.BaseVizChartRepresentation\"),sap.apf.demokit.app.representation.barChart=function(t,a){sap.apf.ui.representations.BaseVizChartRepresentation.apply(this,[t,a]),this.type=\"BarChart\",this.chartType=\"Bar\"},sap.apf.demokit.app.representation.barChart.prototype=Object.create(sap.apf.ui.representations.BaseVizChartRepresentation.prototype),sap.apf.demokit.app.representation.barChart.prototype.constructor=sap.apf.demokit.app.representation.barChart,sap.apf.demokit.app.representation.barChart.prototype.handleCustomFormattingOnChart=function(){var t=this.getMeasures(),a=this.getFormatStringForMeasure(t[0]);this.setFormatString(\"xAxis\",a)};",
	"web/ui5/test-resources/sap/apf/demokit/app/representation/stackedBarChart.js": "jQuery.sap.declare(\"sap.apf.demokit.app.representation.stackedBarChart\"),jQuery.sap.require(\"sap.apf.ui.representations.BaseVizFrameChartRepresentation\"),sap.apf.demokit.app.representation.stackedBarChart=function(e,a){sap.apf.ui.representations.BaseVizFrameChartRepresentation.apply(this,[e,a]),this.type=\"StackedBarChart\",this.chartType=\"stacked_bar\",this._createDefaultFeedItemId()},sap.apf.demokit.app.representation.stackedBarChart.prototype=Object.create(sap.apf.ui.representations.BaseVizFrameChartRepresentation.prototype),sap.apf.demokit.app.representation.stackedBarChart.prototype.constructor=sap.apf.demokit.app.representation.stackedBarChart,sap.apf.demokit.app.representation.stackedBarChart.prototype._createDefaultFeedItemId=function(){this.parameter.measures.forEach(function(e,a){void 0===e.kind&&(e.axisfeedItemId=0===a?sap.apf.core.constants.vizFrame.feedItemTypes.VALUEAXIS:sap.apf.core.constants.vizFrame.feedItemTypes.VALUEAXIS2)}),this.parameter.dimensions.forEach(function(e,a){void 0===e.kind&&(e.axisfeedItemId=0===a?sap.apf.core.constants.vizFrame.feedItemTypes.CATEGORYAXIS:sap.apf.core.constants.vizFrame.feedItemTypes.COLOR)})},sap.apf.demokit.app.representation.stackedBarChart.prototype.handleCustomFormattingOnChart=function(){var e=this.getMeasures(),a=this.getFormatStringForMeasure(e[0]);this.setFormatString(\"xAxis\",a)};",
	"web/ui5/test-resources/sap/apf/demokit/app/resources/i18n/app.properties": "#FIORI: insert Fiori-Id\n# __ldi.translation.uuid=54dd7956-64a1-0518-e100-00000a445b6d\n#ApfApplicationId=54DD795664A10518E10000000A445B6D\n\n# TRANSLATE\n\n# Syntax\n# <SAP-Text-Type>[,<Length-Restriction>[:<Note for translator>]]\n\n# APPLICATION\n\n# Digest Area\n\n#XTIT,100\n54DD795964A10518E10000000A445B6D=Receivables and Overdue Receivables by Customer\n# LastChangeDate=2015/02/13 12:04:27\n\n#XTIT,200\n54DD795D64A10518E10000000A445B6D=Receivables and Overdue Receivables by Customer\n# LastChangeDate=2015/02/13 12:04:27\n\n#XFLD,25\n54DD796164A10518E10000000A445B6D=Overdue Receivables\n# LastChangeDate=2015/02/13 12:04:27\n\n#XFLD,25\n54DD796564A10518E10000000A445B6D=\n# LastChangeDate=2015/02/13 12:04:27\n\n#XFLD,25\n54DD796964A10518E10000000A445B6D=Customer\n# LastChangeDate=2015/02/13 12:04:27\n\n#XTIT,100\n54DD796D64A10518E10000000A445B6D=Revenue by Country of Customer\n# LastChangeDate=2015/02/13 12:04:27\n\n#XTIT,200\n54DD797164A10518E10000000A445B6D=Revenue by Country of Customer\n# LastChangeDate=2015/02/13 12:04:27\n\n#XTIT,200\n54DD797164A10518E10000000A445B6D=Revenue by Country of Customer\n# LastChangeDate=2015/02/13 12:04:27\n\n#XTIT,200\n55F0525A16ECB25BE10000000A154CDB=Revenue by Country of Customer over Time\n# LastChangeDate=2015/09/09 17:23:38\n\n#XFLD,25\n54DD797564A10518E10000000A445B6D=Revenue\n# LastChangeDate=2015/02/13 12:04:28\n\n#XFLD,25\n54DD797964A10518E10000000A445B6D=Country of Customer\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,100\n54DD797D64A10518E10000000A445B6D=Revenue by Customer (Selection Mapping to Customer Country)\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,200\n54DD798164A10518E10000000A445B6D=Revenue by Customer (Selection Mapping to Customer Country Property)\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,100\n54DD798564A10518E10000000A445B6D=Receivables by Country of Customer\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,200\n54DD798964A10518E10000000A445B6D=Receivables by Country of Customer\n# LastChangeDate=2015/02/13 12:04:28\n\n#XFLD,25\n54DD798D64A10518E10000000A445B6D=Receivables\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,100\n54DD799164A10518E10000000A445B6D=Revenue by Customer\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,200\n54DD799564A10518E10000000A445B6D=Revenue by Customer\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,100\n54DD799964A10518E10000000A445B6D=Revenue by Customer over Time\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,200\n54DD799D64A10518E10000000A445B6D=Revenue by Customer over Time\n# LastChangeDate=2015/02/13 12:04:28\n\n#XFLD,25\n54DD79A164A10518E10000000A445B6D=Time\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,100\n54DD79A564A10518E10000000A445B6D=Receivables by Customer over Time\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,200\n54DD79A964A10518E10000000A445B6D=Receivables by Customer over Time\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,100\n54DD79AD64A10518E10000000A445B6D=Receivables by Customer\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,200\n54DD79B164A10518E10000000A445B6D=Receivables by Customer\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,100\n54DD79B564A10518E10000000A445B6D=Revenue and Receivables over Time\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,200\n54DD79B964A10518E10000000A445B6D=Revenue and Receivables over Time\n# LastChangeDate=2015/02/13 12:04:28\n\n#XFLD,25\n54DD79BD64A10518E10000000A445B6D=Revenue / Receivables\n# LastChangeDate=2015/02/13 12:04:28\n\n#XTIT,100\n54DD79C164A10518E10000000A445B6D=Revenue and Receivables By Customer\n# LastChangeDate=2015/02/13 12:04:29\n\n#XTIT,200\n54DD79C564A10518E10000000A445B6D=Revenue and Receivables By Customer\n# LastChangeDate=2015/02/13 12:04:29\n\n#XTIT,100\n54DD79C964A10518E10000000A445B6D=List of Open Line Items\n# LastChangeDate=2015/02/13 12:04:29\n\n#XTIT,100\n571ADBA7F5D90F26E10000000A154CDB=List of Open Line Items (Selection & TopN)\n# LastChangeDate=2016/04/26 16:03:52\n\n#XTIT,200\n54DD79CD64A10518E10000000A445B6D=List of Open Line Items\n# LastChangeDate=2015/02/13 12:04:29\n\n#XFLD,25\n54DD79D164A10518E10000000A445B6D=Open Receivables\n# LastChangeDate=2015/02/13 12:04:29\n\n#XTIT,60\n54DD79D564A10518E10000000A445B6D=Time\n# LastChangeDate=2015/02/13 12:04:29\n\n#XTIT,60\n54DD79D964A10518E10000000A445B6D=Country of Customer \n# LastChangeDate=2015/02/13 12:04:29\n\n#XTIT,60\n54DD79DD64A10518E10000000A445B6D=Line Items\n# LastChangeDate=2015/02/13 12:04:29\n\n#XFLD,50\n54DD79E164A10518E10000000A445B6D=From\n# LastChangeDate=2015/02/13 12:04:29\n\n#XFLD,50\n54DD79E564A10518E10000000A445B6D=To\n# LastChangeDate=2015/02/13 12:04:29\n\n#XFLD,50\n54DD79E964A10518E10000000A445B6D=Company Code\n# LastChangeDate=2015/02/13 12:04:29\n\n#XFLD,50\n54DD79ED64A10518E10000000A445B6D=Sales Organization\n# LastChangeDate=2015/02/13 12:04:29\n\n#XTIT,250\n54DD79F364A10518E10000000A445B6D=APF Demo Application\n# LastChangeDate=2015/02/13 12:04:33\n\n#XFLD,60\nbarChart=Bar Chart\n\n#XFLD,60\nStackedBarChart=Stacked Bar Chart\n\n#XFLD,60\ngeoMap=Geo Map\n\n#<---- Application Static Texts (To be moved to a separate file). ---->\n\n#XTIT, 60\nok=OK\n#XTIT, 60\ncancel=Cancel\n#XFLD,60\nexchangeRateSettings=Exchange Rate Settings\n#XFLD,60\nexchangeRate=Exchange Rate\n#XFLD,60\nkeyDateKey=Key Date\n#XFLD,60\npostingDate=Dynamic Date\n#XFLD,60\nenterDate=Enter Date...\n#XFLD,20\nmonth-1-shortName=Jan\n#XFLD,20\nmonth-2-shortName=Feb\n#XFLD,20\nmonth-3-shortName=Mar\n#XFLD,20\nmonth-4-shortName=Apr\n#XFLD,20\nmonth-5-shortName=May\n#XFLD,20\nmonth-6-shortName=Jun\n#XFLD,20\nmonth-7-shortName=Jul\n#XFLD,20\nmonth-8-shortName=Aug\n#XFLD,20\nmonth-9-shortName=Sep\n#XFLD,20\nmonth-10-shortName=Oct\n#XFLD,20\nmonth-11-shortName=Nov\n#XFLD,20\nmonth-12-shortName=Dec\n\t\t\n#XFLD,20\nreportingCurrency= Reporting Currency\n#XFLD,40\nP_ExchangeRateType= Exchange Rate Type\n#XFLD,60\nP_ExchangeRateDate = Date Type\n#XFLD,40\nP_DisplayCurrency= Currency\n",
	"web/ui5/test-resources/sap/apf/demokit/app/resources/i18n/appMessages.properties": "# TRANSLATE\n\n# Syntax\n# <SAP-Text-Type>[,<Length-Restriction>[:<Note for translator>]]\n\n# APPLICATION CA-EPT-ANL-APF\n\n# Digest Area\n#YMSG,200\n12000=The SAP client is missing in the URL.\n#YMSG, 200\n12001=No data is available for the analysis settings\n#YMSG,200\n12002=Missing {0} in the configuration of the analysis settings; contact your administrator.\n"
}, "web/ui5/test-resources/sap/apf/demokit/app/Component-preload");