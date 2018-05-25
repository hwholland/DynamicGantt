/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2018 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.uiext.inbox.InboxUtils");jQuery.sap.require("sap.ui.model.odata.Filter");jQuery.sap.require("sap.uiext.inbox.InboxConstants");
sap.uiext.inbox.InboxUtils=function(){throw new Error();};
sap.uiext.inbox.InboxUtils._getCategoryFilter=function(v){return new sap.ui.model.Filter("TaskDefinitionData/Category",sap.ui.model.FilterOperator.EQ,v);};
sap.uiext.inbox.InboxUtils._getStatusFilters=function(v){return new sap.ui.model.Filter("Status",sap.ui.model.FilterOperator.EQ,v);};
sap.uiext.inbox.InboxUtils._getPriorityFilters=function(v){return new sap.ui.model.Filter("Priority",sap.ui.model.FilterOperator.EQ,v);};
sap.uiext.inbox.InboxUtils._getDueDateFilters=function(v){var f=new Date(0);var a=undefined;switch(v){case"Today":a=this._getFormattedDueDateTimeOff(1);break;case"Next_7_days":a=this._getFormattedDueDateTimeOff(7);break;case"Next_15_days":a=this._getFormattedDueDateTimeOff(15);break;case"Next_30_days":a=this._getFormattedDueDateTimeOff(30);break;case"No_Due_Date":return new sap.ui.model.Filter("CompletionDeadLine",sap.ui.model.FilterOperator.EQ,null);}return new sap.ui.model.odata.Filter("CompletionDeadLine",[{operator:sap.ui.model.FilterOperator.LE,value1:a.toUTCString()},{operator:sap.ui.model.FilterOperator.GE,value1:f.toUTCString()}],true);};
sap.uiext.inbox.InboxUtils._getDateTimeFilters=function(v){var f=undefined;switch(v){case"Today":f=this._getFormattedDateTimeOff(0,false);break;case"Last_7_days":f=this._getFormattedDateTimeOff(7,false);break;case"Last_15_days":f=this._getFormattedDateTimeOff(15,false);break;case"Last_30_days":f=this._getFormattedDateTimeOff(30,false);break;}return new sap.ui.model.Filter("CreatedOn",sap.ui.model.FilterOperator.GE,f.toUTCString());};
sap.uiext.inbox.InboxUtils._getFormattedDueDateTimeOff=function(s){var m=new Date();m.setDate(m.getDate()+s);m.setMinutes(0);m.setHours(0);m.setSeconds(0);return m;};
sap.uiext.inbox.InboxUtils._getFormattedDateTimeOff=function(s,i){var m=new Date();m.setDate(m.getDate()-s);if(!i){m.setMinutes(0);m.setHours(0);m.setSeconds(0);}return m;};
sap.uiext.inbox.InboxUtils.inArray=function(k,m){var a=-1;jQuery.each(m,function(i,b){if(b[k]===k){a=i;return false;}});return a;};
sap.uiext.inbox.InboxUtils._dateFormat=function(d){if(d!=undefined&&typeof(d)=='string'&&d!=""){var a;if(d.indexOf('Date')!=-1){a=new Date();a.setTime(d.substring((d.indexOf("(")+1),d.indexOf(")")));}else{a=new Date(d.substring((d.indexOf("'")+1),d.length-1));}d=a;}if(d!=undefined&&d!=""){var i=sap.ui.core.format.DateFormat.getDateInstance({style:"medium"});return i.format(d);}return"";};
sap.uiext.inbox.InboxUtils.scrub=function(d){d=decodeURIComponent(d);d=d.replace(/[-:.\/]/g,"");d=d.replace(/-/g,"--");d=d.replace(/\s+/g,"-");if(!(/^([A-Za-z_][-A-Za-z0-9_.:]*)$/.test(d))){if(/^[^A-Za-z_]/.test(d)){d=d.replace(/^[^A-Za-z_]/,"_");}d.replace(/[^-\w_.:]/g,"_");}return d;};
sap.uiext.inbox.InboxUtils.setCookieValue=function(c,v,e){var E="";if(e&&e>0){var o=new Date();o.setTime(o.getTime()+(3600*1000*24*365*e));E="expires="+o.toGMTString();}document.cookie=c+"="+escape(v)+"; "+E;};
sap.uiext.inbox.InboxUtils.getCookieValue=function(c){var i,x,y,C=document.cookie.split(";");for(i=0;i<C.length;i++){x=C[i].substr(0,C[i].indexOf("="));y=C[i].substr(C[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==(c)){return unescape(y);}}};
sap.uiext.inbox.InboxUtils.deleteCookie=function(c){var d=new Date();document.cookie=c+"="+";expires=Thu, 01-Jan-1970 00:00:01 GMT";};
sap.uiext.inbox.InboxUtils.reselectRowsinTable=function(r,t){var m=r[0];for(var i=0;i<r.length;i++){t.addSelectionInterval(r[i],r[i]);m=Math.min(r[i],m);}if(m){var f=Math.floor(m/10)*10;t.setFirstVisibleRow(f);}};
sap.uiext.inbox.InboxUtils.deSelectOtherActionButtonsinStreamView=function(t){var T=t.getParent().getParent();if(T){var p=T.getCells();var n=p.length;for(var i=0;i<n;i++){var a=p[i].getContent()[0];if(a&&a!==t&&a instanceof sap.ui.commons.ToggleButton){if(a.getVisible()&&a.getPressed()){a.setPressed(false);a.firePress(false);}}}}};
sap.uiext.inbox.InboxUtils._getDefaultFilter=function(){return new sap.ui.model.Filter("Status",sap.ui.model.FilterOperator.NE,'COMPLETED');};
sap.uiext.inbox.InboxUtils._hasFilter=function(f,p,o,v,V){var F=false;if(f&&f.length>0){jQuery.each(f,function(j,a){if(a.sPath===p&&a.sOperator===o&&a.oValue1===v&&a.oValue2===V){F=true;return false;}});}return F;};
sap.uiext.inbox.InboxUtils.tooltipFormatForDateTime=function(d){if(d!=undefined&&typeof(d)=='string'&&d!=""){var a;if(d.indexOf('Date')!=-1){a=new Date();a.setTime(d.substring((d.indexOf("(")+1),d.indexOf(")")));}else{a=new Date(d.substring((d.indexOf("'")+1),d.length-1));}d=a;}if(d!=undefined&&d!=""){var i=sap.ui.core.format.DateFormat.getDateTimeInstance({style:"full"});return i.format(d);}return"";};
sap.uiext.inbox.InboxUtils.dateTimeFormat=function(d,s){if(d!=undefined&&typeof(d)=='string'&&d!=""){var a;if(d.indexOf('Date')!=-1){a=new Date();a.setTime(d.substring((d.indexOf("(")+1),d.indexOf(")")));}else{a=new Date(d.substring((d.indexOf("'")+1),d.length-1));}d=a;}if(d!=undefined&&d!=""){var i=sap.ui.core.format.DateFormat.getDateInstance({style:"medium"});var b=sap.ui.core.format.DateFormat.getTimeInstance({style:"short"});if(s&&s===true)return i.format(d);else return i.format(d)+" "+b.format(d);}return"";};
sap.uiext.inbox.InboxUtils._isOverDue=function(v){if(v===undefined||v===null||v==="")return false;var n=new Date().getTime();var o;if(typeof(v)==='string'){var c=v.substring(v.indexOf("(")+1,v.indexOf(")")-1);o=(parseInt(c)-n)<0?true:false;}else{o=(v.getTime()-n)<0?true:false;}return o;};
sap.uiext.inbox.InboxUtils.getUserMediaResourceURL=function(b,s,u){return b+"/"+sap.uiext.inbox.InboxConstants.UserInfoCollection+"("+sap.uiext.inbox.InboxConstants.sapOrigin+"='"+s+"',UniqueName='"+u+"')/$value";};
sap.uiext.inbox.InboxUtils._getUniqueArray=function(l){function a(A,b){var r=[];var i,j;var c=A.length;var d=b.length;for(i=0;i<c;i++){for(j=0;j<d;j++){if(A[i]===b[j]){r.push(A[i]);}}}return r;}if(l.length==0)return[];else if(l.length==1)return l[0];var I=l[0];for(var i=1;i<l.length;i++){I=a(I,l[i]);}return I;};
sap.uiext.inbox.InboxUtils._getFileTypeIcon=function(f){var i;switch(f){case"text/plain":i="attachment-text-file";break;case"image/jpeg":case"image/png":case"image/gif":case"image/x-icon":i="attachment-photo";break;case"application/pdf":i="pdf-attachment";break;case"application/mspowerpoint":case"application/vnd.ms-powerpoint":case"application/powerpoint":case"application/x-mspowerpoint":i="ppt-attachment";break;case"application/excel":case"application/x-excel":case"application/x-msexcel":case"application/vnd.ms-excel":i="excel-attachment";break;case"application/msword":i="doc-attachment";break;case"application/zip":i="attachment-zip-file";break;default:i="document";}return sap.ui.core.IconPool.getIconURI(i);};
sap.uiext.inbox.InboxUtils._getFileSize=function(b){if(b){var s=['Bytes','KB','MB','GB','TB'];if(b==0)return'0 Byte';var i=parseInt(Math.floor(Math.log(b)/Math.log(1024)));var S;if(i>1){S=(b/Math.pow(1024,i)).toFixed(2);}else{S=Math.round(b/Math.pow(1024,i),2);}var a=S.toString()+' '+s[i];return a;}};
sap.uiext.inbox.InboxUtils.appendThemingParameters=function(w,t){var u=new URI(w);var W=u.search();u.search((!W?"?":(W+"&"))+t.replace(/^(\?|&)/,''));return u.toString();};
sap.uiext.inbox.InboxUtils.calculateLengthofAssociativeArray=function(a){var l=0,k;for(k in a){if(a.hasOwnProperty(k))l++;}return l;};
sap.uiext.inbox.InboxUtils.getErrorMessageFromODataErrorObject=function(e){var m="";var b="";if(e.hasOwnProperty("response")){try{b=JSON.parse(e.response.body)}catch(a){m=a.name+" : "+a.message;console.log(a.stack);return m;}m=b.error.message.value+"\n";}return m;}
