/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/rta/library','sap/ui/rta/Utils','sap/ui/core/Control','sap/ui/commons/Label','sap/ui/commons/LabelDesign','sap/m/Dialog','sap/ui/model/json/JSONModel','sap/m/SearchField','sap/m/Button','sap/m/Toolbar','sap/m/ToolbarSpacer','sap/ui/model/Filter','sap/ui/model/FilterOperator','sap/ui/rta/controlAnalyzer/ControlAnalyzerFactory','sap/ui/rta/command/CommandFactory','sap/ui/rta/command/CompositeCommand','sap/m/List','sap/m/CustomListItem','sap/m/ListType','sap/m/ScrollContainer','sap/ui/model/Sorter','sap/ui/dt/ElementUtil'],function(q,l,U,C,L,a,D,J,S,B,T,b,F,c,d,e,f,g,h,i,j,k,E){"use strict";var A=C.extend("sap.ui.rta.ui.AddElementsDialog",{metadata:{library:"sap.ui.rta",properties:{"commandStack":{type:"sap.ui.core.Control"}},associations:{"rootControl":{type:"sap.ui.core.Control"}},events:{"opened":{},"closed":{},"openCustomField":{}}}});A.prototype.init=function(){this._aData=[];var t=this;this._oModel=new J();this._oTextResources=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");this._bAscendingSortOrder=false;this._oDialog=this._createDialog();var m=this._createContent();var n=this._createButtons();m.forEach(function(o){t._oDialog.addContent(o);});n.forEach(function(o){t._oDialog.addButton(o);});this._oDialog.setInitialFocus(this._oInput);};A.prototype._createDialog=function(){var o;o=new D({title:this._oTextResources.getText("HEADER_FREP")}).addStyleClass("sapUIRtaFieldRepositoryDialog");return o;};A.prototype._createContent=function(){this._oInput=new S({width:"100%",liveChange:[this._updateModelFilter,this]}).addStyleClass("resourceListIF");var r=new B({text:"",icon:"sap-icon://sort",press:[this._resortList,this]});this._oCustomFieldButton=new B({text:"",icon:"sap-icon://add",tooltip:this._oTextResources.getText("BTN_FREP_CCF"),enabled:false,press:[this._redirectToCustomFieldCreation,this]});this._oToolbarSpacer1=new b();this.oInputFields=new T({content:[this._oInput,r,this._oToolbarSpacer1,this._oCustomFieldButton]});var o=new L({design:a.Bold,tooltip:{parts:[{path:"quickInfo"},{path:"fieldLabel"}],formatter:function(p,t){if(!p){return t;}return p;}},text:"{fieldLabel}"});var s=new k("fieldLabel",this._bAscendingSortOrder);this._oList=new g({mode:"MultiSelect",includeItemInSelection:true,growing:false,growingScrollToLoad:false,select:[this._fnSelected,this]});var m=new h({type:i.Active,selected:"{checked}",content:[o]});this._oModel.setData({modelData:this._aData});this._oList.setModel(this._oModel);this._oList.bindItems({path:"/modelData",template:m,sorter:s});var n=new j({content:this._oList,vertical:true,horizontal:false}).addStyleClass("sapUIRtaCCDialogScrollContainer");return[this.oInputFields,n];};A.prototype._createButtons=function(){var o=new B({text:this._oTextResources.getText("BTN_FREP_OK"),press:[this.applyChanges,this]});var m=new B({text:this._oTextResources.getText("BTN_FREP_CANCEL"),press:[this.cancelDialog,this]});return[o,m];};A.prototype.applyChanges=function(){if(this._oCompositeCommand.getCommands().length>0){this.getCommandStack().pushAndExecute(this._oCompositeCommand);}this._oList.removeSelections();this._oCompositeCommand=null;this._mCommands=[];this._oCurrentAnalyzer=null;this._oCurrentSelectedBlock=null;this._oDialog.close();};A.prototype.cancelDialog=function(){this._oList.removeSelections();this._oCompositeCommand=null;this._mCommands=[];this._oCurrentAnalyzer=null;this._oCurrentSelectedBlock=null;this._oDialog.close();};A.prototype._fnSelected=function(o){var I=o.getParameter("listItem");var m=I.getBindingContext().getObject();var s=m.name?m.name:null;if(!s){s=m.controlId?m.controlId:null;}if(s){var n=this._mCommands[s];this._executeCommandForSelectedElement(I,n,s);}else{q.sap.log.error("Change could not be applied because of missing id of listItem\n");}};A.prototype._getMoveCommand=function(o,m,s){var r;var n=sap.ui.getCore().byId(m.controlId);var p=n?n.getParent():null;if(o&&p&&(o.getId()!==n.getId())){var t=E.getAggregation(p,"groupElements");if(t.length>0){r=e.getCommandFor(p,"Move");var u=t.indexOf(n);var v=E.getAggregation(o,"groupElements");var w=U.determineTargetIndex(s,o,v,0);r.setMovedElements([{element:n,sourceIndex:u,targetIndex:w}]);r.setSource({parent:p,aggregation:n.sParentAggregationName});r.setTarget({parent:o,aggregation:"groupElements"});}}return r;};A.prototype._executeCommandForSelectedElement=function(I,o,s){var m=I.getSelected();var t=this;if(o){delete t._mCommands[s];t._oCompositeCommand.removeCommand(o);return;}this._oCurrentAnalyzer.createChangeData(I,this._oCurrentSelectedBlock,!m,this._oSelectedControl).then(function(n){if(n){if(n.changeType==="addField"){o=e.getCommandFor(t._oCurrentSelectedBlock,"Add");o.setIndex(n.index);o.setNewControlId(n.newControlId);o.setLabels([n.fieldLabel]);o.setJsTypes([n.jsType]);o.setFieldValues([n.fieldValue]);o.setValuePropertys([n.valueProperty]);t._mCommands[s]=o;t._oCompositeCommand.addCommand(o);}else if(n.changeType==="unhideControl"){o=e.getCommandFor(sap.ui.getCore().byId(n.controlId),"Unhide");var M=t._getMoveCommand(t._oCurrentSelectedBlock,n,t._oSelectedControl);if(M){var p=new f();p.addCommand(M);p.addCommand(o);o=p;}t._mCommands[s]=o;t._oCompositeCommand.addCommand(o);}else if(n.changeType==="unstashControl"){o=e.getCommandFor(sap.ui.getCore().byId(n.controlId),"Unstash");o.setParentAggregationName(n.parentAggregationName);o.setIndex(n.iTargetIndex);t._mCommands[s]=o;t._oCompositeCommand.addCommand(o);}}else{I.setSelected(!m);}}).catch(function(n){q.sap.log.error("Change could not be applied \n"+n);});};A.prototype.open=function(o){var t=this;this._oSelectedControl=o;this._mCommands=[];this._oCompositeCommand=new f();if(o.getMetadata().getName().indexOf("ObjectPage")!==-1){this._oDialog.setTitle(this._oTextResources.getText("HEADER_SREP"));}else{this._oDialog.setTitle(this._oTextResources.getText("HEADER_FREP"));}U.isServiceUpToDate(o).then(function(u){if(u){t._oCurrentAnalyzer=d.getControlAnalyzerFor(o);return t._oCurrentAnalyzer.prepare().then(function(){var m=t._oCurrentAnalyzer.getCustomFieldAvailable?t._oCurrentAnalyzer.getCustomFieldAvailable():false;if(m){t.setShowCreateCustomField(true);t._oCurrentFieldExtInfo=m;t.attachEventOnce('openCustomField',null,t._onOpenCustomField,t);}}).then(function(){if(t._oCurrentAnalyzer){t._oCurrentSelectedBlock=t._oCurrentAnalyzer.getSelectedBlock(o);if(/[&?](sap-rta-oldmodel=(true|x)[&#]?)+/i.test(window.location.search)){t._oCurrentAnalyzer.getCustomizeControlModel(o,true).then(function(n){t._oModel.setData({modelData:n});t._oDialog.oPopup.attachOpened(function(){t.fireOpened();});t._oDialog.open();});}else{var m=t._oCurrentAnalyzer.getAvailableElements();t._oModel.setData({modelData:m});t._oDialog.oPopup.attachOpened(function(){t.fireOpened();});t._oDialog.open();}}});}else{t.fireOpened();}});};A.prototype._resortList=function(o){this._bAscendingSortOrder=!this._bAscendingSortOrder;var m=this._oList.getBinding("items");var s=[];s.push(new k("fieldLabel",this._bAscendingSortOrder));m.sort(s);};A.prototype._redirectToCustomFieldCreation=function(o){this.fireOpenCustomField();this._oDialog.close();};A.prototype.setShowCreateCustomField=function(s){this._oCustomFieldButton.setEnabled(s);};A.prototype._onOpenCustomField=function(o){var m=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService("CrossApplicationNavigation");var H=(m&&m.hrefForExternal({target:{semanticObject:"CustomField",action:"develop"},params:{businessContexts:this._oCurrentFieldExtInfo.BusinessContexts,serviceName:this._oCurrentFieldExtInfo.ServiceName,serviceVersion:this._oCurrentFieldExtInfo.ServiceVersion,entityType:this._oCurrentFieldExtInfo.EntityType}}));U.openNewWindow(H);};A.prototype._updateModelFilter=function(o){var v=o.getParameter("newValue");var m=this._oList.getBinding("items");if((typeof v)==="string"){var n=new F("fieldLabel",c.Contains,v);var p=new F("quickInfo",c.Contains,v);var r=new F({filters:[n,p],and:false});m.filter([r]);}else{m.filter([]);}};return A;},true);
