/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/m/MessageBox','sap/ui/comp/filterbar/FilterBar','sap/ui/comp/filterbar/FilterGroupItem','sap/ui/comp/filterbar/FilterItem','sap/ui/comp/library','./AdditionalConfigurationHelper','./ControlConfiguration','./FilterProvider','./GroupConfiguration','sap/ui/comp/smartvariants/PersonalizableInfo','sap/ui/comp/smartvariants/SmartVariantManagement','sap/ui/comp/odata/ODataModelUtil'],function(q,M,F,a,b,l,A,C,c,G,P,S,O){"use strict";var d=F.extend("sap.ui.comp.smartfilterbar.SmartFilterBar",{metadata:{library:"sap.ui.comp",designTime:true,properties:{entityType:{type:"string",group:"Misc",defaultValue:null},resourceUri:{type:"string",group:"Misc",defaultValue:null},basicSearchFieldName:{type:"string",group:"Misc",defaultValue:null},enableBasicSearch:{type:"boolean",group:"Misc",defaultValue:false}},associations:{smartVariant:{type:"sap.ui.comp.smartvariants.SmartVariantManagement",multiple:false}},aggregations:{controlConfiguration:{type:"sap.ui.comp.smartfilterbar.ControlConfiguration",multiple:true,singularName:"controlConfiguration"},groupConfiguration:{type:"sap.ui.comp.smartfilterbar.GroupConfiguration",multiple:true,singularName:"groupConfiguration"}},events:{pendingChange:{pendingValue:{type:"boolean"}}}},renderer:function(r,o){F.getMetadata().getRenderer().render(r,o);}});d.prototype.init=function(){this._aFilterBarViewMetadata=null;this.isRunningInValueHelpDialog=false;F.prototype.init.apply(this);sap.ui.getCore().getMessageManager().registerObject(this,true);};d.prototype._initializeMetadata=function(){if(!this.isInitialised){O.handleModelInit(this,this._onMetadataInitialised);}};d.prototype._onMetadataInitialised=function(){this._bMetaModelLoadAttached=false;if(!this.isInitialised){this._createFilterProvider();if(this._oFilterProvider){this._aFilterBarViewMetadata=this._oFilterProvider.getFilterBarViewMetadata();if(this._aFilterBarViewMetadata){this._attachAdditionalConfigurationChanged();this.isInitialised=true;this.setModel(this._oFilterProvider.oModel,this._oFilterProvider.sFilterModelName);this.registerGetFiltersWithValues(q.proxy(this.getFiltersWithValues,this));this.registerFetchData(q.proxy(this.getFilterDataAsString,this,true));this.registerApplyData(q.proxy(function(j){this.setFilterDataAsString(j,true);},this));this._initializeVariantManagement();}}}};d.prototype.getFilterBarViewMetadata=function(){return this._aFilterBarViewMetadata;};d.prototype._createFilterProvider=function(){var r,m,e;m=this.getModel();r=this.getResourceUri();e=this.getEntityType();if((m||r)&&e){this._oFilterProvider=new sap.ui.comp.smartfilterbar.FilterProvider({basicSearchFieldName:this.getBasicSearchFieldName(),enableBasicSearch:this.getEnableBasicSearch(),entityType:e,serviceUrl:r,isRunningInValueHelpDialog:this.isRunningInValueHelpDialog,model:m,additionalConfiguration:this.getAdditionalConfiguration(),defaultDropDownDisplayBehaviour:this.data("defaultDropDownDisplayBehaviour"),defaultTokenDisplayBehaviour:this.data("defaultTokenDisplayBehaviour"),dateFormatSettings:this.data("dateFormatSettings"),useContainsAsDefaultFilter:this.data("useContainsAsDefaultFilter"),smartFilter:this});this._oFilterProvider.attachPendingChange(function(E){this.firePendingChange({pendingValue:E.getParameter("pending")});}.bind(this));}};d.prototype._attachAdditionalConfigurationChanged=function(){var e,g,i,f;g=this.getGroupConfiguration();f=g.length;for(i=0;i<f;i++){g[i].attachChange(this._handleGroupConfigurationChanged.bind(this));}e=this.getControlConfiguration();f=e.length;for(i=0;i<f;i++){e[i].attachChange(this._handleControlConfigurationChanged.bind(this));}};d.prototype._handleControlConfigurationChanged=function(e){var p,o,f,k,v;p=e.getParameter("propertyName");o=e.oSource;if(!o){return;}k=o.getKey();f=this._getFilterItemByName(k);if(!f){return;}if(p==="visible"){v=o.getVisible();f.setVisible(v);}else if(p==="label"){v=o.getLabel();f.setLabel(v);}else if(p==="visibleInAdvancedArea"){v=o.getVisibleInAdvancedArea();if(f.setVisibleInAdvancedArea){f.setVisibleInAdvancedArea(v);}}};d.prototype._handleGroupConfigurationChanged=function(e){var p,g;p=e.getParameter("propertyName");g=e.oSource;if(p==="label"){this._handleGroupConfigurationLabelChanged(g);}};d.prototype._handleGroupConfigurationLabelChanged=function(g){var f,k,L;if(!g){return;}L=g.getLabel();k=g.getKey();f=this._getFilterGroupItemByGroupName(k);if(f){f.setGroupTitle(L);}};d.prototype._getFilterItemByName=function(n){var f,e,i;f=this.getFilterItems();f.push.apply(f,this.getFilterGroupItems());e=f.length;for(i=0;i<e;i++){if(f[i].getName()===n){return f[i];}}};d.prototype._getFilterGroupItemByGroupName=function(n){var f,e,i;f=this.getFilterGroupItems();e=f.length;for(i=0;i<e;i++){if(f[i].getGroupName()===n){return f[i];}}};d.prototype.getAdditionalConfiguration=function(){return new A(this.getControlConfiguration(),this.getGroupConfiguration());};d.prototype.setEntityType=function(e){this.setProperty("entityType",e);this._initializeMetadata();};d.prototype.setResourceUri=function(r){this.setProperty("resourceUri",r);this._initializeMetadata();};d.prototype.propagateProperties=function(){F.prototype.propagateProperties.apply(this,arguments);this._initializeMetadata();};d.prototype._getFilterInformation=function(){var f,i,j,L=0,e=0,g,h=[],o;if(this._aFilterBarViewMetadata){L=this._aFilterBarViewMetadata.length;for(i=0;i<L;i++){f=this._aFilterBarViewMetadata[i];g=f.fields;e=g.length;for(j=0;j<e;j++){o=g[j];if(o.name===c.BASIC_SEARCH_FIELD_ID){this.setBasicSearch(o.control);this._attachToBasicSearch(o.control);continue;}else if(f.groupName===c.BASIC_FILTER_AREA_ID){this._createFieldInBasicArea(o);}else{this._createFieldInAdvancedArea(f.groupName,f.groupLabel,o);}h.push(o);}}}return h;};d.prototype._validateState=function(){var f=null,L,o,i=false;f=this.getAllFilterItems(true);if(f){L=f.length;while(L--){o=this.determineControlByFilterItem(f[L]);if(o){if(o.__bValidatingToken){this.bIsSearchPending=true;i=true;break;}else if(o.getValueState&&o.getValueState()===sap.ui.core.ValueState.Error&&!o.data("__mandatoryEmpty")){i=true;break;}}}}if(this._oFilterProvider){return!i&&!this._oFilterProvider._validateConditionTypeFields();}else{return!i;}};d.prototype._attachToBasicSearch=function(B){if(B){B.attachSearch(q.proxy(this.search,this));B.attachLiveChange(q.proxy(this._onChange,this));}};d.prototype._onChange=function(e){var o=e.getSource();if(o.data("__mandatoryEmpty")){o.data("__mandatoryEmpty",null);o.setValueState(sap.ui.core.ValueState.None);}if(o.data("__validationError")&&!o.getValue()){o.data("__validationError",null);o.setValueState(sap.ui.core.ValueState.None);}if(this._oFilterProvider._bUpdatingFilterData||this._oFilterProvider._bCreatingInitialModel){return;}if(!o||(o&&!o.__bValidatingToken)){this.fireFilterChange(e);this._oFilterProvider._updateConditionTypeFields(e.getParameter("filterChangeReason"));}else{this._filterSetInErrorState(o);}};d.prototype._handleChange=function(o){if(o){if(o.attachChange){o.attachChange(q.proxy(this._onChange,this));}}};d.prototype._handleEnter=function(o){o.attachBrowserEvent("keydown",function(e){if(e.which===13){o.__bSuggestInProgress=(o._oSuggestionPopup&&o._oSuggestionPopup.isOpen());}});o.attachBrowserEvent("keyup",q.proxy(function(e){if(e.which===13&&!o.__bSuggestInProgress){this.search();}},this));};d.prototype._createFilterFieldControl=function(f){if(f.conditionType){this._createConditionTypeItem(f);}else if(!f.control&&f.fCreateControl){f.fCreateControl(f);delete f.fCreateControl;}this._handleEnter(f.control);this._handleChange(f.control);};d.prototype._createConditionTypeItem=function(f){if(!f.conditionType){return;}q.sap.require("sap.m.HBox");var L=new sap.m.HBox(),s=1;f.conditionType.initializeFilterItem(this.getFilterContainerWidth(),L);f._iSpan=s+1;f.control=L;};d.prototype._createFieldInBasicArea=function(f){f.factory=function(){this._createFilterFieldControl(f);if(!f.control){return;}var o=new b({labelTooltip:f.quickInfo,label:f.label,name:f.fieldName,mandatory:f.isMandatory,visible:f.isVisible,control:f.control});if(f._iSpan){o._iSpan=f._iSpan;}if(f.isCustomFilterField){o.data("isCustomField",true);}this.addFilterItem(o);}.bind(this);f.groupName=F.INTERNAL_GROUP;return f;};d.prototype._createFieldInAdvancedArea=function(g,s,f){f.factory=function(){this._createFilterFieldControl(f);var o=new a({labelTooltip:f.quickInfo,label:f.label,name:f.fieldName,groupName:g,groupTitle:s,mandatory:f.isMandatory,visible:f.isVisible,visibleInAdvancedArea:f.visibleInAdvancedArea,control:f.control});if(f._iSpan){o._iSpan=f._iSpan;}if(f.isCustomFilterField){o.data("isCustomField",true);}this.addFilterGroupItem(o);}.bind(this);f.groupName=g;f.groupTitle=s;return f;};d.prototype.getFilters=function(f){if(!f||!f.length){f=this._getVisibleFieldNames();}return this._oFilterProvider?this._oFilterProvider.getFilters(f):[];};d.prototype.getParameters=function(){return this._oFilterProvider?this._oFilterProvider.getParameters():{};};d.prototype.getControlByKey=function(k){return this.determineControlByName(k);};d.prototype._getVisibleFieldNames=function(){var f=[],v=this.getAllFilterItems(true),L=v.length,i;L=v.length;while(L--){i=v[L];if(i){f.push(i.getName());}}return f;};d.prototype.getFilterData=function(e){var D=null;if(this._oFilterProvider){if(e){D=this._oFilterProvider.getFilterData();}else{D=this._oFilterProvider.getFilledFilterData(this._getVisibleFieldNames());}}return D;};d.prototype._checkHasValueData=function(o){if(o){if(typeof o==="boolean"){return o;}else if(typeof o==="string"){if(o.toLowerCase()==="true"){return true;}}}return false;};d.prototype._checkForValues=function(D,f,o){var v=null;if(D&&f&&o){if(!f.data("isCustomField")){v=D[f.getName()];}else{var e=o.data("hasValue");if((e!==undefined)&&(e!=null)){return this._checkHasValueData(e);}else{if(o.getValue){v=o.getValue();}else if(o.getSelectedKey){v=o.getSelectedKey();}}}}return v?true:false;};d.prototype.getFiltersWithValues=function(){var f=[];var e=this.getAllFilterItems(true),o,D=this.getFilterData(),L=0,g;if(e&&D){L=e.length;while(L--){o=e[L];g=this.determineControlByFilterItem(o);if(this._checkForValues(D,o,g)){f.push(o);}}}return f.reverse();};d.prototype.getFilterDataAsString=function(e){var D=null;if(this._oFilterProvider){if(e){D=this._oFilterProvider.getFilterDataAsString();}else{D=this._oFilterProvider.getFilledFilterDataAsString(this._getVisibleFieldNames());}}return D;};d.prototype.setFilterData=function(j,r){if(this._oFilterProvider){this._oFilterProvider.setFilterData(j,r);}if(j&&(Object.keys(j).length===1)&&j._CUSTOM){return;}this.fireFilterChange({afterFilterDataUpdate:true});};d.prototype.setFilterDataAsString=function(j,r){if(j){this.setFilterData(JSON.parse(j),r);}};d.prototype.fireClear=function(){this._clearFilterFields();this.fireEvent("clear",arguments);};d.prototype._clearFilterFields=function(){if(this._oFilterProvider){this._oFilterProvider.clear();}this.fireFilterChange({afterFilterDataUpdate:true});};d.prototype.fireReset=function(){this._resetFilterFields();this.fireEvent("reset",arguments);};d.prototype._resetFilterFields=function(){if(this._oFilterProvider){this._oFilterProvider.reset();}this.fireFilterChange({afterFilterDataUpdate:true});};d.prototype.triggerSearch=function(D){this._clearDelayedSearch();this._iDelayedSearchId=q.sap.delayedCall(D||0,this,"search");};d.prototype.search=function(){var p=[],o={},e,i=false,E;delete this.bIsSearchPending;e=this._validateState();if(!e){if(this.bIsSearchPending){return;}else{i=true;}}else{e=this._validateMandatoryFields();}if(this.isPending()&&!this._bIsPendingChangeAttached){var h=function(f){if(f.getParameter("pendingValue")===false){this.detachPendingChange(h);this._bIsPendingChangeAttached=false;this.search();}}.bind(this);this._bIsPendingChangeAttached=true;this.attachPendingChange(h);return;}this._clearDelayedSearch();if(e){o.selectionSet=this._retrieveCurrentSelectionSet();p.push(o);this.fireSearch(p);}else{if(!this._oResourceBundle){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");}if(!i){if(!this._sMandatoryErrorMessage){this._sMandatoryErrorMessage=this._oResourceBundle.getText("EMPTY_MANDATORY_MESSAGE");}E=this._sMandatoryErrorMessage;}else{if(!this._sValidationErrorMessage){this._sValidationErrorMessage=this._oResourceBundle.getText("VALIDATION_ERROR_MESSAGE");}E=this._sValidationErrorMessage;}try{M.error(E,{styleClass:(this.$()&&this.$().closest(".sapUiSizeCompact").length)?"sapUiSizeCompact":""});}catch(x){return;}if(this._bExpandAdvancedFilterArea&&this.rerenderFilters){this.rerenderFilters(true);}}return e;};d.prototype._clearDelayedSearch=function(){if(this._iDelayedSearchId){q.sap.clearDelayedCall(this._iDelayedSearchId);this._iDelayedSearchId=null;}};d.prototype.isPending=function(){if(!this._oFilterProvider){return false;}return this._oFilterProvider.isPending();};d.prototype._validateMandatoryFields=function(){var f=true,e=this.determineMandatoryFilterItems(),o,D=this.getFilterData(),L=0,g;this._bExpandAdvancedFilterArea=false;if(e&&D){L=e.length;while(L--){o=e[L];g=this.determineControlByFilterItem(o);if(g&&g.setValueState){if(this._checkForValues(D,o,g)){if(g.data("__mandatoryEmpty")){g.data("__mandatoryEmpty",null);g.setValueState(sap.ui.core.ValueState.None);}}else{f=false;g.setValueState(sap.ui.core.ValueState.Error);g.data("__mandatoryEmpty",true);if(o.getGroupName){this._bExpandAdvancedFilterArea=true;}}}}}return f;};d.prototype._setSmartVariant=function(s){if(s){var o=sap.ui.getCore().byId(s);if(o){if(o instanceof S){if(this._oVariantManagement&&!this._oVariantManagement.isPageVariant()){this._replaceVariantManagement(o);this._oSmartVariantManagement=o;}}else{q.sap.log.error("Control with the id="+s+" not of expected type");}}else{q.sap.log.error("Control with the id="+s+" not found");}}};d.prototype.setSmartVariant=function(s){if(this.getAdvancedMode()){q.sap.log.error("not supported for the advanced mode");return;}this.setAssociation("smartVariant",s);this._setSmartVariant(s);};d.prototype.getSmartVariant=function(){if(this.getAdvancedMode()){q.sap.log.error("not supported for the advanced mode");return null;}var s=this.getAssociation("smartVariant");if(s){return sap.ui.getCore().byId(s);}return this._oSmartVariantManagement;};d.prototype._createVariantManagement=function(){this._oSmartVariantManagement=null;if(this.getAdvancedMode()){return F.prototype._createVariantManagement.apply(this);}var s=this.getSmartVariant();this._setSmartVariant(s);if(!this._oSmartVariantManagement){this._oSmartVariantManagement=new S(this.getId()+"-variant",{showExecuteOnSelection:true,showShare:true});}return this._oSmartVariantManagement;};d.prototype._initializeVariantManagement=function(){if(!this.isRunningInValueHelpDialog&&this._oSmartVariantManagement&&this.getPersistencyKey()){var p=new P({type:"filterBar",keyName:"persistencyKey",dataSource:this.getEntityType()});p.setControl(this);this._oSmartVariantManagement.addPersonalizableControl(p);var v=this._checkHasValueData(this.data("executeStandardVariantOnSelect"));if(v){this._oSmartVariantManagement._executeOnSelectForStandardVariantByXML(v);}F.prototype._initializeVariantManagement.apply(this,arguments);}else{this.fireInitialise();}};d.prototype.getBasicSearchControl=function(){return sap.ui.getCore().byId(this.getBasicSearch());};d.prototype.addFieldToAdvancedArea=function(k){var f;f=this._getFilterItemByName(k);if(f&&f.setVisibleInAdvancedArea){f.setVisibleInAdvancedArea(true);}};d.prototype.getConditionTypeByKey=function(k){if(this._oFilterProvider._mConditionTypeFields[k]){return this._oFilterProvider._mConditionTypeFields[k].conditionType;}};d.prototype.destroy=function(){this._clearDelayedSearch();F.prototype.destroy.apply(this,arguments);sap.ui.getCore().getMessageManager().unregisterObject(this);if(this._oFilterProvider&&this._oFilterProvider.destroy){this._oFilterProvider.destroy();}this._oFilterProvider=null;this._aFilterBarViewMetadata=null;this._bExpandAdvancedFilterArea=null;this._oResourceBundle=null;this._sMandatoryErrorMessage=null;this._sValidationErrorMessage=null;this._oSmartVariantManagement=null;};return d;},true);
