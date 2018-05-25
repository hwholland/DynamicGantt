sap.ui.define(["jquery.sap.global","sap/ui/core/format/DateFormat","sap/m/MessageBox","sap/m/MessageToast","sap/ui/model/Filter","sap/ui/model/Sorter","sap/ui/comp/smarttable/SmartTable","sap/ui/generic/app/navigation/service/SelectionVariant","sap/suite/ui/generic/template/lib/testableHelper","sap/suite/ui/generic/template/detailTemplates/detailUtils","sap/suite/ui/generic/template/ObjectPage/extensionAPI/ExtensionAPI","sap/ui/model/json/JSONModel","sap/suite/ui/generic/template/js/AnnotationHelper","sap/ui/core/mvc/ViewType","sap/m/Table","sap/ui/layout/DynamicSideContent"],function(q,D,M,a,F,S,b,c,t,d,E,J,A,V,R,f){"use strict";function I(o){return o.data("inlineCreate")==="true";}function s(B,e){if(B.getBindings){var g=B.getBindings();for(var i=0;i<g.length;i++){s(g[i],e);}}else{var T=B.getType();B.setType(T,e);}}var m={getMethods:function(v,T,C){var B=d.getControllerBase(v,T,C);B.state.aUnsavedDataCheckFunctions=[];var g;var o;var h;function l(){if(T.oServices.oApplication.getBusyHelper().isBusy()){q.sap.log.info("Activation of object suppressed, since App is currently busy");return;}q.sap.log.info("Activate object");var e=T.oServices.oCRUDManager.activateDraftEntity();e.then(function(j){T.oServices.oApplication.showMessageToast(T.oCommonUtils.getText("OBJECT_SAVED"));if(j&&j.context){var k=C.getOwnerComponent();T.oServices.oViewDependencyHelper.setAllPagesDirty([k.getId()]);T.oServices.oViewDependencyHelper.unbindChildren(k);var x=C.getOwnerComponent().getNavToListOnSave();T.oServices.oApplication.invalidatePaginatorInfo();if(x){T.oServices.oNavigationController.navigateToRoot(true);}else{T.oServices.oNavigationController.navigateToContext(j.context,undefined,true);}}});var i={activationPromise:e};T.oComponentUtils.fire(C,"AfterActivate",i);}function O(e,i,j){var k=new sap.m.MessageItem({type:'{type}',title:'{title}'});var x=new J();var l1=e;x.setData(i);e._oMessageView=new sap.m.MessageView({showDetailsPageHeader:false,itemSelect:function(){l1._oBackButton.setVisible(true);},items:{path:"/",template:k}});e._oBackButton=new sap.m.Button({icon:sap.ui.core.IconPool.getIconURI("nav-back"),visible:false,press:function(){l1._oMessageView.navigateBack();e.setVisible(false);}});e._oMessageView.setModel(x);var m1=T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.ObjectPage.view.fragments.ShowConfirmationOnDraftActivate",{onCancel:function(){m1.close();},onSave:function(){m1.close();T.oServices.oApplication.performAfterSideEffectExecution(l);}});m1.removeAllContent();m1.addContent(e._oMessageView);m1.setContentHeight("300px");m1.setContentWidth("500px");m1.setVerticalScrolling(false);m1.aCustomStyleClasses=["sapMNavItem"];m1.setState(j);m1.open();}function n(){if((C.getOwnerComponent().getShowConfirmationOnDraftActivate())===true){var e=T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.fragments.MessagePopover");var j=e.getBinding("items").aIndices;var k=[];var x=0;var l1="Warning";for(var i in j){var m1=e.getBinding("items").oList[j[i]].type;if(m1=="Warning"){x++;}else if(m1=="Error"){l1="Error";}var n1=e.getBinding("items").oList[j[i]].message;k.push({type:m1,title:n1});}if(x){O(this,k,l1);}else{T.oServices.oApplication.performAfterSideEffectExecution(l);}}else{T.oServices.oApplication.performAfterSideEffectExecution(l);}}function p(e){if(I(e.getSource())){var i=e.getParameter("bindingParams");if(i.filters&&i.filters.length){var j=new F(i.filters);i.filters=new F({filters:[new F({filters:[new F({path:"IsActiveEntity",operator:"EQ",value1:true}),j],and:true}),new F({filters:[new F({path:"IsActiveEntity",operator:"EQ",value1:false}),new F({filters:[j,new F({path:"HasActiveEntity",operator:"EQ",value1:false})],and:false})],and:true})],and:false});}var k=i.sorter[0]&&i.sorter[0].getGroupFunction();var x=k&&function(l1){var m1=l1.getObject();if(m1.IsActiveEntity||m1.HasActiveEntity){var n1=q.extend({},k(l1));n1.key=n1.key.charAt(0)==="§"?"§"+n1.key:n1.key;return n1;}return{key:"§",text:T.oCommonUtils.getText("NEW_ENTRY_GROUP")};};i.sorter.unshift(new S("HasActiveEntity",false,x));}}function r(e,i){var j=e;if(i){j=j+" - "+i;}var k=document.URL;if((k.indexOf("(")===0)){k="%28"+k.slice(1,k.length);}if((k.lastIndexOf(")")===(k.length-1))){k=k.slice(0,(k.length-1))+"%29";}sap.m.URLHelper.triggerEmail(null,j,k);}function u(e,i){var j=sap.ui.getCore().createComponent({name:"sap.collaboration.components.fiori.sharing.dialog",settings:{object:{id:document.URL,share:e+" "+i}}});j.open();}function w(){return o.getHeaderTitle();}function y(e){var i=T.oComponentUtils.getTemplatePrivateModel();var j=T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.fragments.ShareSheet",{shareEmailPressed:function(){r(i.getProperty("/objectPage/headerInfo/objectTitle"),i.getProperty("/objectPage/headerInfo/objectSubtitle"));},shareJamPressed:function(){u(i.getProperty("/objectPage/headerInfo/objectTitle"),i.getProperty("/objectPage/headerInfo/objectSubtitle"));}},"share",function(x,k){var l1=sap.ui.getCore().getLibraryResourceBundle("sap.m");k.setProperty("/emailButtonText",l1.getText("SEMANTIC_CONTROL_SEND_EMAIL"));k.setProperty("/jamButtonText",l1.getText("SEMANTIC_CONTROL_SHARE_IN_JAM"));k.setProperty("/bookmarkButtonText",l1.getText("SEMANTIC_CONTROL_SAVE_AS_TILE"));var m1=q.sap.getObject("sap.ushell.Container.getUser");k.setProperty("/jamVisible",!!m1&&m1().isJamActive());});var k=j.getModel("share");k.setProperty("/objectTitle",i.getProperty("/objectPage/headerInfo/objectTitle"));k.setProperty("/objectSubtitle",i.getProperty("/objectPage/headerInfo/objectSubtitle"));k.setProperty("/bookmarkCustomUrl",document.URL);j.openBy(e.getSource());}function z(){var e=T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.ObjectPage.view.fragments.RelatedAppsSheet",{buttonPressed:function(i){var j=i.getSource();var k=j.getBindingContext("buttons");var x=k.getProperty("link");var l1=k.getProperty("param");var m1=x.intent;var n1=m1.split('#')[1].split('-')[0];var o1=m1.split('-')[1].split('?')[0].split('~')[0];var p1={target:{semanticObject:n1,action:o1},params:l1};sap.ushell.Container.getService("CrossApplicationNavigation").toExternal(p1);}},"buttons");return e;}function G(){var e=T.oServices.oApplication.getBusyHelper();if(e.isBusy()){return;}var i=C.getOwnerComponent();var j=i.getNavigationProperty();var k=T.oCommonUtils;var x=T.oComponentUtils.getTemplatePrivateModel();var l1=(x.getProperty("/objectPage/headerInfo/objectTitle")||"").trim();var m1=x.getProperty("/objectPage/headerInfo/objectSubtitle");var n1,o1;if(l1){if(m1){o1=[" ",l1,m1];n1=k.getText("DELETE_WITH_OBJECTINFO",o1);}else{o1=[m1];n1=k.getText("DELETE_WITH_OBJECTTITLE",o1);}}else{n1=k.getText("ST_GENERIC_DELETE_SELECTED");}M.show(n1,{icon:M.Icon.WARNING,styleClass:T.oCommonUtils.getContentDensityClass(),title:k.getText("DELETE"),actions:[M.Action.DELETE,M.Action.CANCEL],onClose:function(p1){if(p1===M.Action.DELETE){var q1=i.getModel("_templPrivGlobal");var r1={objectPage:{currentEntitySet:i.getProperty("entitySet")}};q1.setProperty("/generic/multipleViews",r1);var s1=T.oServices.oCRUDManager.deleteEntity();var t1=i.getBindingContext().getPath();var u1=Object.create(null);u1[t1]=s1;T.oServices.oApplication.prepareDeletion(u1);s1.then(function(){T.oServices.oViewDependencyHelper.setParentToDirty(i,j,1);T.oServices.oViewDependencyHelper.unbindChildren(i,true);});var v1={deleteEntityPromise:s1};e.setBusy(s1);T.oComponentUtils.fire(C,"AfterDelete",v1);}}});}function H(e){T.oServices.oApplication.performAfterSideEffectExecution(G);}function K(e){var i,j;if(e){j=e.context||e;if(T.oServices.oDraftController.getDraftContext().hasDraft(j)){T.oServices.oViewDependencyHelper.setRootPageToDirty();i=e.context&&e.context.context||e.context||e;}}if(i){T.oServices.oApplication.invalidatePaginatorInfo();if(B.fclInfo.navigateToDraft){B.fclInfo.navigateToDraft(i);}else{T.oServices.oNavigationController.navigateToContext(i,undefined,true,2);}}else{var k=T.oComponentUtils.getTemplatePrivateModel();k.setProperty("/objectPage/displayMode",2);}v.setEditable(true);}var L;function N(e){T.oServices.oCRUDManager.editEntity(e).then(function(i){if(i.draftAdministrativeData){L(i.draftAdministrativeData.CreatedByUserDescription||i.draftAdministrativeData.CreatedByUser);}else{K(i.context);}});}L=function(e){var i=T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.ObjectPage.view.fragments.UnsavedChangesDialog",{onEdit:function(){i.close();N(true);},onCancel:function(){i.close();}},"Dialog");var j=i.getModel("Dialog");var k=T.oCommonUtils.getText("DRAFT_LOCK_EXPIRED",[e]);j.setProperty("/unsavedChangesQuestion",k);i.open();};function P(e,i,j){if(j instanceof f){j=j.getMainContent()[0];}else if(!j.getContent){return;}j.getContent().forEach(function(k){if(k instanceof b){if(i||e[k.getTableBindingPath()]){if(k.isInitialised()){T.oCommonUtils.refreshSmartTable(k);}else{k.attachInitialise(function(){T.oCommonUtils.refreshSmartTable(k);});}if(!i){T.oServices.oApplicationController.executeSideEffects(C.getOwnerComponent().getBindingContext(),[],[k.getTableBindingPath()]);}}}});}function Q(){var j="{\"SelectionVariantID\":\"\"}";var k=C.getOwnerComponent();var l1=k.getEntitySet();var m1=k.getModel();var n1=m1.getMetaModel();var o1=n1.getODataEntitySet(l1);var p1=n1.getODataEntityType(o1.entityType);var q1=p1.property;var r1=[];for(var x in q1){var s1=q1[x]["com.sap.vocabularies.Common.v1.FieldControl"]&&q1[x]["com.sap.vocabularies.Common.v1.FieldControl"].Path;if(s1&&r1.indexOf(s1)<0){r1.push(s1);}}var t1=C.getView().getBindingContext();var u1=t1.getObject();var v1=new c();for(var i in q1){var w1=q1[i].type;var x1=q1[i].name;var y1=u1[q1[i].name];if(r1.indexOf(x1)>-1){continue;}if(x1&&(y1||w1==="Edm.Boolean")){if(w1==="Edm.Time"&&y1.ms!==undefined){y1=y1.ms;}if(typeof y1!=="string"){try{y1=y1.toString();}catch(e){y1=y1+"";}}v1.addParameter(x1,y1);}}j=v1.toJSONString();return j;}function U(e,X){var i=true;var j=X.getModel();var k=T.oCommonUtils.getDeleteRestrictions(X);var x=k&&k.Deletable&&k.Deletable.Path;if(x){i=j.getProperty(x,e);}return i;}var W;var X;function Y(e,j){W=e;X=j;var k=[];var x=X.getId().substring(X.getId().indexOf(C.getOwnerComponent().getEntitySet()),X.getId().lastIndexOf("::"));x=x.replace(/--/g,"|").replace(/::/g,"|");return T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.ObjectPage.view.fragments.TableDeleteConfirmation",{onCancel:function(i){var l1=i.getSource().getParent();l1.close();},onDelete:function(l1){var m1=T.oServices.oApplication.getBusyHelper();var n1=l1.getSource().getParent();var o1=T.oCommonUtils.getSelectedContexts(X);k=[];for(var i=0;i<o1.length;i++){if(U(o1[i],X)){k.push(o1[i].getPath());}}var p1=T.oServices.oCRUDManager.deleteEntities(k);m1.setBusy(p1);T.oServices.oApplicationController.executeSideEffects(X.getBindingContext(),[],[X.getTableBindingPath()]);var q1=W.getParent().getParent().getId();p1.then(function(s1){T.oServices.oViewDependencyHelper.unbindChildren(C.getOwnerComponent());T.oCommonUtils.refreshSmartTable(X);var t1=k.length-s1.length;var u1="";var v1="";var w1="";if(s1.length>0){var x1="";if(t1>0){w1=(T.oCommonUtils.getText("DELETE_SUCCESS_PLURAL_WITH_COUNT|"+x)==="DELETE_SUCCESS_PLURAL_WITH_COUNT|"+x)?T.oCommonUtils.getText("DELETE_SUCCESS_PLURAL_WITH_COUNT",[t1]):T.oCommonUtils.getText("DELETE_SUCCESS_PLURAL_WITH_COUNT|"+x,[t1]);v1=(T.oCommonUtils.getText("DELETE_SUCCESS_WITH_COUNT|"+x)==="DELETE_SUCCESS_WITH_COUNT|"+x)?T.oCommonUtils.getText("DELETE_SUCCESS_WITH_COUNT",[t1]):T.oCommonUtils.getText("DELETE_SUCCESS_WITH_COUNT|"+x,[t1]);x1+=(t1>1)?w1:v1;x1+="\n";w1=(T.oCommonUtils.getText("DELETE_ERROR_PLURAL_WITH_COUNT|"+x)==="DELETE_ERROR_PLURAL_WITH_COUNT|"+x)?T.oCommonUtils.getText("DELETE_ERROR_PLURAL_WITH_COUNT",[s1.length]):T.oCommonUtils.getText("DELETE_ERROR_PLURAL_WITH_COUNT|"+x,[s1.length]);v1=(T.oCommonUtils.getText("DELETE_ERROR_WITH_COUNT|"+x)==="DELETE_ERROR_WITH_COUNT|"+x)?T.oCommonUtils.getText("DELETE_ERROR_WITH_COUNT",[s1.length]):T.oCommonUtils.getText("DELETE_ERROR_WITH_COUNT|"+x,[s1.length]);x1+=(s1.length>1)?w1:v1;}else{w1=(T.oCommonUtils.getText("DELETE_ERROR_PLURAL|"+x)==="DELETE_ERROR_PLURAL|"+x)?T.oCommonUtils.getText("DELETE_ERROR_PLURAL"):T.oCommonUtils.getText("DELETE_ERROR_PLURAL|"+x);v1=(T.oCommonUtils.getText("DELETE_ERROR|"+x)==="DELETE_ERROR|"+x)?T.oCommonUtils.getText("DELETE_ERROR"):T.oCommonUtils.getText("DELETE_ERROR|"+x);x1=(s1.length>1)?w1:v1;}M.error(x1);}else{w1=(T.oCommonUtils.getText("DELETE_SUCCESS_PLURAL|"+x)==="DELETE_SUCCESS_PLURAL|"+x)?T.oCommonUtils.getText("DELETE_SUCCESS_PLURAL"):T.oCommonUtils.getText("DELETE_SUCCESS_PLURAL|"+x);v1=(T.oCommonUtils.getText("ITEM_DELETED|"+x)==="ITEM_DELETED|"+x)?T.oCommonUtils.getText("ITEM_DELETED"):T.oCommonUtils.getText("ITEM_DELETED|"+x);u1=(t1>1)?w1:v1;T.oServices.oApplication.showMessageToast(u1);}});var r1={deleteEntitiesPromise:p1,sUiElementId:q1,aContexts:o1};T.oComponentUtils.fire(C,"AfterLineItemDelete",r1);n1.close();}},"delete");}function Z(e){var j=T.oServices.oApplication.getBusyHelper();if(j.isBusy()){return;}var W=e.getSource();var X=T.oCommonUtils.getOwnerControl(W);var k=X.getId().substring(X.getId().indexOf(C.getOwnerComponent().getEntitySet()),X.getId().lastIndexOf("::"));k=k.replace(/--/g,"|").replace(/::/g,"|");var x=T.oCommonUtils.getSelectedContexts(X);var l1={title:undefined,undeletableText:undefined,text:undefined};if(x.length===0){M.error(T.oCommonUtils.getText("ST_GENERIC_NO_ITEM_SELECTED"),{styleClass:T.oCommonUtils.getContentDensityClass()});return;}var m1=[];var n1=[];for(var i=0;i<x.length;i++){if(U(x[i],X)){m1.push(x[i].getPath());}else{n1.push(x[i]);}}if(x.length>1){l1.title=T.oCommonUtils.getText("ST_GENERIC_DELETE_TITLE_WITH_COUNT",[x.length]);l1.text=T.oCommonUtils.getText("DELETE_SELECTED_ITEMS|"+k)==="DELETE_SELECTED_ITEMS|"+k?T.oCommonUtils.getText("DELETE_SELECTED_ITEMS"):T.oCommonUtils.getText("DELETE_SELECTED_ITEMS|"+k);}else{l1.text=T.oCommonUtils.getText("DELETE_SELECTED_ITEM|"+k)==="DELETE_SELECTED_ITEM|"+k?T.oCommonUtils.getText("DELETE_SELECTED_ITEM"):T.oCommonUtils.getText("DELETE_SELECTED_ITEM|"+k);l1.title=T.oCommonUtils.getText("ST_GENERIC_DELETE_TITLE");}if(n1.length>0){l1.undeletableText=T.oCommonUtils.getText("DELETE_UNDELETABLE_ITEMS|"+k)==="DELETE_UNDELETABLE_ITEMS|"+k?T.oCommonUtils.getText("DELETE_UNDELETABLE_ITEMS",[n1.length,x.length]):T.oCommonUtils.getText("DELETE_UNDELETABLE_ITEMS|"+k,[n1.length,x.length]);}var o1=Y(W,X);var p1=o1.getModel("delete");p1.setData(l1);o1.open();}function $(){var i=C.byId("imageDialog")||T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.ObjectPage.view.fragments.ImageDialog",{onImageDialogClose:function(){i.close();}},"headerImage");return i;}function _(){var e=C.byId("template::ObjectPage::TitleImage");if(!e){return;}var i=C.getView().byId("template::ObjectPage::ObjectPageHeader");e.setVisible(false);i.attachStateChange(function(j){var k=j.getParameter("isExpanded");e.setVisible(!k);});}function a1(){var e;var j=T.oComponentUtils.getTemplatePrivateModel();var k=function(i){return function(x){var l1=x.getSource();var m1=l1.getExternalValue();j.setProperty("/objectPage/headerInfo/"+i,m1);if(!m1&&i==="objectTitle"){var n1=T.oComponentUtils.getHeaderDataAvailablePromise();n1.then(function(o1){m1=l1.getExternalValue();if(m1){return;}var p1=C.getView();var q1=o1.getObject();var r1=p1.getModel("ui");var s1=r1.getProperty("/createMode");if(s1&&q1&&(q1.IsActiveEntity===undefined||q1.IsActiveEntity===false||q1.HasActiveEntity===false)){e=e||T.oCommonUtils.getText("NEW_OBJECT");j.setProperty("/objectPage/headerInfo/objectTitle",e);}});}};};o.getCustomData().forEach(function(x){var l1=x.getKey();if(l1==="objectTitle"||l1==="objectSubtitle"){var m1=x.getBinding("value");var n1=!m1&&x.getBindingInfo("value");if(!m1&&!n1){j.setProperty("/objectPage/headerInfo/"+l1,x.getValue());return;}var o1=k(l1);if(m1){m1.attachChange(o1);s(m1,"string");}else{n1.events={change:o1};for(var i=0;i<n1.parts.length;i++){n1.parts[i].targetType="string";}}}});}v.refreshFacets=function(e,i){var j=P.bind(null,e,i);var k=function(x){x.getBlocks().forEach(j);x.getMoreBlocks().forEach(j);};o.getSections().forEach(function(x){x.getSubSections().forEach(k);});};v.getHeaderInfoTitleForNavigationMenue=function(){var e=T.oComponentUtils.getTemplatePrivateModel();var i=e.getProperty("/generic/viewLevel");var j=e.getProperty("/objectPage/headerInfo/objectTitle");T.oServices.oApplication.subTitleForViewLevelChanged(i,j);};v.onComponentActivate=B.onComponentActivate;v.draftResume=function(e,j,k){var x=e.getObject();if(!x||!x.hasOwnProperty("IsActiveEntity")||x.IsActiveEntity!==false){return;}var l1=C.getView().getModel();var m1=l1.getMetaModel();var n1=m1.getODataEntitySet(C.getOwnerComponent().getEntitySet());var o1=m1.getODataEntityType(n1.entityType);var p1="";var q1="";var r1=o1["com.sap.vocabularies.Common.v1.SemanticKey"];for(var i in r1){var s1=r1[i];if(q1===""){q1=j[s1.PropertyPath];}else{q1=q1+"-"+j[s1.PropertyPath];}}var t1="-";if(k&&k.LastChangeDateTime!==null){var u1=D.getDateTimeInstance({pattern:"MMMM d, yyyy HH:mm",style:"long"});t1=u1.format(k.LastChangeDateTime);}var v1=[p1,q1,t1];var w1=T.oCommonUtils.getText("DRAFT_FOUND_RESUME",v1);var x1;var y1=T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.ObjectPage.view.fragments.DraftResumeDialog",{onDraftResume:function(){y1.close();T.oServices.oNavigationController.navigateToContext(x1.getProperty("/siblingContext"),null,true);},onDraftDiscard:function(){y1.close();C.getView().getModel("ui").setProperty("/enabled",true);T.oServices.oCRUDManager.deleteEntity(true);x1.getProperty("/activeEntity").HasDraftEntity=false;T.oServices.oViewDependencyHelper.setAllPagesDirty();},onResumeDialogClosed:function(){x1.setProperty("/siblingContext",null);x1.setProperty("/activeEntity",null);}},"Dialog");x1=y1.getModel("Dialog");x1.setProperty("/draftResumeText",w1);x1.setProperty("/siblingContext",e);x1.setProperty("/activeEntity",j);y1.open();};var b1={lazyLoading:function(i,e){e.setBindingContext(i?undefined:null);},reuseComponent:function(i,e){var j=e.getBlocks()[0];T.oComponentUtils.onVisibilityChangeOfReuseComponent(i,j);}};function c1(e){var j=e.getCustomData();for(var i=0;i<j.length;i++){var k=j[i];if(k.getProperty("key")==="strategyForVisibilityChange"){return b1[k.getProperty("value")];}}}function d1(i,e){var j=c1(e);if(j){if(i){var k=T.oComponentUtils.getHeaderDataAvailablePromise()||Promise.resolve();k.then(function(){j(true,e);});}else{j(false,e);}}}function e1(e){d1(false,e);}function f1(e){e.getSubSections().forEach(e1);}function g1(e){var i=e&&e.getParameter("section");h=i?i.getId():o.getSelectedSection();}function h1(e){g1(e);B.stateChanged();}function i1(i){var e=C.getOwnerComponent()&&C.getOwnerComponent().getModel("i18n")&&C.getOwnerComponent().getModel("i18n").getResourceBundle();if(e&&e.getText("HideSideContent|"+i)!==("HideSideContent|"+i)){return e.getText("HideSideContent|"+i);}else if(e&&e.getText("HIDE_SIDE_CONTENT")!=="HIDE_SIDE_CONTENT"){return e.getText("HIDE_SIDE_CONTENT");}}function j1(i){var e=C.getOwnerComponent()&&C.getOwnerComponent().getModel("i18n")&&C.getOwnerComponent().getModel("i18n").getResourceBundle();if(e&&e.getText("ShowSideContent|"+i)!==("ShowSideContent|"+i)){return e.getText("ShowSideContent|"+i);}else if(e&&e.getText("SHOW_SIDE_CONTENT")!=="SHOW_SIDE_CONTENT"){return e.getText("SHOW_SIDE_CONTENT");}}v.getCurrentState=function(){var e=Object.create(null);if(h){e.section={data:h,lifecycle:{permanent:true,pagination:true}};}var i=Object.create(null);C.provideCustomStateExtension(i);for(var j in i){e["$custom$"+j]=i[j];}return e;};v.applyState=function(e,i){var j=Object.create(null);for(var k in e){if(k.indexOf("$custom$")===0){j[k.substring(8)]=e[k];}}C.applyCustomStateExtension(j,i);if(i){if(h!==(e.section||"")){B.stateChanged();}return;}if(e.section){o.setSelectedSection(e.section);g1();}else{Promise.all([T.oComponentUtils.getHeaderDataAvailablePromise(),T.oComponentUtils.getNavigationFinishedPromise()]).then(function(){var x=o.getSections();var l1=x[0];if(l1){o.scrollToSection(l1.getId(),0);}var m1=o.getScrollDelegate();if(m1){m1.scrollTo(0,0);}});h="";}};v.beforeRebind=function(){o.getSections().forEach(f1);};v.afterRebind=function(){o._triggerVisibleSubSectionsEvents();};var N=t.testable(N,"editEntity");var U=t.testable(U,"isEntryDeletable");var l=t.testable(l,"onActivateImpl");var n=t.testable(n,"onActivate");var O=t.testable(O,"fnOpenConfirmationDialog");var k1={onInit:function(){o=C.byId("objectPage");var e=w();var k=C.getOwnerComponent().getAppComponent().getConfig();var x=k&&k.settings&&k.settings.objectPageDynamicHeaderTitleWithVM;v.aBreadCrumbs=e&&(x?e.getBreadcrumbs().getLinks():e.getBreadCrumbsLinks());if(x){_();}B.onInit();a1();T.oCommonUtils.executeGlobalSideEffect();o.attachEvent("subSectionEnteredViewPort",function(i){var j=i.getParameter("subSection");d1(true,j);});sap.ui.Device.resize.attachHandler(function(l1){var m1="";var n1=C.getOwnerComponent();var o1=o.getSections();for(var i=1;i<o1.length;i++){var p1=o1[i].getSubSections();for(var j=0;j<p1.length;j++){var q1=p1[j];if(q1.getBlocks()[0]instanceof f){var r1=sap.ui.getCore().byId(q1.getBlocks()[0].getId());var s1=q1.getActions()[(q1.getActions().length)-1];var t1=q1.getId();t1=t1.substring(t1.indexOf(n1.getEntitySet()),t1.lastIndexOf("::"));t1=t1.replace(/--/g,"|").replace(/::/g,"|");if(r1.getShowSideContent()===true){m1=i1(t1);s1.setText(m1);if(l1.width>720){r1.setShowMainContent(true);}}else{m1=j1(t1);s1.setText(m1);}}}}},o);},handlers:{addEntry:function(e){var W=e.getSource();var X=T.oCommonUtils.getOwnerControl(W);var i=I(X);if(!W.data("CrossNavigation")&&i){T.oCommonEventHandlers.addEntry(W,true);return;}T.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){T.oCommonEventHandlers.addEntry(W,false);},q.noop,B.state);},deleteEntries:Z,onSelectionChange:function(e){T.oCommonUtils.setEnabledToolbarButtons(e.getSource());},onCancel:function(e){var i="Proceed";var j;if(T.oComponentUtils.isNonDraftCreate()||!g){i="LeavePage";}T.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){var k=T.oComponentUtils.getTemplatePrivateModel();k.setProperty("/objectPage/displayMode",1);if(T.oComponentUtils.isNonDraftCreate()){v.setEditable(false);}else if(g){v.setEditable(false);}if(T.oComponentUtils.isNonDraftCreate()||!g){T.oServices.oNavigationController.navigateBack();}},q.noop,B.state,i,j,e);},onContactDetails:function(e){T.oCommonEventHandlers.onContactDetails(e);},onPressDraftInfo:function(e){var i=C.getView().getBindingContext();var j=sap.ui.getCore().byId(e.getSource().getId()+(e.getId()==="markChangesPress"?"-changes":"-lock"));T.oCommonUtils.showDraftPopover(i,j);},onPressDraftInfoObjectPageDynamicHeaderTitle:function(e){var i=C.getView().getBindingContext();var j=C.byId("template::ObjectPage::ObjectMarkerObjectPageDynamicHeaderTitle");T.oCommonUtils.showDraftPopover(i,j);},onShareObjectPageActionButtonPress:y,onRelatedApps:function(e){var x,l1,m1,n1,o1,p1,q1;var r1,s1,t1,u1,v1;x=e.getSource();t1=sap.ushell&&sap.ushell.Container;l1=t1&&t1.getService("URLParsing");m1=l1.parseShellHash(document.location.hash);u1=m1.semanticObject;v1=m1.action;n1=C.getView&&C.getView().getBindingContext();var w1=C.getOwnerComponent().getModel().getMetaModel();var x1=n1.getObject();var y1=x1.__metadata.type;var z1=w1.getODataEntityType(y1);var A1=z1["com.sap.vocabularies.Common.v1.SemanticKey"];var B1={};if(A1&&A1.length>0){for(var j=0;j<A1.length;j++){var C1=A1[j].PropertyPath;if(!B1[C1]){B1[C1]=[];B1[C1].push(x1[C1]);}}}else{for(var k in z1.key.propertyRef){var D1=z1.key.propertyRef[k].name;if(!B1[D1]){B1[D1]=[];B1[D1].push(x1[D1]);}}}o1=C.getOwnerComponent().getAppComponent();p1=t1&&t1.getService("CrossApplicationNavigation");q1=p1.getLinks({semanticObject:u1,params:B1,ui5Component:o1});r1=z();s1=r1.getModel("buttons");s1.setProperty("/buttons",[]);r1.openBy(x);q1.done(function(E1){var F1=[];E1.sort(function(J1,K1){if(J1.text<K1.text){return-1;}if(J1.text>K1.text){return 1;}return 0;});for(var i=0;i<E1.length;i++){var G1=E1[i];var H1=G1.intent;var I1=H1.split("-")[1].split("?")[0];if(I1!==v1){F1.push({enabled:true,text:G1.text,link:G1,param:B1});}}if(F1.length===0){F1.push({enabled:false,text:T.oCommonUtils.getText("NO_RELATED_APPS")});}s1.setProperty("/buttons",F1);});},onSemanticObjectLinkPopoverLinkPressed:function(e){T.oCommonEventHandlers.onSemanticObjectLinkPopoverLinkPressed(e,B.state);},onEdit:function(e){var W=e.getSource();if(W.data("CrossNavigation")){T.oCommonEventHandlers.onEditNavigateIntent(W);return;}g=true;N();},onSave:function(){if(T.oServices.oApplication.getBusyHelper().isBusy()){return;}var e=C.getView().getBindingContext();var i=C.getView().getModel().getPendingChanges();i=i&&i[e.getPath().replace("/","")]||{};var j=Object.keys(i)||[];var k=T.oComponentUtils.isNonDraftCreate();var x=j.indexOf("__metadata");if(x>-1){j.splice(x,1);}var l1=T.oServices.oCRUDManager.saveEntity();l1.then(function(n1){var o1=T.oComponentUtils.getTemplatePrivateModel();o1.setProperty("/objectPage/displayMode",1);v.setEditable(false);if(k){if(n1&&n1.getPath()!=="/undefined"){T.oServices.oNavigationController.navigateToContext(n1,undefined,true);}else{T.oServices.oNavigationController.navigateBack();}T.oServices.oApplication.showMessageToast(T.oCommonUtils.getText("OBJECT_CREATED"));}else{T.oServices.oApplication.showMessageToast(T.oCommonUtils.getText("OBJECT_SAVED"));if(!T.oComponentUtils.isDraftEnabled()&&!g){T.oServices.oNavigationController.navigateBack();}}if(j.length>0){T.oServices.oApplicationController.executeSideEffects(e,j);}});var m1={saveEntityPromise:l1};T.oComponentUtils.fire(C,"AfterSave",m1);},onActivate:n,onSmartFieldUrlPressed:function(e){T.oCommonEventHandlers.onSmartFieldUrlPressed(e,B.state);},onBreadCrumbUrlPressed:function(e){T.oCommonEventHandlers.onBreadCrumbUrlPressed(e,B.state);},onDiscardDraft:function(e){T.oCommonEventHandlers.onDiscardDraft(e);},onDelete:H,onCallActionFromToolBar:function(e){T.oCommonEventHandlers.onCallActionFromToolBar(e,B.state);},onCallAction:function(e){var i=C.getOwnerComponent();var j=i.getNavigationProperty();var k=T.oCommonUtils.getCustomData(e);var x=[];x.push(C.getView().getBindingContext());if(x[0]&&k.Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"){T.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){var l1={functionImportPath:k.Action,contexts:x,sourceControl:"",label:k.Label,operationGrouping:k.InvocationGrouping,navigationProperty:C.getOwnerComponent().getNavigationProperty()};T.oServices.oCRUDManager.callAction(l1).then(function(m1){var n1=m1&&m1[0];if(n1&&n1.response&&n1.response.context&&(!n1.actionContext||n1.actionContext&&n1.response.context.getPath()!==n1.actionContext.getPath())){T.oServices.oViewDependencyHelper.setParentToDirty(i,j,1);}});},q.noop,B.state,"Proceed");}},onDataFieldForIntentBasedNavigation:function(e){T.oCommonEventHandlers.onDataFieldForIntentBasedNavigation(e,B.state);},onDataFieldWithIntentBasedNavigation:function(e){T.oCommonEventHandlers.onDataFieldWithIntentBasedNavigation(e,B.state);},onDataFieldWithNavigationPath:function(e){T.oCommonEventHandlers.onDataFieldWithNavigationPath(e);},onChartInit:function(e){var i=e.getSource().getChart();var j=C._templateEventHandlers.onSelectionChange;i.attachSelectData(j).attachDeselectData(j);var k=i.getParent();T.oCommonUtils.checkToolbarIntentsSupported(k);},onDataReceived:function(e){T.oCommonEventHandlers.onDataReceived(e);},onBeforeRebindDetailTable:function(e){T.oCommonEventHandlers.onBeforeRebindTable(e);C.onBeforeRebindTableExtension(e);p(e);if(T.oCommonUtils.isAnalyticalTable(e.getSource().getTable())){var i=e.getParameter("bindingParams");i.parameters.entitySet=e.getSource().getEntitySet();}},onShowDetails:function(e){T.oCommonEventHandlers.onShowDetails(e.getSource(),B.state);},onListNavigate:function(e){if(!C.onListNavigationExtension(e)){T.oCommonEventHandlers.onListNavigate(e.getSource(),B.state);}},onBeforeSemanticObjectLinkPopoverOpens:function(e){var i=e.getParameters();T.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){var j=Q();T.oCommonUtils.semanticObjectLinkNavigation(i,j,C);},q.noop,B.state,q.noop);},onSemanticObjectLinkNavigationPressed:function(e){var i=e.getParameters();var W=e.getSource();T.oCommonEventHandlers.onSemanticObjectLinkNavigationPressed(W,i);},onSemanticObjectLinkNavigationTargetObtained:function(e){var i=e.getParameters();var W=e.getSource();T.oCommonEventHandlers.onSemanticObjectLinkNavigationTargetObtained(W,i,B.state);},onSemanticObjectLinkNavigationTargetObtainedSmartLink:function(e){var i,W;i=e.getParameters();W=e.getSource();W=W.getParent().getParent().getParent().getParent();T.oCommonEventHandlers.onSemanticObjectLinkNavigationTargetObtained(W,i,B.state);},onHeaderImagePress:function(e){var i=$();var j=e.getSource().getId();i.addAriaLabelledBy(j);var k=i.getModel("headerImage");k.setProperty("/src",e.getSource().getSrc());if(sap.ui.Device.system.phone){i.setProperty("stretch",true);}i.open();},sectionNavigate:h1,onInlineDataFieldForAction:function(e){T.oCommonEventHandlers.onInlineDataFieldForAction(e,B.state);},onInlineDataFieldForIntentBasedNavigation:function(e){T.oCommonEventHandlers.onInlineDataFieldForIntentBasedNavigation(e.getSource(),B.state);},onDeterminingDataFieldForAction:function(e){T.oCommonEventHandlers.onDeterminingDataFieldForAction(e);},onBeforeRebindChart:function(e){var i=e.getSource();i.oModels=i.getChart().oPropagatedProperties.oModels;},onToggleDynamicSideContent:function(e){var i="";var j=e.getSource().getParent();var k=C.getOwnerComponent();var x=j.getId();x=x.substring(x.indexOf(k.getEntitySet()),x.lastIndexOf("::"));x=x.replace(/--/g,"|").replace(/::/g,"|");var l1=sap.ui.getCore().byId(j.getBlocks()[0].getId());if(l1.getShowSideContent()===false){i=i1(x);if(sap.ui.Device.resize.width<=720){l1.setShowMainContent(false);}l1.setShowSideContent(true);e.getSource().setText(i);}else{i=j1(x);if(sap.ui.Device.resize.width<=720){l1.setShowMainContent(true);}l1.setShowSideContent(false);e.getSource().setText(i);}},onTableInit:function(e){var X=e.getSource();var j=X.getTable();T.oCommonUtils.checkToolbarIntentsSupported(X);X.attachModelContextChange(function(){if(X.getCustomToolbar&&X.getCustomToolbar().getContent){var k=X.getCustomToolbar().getContent();for(var i in k){if(k[i].getShowSearchButton){k[i].setValue("");X.rebindTable();break;}}}});if(I(X)&&!X.data("CrossNavigation")){j.addEventDelegate({onkeyup:function(e){if(e.ctrlKey&&e.keyCode==q.sap.KeyCodes.ENTER&&X.getEditable()){T.oCommonEventHandlers.addEntry(X,true);e.preventDefault();e.setMarked();}}});}},onSearchObjectPage:function(e){var X=(e.getSource().getParent()).getParent();X.data("searchString",e.getSource().getValue());X.data("allowSearch",true);X.data("tableId",X.getId());X.data("objectPath",X.getBindingContext().getPath());X.rebindTable();}},formatters:{setNoDataTextForSmartTable:function(){var e=C.getOwnerComponent()&&C.getOwnerComponent().getModel("i18n")&&C.getOwnerComponent().getModel("i18n").getResourceBundle();if(e&&e.getText("NOITEMS_SMARTTABLE")!=="NOITEMS_SMARTTABLE"){return e.getText("NOITEMS_SMARTTABLE");}else{var i=C.getOwnerComponent().getAppComponent();e=i&&i.getModel("i18n")&&i.getModel("i18n").getResourceBundle();if(e&&e.hasText("NOITEMS_SMARTTABLE")){return e.getText("NOITEMS_SMARTTABLE");}else{return"";}}}},extensionAPI:new E(T,C,B)};k1.handlers=q.extend(B.handlers,k1.handlers);return k1;}};return m;});