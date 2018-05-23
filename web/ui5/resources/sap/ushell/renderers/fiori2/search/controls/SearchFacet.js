(function(){"use strict";jQuery.sap.require('sap.m.List');jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.SearchFacetItem");sap.m.List.extend('sap.ushell.renderers.fiori2.search.controls.SearchFacet',{metadata:{properties:{eshRole:{type:"string",defaultValue:"datasource"}}},init:function(){this.data("sap-ui-fastnavgroup","false",true);},constructor:function(i,o){var t=this;o=jQuery.extend({},{mode:sap.m.ListMode.SingleSelectMaster,showSeparators:sap.m.ListSeparators.None,includeItemInSelection:true,selectionChange:function(e){if(this.getEshRole()==="attribute"){this.handleItemPress(e);}},itemPress:function(e){if(this.getEshRole()==="datasource"){this.handleItemPress(e);}}},o);sap.m.List.prototype.constructor.apply(this,[i,o]);this.addStyleClass('sapUshellSearchFacet');this.addEventDelegate({onAfterRendering:function(e){if(t.getEshRole()==="datasource"){jQuery(t.getDomRef()).append("<hr>");}}});},handleItemPress:function(e){var l=e.mParameters.listItem;var s=l.getBindingContext().getObject();if(l.getSelected()){this.getModel().addFilterCondition(s.filterCondition);}else{this.getModel().removeFilterCondition(s.filterCondition);}},renderer:'sap.m.ListRenderer',setEshRole:function(r){var t=this;var i={path:"items",template:new sap.ushell.renderers.fiori2.search.controls.SearchFacetItem(),groupHeaderFactory:function(g){var a=new sap.m.GroupHeaderListItem({title:g.key,upperCase:false});if(t.getModel().config.charts){a.setVisible(false);}return a;}};switch(r.toLowerCase()){default:case"datasource":this.setMode(sap.m.ListMode.SingleSelectMaster);this.setHeaderText(sap.ushell.resources.i18n.getText("searchIn"));break;case"attribute":this.setMode(sap.m.ListMode.MultiSelect);this.setHeaderText("");i.sorter=new sap.ui.model.Sorter("facetTitle",false,false);break;}this.bindAggregation("items",i);this.setProperty("eshRole",r);return this;},setModel:function(){return sap.m.List.prototype.setModel.apply(this,arguments);}});})();
