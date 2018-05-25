jQuery.sap.declare("sap.zen.crosstab.dragdrop.DragDropUtils");jQuery.sap.require("sap.zen.crosstab.utils.Utils");
sap.zen.crosstab.dragdrop.DragDropUtils=function(c){"use strict";var h=c.getHeaderInfo();var C;var d;var j;var t=this;var o=false;this.init=function(p){d=p;};this.setOnlyMeasuresMode=function(p){o=p;};this.isOnlyMeasuresMode=function(){return o;};this.getDimensionNameDromDragDropPayload=function(){var p=sap.zen.Dispatcher.instance.getDragDropPayload();var D=null;var a=null;if(p){a=p.oDragDropInfo;if(a){D=a.sDimensionName;}}return D;};this.getAreaInfo=function(J,a){var A={};var s;s=J.data("xtabcellid");A.oJqCell=$(document.getElementById(s));A.oCell=sap.ui.getCore().getControl(A.oJqCell.attr("id"));A.oDimInfo=c.getHeaderInfo().getDimensionInfoByRowCol(A.oCell,a);return A;};this.getCellInfoFromDropArea=function(e,D){var a;var b;var f;var s;var i=-1;var r=-1;var S;var A;var J;if(D==="droparea_above"||D==="droparea_below"){S="COLS";}else if(D==="droparea_before"||D==="droparea_after"){S="ROWS";}J=$(document.getElementById(e.target.id));A=this.getAreaInfo(J,S);a=A.oDimInfo;f=A.oCell;s=this.getDimensionNameDromDragDropPayload();if(f&&s&&a){r=f.getTableRow();i=f.getTableCol();b={};b.sDropDimensionName=a.sDimensionName;b.oDropCell=f;b.iDropCellTableRow=r;b.iDropCellTableCol=i;b.bDropCellIsBottomRight=(r===c.getTableMaxDimHeaderRow()&&i===c.getTableMaxDimHeaderCol());b.sDragDimensionName=s;b.sDropAxisName=a.sAxisName;if(b.sDropAxisName==="ROWS"){b.iDropAxisIndex=h.getAbsoluteColIndexForDimension(b.sDropDimensionName);}else if(b.sDropAxisName==="COLS"){b.iDropAxisIndex=h.getAbsoluteRowIndexForDimension(b.sDropDimensionName);}}return b;};this.isExternalDropOnNonRemovableStructure=function(D,p){var r=false;if(this.isInterComponentDrag(p)){return D.bIsStructure&&!D.bIsRemoveStructureAllowed;}return r;};this.isInterComponentDrag=function(p){return(p.sComponentId!==c.getId());};this.checkAcceptCrossComponent=function(p){if(!sap.zen.Dispatcher.instance.isInterComponentDragDropEnabled()){if(this.isInterComponentDrag(p)){return false;}}return true;};this.isDragFromOtherCrosstab=function(p){var i;var D;D=sap.zen.Dispatcher.instance.getControlForId(p.sComponentId);i=(D.zenControlType&&D.zenControlType==="xtable")&&p.sComponentId!==c.getId();return i;};this.getCrosstabHeaderCellFromDraggable=function(D){var a=sap.ui.getCore().byId(D.attr("id"));if(a){if(a.isHeaderCell&&a.isHeaderCell()){return a;}}return null;};this.getAxisNameFromAreaType=function(a){if(a==="droparea_above"||a==="droparea_below"){return"COLS";}return"ROWS";};this.checkDropAreaAccept=function(D,a,p,A){var b;var i=-1;var e=-1;var l=-1;var m=c.getTableMaxDimHeaderRow();var M=c.getTableMaxDimHeaderCol();var L=null;var s;var f;var g;var k;var I;if(this.isDragFromOtherCrosstab(p)===true){return false;}k=this.getAxisNameFromAreaType(A);i=a.getTableRow();e=a.getTableCol();g=h.getDimensionInfoByRowCol(a,k);f=p.oDragDropInfo.sAxisName;if(!f||f&&f.length===0){f=k;}if(p.sComponentId===c.getId()){b=this.getCrosstabHeaderCellFromDraggable(D);if(b.getId()===a.getId()){if(f!==g.sAxisName){return true;}}}if(g){s=p.oDragDropInfo.sDimensionName;if(s===g.sDimensionName){return false;}var I=(A==="droparea_above"||A==="droparea_before");if(!I&&f===g.sAxisName){if(g.sAxisName=="ROWS"){l=e+a.getColSpan();if(l<=M){L=h.getDimensionInfoByCol(l);}}else if(g.sAxisName==="COLS"){l=i+a.getRowSpan();if(l<=m){L=h.getDimensionInfoByRow(l);}}if(L){if(L.sDimensionName===s){return false;}}}}else{return false;}return true;};this.returnFromGenericDimMoveToAreasCheck=function(J,a){J.data("xtabrevertdrop",!a);sap.zen.Dispatcher.instance.setDropAccepted(J.attr("id"),a);return a;};this.checkAcceptExternalDimension=function(p){if(this.isInterComponentDrag(p)){if(c.getHeaderInfo().isDimensionInCrosstab(p.oDragDropInfo.sDimensionName)){return false;}}return true;};this.checkGenericDimMoveToAreasAccept=function(J,D,a,b,A,e){var p;var f;var g=d.getCurrentDropArea();p=sap.zen.Dispatcher.instance.getDragDropPayload();if(c.isBlocked()||!p||p&&p.oDragDropInfo.bIsMemberDrag){return this.returnFromGenericDimMoveToAreasCheck(J,false);}if(!this.checkAcceptExternalDimension(p)){return this.returnFromGenericDimMoveToAreasCheck(J,false);}if(e){if(!this.checkDroppableInArea(J,this.determineValidHeaderRect())){return this.returnFromGenericDimMoveToAreasCheck(J,false);}}if(g){if(J.attr("id")!==g.attr("id")){return this.returnFromGenericDimMoveToAreasCheck(J,false);}}if(this.isInterComponentDrag(p)){if(!this.checkAcceptCrossComponent(p)){return this.returnFromGenericDimMoveToAreasCheck(J,false);}}if(!o){if(!this.checkDropAreaAccept(D,b,p,A)){return this.returnFromGenericDimMoveToAreasCheck(J,false);}}return this.returnFromGenericDimMoveToAreasCheck(J,true);};this.checkMouseInRenderSizeDiv=function(e){var m=false;var r;r=c.getRenderSizeDiv()[0].getBoundingClientRect();m=(e.clientX>r.left)&&(e.clientX<r.right);m=m&&(e.clientY>r.top&&e.clientY<r.bottom);return m;};this.determineValidHeaderRect=function(){var J;var v;J=c.getDimHeaderAreaDiv();if(J.length===0){J=c.getRowHeaderAreaDiv();}v=this.getBoundingClientRect(J[0]);return v;};this.checkDroppableInArea=function(J,v){var r;if(!c.isHeaderHScrolling()){return true;}r=J[0].getBoundingClientRect();if((r.right>v.left&&r.right<v.right)||(r.left<v.right&&r.right>v.right||(r.left>v.left&&r.right<v.right))){return true;}return false;};this.setCurrentJqDragCell=function(J){C=J;};this.getCurrentJqDragCell=function(){return C;};this.checkDragRevert=function(D){var a;var i;var r;var R;var p;var b;R=$(this).data("oRevertPosInfo");if(R){p=t.getRevertPosition(R);$(this).data("uiDraggable").originalPosition=p;}if(!sap.zen.Dispatcher.instance.isDragDropCanceled()){i=$(D).data("xtabcellid");if(i&&i.length>0){r=$(D).data("xtabrevertdrop");return r;}else{i=$(D).attr("id");a=sap.ui.getCore().getControl(i);if(a&&a.isRevertDrop){return a.isRevertDrop();}return false;}}return true;};this.resetDragDrop=function(){sap.zen.Dispatcher.instance.setDragDropCanceled(false);c.setDragAction(false);j=null;};this.buildDimensionDragDropInfo=function(D){var a={};if(D.sDimensionName&&D.sDimensionName.length>0){a.sDimensionName=D.sDimensionName;}if(D.sAttributeName&&D.sAttributeName.length>0){a.sAttributeName=D.sAttributeName;}if(D.sAxisName&&D.sAxisName.length>0){a.sAxisName=D.sAxisName;}if(D.bIsMeasureStructure===true){a.bIsMeasureStructure=true;}if(D.bIsStructure===true){a.bIsStructure=true;a.bIsRemoveStructureAllowed=D.bIsRemoveStructureAllowed;}a.bIsMemberDrag=false;a.iMemberRow=-1;a.iMemberCol=-1;return a;};this.makeDropAreaDroppable=function(J,H,f,a){J.droppable();J.droppable("option","hoverClass",H+"Active");J.droppable("option","addClasses",false);J.droppable("option","greedy",true);J.droppable("option","tolerance","pointer");J.droppable("option","accept",f);J.droppable("option","drop",a);J.droppable("option","over",d.onDropAreaOver);J.droppable("option","out",d.onDropAreaOut);};this.makeCellDroppable=function(J,f,H){J.droppable();J.droppable("option","addClasses",false);J.droppable("option","greedy",true);J.droppable("option","tolerance","pointer");J.droppable("option","accept",f);J.droppable("option","drop",H);J.droppable("option","over",d.onDropCellOver);J.droppable("option","out",d.onDropCellOut);};this.makeCellDraggable=function(J,H){J.draggable();J.draggable("option","cursor","move");J.draggable("option","cursorAt",{top:-5});J.draggable("option","appendTo",document.getElementById(c.getId()));J.draggable("option","addClasses",true);J.draggable("option","helper",H);J.draggable("option","revert",this.checkDragRevert);J.draggable("option","stop",this.resetDragDrop);d.provideDraggableCellCursor(J);$(J.draggable()).mousedown(function(e){if(sap.zen.crosstab.utils.Utils.isDispatcherAvailable){sap.zen.Dispatcher.instance.closeContextMenu();}sap.zen.crosstab.utils.Utils.cancelEvent(e);});};this.getDropAreaTypeFromDropAreaId=function(i){return i.substring(i.indexOf("droparea_"));};this.checkDropAllowedOnCrosstabElement=function(e){return(!sap.zen.Dispatcher.instance.isDragDropCanceled()&&!e.buttons&&this.checkMouseInRenderSizeDiv(e));};this.findCell=function(J){var D=J.closest("div");var a=c.getUtils().getCellIdFromContenDivId(D.attr("id"));var b=sap.ui.getCore().byId(a);return b;};this.getBoundingClientRect=function(D){return c.getUtils().getRtlAwareBoundingClientRect(D);};this.getDeleteDragGhostCellRowHtml=function(i){var H="<tr><td colspan="+i+">";H+="<div id=\""+c.getId()+"_dragtrash\" class=\"sapzencrosstab-Trashcan\"></div>";H+="</td></tr>";return H;};this.setCurrentDragHelper=function(J){j=J;};this.saveRevertCellPosInfo=function(a,b,A){var p={};var J;p.oCell=a;p.aCells=b;p.sAxisName=A;J=$(document.getElementById(a.getId()));J.data("oRevertPosInfo",p);};this.getRevertPosition=function(r){var J;var a;var p;var R;var b;var w;var e=r.oCell;var f=r.aCells;var A=r.sAxisName;b=f[0];a=$(document.getElementById(b.getId()));p=a.position();if(c.getPropertyBag().isRtl()||e.isSplitPivotCell()){if(f.length>1){b=f[f.length-1];a=$(document.getElementById(b.getId()));}}if(c.getPropertyBag().isRtl()){p.left=a.position().left+(c.isVScrolling()?c.getRenderEngine().getMeasuringHelper().getBrowserScrollbarWidth():0);}if(b.isSplitPivotCell()&&A&&A==="COLS"){R=c.getUtils().getRtlAwareBoundingClientRect(a[0]);if(c.getPropertyBag().isRtl()){p.left=p.left-(j?Math.round(j.outerWidth()/2.0):Math.round(R.width/2.0));}else{p.left=p.left+Math.round(R.width/2.0);}}return p;};this.setCursorAt=function(a,J){var w=0;var l=0;var b=$(document.getElementById(c.getId()));var e=$(document.getElementById(a.getId()));b.append(J);w=J.outerWidth();J.remove();l=Math.round(w/2.0);e.draggable("option","cursorAt",{top:-5,left:l});};this.getAllMemberCellsInRowOrCol=function(a){var A=a.getArea();var i=0;var T;var b=[];if(A.isRowHeaderArea()){while(i<A.getColCnt()){T=A.getCellWithColSpan(a.getRow(),i);if(T){b.push(T);i=i+T.getColSpan();}else{i++;}}}else if(A.isColHeaderArea()){while(i<A.getRowCnt()){T=A.getCellWithRowSpan(i,a.getCol());if(T){b.push(T);i=i+T.getRowSpan();}else{i++;}}}return b;};this.getEffectiveCell=function(a){var e=a;var A=null;if(a&&c.getPropertyBag().isRepeatTexts()){A=a.getArea();if(A.isRowHeaderArea()){e=A.getCellWithColSpan(a.getRow(),A.getColCnt()-1);}else if(A.isColHeaderArea()){e=A.getCellWithRowSpan(A.getRowCnt()-1,a.getCol());}}return e;};};
