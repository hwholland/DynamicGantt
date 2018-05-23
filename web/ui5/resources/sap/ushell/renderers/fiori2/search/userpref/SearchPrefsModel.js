(function(){"use strict";jQuery.sap.require('sap.ui.model.json.JSONModel');jQuery.sap.require("sap.ushell.renderers.fiori2.search.SearchModel");jQuery.sap.require('sap.ushell.renderers.fiori2.search.SearchConfiguration');var S=sap.ushell.renderers.fiori2.search.SearchConfiguration;var p='sap.ushell.renderers.fiori2.search.userpref.SearchPrefsModel';sap.ui.model.json.JSONModel.extend(p,{constructor:function(a){var t=this;sap.ui.model.json.JSONModel.prototype.constructor.apply(t,[]);t.sina=sap.ushell.Container.getService("Search").getSina();t.config=new S();this.reset();},personalizationPolicyOptOut:'Opt-Out',personalizationPolicyOptIn:'Opt-In',personalizationPolicyEnforced:'Enforced',personalizationPolicyDisabled:'Disabled',personalizationPolicies:['Opt-Out','Opt-In','Enforced','Disabled'],isSearchPrefsActive:function(){var t=this;var a=$.Deferred();var s=sap.ushell.renderers.fiori2.search.getModelSingleton();s.initBusinessObjSearch().then(function(){if(!t.config.searchBusinessObjects||!t.config.enableSearch||!s.isBusinessObjSearchEnabled()){a.fail(false);return;}t.sina.getSystem().getServerInfo().then(function(b){b=b.rawServerInfo;for(var i=0;i<b.Services.length;++i){var c=b.Services[i];if(c.Service==='PersonalizedSearch'){a.resolve(true);return;}}a.fail(false);return;},function(){a.fail(false);});});return a;},reset:function(){this.initializedDeferred=null;this.setData({searchPrefsActive:false,sessionUserActive:false,personalizationPolicy:'Enforced'});},asyncInit:function(){var t=this;if(t.initializedDeferred){return t.initializedDeferred;}t.initializedDeferred=t.isSearchPrefsActive().then(function(i){t.setProperty('/searchPrefsActive',i);if(!i){return jQuery.when(true);}return t.loadPreferences();});return t.initializedDeferred;},loadPreferences:function(){var t=this;t.searchConfiguration=t.sina.getSearchConfiguration();return t.searchConfiguration.load().then(function(c){var s=c.Data.PersonalizedSearch.SessionUserActive;t.setProperty('/sessionUserActive',s);var a=c.Data.PersonalizedSearch.PersonalizationPolicy;if(t.personalizationPolicies.indexOf(a)<0){a=this.personalizationPolicyDisabled;}t.setProperty('/personalizationPolicy',a);});},savePreferences:function(){var a=this.getProperty('/personalizationPolicy');var s=this.getProperty('/searchPrefsActive');if(!s||a===this.personalizationPolicyEnforced||a===this.personalizationPolicyDisabled){return jQuery.when(true);}var t=this;var d={"SearchConfiguration":{"Action":"Update","Data":{"PersonalizedSearch":{"SessionUserActive":t.getProperty('/sessionUserActive')}}}};return t.searchConfiguration.save(d);},resetProfile:function(){return this.sina.emptyUserHistory();}});})();