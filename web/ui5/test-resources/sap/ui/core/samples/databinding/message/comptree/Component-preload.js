sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/samples/databinding/message/comptree/Component.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"jquery.sap.global\",\"sap/m/Button\",\"sap/m/DateTimeInput\",\"sap/m/Input\",\"sap/m/Label\",\"sap/m/RadioButton\",\"sap/m/Select\",\"sap/ui/core/Item\",\"sap/ui/core/Title\",\"sap/ui/core/UIComponent\",\"sap/ui/core/message/Message\",\"sap/ui/layout/GridData\",\"sap/ui/layout/form/Form\",\"sap/ui/layout/form/FormContainer\",\"sap/ui/layout/form/FormElement\",\"sap/ui/layout/form/ResponsiveGridLayout\",\"sap/ui/model/type/Date\",\"sap/ui/model/type/Integer\",\"sap/ui/model/type/String\"],function(e,t,a,s,n,o,r,i,l,p,u,d,m,g,c,w,y,f,M){\"use strict\";var b=p.extend(\"messages.disabled.Component\",{metadata:{version:\"1.0\",handleValidation:!1,dependencies:{version:\"1.8\",libs:[\"sap.ui.core\"]},properties:{}}});return b.prototype.createContent=function(){var e=new y,p=new M(null,{maxLength:5}),b=new f,v=new w,x=new m({models:oModel,objectBindings:{path:\"/form\"},tooltip:\"Form tooltip\",editable:!0,layout:v,formContainers:[new g({title:\"Component: Contact Data - validation disabled\",formElements:[new c({label:\"Name\",fields:[new s({value:\"{surname}\"})]}),new c({label:\"First name\",fields:[new s({value:\"{name}\"})]}),new c({label:\"Date of birth\",fields:[new a({value:{path:\"birthdate\",type:e}})]}),new c({label:\"Gender\",fields:[new o({text:\"male\",selected:!0,groupName:\"MyTest\"}),new o({text:\"female\",selected:!1,groupName:\"MyTest\"})]})]}),new g({title:new l({text:\"Address\",tooltip:\"Title tooltip\"}),formElements:[new c({label:new n({text:\"Street\"}),fields:[new s({value:\"{street}\"}),new s({value:{path:\"streetnr\",type:b},layoutData:new d({span:\"L2 M2 S2\"})})]}),new c({label:\"City\",fields:[new s({value:\"{city}\"})]}),new c({label:new n({text:\"Post code\"}),fields:[new s({value:{path:\"zip\",type:p},layoutData:new d({span:\"L2 M2 S2\"})})]}),new c({label:\"Country\",fields:[new r({selectedKey:\"{country}\",items:[new i({key:\"DE\",text:\"Germany\"}),new i({key:\"US\",text:\"USA\"}),new i({key:\"UK\",text:\"England\"})]})]})]})]});new t({text:\"add Warning\",press:function(){sap.ui.getCore().getMessageManager().addMessages(new u({message:\"Invalid order of characters in this name!\",type:sap.ui.core.MessageType.Warning,target:\"/form/name\",processor:oModel}))}}),new t({text:\"add Info\",press:function(){sap.ui.getCore().getMessageManager().addMessages(new u({message:\"Nice last name!\",type:sap.ui.core.MessageType.Information,processor:oModel}))}}),new t({text:\"add Success\",press:function(){sap.ui.getCore().getMessageManager().addMessages(new u({message:\"City sucessfully updated\",type:sap.ui.core.MessageType.Success,target:\"/form/city\",processor:oModel}))}}),new t({text:\"add Success for ZIP\",press:function(){sap.ui.getCore().getMessageManager().addMessages(new u({message:\"de Zip is gut!\",type:sap.ui.core.MessageType.Success,target:\"/form/zip\",processor:oModel}))}}),new t({text:\"clear Messages\",press:function(){sap.ui.getCore().getMessageManager().removeAllMessages()}});return x},b});"
}, "web/ui5/test-resources/sap/ui/core/samples/databinding/message/comptree/Component-preload");