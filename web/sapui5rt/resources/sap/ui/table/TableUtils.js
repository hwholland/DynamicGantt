/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/library","sap/ui/model/ChangeReason","./TableGrouping","./TableColumnUtils","./TableMenuUtils","./TableBindingUtils","./library"],function(q,C,R,c,a,T,b,d,e,l){"use strict";var S=l.SelectionBehavior;var f=l.SelectionMode;var M=c.MessageType;var g={DATACELL:1,COLUMNHEADER:2,ROWHEADER:4,ROWACTION:8,COLUMNROWHEADER:16};g.ANYCONTENTCELL=g.ROWHEADER|g.DATACELL|g.ROWACTION;g.ANYCOLUMNHEADER=g.COLUMNHEADER|g.COLUMNROWHEADER;g.ANYROWHEADER=g.ROWHEADER|g.COLUMNROWHEADER;g.ANY=g.ANYCONTENTCELL|g.ANYCOLUMNHEADER;var h=1;var D={sapUiSizeCozy:48,sapUiSizeCompact:32,sapUiSizeCondensed:24,undefined:32};var j={sapUiSizeCozy:D.sapUiSizeCozy+h,sapUiSizeCompact:D.sapUiSizeCompact+h,sapUiSizeCondensed:D.sapUiSizeCondensed+h,undefined:D.undefined+h};var k={Render:"Render",VerticalScroll:"VerticalScroll",FirstVisibleRowChange:"FirstVisibleRowChange",Unbind:"Unbind",Animation:"Animation",Resize:"Resize",Unknown:"Unknown"};for(var p in a){k[p]=a[p];}var m={Grouping:T,Column:b,Menu:d,Binding:e,CELLTYPE:g,ROW_HORIZONTAL_FRAME_SIZE:h,DEFAULT_ROW_HEIGHT:j,RowsUpdateReason:k,hasRowHeader:function(t){return(t.getSelectionMode()!==f.None&&t.getSelectionBehavior()!==S.RowOnly)||T.isGroupMode(t);},hasSelectAll:function(t){var s=t!=null?t.getSelectionMode():f.None;return(s===f.Multi||s===f.MultiToggle)&&t.getEnableSelectAll();},hasRowHighlights:function(t){if(t==null){return false;}var r=t.getRowSettingsTemplate();if(r==null){return false;}var H=r.getHighlight();return r.isBound("highlight")||(H!=null&&H!==M.None);},getRowActionCount:function(t){var o=t.getRowActionTemplate();return o?o._getCount():0;},hasRowActions:function(t){var r=t.getRowActionTemplate();return r!=null&&(r.isBound("visible")||r.getVisible())&&m.getRowActionCount(t)>0;},isRowSelectionAllowed:function(t){return t.getSelectionMode()!==f.None&&(t.getSelectionBehavior()===S.Row||t.getSelectionBehavior()===S.RowOnly);},isRowSelectorSelectionAllowed:function(t){return t.getSelectionMode()!==f.None&&m.hasRowHeader(t);},areAllRowsSelected:function(t){if(t==null){return false;}var s=t._getSelectableRowCount();return s>0&&s===t._getSelectedIndicesCount();},isNoDataVisible:function(t){if(!t.getShowNoData()){return false;}return!m.hasData(t);},hasData:function(t){var B=t.getBinding("rows"),i=t._getTotalRowCount(),H=B?!!i:false;if(B&&B.providesGrandTotal){var n=B.providesGrandTotal()&&B.hasTotaledMeasures();H=(n&&i<2)||(!n&&i===0)?false:true;}return H;},isBusyIndicatorVisible:function(t){if(t==null||t.getDomRef()==null){return false;}return t.getDomRef().querySelector(".sapUiTableCnt > .sapUiLocalBusyIndicator")!=null;},hasPendingRequests:function(t){if(t==null){return false;}if(m.canUsePendingRequestsCounter(t)){return t._iPendingRequests>0;}else{return t._bPendingRequest;}},canUsePendingRequestsCounter:function(t){var B=t!=null?t.getBinding("rows"):null;if(m.isInstanceOf(B,"sap/ui/model/analytics/AnalyticalBinding")){return B.bUseBatchRequests;}else if(m.isInstanceOf(B,"sap/ui/model/TreeBinding")){return false;}return true;},isInstanceOf:function(o,t){if(!o||!t){return false;}var i=sap.ui.require(t);return!!(i&&(o instanceof i));},toggleRowSelection:function(t,r,s,i){if(t==null||t.getBinding("rows")==null||t.getSelectionMode()===f.None||r==null){return false;}function n(A){if(!t._isRowSelectable(A)){return false;}t._iSourceRowIndex=A;var u=true;if(i){u=i(A,s);}else{if(t.isIndexSelected(A)){if(s!=null&&s){return false;}t.removeSelectionInterval(A,A);}else{if(s!=null&&!s){return false;}t.addSelectionInterval(A,A);}}delete t._iSourceRowIndex;return u;}if(typeof r==="number"){if(r<0||r>=t._getTotalRowCount()){return false;}return n(r);}else{var $=q(r);var o=m.getCellInfo($[0]);var I=m.isRowSelectionAllowed(t);if(!m.Grouping.isInGroupingRow($[0])&&((o.isOfType(m.CELLTYPE.DATACELL|m.CELLTYPE.ROWACTION)&&I)||(o.isOfType(m.CELLTYPE.ROWHEADER)&&m.isRowSelectorSelectionAllowed(t)))){var A;if(o.isOfType(m.CELLTYPE.DATACELL)){A=t.getRows()[parseInt($.closest("tr",t.getDomRef()).attr("data-sap-ui-rowindex"),10)].getIndex();}else{A=t.getRows()[parseInt($.attr("data-sap-ui-rowindex"),10)].getIndex();}return n(A);}return false;}},getNoDataText:function(t){var n=t.getNoData();if(n instanceof C){return null;}else if(typeof n==="string"||t.getNoData()instanceof String){return n;}else{return t._oResBundle.getText("TBL_NO_DATA");}},getVisibleColumnCount:function(t){return t._getVisibleColumns().length;},getHeaderRowCount:function(t){if(t._iHeaderRowCount===undefined){if(!t.getColumnHeaderVisible()){t._iHeaderRowCount=0;}else{var H=1;var n=t.getColumns();for(var i=0;i<n.length;i++){if(n[i].shouldRender()){H=Math.max(H,n[i].getMultiLabels().length);}}t._iHeaderRowCount=H;}}return t._iHeaderRowCount;},isVariableRowHeightEnabled:function(t){return t._bVariableRowHeightEnabled&&t.getFixedRowCount()<=0&&t.getFixedBottomRowCount()<=0;},getTotalRowCount:function(t,i){var r=t._getTotalRowCount();if(i){r=Math.max(r,t.getVisibleRowCount());}return r;},getNonEmptyVisibleRowCount:function(t){return Math.min(t.getVisibleRowCount(),t._getTotalRowCount());},getFocusedItemInfo:function(t){var i=t._getItemNavigation();if(!i){return null;}return{cell:i.getFocusedIndex(),columnCount:i.iColumns,cellInRow:i.getFocusedIndex()%i.iColumns,row:Math.floor(i.getFocusedIndex()/i.iColumns),cellCount:i.getItemDomRefs().length,domRef:i.getFocusedDomRef()};},getRowIndexOfFocusedCell:function(t){var i=m.getFocusedItemInfo(t);return i.row-m.getHeaderRowCount(t);},isFixedColumn:function(t,i){return i<t.getFixedColumnCount();},hasFixedColumns:function(t){return t.getFixedColumnCount()>0;},focusItem:function(t,i,E){var I=t._getItemNavigation();if(I){I.focusItem(i,E);}},getCellInfo:function(o){var i;var $=q(o);var s;var n;var r;var t;var u;i={type:0,cell:null,rowIndex:null,columnIndex:null,columnSpan:null};if($.hasClass("sapUiTableTd")){s=$.data("sap-ui-colid");n=sap.ui.getCore().byId(s);i.type=m.CELLTYPE.DATACELL;i.rowIndex=parseInt($.parent().data("sap-ui-rowindex"),10);i.columnIndex=n.getIndex();i.columnSpan=1;}else if($.hasClass("sapUiTableCol")){r=/_([\d]+)/;s=$.attr("id");t=r.exec(s);u=t==null||t[1]==null?0:parseInt(t[1],10);i.type=m.CELLTYPE.COLUMNHEADER;i.rowIndex=u;i.columnIndex=parseInt($.data("sap-ui-colindex"),10);i.columnSpan=parseInt($.attr("colspan")||1,10);}else if($.hasClass("sapUiTableRowHdr")){i.type=m.CELLTYPE.ROWHEADER;i.rowIndex=parseInt($.data("sap-ui-rowindex"),10);i.columnIndex=-1;i.columnSpan=1;}else if($.hasClass("sapUiTableRowAction")){i.type=m.CELLTYPE.ROWACTION;i.rowIndex=parseInt($.data("sap-ui-rowindex"),10);i.columnIndex=-2;i.columnSpan=1;}else if($.hasClass("sapUiTableColRowHdr")){i.type=m.CELLTYPE.COLUMNROWHEADER;i.columnIndex=-1;i.columnSpan=1;}if(i.type!==0){i.cell=$;}i.isOfType=function(v){if(v==null){return false;}return(this.type&v)>0;};return i;},getRowColCell:function(t,r,n,I){var o=r>=0&&r<t.getRows().length?t.getRows()[r]:null;var s=I?t.getColumns():t._getVisibleColumns();var u=n>=0&&n<s.length?s[n]:null;var v=null;if(o&&u){if(I){if(u.shouldRender()){var V=t._getVisibleColumns();for(var i=0;i<V.length;i++){if(V[i]===u){v=o.getCells()[i];break;}}}}else{v=o.getCells()[n];}if(v&&v.data("sap-ui-colid")!=u.getId()){var w=o.getCells();for(var i=0;i<w.length;i++){if(w[i].data("sap-ui-colid")===u.getId()){v=w[i];break;}}}}return{row:o,column:u,cell:v};},getCell:function(t,E){if(t==null||E==null){return null;}var $=q(E);var n;var o=t.getDomRef();var r=[".sapUiTableTd",".sapUiTableCol",".sapUiTableRowHdr",".sapUiTableRowAction",".sapUiTableColRowHdr"];var s;for(var i=0;i<r.length;i++){s=r[i];n=$.closest(s,o);if(n.length>0){return n;}}return null;},getParentCell:function(t,E){var $=q(E);var i=m.getCell(t,E);if(i===null||i[0]===$[0]){return null;}else{return i;}},registerResizeHandler:function(t,i,H,r){var o;if(typeof i=="string"){o=t.getDomRef(i);}else{q.sap.log.error("sIdSuffix must be a string",t);return;}if(typeof H!=="function"){q.sap.log.error("fnHandler must be a function",t);return;}m.deregisterResizeHandler(t,i);if(!t._mResizeHandlerIds){t._mResizeHandlerIds={};}if(r&&o){o=o.parentNode;}if(o){t._mResizeHandlerIds[i]=R.register(o,H);}return t._mResizeHandlerIds[i];},deregisterResizeHandler:function(t,I){var n;if(!t._mResizeHandlerIds){return;}if(typeof I=="string"){n=[I];}else if(I===undefined){n=[];for(var K in t._mResizeHandlerIds){if(typeof K=="string"&&t._mResizeHandlerIds.hasOwnProperty(K)){n.push(K);}}}else if(q.isArray(I)){n=I;}for(var i=0;i<n.length;i++){var s=n[i];if(t._mResizeHandlerIds[s]){R.deregister(t._mResizeHandlerIds[s]);t._mResizeHandlerIds[s]=undefined;}}},isFirstScrollableRow:function(t,r){if(isNaN(r)){var $=q(r);r=parseInt($.add($.parent()).filter("[data-sap-ui-rowindex]").data("sap-ui-rowindex"),10);}var F=t.getFixedRowCount()||0;return r==F;},isLastScrollableRow:function(t,r){if(isNaN(r)){var $=q(r);r=parseInt($.add($.parent()).filter("[data-sap-ui-rowindex]").data("sap-ui-rowindex"),10);}var F=t.getFixedBottomRowCount()||0;return r==t.getVisibleRowCount()-F-1;},getContentDensity:function(o){var s;var n=["sapUiSizeCompact","sapUiSizeCondensed","sapUiSizeCozy"];var G=function(F,O){if(!O[F]){return;}for(var i=0;i<n.length;i++){if(O[F](n[i])){return n[i];}}};var $=o.$();if($.length>0){s=G("hasClass",$);}else{s=G("hasStyleClass",o);}if(s){return s;}var P=null;var r=o.getParent();if(r){do{s=G("hasStyleClass",r);if(s){return s;}if(r.getDomRef){P=r.getDomRef();}else if(r.getRootNode){P=r.getRootNode();}if(!P&&r.getParent){r=r.getParent();}else{r=null;}}while(r&&!P);}$=q(P||document.body);s=G("hasClass",$.closest("."+n.join(",.")));return s;},sanitizeSelectionMode:function(t,s){if(s===f.Multi){s=f.MultiToggle;q.sap.log.warning("The selection mode 'Multi' is deprecated and must not be used anymore. Your setting was defaulted to selection mode 'MultiToggle'");}return s;},isVariableWidth:function(w){return!w||w=="auto"||w.toString().match(/%$/);},getFirstFixedButtomRowIndex:function(t){var F=t.getFixedBottomRowCount();var B=t.getBinding("rows");var i=-1;if(B&&F>0){var v=t.getVisibleRowCount();var n=t.getFirstVisibleRow();var o=t._getTotalRowCount();if(o>=v){i=v-F;}else{var I=o-F-n;if(I>=0&&(n+I)<o){i=I;}}}return i;}};T.TableUtils=m;b.TableUtils=m;d.TableUtils=m;e.TableUtils=m;return m;},true);
