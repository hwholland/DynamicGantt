/*!
 * ${copyright}
 */
sap.ui.define(['jquery.sap.global','sap/m/Button','sap/ui/core/IconPool','sap/ushell/library','./ShellNavigationMenu'],function(q,B,I){"use strict";var S=B.extend("sap.ushell.ui.shell.ShellAppTitle",{metadata:{properties:{text:{type:"string",group:"Misc",defaultValue:null},tooltip:{type:"string",group:"Misc",defaultValue:null}},associations:{navigationMenu:{type:"sap.ushell.ui.shell.ShellNavigationMenu"}},events:{press:{}}},renderer:{render:function(r,c){var n=c.getNavigationMenu();var t=c.getText();var v=false;if(n){var N=sap.ui.getCore().byId(n);v=N?N.getItems()&&N.getItems().length>0:false;c.bIconVisible=v;}r.write('<div tabindex="0" ');r.writeControlData(c);r.addClass("sapUshellShellAppTitleContainer sapUshellAppTitle");if(v){r.addClass("sapUshellAppTitleClickable");}r.writeAttributeEscaped("aria-label",t);r.writeClasses();r.write(">");if(v){r.write("<div ");r.addClass("sapUshellShellHeadAction");r.writeClasses();r.write("><span class='sapUshellShellHeadActionImg sapUshellShellAppTitleHeadActionImg'>");r.renderControl(c.oIcon);r.write("</span>");r.write("</div>");}r.write('<span class="sapUshellHeadTitle" >');if(t){r.writeEscaped(t);}r.write("</span>");r.write("</div>");}}});S.prototype.init=function(){if(B.prototype.init){B.prototype.init.apply(this,arguments);}this.oIcon=I.createControlByURI(sap.ui.core.IconPool.getIconURI("slim-arrow-down"));this.oIcon.addStyleClass("sapUshellAppTitleMenuIcon");};S.prototype.onclick=function(E){if(!this.bIconVisible){return;}if(!this.oPopover){this.oPopover=new sap.m.Popover("sapUshellAppTitlePopover",{showArrow:false,placement:sap.m.PlacementType.Bottom}).addStyleClass("sapUshellAppTitleNavigationMenuPopover");this.bAppTitleClick=false;var n=sap.ui.getCore().byId(this.getNavigationMenu());this.oPopover.addContent(n);this.oPopover.attachBeforeOpen(function(){n._beforeOpen();});this.oPopover.attachAfterOpen(function(){this.oPopover.$().on("touchmove.scrollFix",function(e){e.stopPropagation();});n._afterOpen();}.bind(this));this.oPopover.attachBeforeClose(function(e){if(document.activeElement.id===this.getId()){this.bAppTitleClick=true;}}.bind(this));}if(!this.bAppTitleClick){this.oPopover.openBy(this.oIcon);this.firePress();}else{this.bAppTitleClick=false;}};S.prototype.close=function(){if(this.oPopover&&this.oPopover.isOpen()){this.oPopover.close();}};S.prototype.setTooltip=function(t){this.oIcon.setTooltip(t);};S.prototype.onsapspace=S.prototype.onclick;S.prototype.exit=function(){var n=sap.ui.getCore().byId(this.getNavigationMenu());if(n){n.destroy();}if(this.oPopover){this.oPopover.destroy();}};return S;},true);