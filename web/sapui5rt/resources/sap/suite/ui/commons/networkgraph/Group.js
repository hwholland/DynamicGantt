sap.ui.define(["jquery.sap.global","./ElementBase","sap/ui/core/IconPool"],function(q,E,I){var H=32;var S={COLLAPSED_HEIGHT:32,COLLAPSED_WIDTH:160,ROUNDING:6};var i=I.getIconInfo("collapse"),s=I.getIconInfo("expand"),a=I.getIconInfo("menu");i=i&&i.content;s=s&&s.content;a=a&&a.content;var r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var G=E.extend("sap.suite.ui.commons.networkgraph.Group",{metadata:{library:"sap.suite.ui.commons",properties:{key:{type:"string",group:"Misc",defaultValue:null},collapsed:{type:"boolean",group:"Misc",defaultValue:false}},events:{collapseExpand:{},showDetail:{},press:{}}}});G.prototype.aProcessRequiredProperties=["key"];G.BUTTONS={MENU:"menu",COLLAPSE:"collapse"};G.prototype.init=function(){this._iWidth=S.COLLAPSED_WIDTH;this._iHeight=S.COLLAPSED_HEIGHT;this._oActionButtons={};this._clearChildren();this._bIsHidden=false;};G.prototype._afterRendering=function(){this._setupEvents();this._correctTitle("sapSuiteUiCommonsNetworkGroupTitle");if(!this._isVisible()){this.$().hide();}};G.prototype._render=function(o){var F=4;var g="",x=this.getX(),y=this.getY(),c=o||{};if(this._isIgnored()||this._isEmpty()||!this.getVisible()){return"";}if(this.getParent()._isLayered()){var b=c.mapRender?this.getId()+"_map":this.getId();g+=this._renderControl("g",{id:b,xindex:c.xIndex||0,nodeid:this.getKey(),"class":this._getGroupClass()},false);g+=this._renderControl("rect",{x:x,y:y,rx:S.ROUNDING,ry:S.ROUNDING,"class":"sapSuiteUiCommonsNetworkGroupWrapper",style:this._getColorStyle({stroke:E.ColorType.Border}),width:this._iWidth,height:this._iHeight});if(this.getCollapsed()){g+=this._renderControl("rect",{id:this.getId()+"-header",style:this._getColorStyle({fill:E.ColorType.Background,stroke:E.ColorType.Border}),x:x,y:y,width:this._iWidth,height:H,"class":"sapSuiteUiCommonsNetworkGroupHeader"});}else{g+=this._renderRoundRect({id:this.getId()+"-header",x:x,y:y,width:this._iWidth,style:this._getColorStyle({fill:E.ColorType.Background,stroke:E.ColorType.Border}),height:H,"class":"sapSuiteUiCommonsNetworkGroupHeader",topRight:S.ROUNDING,topLeft:S.ROUNDING});}g+=this._renderControl("rect",{id:this.getId()+"-focusheader",x:x+F,style:this._getColorStyle({stroke:E.ColorType.Focus}),y:y+F,width:this._iWidth-F*2,height:H-F*2,"class":"sapSuiteUiCommonsNetworkGroupFocus"});g+=this._prepareRenderTitle();g+=this._renderHeaderButtons();g+="</g>";}return g;};G.prototype._prepareRenderTitle=function(){var B=65,T=H/2,O=6,x=this.getX(),y=this.getY(),t=this._iWidth-O-B,b=this.getParent()._bIsRtl;var h="";if(this.getTitle()){h+=this._renderClipPath({id:this.getId()+"-title-clip",x:b?x+B+O:x+O,y:y,width:t});h+=this._renderTitle({style:this._getColorStyle({fill:E.ColorType.Content}),"class":"sapSuiteUiCommonsNetworkGroupTitle",x:b?x+this._iWidth-O:x+O,y:y+T,maxWidth:t,title:this.getTitle()});}return h;};G.prototype._renderHeaderButtons=function(){var F=2;var g="",b=32,L=0.5,l=0,c=this.getParent()._bIsRtl;var C=function(t,d,e,T,B){var x=c?this.getX()+l:this.getX()+this._iWidth-b-l,y=this.getY()+L;g+="<g><title>"+t+"</title>";g+=this._renderRoundRect({id:this.getId()+"-"+e,x:x,y:y,width:b-L,height:b-L*2,"class":"sapSuiteUiCommonsNetworkGroupHeaderActionIconWrapper",topRight:T,bottomRight:B});g+=this._renderControl("rect",{x:x+F,y:y+F,width:b-L-F*2,height:b-L*2-F*2,"class":"sapSuiteUiCommonsNetworkActionButtonFocusCircle"});g+=this._renderText({attributes:{style:this._getColorStyle({fill:E.ColorType.Content}),x:c?this.getX()+b/2+l:this.getX()+this._iWidth-b/2-l,y:this.getY()+b/2,"class":"sapSuiteUiCommonsNetworkGroupHeaderActionIcon sapSuiteUiCommonsNetworkGraphIcon"},text:d,height:b/2-2});g+="</g>";l+=b;}.bind(this);C(r.getText("NETWORK_GRAPH_EXPAND_COLLAPSE"),this.getCollapsed()?s:i,"collapse",S.ROUNDING,this.getCollapsed()?S.ROUNDING:0);C(r.getText("NETWORK_GRAPH_GROUP_DETAIL"),a,"menu");return g;};G.prototype._getGroupClass=function(){return"sapSuiteUiCommonsNetworkGroup "+this._getStatusClass()+(this.getCollapsed()?"sapSuiteUiCommonsNetworkGroupCollapsed":"sapSuiteUiCommonsNetworkGroupExpanded");};G.prototype.getChildNodes=function(){this._checkForProcessData();return this.aChildren;};G.prototype.getChildLines=function(){this._checkForProcessData();return this.aLines;};G.prototype.getParentNodes=function(){this._checkForProcessData();return this.aParents;};G.prototype.getParentLines=function(){this._checkForProcessData();return this.aParentLines;};G.prototype.getNodes=function(){this._checkForProcessData();return this.aNodes;};G.prototype.isHidden=function(){return this._bIsHidden;};G.prototype._clearChildren=function(){this.aNodes=[];this.aLines=[];this.aChildren=[];this.aParentLines=[];this.aParents=[];};G.prototype._hideShow=function(c){this.$()[c?"hide":"show"]();this._bIsHidden=c;};G.prototype._setButtonFocus=function($,f){var F=f?"addClass":"removeClass";$[F]("sapSuiteUiCommonsNetworkElementFocus");};G.prototype._setMenuButtonFocus=function(f){this._setButtonFocus(q(this._oActionButtons.menu),f);};G.prototype._setCollapseButtonFocus=function(f){this._setButtonFocus(q(this._oActionButtons.collapse),f);};G.prototype._setupEvents=function(){var $=this.$("menu"),b=this.$("header"),c=this.$("collapse"),d=this.$().find(".sapSuiteUiCommonsNetworkGroupHeaderActionIconWrapper");this._oActionButtons.menu=$.parent()[0];this._oActionButtons.collapse=c.parent()[0];$.click(function(e){this._setMenuButtonFocus(true);var f=this.fireEvent("showDetail",{},true);if(f){this._openDetail();}if(this.getParent()){this.getParent().setFocus({item:this,button:G.BUTTONS.MENU});}}.bind(this));c.click(function(e){this._collapse();if(this.getParent()){this.getParent().setFocus({item:this,button:G.BUTTONS.COLLAPSE});}}.bind(this));b.click(function(e){if(this.getParent()){this.getParent().setFocus({item:this});}this.firePress();}.bind(this));d.mouseover(function(e){var f=q(e.currentTarget);f.css("fill",this._getColor(E.ColorType.HoverBackground));f.parent().find("text").css("fill",this._getColor(E.ColorType.HoverContent));f.css("stroke",this._getColor(E.ColorType.HoverBorder));}.bind(this));d.mouseout(function(e){var f=q(e.currentTarget);f.css("fill","");f.parent().find("text").css("fill",this._getColor(E.ColorType.Content));f.css("stroke","");}.bind(this));};G.prototype._collapse=function(){this.getParent()._selectElementAfterScroll=this;this.fireEvent("collapseExpand",{},true);this.setCollapsed(!this.getCollapsed());};G.prototype._openDetail=function(){var $=this.$("menu");this.getParent()._tooltip.openDetail({item:this,opener:$[0]});};G.prototype._isEmpty=function(){return this.aNodes.length===0;};G.prototype._isIgnored=function(){if(!this._useInLayout()){return true;}return!this.aNodes.some(function(n){return n._useInLayout();});};G.prototype._isVisible=function(){return this.aNodes.some(function(n){return!n.isHidden();});};G.prototype._resetSize=function(){if(this.getCollapsed()){this._iHeight=S.COLLAPSED_HEIGHT;this._iWidth=S.COLLAPSED_WIDTH;}};G.prototype._getAccessibilityLabel=function(){return r.getText("NETWORK_GRAPH_GROUP")+" "+this.getTitle();};G.prototype.setX=function(x){this.fX=x;return this;};G.prototype.getX=function(){return this.fX;};G.prototype.setY=function(y){this.fY=y;return this;};G.prototype.getY=function(){return this.fY;};G.prototype.setCollapsed=function(c){if(c!==this.getCollapsed()){var p=this.getParent(),b=[];this.setProperty("collapsed",c,true);if(c){this.getNodes().forEach(function(n){if(n.getSelected()){n.setSelected(false);b.push(n);}});this.getChildLines().forEach(function(l){if(l.getSelected()&&l._isInCollapsedGroup()){l.setSelected(false);b.push(l);}});if(p){p.fireSelectionChange({items:b});}}if(p){p.invalidate();}}return this;};return G;});