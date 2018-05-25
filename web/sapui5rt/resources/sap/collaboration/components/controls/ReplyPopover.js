/*
* ! SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2017 SAP SE. All rights reserved
*/
jQuery.sap.declare("sap.collaboration.components.controls.ReplyPopover");jQuery.sap.require("sap.collaboration.components.utils.LanguageBundle");jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("sap.collaboration.components.resources.css.SocialProfile",".css"));jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("sap.collaboration.components.resources.css.ReplyPopover",".css"));sap.ui.core.Control.extend("sap.collaboration.components.controls.ReplyPopover",{metadata:{library:"sap.collaboration",events:{postReplyPress:{parameters:{value:{type:"string"}}},moreRepliesPress:{},afterClose:{},},aggregations:{socialTextArea:{type:"sap.collaboration.components.controls.SocialTextArea",multiple:false},}},});
sap.collaboration.components.controls.ReplyPopover.prototype.init=function(){this._oLangBundle=new sap.collaboration.components.utils.LanguageBundle();this._oJSONModelData=[];this._oJSONModel=new sap.ui.model.json.JSONModel(this._oJSONModelData);this._oControlToReceiveFocus;this._oSocialProfileView;this._oReplyApp;this._oReplyPage;this._oReplyTextArea;this._oReplyList;this._oReplyButton;this._oReplyHeaderBar;this._oReplyPopover=this._oReplyPopover||this._createReplyPopover();};
sap.collaboration.components.controls.ReplyPopover.prototype.exit=function(){if(this._oReplyPopover){this._oReplyPopover.destroy();}};
sap.collaboration.components.controls.ReplyPopover.prototype.addReply=function(r){if(!jQuery.isEmptyObject(r)){if(r.Text){r.Text=this._replaceCarriageReturnWithBRTag(r.Text);}this._oJSONModelData.push(r);this._oJSONModel.setData(this._oJSONModelData,true);}else{this._oReplyTextArea.focus();}};
sap.collaboration.components.controls.ReplyPopover.prototype.addReplies=function(r){var R=r&&r.data;if(R&&R.length!==0){var a=this._oReplyList.getItems().length;var b=R.length;for(var i=0;i<R.length;i++){if(R[i].Text){R[i].Text=this._replaceCarriageReturnWithBRTag(R[i].Text);R[i].Text="\u200E"+R[i].Text+"\u200E";}}this._oJSONModelData=R.concat(this._oJSONModelData);this._oJSONModel.setData(this._oJSONModelData,true);if(a!==0){this._oControlToReceiveFocus=this._oReplyList.getItems()[b];}if(r.more){this._oShowMoreBar.setVisible(true);}else{this._oShowMoreBar.setVisible(false);}}};
sap.collaboration.components.controls.ReplyPopover.prototype.openBy=function(o){if(!this._oReplyTextArea){this._oReplyTextArea=this.getSocialTextArea();this._oReplyTextArea.addStyleClass("replyTextAreaToBottom").addStyleClass("replyTextArea");this._oControlToReceiveFocus=this._oReplyTextArea;this._oReplyPage.addContent(this._oShowMoreBar).addContent(this._addList()).addContent(this._oReplyTextArea);this._oReplyPopover.setInitialFocus(this._oReplyTextArea);}this._oReplyPopover.openBy(o);return this;};
sap.collaboration.components.controls.ReplyPopover.prototype.setBusyIndicatorDelay=function(d){this._oReplyPage.setBusyIndicatorDelay(d);return this;};
sap.collaboration.components.controls.ReplyPopover.prototype.setBusy=function(b){this._oReplyPage.setBusy(b);return this;};
sap.collaboration.components.controls.ReplyPopover.prototype.getTextArea=function(){return this._oReplyTextArea;};
sap.collaboration.components.controls.ReplyPopover.prototype._createReplyPopover=function(){var r=new sap.m.ResponsivePopover({showHeader:false,placement:sap.m.PlacementType.Vertical,contentWidth:"25rem",contentHeight:"455px",content:this._addApp(),afterClose:[function(){this._oReplyApp.backToTop();this._oReplyList.destroyItems();this._oJSONModelData=[];this._oJSONModel.setData(this._oJSONModelData);this._oShowMoreBar.setVisible(false);this._oControlToReceiveFocus=this._oReplyTextArea;this.fireAfterClose();},this]});return r;};
sap.collaboration.components.controls.ReplyPopover.prototype._addList=function(){var t=this;var r=new sap.m.FeedListItem({text:"{Text}",icon:"{Creator/ThumbnailImage}",sender:"{Creator/FullName}",timestamp:"{CreatedAt}",iconActive:false,senderPress:function(e){var R=e.getSource().getBindingContext().getObject();var m=R.Creator.Email;t._oSocialProfileView.getViewData().memberId=m;t._oSocialProfileView.rerender();t._oReplyApp.to(t._oSocialProfilePage);}}).addStyleClass("replyFeedListItem");if(!this._oReplyList){this._oReplyList=new sap.m.List({width:"100%",items:[],noDataText:this._oLangBundle.getText("ST_REPLY_LIST_AREA"),showNoData:true,showSeparators:sap.m.ListSeparators.None,updateFinished:function(e){var l=t._oReplyList.getItems().length;if(l!==0&&t._oControlToReceiveFocus===t._oReplyTextArea){t._oReplyList.getItems()[l-1].focus();}if(t._oReplyList.getItems().length===0){t._oReplyTextArea.addStyleClass("replyTextAreaToBottom");t._oReplyTextArea._oPop.setOffsetX(0);}else{var R=jQuery(t._oReplyList.getDomRef()).height();var i=jQuery(t._oReplyPopover.getDomRef("cont")).height();var a=jQuery(t._oReplyPage.getCustomHeader().getDomRef()).height();var b=parseInt(t._oReplyTextArea.getHeight());var c=jQuery(t._oReplyPage.getFooter().getDomRef()).height();if(R>(i-a-b-c)){t._oReplyTextArea.removeStyleClass("replyTextAreaToBottom");t._oReplyTextArea._oPop.setOffsetX(9);}else{t._oReplyTextArea.addStyleClass("replyTextAreaToBottom");t._oReplyTextArea._oPop.setOffsetX(0);}}t._oControlToReceiveFocus.focus();}});}this._oReplyList.setModel(this._oJSONModel);this._oReplyList.bindItems({path:"/",template:r});return this._oReplyList;},sap.collaboration.components.controls.ReplyPopover.prototype._addSocialProfile=function(){var t=this;this._oSocialProfileView=new sap.ui.view({viewData:{langBundle:this._oLangBundle,popoverPrefix:this.getId(),afterUserInfoRetrieved:function(u){if(u){t._sUserProfileURL=u.WebURL;}}},type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.collaboration.components.socialprofile.SocialProfile"});return this._oSocialProfileView;},sap.collaboration.components.controls.ReplyPopover.prototype.enableButton=function(e){this._oReplyButton.setEnabled(e);};
sap.collaboration.components.controls.ReplyPopover.prototype._addApp=function(){var t=this;if(this._oReplyApp){return this._oReplyApp;}this._oReplyButton=new sap.m.Button({text:this._oLangBundle.getText("ST_REPLY_POST"),enabled:false,press:this._postReply.bind(t)});this._oShowMoreLink=new sap.m.Link({text:this._oLangBundle.getText("ST_SHOW_MORE_REPLIES"),press:this._showMoreReplies.bind(t)});this._oShowMoreBar=new sap.m.Bar({contentMiddle:[this._oShowMoreLink],visible:false}).addStyleClass("showMoreReplies");this._oReplyPage=new sap.m.Page({showHeader:true,showSubHeader:false,showFooter:true,customHeader:new sap.m.Bar({contentMiddle:[new sap.m.Label({text:this._oLangBundle.getText("ST_REPLY_TITLE")})]}),footer:new sap.m.Bar({contentRight:[this._createMentionButton(),this._oReplyButton]}),});this._oSocialProfileButton=new sap.m.Button({text:this._oLangBundle.getText("SP_OPEN_JAM_BUTTON"),press:function(){window.open(t._sUserProfileURL,"_blank");}});this._oSocialProfilePage=new sap.m.Page({title:this._oLangBundle.getText("SP_TITLE"),showNavButton:true,showHeader:true,showSubHeader:false,showFooter:true,navButtonPress:function(e){t._oReplyApp.back();},footer:new sap.m.Bar({contentRight:[this._oSocialProfileButton]}),content:[this._addSocialProfile()]});this._oReplyApp=new sap.m.App({backgroundColor:"#ffffff",pages:[this._oReplyPage,this._oSocialProfilePage]});return this._oReplyApp;};
sap.collaboration.components.controls.ReplyPopover.prototype._createMentionButton=function(){if(sap.ui.Device.system.phone){return;}var m=new sap.m.Button({text:"@",tooltip:this._oLangBundle.getText("ST_MENTION_TOOLTIP"),press:[function(){this._oReplyTextArea.atMentionsButtonPressed();},this]});return m;};
sap.collaboration.components.controls.ReplyPopover.prototype._replaceCarriageReturnWithBRTag=function(t){var f;if(typeof t==="string"){f=t.replace(/[\n\r]/g,'<br>');}return f;};
sap.collaboration.components.controls.ReplyPopover.prototype._postReply=function(){var v=this._oReplyTextArea.convertTextWithFullNamesToEmailAliases();this.firePostReplyPress({value:v});this._oControlToReceiveFocus=this._oReplyTextArea;};
sap.collaboration.components.controls.ReplyPopover.prototype._showMoreReplies=function(){this.fireMoreRepliesPress();};
