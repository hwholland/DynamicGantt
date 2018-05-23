sap.ui.require.preload({
	"web/ui5/test-resources/sap/ushell/demoapps/UserDefaultPluginSample/Component.js": "!function(){\"use strict\";var e;function t(){return e||(e=sap.ushell.demo.__UserDefaultPluginSample__._retrieveUserDefaults()),e}jQuery.sap.declare(\"sap.ushell.demo.UserDefaultPluginSample.Component\"),jQuery.sap.require(\"sap.ui.core.Component\"),sap=sap||{},sap.ushell=sap.ushell||{},sap.ushell.demo.__UserDefaultPluginSample__=sap.ushell.demo.__UserDefaultPluginSample__||{},sap.ushell.demo.__UserDefaultPluginSample__._retrieveUserDefaults=function(){var e=new jQuery.Deferred,t={UshellSampleCompanyCode:{valueObject:{value:\"0815\"},editorMetadata:{displayText:\"Company code\",description:\"This is the company code\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:4,editorInfo:{odataURL:\"/sap/opu/odata/sap/ZFIN_USER_DEFAULTPARAMETER_SRV\",entityName:\"Defaultparameter\",propertyName:\"CompanyCode\",bindingPath:\"/Defaultparameters('FIN')\"}}},UshellSampleCostCenter:{valueObject:{value:\"1000\"},editorMetadata:{displayText:\"Cost center\",description:\"This is the cost center\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:2,editorInfo:{odataURL:\"/sap/opu/odata/sap/ZFIN_USER_DEFAULTPARAMETER_SRV\",entityName:\"Defaultparameter\",propertyName:\"CostCenter\",bindingPath:\"/Defaultparameters('FIN')\"}}},UshellSampleControllingArea:{valueObject:{value:\"0010\"},editorMetadata:{displayText:\"Controlling Area\",description:\"This is the controlling Area\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:3,editorInfo:{odataURL:\"/sap/opu/odata/sap/ZFIN_USER_DEFAULTPARAMETER_SRV\",entityName:\"Defaultparameter\",propertyName:\"ControllingArea\",bindingPath:\"/Defaultparameters('FIN')\"}}},UshellTest1:{valueObject:{value:\"InitialFromPlugin\"},editorMetadata:{displayText:\"Test Default 1\",description:\"Description of the test default 1\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:1}},UshellTest2:{valueObject:{value:void 0},editorMetadata:{displayText:\"Test Default 2 ( no value)\",description:\"Description of the test default 2\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:2}},UshellTest3:{valueObject:{},editorMetadata:{displayText:\"Test Default 3 (extended and simple value)\",description:\"Description of the test default 3\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:3}},CommunityActivity:{valueObject:{},editorMetadata:{displayText:\"Community Activity\",description:\"Describes how active you are on JAM\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:10}},FirstName:{valueObject:{},editorMetadata:{displayText:\"First Name\",description:\"Describes your first name\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:11}},LastName:{valueObject:{},editorMetadata:{displayText:\"Last Name\",description:\"Describes your last name\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:12}},ExtendedUserDefaultWithPlugin:{valueObject:{value:\"1000\",extendedValue:{Ranges:[{Sign:\"I\",Option:\"BT\",Low:\"0\",High:\"4000\"}]}},editorMetadata:{displayText:\"ExtendedUserDefaultWithPlugin\",description:\"Describes the value for ExtendedUserDefaultWithPlugin\",groupId:\"EXAMPLE-FIN-GRP1\",groupTitle:\"FIN User Defaults (UShell examples)\",parameterIndex:13}},UshellSamplePlant:{valueObject:{value:\"Plant1000\",noStore:!0,noEdit:!0},editorMetadata:{displayText:\"Plant\",description:\"This is the plant code\",groupTitle:\"UserDefaultSamplePlugin group2\",groupId:\"SamplePlugin-GRP2\",parameterIndex:1,editorInfo:{odataURL:\"/sap/opu/odata/sap/ZMM_USER_DEFAULTPARAMETER_SRV\",entityName:\"Defaultparameter\",propertyName:\"Plant\",bindingPath:\"/Defaultparameters('MM')\"}}}};return setTimeout(function(){e.resolve(jQuery.extend({},t))},0),e.promise()},sap.ui.core.Component.extend(\"sap.ushell.demo.UserDefaultPluginSample.Component\",{metadata:{version:\"@version@\"},init:function(){e=void 0,sap.ushell.Container.getService(\"UserDefaultParameters\").registerPlugin(this),this.oManagedParameters={UshellSampleCompanyCode:!0,UshellSamplePlant:!0,UshellTest1:!0,UshellTest2:!0,UshellTest3:!0,CommunityActivity:!0,UshellSampleControllingArea:!0,UshellSampleCostCenter:!0,FirstName:!0,LastName:!0,ExtendedUserDefaultWithPlugin:!0}},getUserDefault:function(e,a){var r=this,l=new jQuery.Deferred;return this.oManagedParameters.hasOwnProperty(e)?a&&void 0!==a.value?l.resolve(a).promise():(t().done(function(t){if(t.hasOwnProperty(e)){var r=t[e].valueObject;l.resolve(r)}else l.resolve(a)}).fail(function(t){jQuery.sap.log.error(\"unable to resolve parameter\"+e,r.getMetadata().getName()),l.reject(t)}),l.promise()):l.resolve(a).promise()},getEditorMetadata:function(e){var a=new jQuery.Deferred,r=this;return t().done(function(t){Object.keys(r.oManagedParameters).forEach(function(a){e.hasOwnProperty(a)&&(e[a].editorMetadata=t[a]&&t[a].editorMetadata)}),a.resolve(e)}).fail(function(e){jQuery.sap.log.error(\"Fatal error obtaining metadata for editing,\",\"sap.ushell.demo.UserDefaultPluginSample.Component \"),a.reject(e)}),a.promise()}})}();"
}, "web/ui5/test-resources/sap/ushell/demoapps/UserDefaultPluginSample/Component-preload");