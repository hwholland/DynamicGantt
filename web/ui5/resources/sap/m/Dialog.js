/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./InstanceManager','./AssociativeOverflowToolbar','./ToolbarSpacer','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/Popup','sap/ui/core/delegate/ScrollEnablement','sap/ui/core/theming/Parameters','sap/ui/core/RenderManager','sap/ui/core/ResizeHandler','sap/ui/Device'],function(q,B,I,A,T,l,C,a,P,S,b,R,c,D){"use strict";var V=sap.ui.core.ValueState;var d=D.browser.internet_explorer&&(D.browser.version<10);var f=C.extend("sap.m.Dialog",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",properties:{icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},type:{type:"sap.m.DialogType",group:"Appearance",defaultValue:sap.m.DialogType.Standard},state:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:V.None},stretchOnPhone:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},stretch:{type:"boolean",group:"Appearance",defaultValue:false},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},horizontalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},verticalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},resizable:{type:"boolean",group:"Behavior",defaultValue:false},draggable:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},subHeader:{type:"sap.m.IBar",multiple:false},customHeader:{type:"sap.m.IBar",multiple:false},beginButton:{type:"sap.m.Button",multiple:false},endButton:{type:"sap.m.Button",multiple:false},buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_header:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_title:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_icon:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_toolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"}},associations:{leftButton:{type:"sap.m.Button",multiple:false,deprecated:true},rightButton:{type:"sap.m.Button",multiple:false,deprecated:true},initialFocus:{type:"sap.ui.core.Control",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{beforeOpen:{},afterOpen:{},beforeClose:{parameters:{origin:{type:"sap.m.Button"}}},afterClose:{parameters:{origin:{type:"sap.m.Button"}}}}}});f._bPaddingByDefault=(sap.ui.getCore().getConfiguration().getCompatibilityVersion("sapMDialogWithPadding").compareTo("1.16")<0);f._mStateClasses={};f._mStateClasses[V.None]="";f._mStateClasses[V.Success]="sapMDialogSuccess";f._mStateClasses[V.Warning]="sapMDialogWarning";f._mStateClasses[V.Error]="sapMDialogError";f._mIcons={};f._mIcons[V.Success]=a.getIconURI("message-success");f._mIcons[V.Warning]=a.getIconURI("message-warning");f._mIcons[V.Error]=a.getIconURI("message-error");f.prototype.init=function(){var t=this;this._externalIcon=undefined;this._oManuallySetSize=null;this._oManuallySetPosition=null;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._scrollContentList=["NavContainer","Page","ScrollContainer","SplitContainer","MultiInput"];this.oPopup=new P();this.oPopup.setShadow(true);this.oPopup.setNavigationMode("SCOPE");if(q.device.is.iphone&&!this._bMessageType){this.oPopup.setModal(true,"sapMDialogTransparentBlk");}else{this.oPopup.setModal(true,"sapMDialogBlockLayerInit");}this.oPopup.setAnimations(q.proxy(this._openAnimation,this),q.proxy(this._closeAnimation,this));this.oPopup.onsapescape=q.proxy(function(e){if(e.originalEvent&&e.originalEvent._sapui_handledByControl){return;}this.close();e.stopPropagation();},this);this.oPopup._applyPosition=function(p,F){t._setDimensions();t._adjustScrollingPane();p.at={};if(t._oManuallySetPosition){p.at.left=t._oManuallySetPosition.x;p.at.top=t._oManuallySetPosition.y;}else{p.at.top='calc(50% + '+(window.scrollY===undefined?window.pageYOffset:window.scrollY)+'px)';if(t._bRTL){p.at.left='auto';}else{p.at.left='calc(50% + '+(window.scrollX===undefined?window.pageXOffset:window.scrollX)+'px)';}}t._deregisterContentResizeHandler();P.prototype._applyPosition.call(this,p);t._registerContentResizeHandler();};if(f._bPaddingByDefault){this.addStyleClass("sapUiPopupWithPadding");}};f.prototype.onBeforeRendering=function(){if(this._hasSingleScrollableContent()){this.setProperty("verticalScrolling",false);this.setProperty("horizontalScrolling",false);q.sap.log.info("VerticalScrolling and horizontalScrolling in sap.m.Dialog with ID "+this.getId()+" has been disabled because there's scrollable content inside");}else if(!this._oScroller){this._oScroller=new S(this,this.getId()+"-scroll",{horizontal:this.getHorizontalScrolling(),vertical:this.getVerticalScrolling()});}this._createToolbarButtons();};f.prototype.onAfterRendering=function(){this._$scrollPane=this.$("scroll");this._$content=this.$("cont");this._$dialog=this.$();if(this.isOpen()){this._setInitialFocus();}};f.prototype.exit=function(){I.removeDialogInstance(this);this._deregisterContentResizeHandler();this._deregisterResizeHandler();if(this.oPopup){this.oPopup.detachOpened(this._handleOpened,this);this.oPopup.detachClosed(this._handleClosed,this);this.oPopup.destroy();this.oPopup=null;}if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._header){this._header.destroy();this._header=null;}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null;}if(this._iconImage){this._iconImage.destroy();this._iconImage=null;}if(this._toolbarSpacer){this._toolbarSpacer.destroy();this._toolbarSpacer=null;}};f.prototype.open=function(){var p=this.oPopup;p.setInitialFocusId(this.getId());var o=p.getOpenState();switch(o){case sap.ui.core.OpenState.OPEN:case sap.ui.core.OpenState.OPENING:return this;case sap.ui.core.OpenState.CLOSING:this._bOpenAfterClose=true;break;default:}this._oCloseTrigger=null;this.fireBeforeOpen();p.attachOpened(this._handleOpened,this);p.setContent(this);p.open();this._registerResizeHandler();I.addDialogInstance(this);return this;};f.prototype.close=function(){this._bOpenAfterClose=false;this.$().removeClass('sapDialogDisableTransition');this._deregisterResizeHandler();var p=this.oPopup;var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.CLOSED||e===sap.ui.core.OpenState.CLOSING)){sap.m.closeKeyboard();this.fireBeforeClose({origin:this._oCloseTrigger});p.attachClosed(this._handleClosed,this);this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;p.close();this._deregisterContentResizeHandler();}return this;};f.prototype.isOpen=function(){return this.oPopup&&this.oPopup.isOpen();};f.prototype._handleOpened=function(){this.oPopup.detachOpened(this._handleOpened,this);this._setInitialFocus();this.fireAfterOpen();};f.prototype._handleClosed=function(){if(!this.oPopup){return;}this.oPopup.detachClosed(this._handleClosed,this);if(this.getDomRef()){R.preserveContent(this.getDomRef());this.$().remove();}I.removeDialogInstance(this);this.fireAfterClose({origin:this._oCloseTrigger});if(this._bOpenAfterClose){this._bOpenAfterClose=false;this.open();}};f.prototype.onfocusin=function(e){var s=e.target;if(s.id===this.getId()+"-firstfe"){var L=this.$("footer").lastFocusableDomRef()||this.$("cont").lastFocusableDomRef()||(this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef())||(this._getAnyHeader()&&this._getAnyHeader().$().lastFocusableDomRef());if(L){q.sap.focus(L);}}else if(s.id===this.getId()+"-lastfe"){var F=(this._getAnyHeader()&&this._getAnyHeader().$().firstFocusableDomRef())||(this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef())||this.$("cont").firstFocusableDomRef()||this.$("footer").firstFocusableDomRef();if(F){q.sap.focus(F);}}};f.prototype._openAnimation=function(r,i,o){q.sap.delayedCall(0,this,function(){r.addClass("sapMDialogOpen");});if(d){r.fadeIn(200,o);}else{r.css("display","block");setTimeout(o,210);}};f.prototype._closeAnimation=function(r,i,e){r.removeClass("sapMDialogOpen");if(d){r.fadeOut(200,e);}else{setTimeout(e,210);}};f.prototype._setDimensions=function(){var $=this.$(),s=this.getStretch(),e=this.getStretchOnPhone()&&D.system.phone,m=this._bMessageType,o={};if(!s){if(!this._oManuallySetSize){o.width=this.getContentWidth()||undefined;o.height=this.getContentHeight()||undefined;}else{o.width=this._oManuallySetSize.width;o.height=this._oManuallySetSize.height;}}if((s&&!m)||(e)){this.$().addClass('sapMDialogStretched');}$.css(o);if(!s&&!this._oManuallySetSize&&!this._bDisableRepositioning){this._applyCustomTranslate();}if(window.navigator.userAgent.toLowerCase().indexOf("chrome")!==-1&&this.getStretch()){$.find('> footer').css({bottom:'0.001px'});}};f.prototype._adjustScrollingPane=function(){if(this._oScroller){this._oScroller.refresh();}};f.prototype._reposition=function(){};f.prototype._repositionAfterOpen=function(){};f.prototype._reapplyPosition=function(){this._adjustScrollingPane();};f.prototype._onResize=function(){var $=this.$(),e=this.$('cont'),i,h,j;if(this._oManuallySetSize){return;}if(!this.getContentHeight()){e.css({height:'auto'});i=parseFloat($.height());h=parseFloat($.css("border-top-width"));j=parseFloat($.css("border-bottom-width"));e.height(Math.round(i+h+j));}if(!this.getStretch()&&!this._oManuallySetSize&&!this._bDisableRepositioning){this._applyCustomTranslate();}};f.prototype._applyCustomTranslate=function(){var $=this.$(),t,s,i=$.innerWidth(),e=$.innerHeight();if(D.system.desktop&&(i%2!==0||e%2!==0)){if(!this._bRTL){t='-'+Math.floor(i/2)+"px";}else{t=Math.floor(i/2)+"px";}s='-'+Math.floor(e/2)+"px";$.css('transform','translate('+t+','+s+') scale(1)');}else{$.css('transform','');}};f.prototype._createHeader=function(){if(!this._header){this._header=new B(this.getId()+"-header").addStyleClass("sapMDialogTitle");this.setAggregation("_header",this._header,false);}};f.prototype._hasSingleScrollableContent=function(){var e=this.getContent(),i;while(e.length===1&&e[0]instanceof sap.ui.core.mvc.View){e=e[0].getContent();}if(e.length===1){for(i=0;i<this._scrollContentList.length;i++){if(e[0]instanceof sap.m[this._scrollContentList[i]]){return true;}}}return false;};f.prototype._initBlockLayerAnimation=function(){this.oPopup._hideBlockLayer=function(){var $=q("#sap-ui-blocklayer-popup");$.removeClass("sapMDialogTransparentBlk");P.prototype._hideBlockLayer.call(this);};};f.prototype._clearBlockLayerAnimation=function(){if(q.device.is.iphone&&!this._bMessageType){delete this.oPopup._showBlockLayer;this.oPopup._hideBlockLayer=function(){var $=q("#sap-ui-blocklayer-popup");$.removeClass("sapMDialogTransparentBlk");P.prototype._hideBlockLayer.call(this);};}};f.prototype._getFocusId=function(){return this.getInitialFocus()||this._getFirstFocusableContentSubHeader()||this._getFirstFocusableContentElementId()||this._getFirstVisibleButtonId()||this.getId();};f.prototype._getFirstVisibleButtonId=function(){var o=this.getBeginButton(),e=this.getEndButton(),h=this.getButtons(),s="";if(o&&o.getVisible()){s=o.getId();}else if(e&&e.getVisible()){s=e.getId();}else if(h&&h.length>0){for(var i=0;i<h.length;i++){if(h[i].getVisible()){s=h[i].getId();break;}}}return s;};f.prototype._getFirstFocusableContentSubHeader=function(){var $=this.$().find('.sapMDialogSubHeader');var r;var F=$.firstFocusableDomRef();if(F){r=F.id;}return r;};f.prototype._getFirstFocusableContentElementId=function(){var r="";var $=this.$("cont");var F=$.firstFocusableDomRef();if(F){r=F.id;}return r;};f.prototype._setInitialFocus=function(){var F=this._getFocusId();var o=sap.ui.getCore().byId(F);var e;if(o){if(o.getVisible&&!o.getVisible()){this.focus();return;}e=o.getFocusDomRef();}e=e||q.sap.domById(F);if(!e){this.setInitialFocus("");e=sap.ui.getCore().byId(this._getFocusId());}if(!this.getInitialFocus()){this.setAssociation('initialFocus',e?e.id:this.getId(),true);}if(D.system.desktop||(e&&!/input|textarea|select/i.test(e.tagName))){q.sap.focus(e);}else{this.focus();}};f.prototype.getScrollDelegate=function(){return this._oScroller;};f.prototype._composeAggreNameInHeader=function(p){var h;if(p==="Begin"){h="contentLeft";}else if(p==="End"){h="contentRight";}else{h="content"+p;}return h;};f.prototype._isToolbarEmpty=function(){var e=this._oToolbar.getContent().filter(function(h){return h.getMetadata().getName()!=='sap.m.ToolbarSpacer';});return e.length===0;};f.prototype._setButton=function(o,p,s){return this;};f.prototype._getButton=function(p){var s=p.toLowerCase()+"Button",e="_o"+this._firstLetterUpperCase(p)+"Button";if(D.system.phone){return this.getAggregation(s,null,true);}else{return this[e];}};f.prototype._getButtonFromHeader=function(p){if(this._header){var h=this._composeAggreNameInHeader(this._firstLetterUpperCase(p)),e=this._header.getAggregation(h);return e&&e[0];}else{return null;}};f.prototype._firstLetterUpperCase=function(v){return v.charAt(0).toUpperCase()+v.slice(1);};f.prototype._getAnyHeader=function(){var o=this.getCustomHeader();if(o){return o;}else{var s=this.getShowHeader();if(!s){return null;}this._createHeader();return this._header;}};f.prototype._deregisterResizeHandler=function(){if(this._resizeListenerId){c.deregister(this._resizeListenerId);this._resizeListenerId=null;}D.resize.detachHandler(this._onResize,this);};f.prototype._registerResizeHandler=function(){var _=this.$("scroll");this._resizeListenerId=c.register(_.get(0),q.proxy(this._onResize,this));D.resize.attachHandler(this._onResize,this);this._onResize();};f.prototype._deregisterContentResizeHandler=function(){if(this._sContentResizeListenerId){c.deregister(this._sContentResizeListenerId);this._sContentResizeListenerId=null;}};f.prototype._registerContentResizeHandler=function(){if(!this._sContentResizeListenerId){this._sContentResizeListenerId=c.register(this.getDomRef("scrollCont"),q.proxy(this._onResize,this));}this._onResize();};f.prototype._attachHandler=function(o){var t=this;if(!this._oButtonDelegate){this._oButtonDelegate={ontap:function(){t._oCloseTrigger=this;}};}if(o){o.addDelegate(this._oButtonDelegate,true,o);}};f.prototype._createToolbarButtons=function(){var t=this._getToolbar();var e=this.getButtons();var h=this.getBeginButton();var i=this.getEndButton(),j=this,k=[h,i];k.forEach(function(o){if(o&&j._oButtonDelegate){o.removeDelegate(j._oButtonDelegate);}});t.removeAllContent();if(!("_toolbarSpacer"in this)){this._toolbarSpacer=new T();}t.addContent(this._toolbarSpacer);k.forEach(function(o){j._attachHandler(o);});if(e&&e.length){e.forEach(function(m){t.addContent(m);});}else{if(h){t.addContent(h);}if(i){t.addContent(i);}}};f.prototype._getToolbar=function(){if(!this._oToolbar){this._oToolbar=new A(this.getId()+"-footer").addStyleClass("sapMTBNoBorders").applyTagAndContextClassFor("footer");this._oToolbar._isControlsInfoCached=function(){return false;};this.setAggregation("_toolbar",this._oToolbar);}return this._oToolbar;};f.prototype.setSubHeader=function(o){this.setAggregation("subHeader",o);if(o){o.setVisible=function(i){this.$().toggleClass('sapMDialogWithSubHeader',i);o.setProperty("visible",i);}.bind(this);}return o;};f.prototype.setLeftButton=function(v){if(!(v instanceof sap.m.Button)){v=sap.ui.getCore().byId(v);}this.setBeginButton(v);return this.setAssociation("leftButton",v);};f.prototype.setRightButton=function(v){if(!(v instanceof sap.m.Button)){v=sap.ui.getCore().byId(v);}this.setEndButton(v);return this.setAssociation("rightButton",v);};f.prototype.getLeftButton=function(){var o=this.getBeginButton();return o?o.getId():null;};f.prototype.getRightButton=function(){var e=this.getEndButton();return e?e.getId():null;};f.prototype.getAggregation=function(s,o,p){var e=C.prototype.getAggregation.apply(this,Array.prototype.slice.call(arguments,0,2));if(s==='buttons'&&e.length===0){this.getBeginButton()&&e.push(this.getBeginButton());this.getEndButton()&&e.push(this.getEndButton());}return e;};f.prototype.getAriaLabelledBy=function(){var h=this._getAnyHeader(),e=this.getAssociation("ariaLabelledBy",[]).slice();var s=this.getSubHeader();if(s){e.unshift(s.getId());}if(h){e.unshift(h.getId());}return e;};f.prototype.setTitle=function(t){this.setProperty("title",t,true);if(this._headerTitle){this._headerTitle.setText(t);}else{this._headerTitle=new sap.m.Title(this.getId()+"-title",{text:t,level:"H1"}).addStyleClass("sapMDialogTitle");this._createHeader();this._header.addContentMiddle(this._headerTitle);}return this;};f.prototype.setCustomHeader=function(o){if(o){o.addStyleClass("sapMDialogTitle");}this.setAggregation("customHeader",o);};f.prototype.setState=function(s){var F={},$=this.$(),n;F[s]=true;this.setProperty("state",s,true);for(n in f._mStateClasses){$.toggleClass(f._mStateClasses[n],!!F[n]);}this.setIcon(f._mIcons[s],true);};f.prototype.setIcon=function(i,e){if(!e){this._externalIcon=i;}else{if(this._externalIcon){i=this._externalIcon;}}if(i){if(i!==this.getIcon()){if(this._iconImage){this._iconImage.setSrc(i);}else{this._iconImage=a.createControlByURI({id:this.getId()+"-icon",src:i,useIconTooltip:false},sap.m.Image).addStyleClass("sapMDialogIcon");this._createHeader();this._header.insertAggregation("contentMiddle",this._iconImage,0);}}}else{var s=this.getState();if(!e&&s!==V.None){if(this._iconImage){this._iconImage.setSrc(f._mIcons[s]);}}else{if(this._iconImage){this._iconImage.destroy();this._iconImage=null;}}}this.setProperty("icon",i,true);return this;};f.prototype.setType=function(t){var o=this.getType();if(o===t){return this;}this._bMessageType=(t===sap.m.DialogType.Message);return this.setProperty("type",t,false);};f.prototype.setStretch=function(s){this._bStretchSet=true;return this.setProperty("stretch",s);};f.prototype.setStretchOnPhone=function(s){if(this._bStretchSet){q.sap.log.warning("sap.m.Dialog: stretchOnPhone property is deprecated. Setting stretchOnPhone property is ignored when there's already stretch property set.");return this;}this.setProperty("stretchOnPhone",s);return this.setProperty("stretch",s&&D.system.phone);};f.prototype.setVerticalScrolling=function(v){var o=this.getVerticalScrolling(),h=this._hasSingleScrollableContent();if(h){q.sap.log.warning("sap.m.Dialog: property verticalScrolling automatically reset to false. See documentation.");v=false;}if(o===v){return this;}this.$().toggleClass("sapMDialogVerScrollDisabled",!v);this.setProperty("verticalScrolling",v);if(this._oScroller){this._oScroller.setVertical(v);}return this;};f.prototype.setHorizontalScrolling=function(v){var o=this.getHorizontalScrolling(),h=this._hasSingleScrollableContent();if(h){q.sap.log.warning("sap.m.Dialog: property horizontalScrolling automatically reset to false. See documentation.");v=false;}if(o===v){return this;}this.$().toggleClass("sapMDialogHorScrollDisabled",!v);this.setProperty("horizontalScrolling",v);if(this._oScroller){this._oScroller.setHorizontal(v);}return this;};f.prototype.setInitialFocus=function(i){return this.setAssociation("initialFocus",i,true);};f.prototype.forceInvalidate=C.prototype.invalidate;f.prototype.invalidate=function(o){if(this.isOpen()){this.forceInvalidate(o);}};function g(e){var $=q(e);var o=$.control(0);if(!o||o.getMetadata().getInterfaces().indexOf("sap.m.IBar")>-1){return true;}return $.hasClass('sapMDialogTitle');}if(D.system.desktop){f.prototype.ondblclick=function(e){if(g(e.target)){this._bDisableRepositioning=false;this._oManuallySetPosition=null;this._oManuallySetSize=null;this.oPopup&&this.oPopup._applyPosition(this.oPopup._oLastPosition,true);this._$dialog.removeClass('sapMDialogTouched');}};f.prototype.onmousedown=function(e){if(e.which===3){return;}if(this.getStretch()||(!this.getDraggable()&&!this.getResizable())){return;}var t;var h=this;var $=q(document);var i=q(e.target);var r=i.hasClass('sapMDialogResizeHandler')&&this.getResizable();var m=function(v){t=t?clearTimeout(t):setTimeout(function(){v();},0);};var j=30;var w=window.innerWidth;var k=window.innerHeight;var n={x:e.pageX,y:e.pageY,width:h._$dialog.width(),height:h._$dialog.height(),offset:{x:e.offsetX?e.offsetX:e.originalEvent.layerX,y:e.offsetY?e.offsetY:e.originalEvent.layerY},position:{x:h._$dialog.offset().left,y:h._$dialog.offset().top}};function o(){var v=h.$(),x=h.$('cont');$.off("mouseup.sapMDialog, mousemove.sapMDialog");if(r){h._$dialog.removeClass('sapMDialogResizing');x.height(parseInt(v.height(),10)+parseInt(v.css("border-top-width"),10)+parseInt(v.css("border-bottom-width"),10));}}if((g(e.target)&&this.getDraggable())||r){h._bDisableRepositioning=true;h._$dialog.addClass('sapDialogDisableTransition');h._$dialog.addClass('sapMDialogTouched');h._oManuallySetPosition={x:n.position.x,y:n.position.y};h._$dialog.css({left:Math.min(Math.max(0,h._oManuallySetPosition.x),w-j),top:Math.min(Math.max(0,h._oManuallySetPosition.y),k-j),transform:""});}if(g(e.target)&&this.getDraggable()){$.on("mousemove.sapMDialog",function(e){if(e.buttons===0){o();return;}m(function(){h._bDisableRepositioning=true;h._oManuallySetPosition={x:e.pageX-n.offset.x,y:e.pageY-n.offset.y};h._$dialog.css({left:Math.min(Math.max(0,h._oManuallySetPosition.x),w-j),top:Math.min(Math.max(0,h._oManuallySetPosition.y),k-j),transform:""});});});}else if(r){h._$dialog.addClass('sapMDialogResizing');var s={};var p=parseInt(h._$dialog.css('min-width'),10);var u=n.x+n.width-p;h.$('cont').height('');$.on("mousemove.sapMDialog",function(e){m(function(){h._bDisableRepositioning=true;h._oManuallySetSize={width:n.width+e.pageX-n.x,height:n.height+e.pageY-n.y};if(h._bRTL){s.left=Math.min(Math.max(e.pageX,0),u);s.transform="";h._oManuallySetSize.width=n.width+n.x-Math.max(e.pageX,0);}s.width=h._oManuallySetSize.width;s.height=h._oManuallySetSize.height;h._$dialog.css(s);});});}else{return;}$.on("mouseup.sapMDialog",o);e.preventDefault();e.stopPropagation();};}return f;},true);
