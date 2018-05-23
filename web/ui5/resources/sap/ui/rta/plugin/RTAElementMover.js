/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/dt/plugin/ElementMover','sap/ui/dt/OverlayUtil','sap/ui/dt/ElementUtil','sap/ui/fl/Utils','sap/ui/rta/controlAnalyzer/ControlAnalyzerFactory','sap/ui/rta/Utils'],function(E,O,a,F,C,U){"use strict";var R=E.extend("sap.ui.rta.plugin.RTAElementMover",{metadata:{library:"sap.ui.rta",properties:{movableTypes:{type:"string[]",defaultValue:["sap.ui.core.Element"]}},associations:{},events:{}}});R.prototype._hasParentStableId=function(o){var b=o.getParentElementOverlay();var B=b?b.getElementInstance():null;return B&&F.checkControlId(B);};R.prototype.checkMovable=function(o){var m=E.prototype.checkMovable.apply(this,arguments);var e;var c;if(m){e=o.getElementInstance();c=C.getControlAnalyzerFor(e);m=c.isEditable(e);}return m&&c.hasParentStableId(o);};R.prototype.checkTargetZone=function(A){var t=E.prototype.checkTargetZone.call(this,A);if(t){var m=this.getMovedOverlay();var M=m.getElementInstance();var o=A.getParent();var p=o.getElementInstance();var s=A.getAggregationName();var b=C.getControlAnalyzerFor(M);t=b.isEditable(p)&&b.checkTargetZone(p,s,M);}return t;};return R;},true);