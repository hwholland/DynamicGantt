/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Table','sap/ui/model/odata/ODataTreeBindingAdapter','sap/ui/model/ClientTreeBindingAdapter','sap/ui/model/TreeBindingCompatibilityAdapter','./library','sap/ui/core/Element','./TableUtils'],function(q,T,O,C,a,l,E,b){"use strict";var c=T.extend("sap.ui.table.TreeTable",{metadata:{library:"sap.ui.table",properties:{expandFirstLevel:{type:"boolean",defaultValue:false},useGroupMode:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderProperty:{type:"string",group:"Data",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true},rootLevel:{type:"int",group:"Data",defaultValue:0}},events:{toggleOpenState:{parameters:{rowIndex:{type:"int"},rowContext:{type:"object"},expanded:{type:"boolean"}}}}}});c.prototype.init=function(){T.prototype.init.apply(this,arguments);};c.prototype.bindRows=function(B,t,s,f){var p,o,s,f;if(typeof B=="string"){p=arguments[0];o=arguments[1];s=arguments[2];f=arguments[3];B={path:p,sorter:s,filters:f,template:o};}if(typeof B==="object"){B.parameters=B.parameters||{};B.parameters.rootLevel=this.getRootLevel();B.parameters.collapseRecursive=this.getCollapseRecursive();B.parameters.numberOfExpandedLevels=B.parameters.numberOfExpandedLevels||(this.getExpandFirstLevel()?1:0);B.parameters.rootNodeID=B.parameters.rootNodeID;}return this.bindAggregation("rows",B);};c.prototype.setSelectionMode=function(s){var B=this.getBinding("rows");if(B&&B.clearSelection){B.clearSelection();s=b.sanitizeSelectionMode(this,s);this.setProperty("selectionMode",s);}else{T.prototype.setSelectionMode.call(this,s);}return this;};c.prototype.refreshRows=function(r){T.prototype.refreshRows.apply(this,arguments);var B=this.getBinding("rows");if(B&&this.isTreeBinding("rows")&&!B.hasListeners("selectionChanged")){B.attachSelectionChanged(this._onSelectionChanged,this);}};c.prototype.setFixedRowCount=function(r){q.sap.log.warning("TreeTable: the property \"fixedRowCount\" is not supported and will be ignored!");return this;};c.prototype.isTreeBinding=function(n){n=n||"rows";if(n==="rows"){return true;}return E.prototype.isTreeBinding.apply(this,arguments);};c.prototype.getBinding=function(n){n=n||"rows";var B=E.prototype.getBinding.call(this,n);if(B&&n==="rows"&&!B.getLength){var d=sap.ui.require("sap/ui/model/odata/ODataTreeBinding");var V=sap.ui.require("sap/ui/model/odata/v2/ODataTreeBinding");var e=sap.ui.require("sap/ui/model/ClientTreeBinding");if(d&&B instanceof d){a(B,this);}else if(V&&B instanceof V){B.applyAdapterInterface();}else if(e&&B instanceof e){C.apply(B);}else{q.sap.log.error("Binding not supported by sap.ui.table.TreeTable");}}return B;};c.prototype._updateTableContent=function(){var B=this.getBinding("rows"),f=this.getFirstVisibleRow(),r=this.getRows(),i=r.length,F=this.getFixedBottomRowCount(),d=i-F;var I=f;if(B){var e=B.getLength();for(var R=0;R<i;R++){if(F>0&&R>=d){I=e-i+R;}else{I=f+R;}var o=this.getContextByIndex(I),D=r[R].getDomRefs(true),$=D.rowFixedPart||D.rowScrollPart;this._updateExpandState(r[R],$);if(this.getUseGroupMode()){var g=this.$().find("div[data-sap-ui-rowindex='"+$.attr("data-sap-ui-rowindex")+"']");if(B.hasChildren&&B.hasChildren(o)){$.addClass("sapUiTableGroupHeader sapUiTableRowHidden");var s=B.isExpanded(f+R)?"sapUiTableGroupIconOpen":"sapUiTableGroupIconClosed";g.html("<div class=\"sapUiTableGroupIcon "+s+"\" tabindex=\"-1\">"+this.getModel().getProperty(this.getGroupHeaderProperty(),o)+"</div>");g.addClass("sapUiTableGroupHeader").removeAttr("title");}else{$.removeClass("sapUiTableGroupHeader");if(o){$.removeClass("sapUiTableRowHidden");}g.html("");g.removeClass("sapUiTableGroupHeader");}}}}};c.prototype._updateTableCell=function(){return true;};c.prototype._updateExpandState=function(r,R){var t=R.find(".sapUiTableTreeIcon");var L=this._getLevelIndentCSS(r);if(L){t.css.apply(t,L);}t.removeClass("sapUiTableTreeIconLeaf sapUiTableTreeIconNodeOpen sapUiTableTreeIconNodeClosed").addClass(r._sTreeIconClass);this._getAccExtension().updateAriaExpandState(r,R,t);R.attr("data-sap-ui-level",r._iLevel);};c.prototype._getLevelIndentCSS=function(r){if(!this.getUseGroupMode()){var p="";if(this._bRtlMode===true){p="margin-right";}else{p="margin-left";}return[p,(r._iLevel*17)+"px"];}};c.prototype._getContexts=function(s,L,t){var B=this.getBinding("rows");if(B){return B.getNodes(s,L,t);}else{return[];}};c.prototype._onGroupHeaderChanged=function(r,e){this.fireToggleOpenState({rowIndex:r,rowContext:this.getContextByIndex(r),expanded:e});};c.prototype.expand=function(r){var B=this.getBinding("rows");if(B&&r>=0){B.expand(r);}return this;};c.prototype.collapse=function(r){var B=this.getBinding("rows");if(B&&r>=0){B.collapse(r);}return this;};c.prototype.collapseAll=function(){var B=this.getBinding("rows");if(B){B.collapseToLevel(0);this.setFirstVisibleRow(0);}return this;};c.prototype.expandToLevel=function(L){var B=this.getBinding("rows");if(B&&B.expandToLevel){B.expandToLevel(L);}return this;};c.prototype.isExpanded=function(r){var B=this.getBinding("rows");if(B){return B.isExpanded(r);}return false;};c.prototype.isIndexSelected=function(r){var B=this.getBinding("rows");if(B&&B.isIndexSelected){return B.isIndexSelected(r);}else{return T.prototype.isIndexSelected.call(this,r);}};c.prototype.setSelectedIndex=function(r){if(r===-1){this.clearSelection();}var B=this.getBinding("rows");if(B&&B.findNode&&B.setNodeSelection){B.setSelectedIndex(r);}else{T.prototype.setSelectedIndex.call(this,r);}return this;};c.prototype.getSelectedIndices=function(){var B=this.getBinding("rows");if(B&&B.findNode&&B.getSelectedIndices){return B.getSelectedIndices();}else{return T.prototype.getSelectedIndices.call(this);}};c.prototype.setSelectionInterval=function(f,t){var s=this.getSelectionMode();if(s===l.SelectionMode.None){return this;}var B=this.getBinding("rows");if(B&&B.findNode&&B.setSelectionInterval){if(s===l.SelectionMode.Single){B.setSelectionInterval(f,f);}else{B.setSelectionInterval(f,t);}}else{T.prototype.setSelectionInterval.call(this,f,t);}return this;};c.prototype.addSelectionInterval=function(f,t){var s=this.getSelectionMode();if(s===l.SelectionMode.None){return this;}var B=this.getBinding("rows");if(B&&B.findNode&&B.addSelectionInterval){if(s===l.SelectionMode.Single){B.setSelectionInterval(f,f);}else{B.addSelectionInterval(f,t);}}else{T.prototype.addSelectionInterval.call(this,f,t);}return this;};c.prototype.removeSelectionInterval=function(f,t){var B=this.getBinding("rows");if(B&&B.findNode&&B.removeSelectionInterval){B.removeSelectionInterval(f,t);}else{T.prototype.removeSelectionInterval.call(this,f,t);}return this;};c.prototype.selectAll=function(){var s=this.getSelectionMode();if(!this.getEnableSelectAll()||(s!="Multi"&&s!="MultiToggle")||!this._getSelectableRowCount()){return this;}var B=this.getBinding("rows");if(B.selectAll){this.$("selall").attr('title',this._oResBundle.getText("TBL_DESELECT_ALL")).removeClass("sapUiTableSelAll");B.selectAll();}else{T.prototype.selectAll.call(this);}return this;};c.prototype.getSelectedIndex=function(){var B=this.getBinding("rows");if(B&&B.findNode){return B.getSelectedIndex();}else{return T.prototype.getSelectedIndex.call(this);}};c.prototype.clearSelection=function(){var B=this.getBinding("rows");if(B&&B.clearSelection){B.clearSelection();}else{T.prototype.clearSelection.call(this);}return this;};c.prototype.getContextByIndex=function(r){var B=this.getBinding("rows");if(B){return B.getContextByIndex(r);}};c.prototype.setRootLevel=function(r){this.setFirstVisibleRow(0);var B=this.getBinding("rows");if(B){if(B.setRootLevel){B.setRootLevel(r);}}this.setProperty("rootLevel",r,true);return this;};c.prototype.setCollapseRecursive=function(d){var B=this.getBinding("rows");if(B){if(B.setCollapseRecursive){B.setCollapseRecursive(d);}}this.setProperty("collapseRecursive",!!d,true);return this;};c.prototype._getSelectedIndicesCount=function(){var s;var B=this.getBinding("rows");if(B&&B.findNode&&B.getSelectedNodesCount){return B.getSelectedNodesCount();}else{return T.prototype.getSelectedIndices.call(this);}return s;};return c;});
