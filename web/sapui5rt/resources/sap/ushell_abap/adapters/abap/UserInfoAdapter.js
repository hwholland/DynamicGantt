(function(){"use strict";jQuery.sap.declare("sap.ushell_abap.adapters.abap.UserInfoAdapter");jQuery.sap.require("sap.ui2.srvc.ODataWrapper");jQuery.sap.require("sap.ui2.srvc.ODataService");var d;sap.ushell_abap.adapters.abap.UserInfoAdapter=function(){this._updateODataObjectBasedOnDatatype=function(v,D){if(jQuery.type(v)==="string"){D.value=v.toString();D.dataType="Edm.String";}if(jQuery.type(v)==="boolean"){D.value=v.toString();D.dataType="Edm.Boolean";}return D;};this.getThemeList=function(){var D=new jQuery.Deferred(),u="/sap/opu/odata/UI2/INTEROP/Themes";OData.read({requestUri:u},function(o,r){var i,t=[];for(i=0;i<o.results.length;i=i+1){t.push(o.results[i]);}D.resolve({options:t});},function(e){jQuery.sap.log.error(e.message,null,"sap.ushell_abap.adapters.abap.UserInfoAdapter");D.reject(e.message);});return D.promise();};this._createWrapper=function(b){return sap.ui2.srvc.createODataWrapper(b,false,function(e){});};this.updateUserPreferences=function(u){var t=this,D,r,U,o,a,s=function(){o-=1;if(o===0){D.resolve();}},f=function(e){D.reject(e);};d=this._createWrapper("/sap/opu/odata/UI2/INTEROP/");D=new jQuery.Deferred();d.openBatchQueue();U=u.getChangedProperties()||[];o=U.length;U.forEach(function(b){r="UserProfileProperties("+["id='"+b.name+"'","shellType='FLP')"].join(",");a={id:b.name,shellType:"FLP",value:b.newValue};t._updateODataObjectBasedOnDatatype(b.newValue,a);d.put(r,a,s,f);});d.submitBatchQueue(function(){if(o===0){D.resolve();}},f);return D.promise();};};}());
