/*!
 * ${copyright}
 */
sap.ui.define(['jquery.sap.global','sap/ushell/library'],function(q){"use strict";sap.ui.base.Object.extend("sap.ushell.ui.shell.shell_ContentRenderer",{constructor:function(c,C,o,a){sap.ui.base.Object.apply(this);this._id=C;this._cntnt=o;this._ctrl=c;this._rm=sap.ui.getCore().createRenderManager();this._cb=a||function(){};},destroy:function(){this._rm.destroy();delete this._rm;delete this._id;delete this._cntnt;delete this._cb;delete this._ctrl;if(this._rerenderTimer){q.sap.clearDelayedCall(this._rerenderTimer);delete this._rerenderTimer;}sap.ui.base.Object.prototype.destroy.apply(this,arguments);},render:function(){if(!this._rm){return;}if(this._rerenderTimer){q.sap.clearDelayedCall(this._rerenderTimer);}this._rerenderTimer=q.sap.delayedCall(0,this,function(){var $=q.sap.byId(this._id);var d=$.length>0;if(d){if(typeof(this._cntnt)==="string"){var c=this._ctrl.getAggregation(this._cntnt,[]);for(var i=0;i<c.length;i++){this._rm.renderControl(c[i]);}}else{this._cntnt(this._rm);}this._rm.flush($[0]);}this._cb(d);});}});sap.ushell.ui.shell.shell_iNumberOfOpenedShellOverlays=0;},false);