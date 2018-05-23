/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/m/Button','sap/m/FlexAlignItems','sap/m/FlexAlignSelf','sap/m/FlexDirection','sap/m/FlexItemData','sap/m/FlexJustifyContent','sap/m/HBox','sap/m/VBox','sap/ui/comp/library','sap/ui/comp/odata/FieldSelector','./FieldList','sap/ui/core/Control','sap/ui/core/ResizeHandler','sap/ui/fl/registry/Settings','sap/ui/layout/Grid'],function(q,B,F,a,b,c,d,H,V,l,e,f,C,R,S,G){"use strict";var D=C.extend("sap.ui.comp.smartform.flexibility.DialogContent",{metadata:{library:"sap.ui.comp",aggregations:{content:{type:"sap.ui.core.Control",multiple:false}}}});D.prototype.init=function(){this._oScrollView=new sap.m.ScrollContainer();var s=sap.ui.getCore().byId("smartFormPersDialog");if(s){this._oResizeDialogHandlerId=R.register(s,q.proxy(this._handleResizeDialog,this));}this._textResources=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");this._constructLayout();this._createButtons();this._createFieldList();this._createFieldSelector();this._createModels();this._initiateBinding();this.addStyleClass("sapUiSizeCompact");this._sFirstIdPart=undefined;};D.prototype._handleResizeDialog=function(){if(this._oScrollView){var h=q("#smartFormPersDialog-cont").height();var g=q("#smartFormPersDialogFieldListHeader").height();this._oScrollView.setHeight(h-g+"px");}};D.prototype._initiateBinding=function(){this._oFieldList.bindAggregation("nodes",{path:"/children",factory:this._createNodeFactoryFunction.bind(this)});this._oFieldList.attachSelectionChanged(this._onSelectionChanged.bind(this));this._oFieldList.attachLabelChanged(this._onLabelChanged.bind(this));this._oFieldList.attachNodeHidden(this._onNodeAddedOrHidden.bind(this));this._oBtnMoveDown.bindProperty("enabled",{path:"/isMoveDownButtonEnabled"});this._oBtnMoveUp.bindProperty("enabled",{path:"/isMoveUpButtonEnabled"});this._oBtnMoveBottom.bindProperty("enabled",{path:"/isMoveBottomButtonEnabled"});this._oBtnMoveTop.bindProperty("enabled",{path:"/isMoveTopButtonEnabled"});this._oBtnAddField.bindProperty("enabled",{parts:[{path:"addFieldButtonDependencies>/selectedField"},{path:"addFieldButtonDependencies>/groups"}],formatter:this._isAddFieldEnabled.bind(this)});};D.prototype._createModels=function(){this._oAddFieldButtonDependenciesModel=new sap.ui.model.json.JSONModel({"selectedField":undefined,"groups":undefined});this.setModel(this._oAddFieldButtonDependenciesModel,'addFieldButtonDependencies');this._emptyModel=new sap.ui.model.json.JSONModel();};D.prototype.setViewId=function(i){this._sViewId=i;};D.prototype.initialiseODataFieldSelector=function(o,E,s,i,m,I,p){var O;var g=false;O=this._oFieldSelector;if(O){S.getInstance(s,p).then(function(h){if(h.isModelS){g=h.isModelS();}O.setModel(o,E,g,i,m,I);});}};D.prototype._createNodeFactoryFunction=function(i,o){var n,N;n={label:{path:"label"},nodes:{path:o.getPath()+"/children",factory:this._createNodeFactoryFunction.bind(this)},isSelected:{path:"isSelected"},isVisible:{path:"isVisible"}};N=new sap.ui.comp.smartform.flexibility.FieldListNode(i,n);return N;};D.prototype._onSelectionChanged=function(E){var s,n;s=E.getParameter('node');n=s.getBindingContext().getObject();this._changeSelection(n);this.getModel().updateBindings();};D.prototype._onLabelChanged=function(E){var o,g;o=E.getParameter('node');g=o.getBindingContext().getObject();this._oFieldSelector.updateFieldLabel(g);};D.prototype._onNodeAddedOrHidden=function(E){this._oAddFieldButtonDependenciesModel.setProperty("/groups",this.getModel().getData().children);this._triggerAddFieldButtonDependenciesBindings();};D.prototype._changeSelection=function(n){if(this._oSelectedFieldListNodeData){this._oSelectedFieldListNodeData.isSelected=false;}this._oSelectedFieldListNodeData=n;this._oSelectedFieldListNodeData.isSelected=true;this._readDataFromModelAndUpdateMoveButtonEnabledState();this.getModel().updateBindings();};D.prototype._readDataFromModelAndUpdateMoveButtonEnabledState=function(){var o;o=this._getDataFromModel();this._updateMoveButtonEnabledState(o);};D.prototype._checkMoveDown=function(n,g,A){var i,m={};m.enabled=false;m.moveStep=0;m.newParent=undefined;m.enabled=n.parent.children.length-1>n.index;if(m.enabled){for(i=n.index+1;i<n.parent.children.length;i++){m.moveStep+=1;if(!n.parent.children[i].hasOwnProperty('isVisible')||n.parent.children[i].isVisible){return m;}if(i===(n.parent.children.length-1)){m.enabled=false;}}}if(!m.enabled){var h=A[g-1].indexOf(n.parent);m.enabled=A[g-1].length-1>h;if(m.enabled){for(i=h+1;i<A[g-1].length;i++){if(!A[g-1][i].hasOwnProperty('isVisible')||A[g-1][i].isVisible){m.newParent=A[g-1][i];return m;}if(i===(A[g-1].length-1)){m.enabled=false;}}}}return m;};D.prototype._checkMoveUp=function(n,g,A){var i,m={};m.enabled=false;m.moveStep=0;m.newParent=undefined;m.enabled=n.index>0;if(m.enabled){for(i=n.index-1;i>=0;i--){m.moveStep+=1;if(!n.parent.children[i].hasOwnProperty('isVisible')||n.parent.children[i].isVisible){return m;}if(i===0){m.enabled=false;}}}if(!m.enabled){var h=A[g-1].indexOf(n.parent);m.enabled=h>0;if(m.enabled){for(i=h-1;i>=0;i--){if(!A[g-1][i].hasOwnProperty('isVisible')||A[g-1][i].isVisible){m.newParent=A[g-1][i];return m;}if(i===0){m.enabled=false;}}}}return m;};D.prototype._updateMoveButtonEnabledState=function(o){var g,i,I,h,j;var t=this;g=function(n,k,A){var m=t._checkMoveDown(n,k,A);var M=t._checkMoveUp(n,k,A);i=m.enabled;I=M.enabled;h=i;j=I;};if(this._oSelectedFieldListNodeData){this._findNodeInDataModel(o,this._oSelectedFieldListNodeData.id,g);}else{i=false;I=false;h=false;j=false;}o.isMoveDownButtonEnabled=i;o.isMoveUpButtonEnabled=I;o.isMoveBottomButtonEnabled=h;o.isMoveTopButtonEnabled=j;};D.prototype._constructLayout=function(){this.oLayout=new H({direction:b.Row});this.oLayoutLeft=new V({direction:b.Column,layoutData:new c({order:1,growFactor:2})});this.oLayoutLeft.addStyleClass("sapUiCompDialogContentFieldListContainer");this.oLayoutMiddle=new V({direction:b.Column,layoutData:new c({order:2,growFactor:1})});this.oLayoutMiddle.addStyleClass("sapUiCompDialogContentMiddle");this.oLayoutTopLeft=new G("smartFormPersDialogFieldListHeader");this.oLayoutTopLeft.addStyleClass("sapUiCompDialogContentFieldListContainerTop");this.oLayoutLeft.addItem(this.oLayoutTopLeft);this.oLayoutRight=new V({direction:b.Column,layoutData:new c({order:3,growFactor:9})});this.oLayout.addItem(this.oLayoutLeft);this.oLayout.addItem(this.oLayoutMiddle);this.oLayout.addItem(this.oLayoutRight);this.setContent(this.oLayout);};D.prototype._createFieldList=function(){this._oScrollView.setWidth("100%");this._oScrollView.setVertical(true);this._oFieldList=new f(this.getId()+'-FieldList');this._oScrollView.addContent(this._oFieldList);this._handleResizeDialog();this.oLayoutLeft.addItem(this._oScrollView);};D.prototype._createFieldSelector=function(){this._oFieldSelector=new e({layoutData:new c({order:3,growFactor:9})});this._oFieldSelector.attachFieldSelectionChanged(this._writeSelectedFieldToModel.bind(this));this.oLayoutRight.addItem(this._oFieldSelector);};D.prototype._writeSelectedFieldToModel=function(s){this._oAddFieldButtonDependenciesModel.setProperty("/selectedField",s.mParameters);this._triggerAddFieldButtonDependenciesBindings();};D.prototype._triggerAddFieldButtonDependenciesBindings=function(){this.setModel(this._emptyModel,'addFieldButtonDependencies');if(!this._oAddFieldButtonDependenciesModel.getData().groups){this._oAddFieldButtonDependenciesModel.setProperty("groups",this.getModel().getData().children);}this.setModel(this._oAddFieldButtonDependenciesModel,'addFieldButtonDependencies');};D.prototype._isAddFieldEnabled=function(s,g){var v=!!s&&!!s.name;return v&&g&&this._containsVisibleGroups(g);};D.prototype._containsVisibleGroups=function(g){var v=this._getVisibleGroups(g);return v.length>0;};D.prototype._getVisibleGroups=function(g){var v=[];g.forEach(function(n){if(n.isVisible){v.push(n);}});return v;};D.prototype._createButtons=function(){var t,T;this._oBtnMoveBottom=new B(this.getId()+'-MoveBottomButton',{layoutData:new sap.ui.layout.GridData({span:"L2 M3 S3"})});this._oBtnMoveBottom.setIcon("sap-icon://expand-group");this._oBtnMoveBottom.attachPress(this._onMoveBottomClick.bind(this));T=this._textResources.getText("FORM_PERS_DIALOG_MOVE_BOTTOM");this._oBtnMoveBottom.setTooltip(T);this.oLayoutTopLeft.addContent(this._oBtnMoveBottom);this._oBtnMoveDown=new B(this.getId()+'-MoveDownButton',{layoutData:new sap.ui.layout.GridData({span:"L2 M3 S3"})});this._oBtnMoveDown.setIcon("sap-icon://slim-arrow-down");this._oBtnMoveDown.attachPress(this._onMoveDownClick.bind(this));T=this._textResources.getText("FORM_PERS_DIALOG_MOVE_DOWN");this._oBtnMoveDown.setTooltip(T);this.oLayoutTopLeft.addContent(this._oBtnMoveDown);this._oBtnMoveUp=new B(this.getId()+'-MoveUpButton',{layoutData:new sap.ui.layout.GridData({span:"L2 M3 S3"})});this._oBtnMoveUp.setIcon("sap-icon://slim-arrow-up");this._oBtnMoveUp.attachPress(this._onMoveUpClick.bind(this));T=this._textResources.getText("FORM_PERS_DIALOG_MOVE_UP");this._oBtnMoveUp.setTooltip(T);this.oLayoutTopLeft.addContent(this._oBtnMoveUp);this._oBtnMoveTop=new B(this.getId()+'-MoveTopButton',{layoutData:new sap.ui.layout.GridData({span:"L2 M3 S3"})});this._oBtnMoveTop.setIcon("sap-icon://collapse-group");this._oBtnMoveTop.attachPress(this._onMoveTopClick.bind(this));T=this._textResources.getText("FORM_PERS_DIALOG_MOVE_TOP");this._oBtnMoveTop.setTooltip(T);this.oLayoutTopLeft.addContent(this._oBtnMoveTop);this._oBtnAddGroup=new B(this.getId()+'-AddGroupButton',{layoutData:new sap.ui.layout.GridData({span:"L4 M12 S12"})});t=this._textResources.getText("FORM_PERS_DIALOG_ADD_GROUP");this._oBtnAddGroup.setText(t);this._oBtnAddGroup.attachPress(this._onAddGroupClick.bind(this));T=this._textResources.getText("FORM_PERS_DIALOG_ADD_GROUP");this._oBtnAddGroup.setTooltip(T);this.oLayoutTopLeft.addContent(this._oBtnAddGroup);this._oBtnAddField=new B(this.getId()+'-AddFieldButton');this._oBtnAddField.setIcon("sap-icon://slim-arrow-left");this._oBtnAddField.attachPress(this._onAddFieldClick.bind(this));T=this._textResources.getText("FORM_PERS_DIALOG_ADD_FIELD");this._oBtnAddField.setTooltip(T);this.oLayoutMiddle.addItem(this._oBtnAddField);};D.prototype._onMoveUpClick=function(){var m,o,i;m=this.getModel();if(m){i=this._getIdOfSelectedFieldListNode();o=this._getDataFromModel();this._executeMoveUp(o,i);this._updateMoveButtonEnabledState(o);m.setData(o);}};D.prototype._onMoveDownClick=function(){var o,i,m;m=this.getModel();if(m){i=this._getIdOfSelectedFieldListNode();o=this._getDataFromModel();this._executeMoveDown(o,i);this._updateMoveButtonEnabledState(o);m.setData(o);}};D.prototype._onMoveTopClick=function(){var m,o,i;m=this.getModel();if(m){i=this._getIdOfSelectedFieldListNode();o=this._getDataFromModel();this._executeMoveTop(o,i);this._updateMoveButtonEnabledState(o);m.setData(o);}};D.prototype._onMoveBottomClick=function(){var o,i,m;m=this.getModel();if(m){i=this._getIdOfSelectedFieldListNode();o=this._getDataFromModel();this._executeMoveBottom(o,i);this._updateMoveButtonEnabledState(o);m.setData(o);}};D.prototype._onAddGroupClick=function(){var o,m;m=this.getModel();if(m){o=this._getDataFromModel();this._executeAddGroup(o);m.setData(o);this._onNodeAddedOrHidden();}};D.prototype._getIdOfSelectedFieldListNode=function(){var n;n=this._oSelectedFieldListNodeData;if(n){return n.id;}};D.prototype._onAddFieldClick=function(E){var m,o;m=this.getModel();if(m){o=this._getDataFromModel();this._executeAddField(o);m.setData(o);}};D.prototype._getParentAndIndexNodeForNewField=function(o){var i,n,p;i=this._getIdOfSelectedFieldListNode();this._findNodeInDataModel(o,i,function(N){if(N.type==='group'){p=N;if(p.children&&p.children.length){n=p.children.length;}}else{p=N.parent;n=N.index+1;}});if(!p){p=this._getBottomGroup(o);n=p.children.length;}return{parent:p,index:n};};D.prototype._getBottomGroup=function(o){var g;if(o&&o.children&&o.children.length>0){var v=this._getVisibleGroups(o.children);g=v[v.length-1];}return g;};D.prototype._getDataFromModel=function(){var m;m=this.getModel();if(m){return m.getData();}};D.prototype._createAdjacenceList=function(o){var A,g;A=[];g=function(n,p,h,i){n.index=h;n.parent=p;A[i]=A[i]||[];A[i].push(n);};this._dfs(o,g);return A;};D.prototype._destroyAdjacenceList=function(o){var g;g=function(n,p,h,i){delete n.index;delete n.parent;};this._dfs(o,g);};D.prototype._dfs=function(o,g,p,n,h){var i;if(!o){return;}h=h||0;n=n||0;g(o,p,n,h);if(o&&o.children){for(i=0;i<o.children.length;i++){this._dfs(o.children[i],g,o,i,h+1);}}};D.prototype._findNodeInDataModel=function(o,i,g){var A;A=this._createAdjacenceList(o);(function(){var n,j,h,k,N;h=A.length;for(n=0;n<h;n++){k=A[n].length;for(j=0;j<k;j++){N=A[n][j];if(N.id===i){g(N,n,A);return;}}}}());this._destroyAdjacenceList(o);};D.prototype._moveDownNode=function(n,g,A){var m=this._checkMoveDown(n,g,A);if(m.enabled){if(m.newParent){n.parent.children.splice(n.index,1);m.newParent.children=m.newParent.children||[];m.newParent.children.splice(0,0,n);}else{n.parent.children.splice(n.index,1);n.parent.children.splice(n.index+m.moveStep,0,n);}}};D.prototype._moveUpNode=function(n,g,A){var m=this._checkMoveUp(n,g,A);if(m.enabled){if(m.newParent){n.parent.children.splice(n.index,1);m.newParent.children=m.newParent.children||[];m.newParent.children.push(n);}else{n.parent.children.splice(n.index,1);n.parent.children.splice(n.index-m.moveStep,0,n);}}};D.prototype._moveBottomNode=function(n,g,A){var m=this._checkMoveDown(n,g,A);if(m.enabled){if(m.newParent){n.parent.children.splice(n.index,1);m.newParent.children=m.newParent.children||[];m.newParent.children.push(n);}else{n.parent.children.splice(n.index,1);n.parent.children.push(n);}}};D.prototype._moveTopNode=function(n,g,A){var m=this._checkMoveUp(n,g,A);if(m.enabled){if(m.newParent){n.parent.children.splice(n.index,1);m.newParent.children=m.newParent.children||[];m.newParent.children.splice(0,0,n);}else{n.parent.children.splice(n.index,1);n.parent.children.splice(0,0,n);}}};D.prototype._executeMoveDown=function(o,i){return this._findNodeInDataModel(o,i,this._moveDownNode.bind(this));};D.prototype._executeMoveUp=function(o,i){return this._findNodeInDataModel(o,i,this._moveUpNode.bind(this));};D.prototype._executeMoveBottom=function(o,i){return this._findNodeInDataModel(o,i,this._moveBottomNode.bind(this));};D.prototype._executeMoveTop=function(o,i){return this._findNodeInDataModel(o,i,this._moveTopNode.bind(this));};D.prototype._executeAddField=function(o){var n,N,t=this;n=this._getParentAndIndexNodeForNewField(o);N=this._getNewNodeFromSelectedODataField(o,this._getSelectedFieldFromFieldSelector());var E=this._getExistingField(N,o);if(E){this._findNodeInDataModel(o,E.id,function(g,h,A){g.isVisible=true;g.parent.children.splice(g.index,1);if(g.parent===n.parent){if(g.index<n.index){n.index--;}}t._addField(g,n.parent,n.index);});}else{this._addField(N,n.parent,n.index);}};D.prototype._getExistingField=function(n,o){var g=false;var r='';if(n.isBoundToODataService){r=n.entityType+'/'+n.fieldValue;}else{r=n.id;}var h=function(p,s){if(s.path===r){g=true;}};var j=function(p){if(p===r){g=true;}};if(o.children){for(var i=0;i<o.children.length;i++){var k=o.children[i];if(k.type==="field"){if(k.isBoundToODataService){q.each(k.bindingPaths,h);}else{j(k.id);}}if(g){return k;}var m=this._getExistingField(n,k);if(m){return m;}}}};D.prototype._addField=function(n,p,g){if(!n){return;}p.children=p.children||[];if(g||g===0){p.children.splice(g,0,n);}else{p.children.push(n);}};D.prototype._getNewNodeFromSelectedODataField=function(o,s){var n;if(!s){return null;}n={bindingPaths:(s.isBoundToODataService)?[{path:s.entityName+'/'+s.path}]:[{path:''}],isBoundToODataService:s.isBoundToODataService,id:(s.isBoundToODataService)?o.id+"_"+s.entityType+"_"+s.path.replace("/","_"):s.id,entitySet:s.entitySet,entityType:s.entityType,entityName:s.entityName,label:s.field,valueProperty:"value",fieldValue:s.path,jsType:"sap.ui.comp.smartfield.SmartField",isVisible:true,type:"field"};return n;};D.prototype._getSelectedFieldFromFieldSelector=function(){return this._oFieldSelector.getSelectedField();};D.prototype._executeAddGroup=function(o){var t,n;t=this._textResources.getText("FORM_PERS_DIALOG_NEW_GROUP");n={id:this._sViewId+q.sap.uid(),label:t,isVisible:true,type:"group",children:[]};o.children.splice(0,0,n);this._changeSelection(n);};D.prototype.exit=function(){if(this._oScrollView){this._oScrollView.destroy();this._oScrollView=null;}if(this._oBtnMoveBottom){this._oBtnMoveBottom.destroy();this._oBtnMoveBottom=null;}if(this._oBtnMoveDown){this._oBtnMoveDown.destroy();this._oBtnMoveDown=null;}if(this._oBtnMoveUp){this._oBtnMoveUp.destroy();this._oBtnMoveUp=null;}if(this._oBtnMoveTop){this._oBtnMoveTop.destroy();this._oBtnMoveTop=null;}if(this._oBtnAddGroup){this._oBtnAddGroup.destroy();this._oBtnAddGroup=null;}if(this._oBtnAddField){this._oBtnAddField.destroy();this._oBtnAddField=null;}if(this._oFieldSelector){this._oFieldSelector.destroy();this._oFieldSelector=null;}if(this.oLayoutRight){this.oLayoutRight.destroy();this.oLayoutRight=null;}if(this.oLayoutMiddle){this.oLayoutMiddle.destroy();this.oLayoutMiddle=null;}if(this.oLayoutTopLeft){this.oLayoutTopLeft.destroy();this.oLayoutTopLeft=null;}if(this.oLayoutLeft){this.oLayoutLeft.destroy();this.oLayoutLeft=null;}if(this.oLayout){this.oLayout.destroy();this.oLayout=null;}};return D;},true);
