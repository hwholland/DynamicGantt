sap.ui.define([],function(){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.SearchFacetsFormatter');var a=sap.ushell.renderers.fiori2.search.SearchFacetsFormatter=function(){this.init.apply(this,arguments);};jQuery.sap.declare('sap.ushell.renderers.fiori2.search.Facet');var F=sap.ushell.renderers.fiori2.search.Facet=function(){this.init.apply(this,arguments);};jQuery.sap.declare('sap.ushell.renderers.fiori2.search.FacetItem');var b=sap.ushell.renderers.fiori2.search.FacetItem=function(){this.init.apply(this,arguments);};F.prototype={init:function(p){this.title=p.title;this.facetType=p.facetType;this.dimension=p.dimension;this.dataType=p.dataType;this.matchingStrategy=p.matchingStrategy;this.items=p.items||[];this.totalCount=p.totalCount;},hasFilterCondition:function(f){for(var i=0,l=this.items.length;i<l;i++){var c=this.items[i].filterCondition||this.items[i];if(c.equals&&c.equals(f)){return true;}}return false;},hasFilterConditions:function(){for(var i=0,l=this.items.length;i<l;i++){if(this.items[i].filterCondition){return true;}}return false;},removeItem:function(f){for(var i=0,l=this.items.length;i<l;i++){var c=this.items[i].filterCondition||this.items[i];if(c.equals&&f.filterCondition&&c.equals(f.filterCondition)){return this.items.splice(i,1);}}}};b.prototype={init:function(p){p=p||{};this.selected=p.selected||false;this.level=p.level||0;this.filterCondition=p.filterCondition;this.value=p.value||"";this.label=p.label||"";this.facetTitle=p.facetTitle||"";this.facetAttribute=p.facetAttribute||"";this.valueLabel=this.value;this.advanced=p.advanced||false;this.listed=p.listed||false;},equals:function(o){return(this.facetTitle===o.facetTitle&&this.label===o.label&&this.value===o.value&&this.filterCondition.equals(o.filterCondition));},clone:function(){var n=new sap.ushell.renderers.fiori2.search.FacetItem();n.facetTitle=this.facetTitle;n.selected=this.selected;n.label=this.label;n.level=this.level;n.value=this.value;n.valueLabel=this.valueLabel;n.filterCondition=this.filterCondition.clone();return n;}};a.prototype={init:function(m){this.model=m;},_getAncestorDataSources:function(s){var r=[];var A=s.dataSourceTree.findNode(s.getProperty("/uiFilter/dataSource")).getAncestors().reverse();for(var i=0;i<A.length;i++){var d=A[i].dataSource;var c=new b({label:d.labelPlural,filterCondition:d,level:0,value:A[i].count});r.push(c);}return r;},_getSiblingDataSources:function(s,l){var S=[];var c=s.getProperty("/uiFilter/dataSource");var d=s.dataSourceTree.findNode(c);var e;if(d.parent&&!d.unsureWhetherNodeisBelowRoot){e=d.parent.getChildren();}else{e=[];}if(e.length===0){e.push(d);}for(var j=0,f=e.length;j<f;j++){var g=e[j].dataSource;var h=new b({label:g.labelPlural,value:e[j].count,filterCondition:g,selected:c===g,level:l});S.push(h);if(h.selected){S.push.apply(S,this._getChildrenDataSources(s,l+1));}}return S;},_getChildrenDataSources:function(s,l){var c=[];var d=s.getProperty("/uiFilter/dataSource");var C=s.dataSourceTree.findNode(d).getChildren();for(var j=0,e=C.length;j<e;j++){var f=C[j].dataSource;var g=new b({label:f.labelPlural,value:C[j].count,filterCondition:f,selected:false,level:l});c.push(g);}return c;},getDataSourceFacetFromTree:function(s){var d=new F({facetType:"datasource",title:"Search In"});var c=s.getProperty("/uiFilter/dataSource");var A=this._getAncestorDataSources(s);d.items.push.apply(d.items,A);var S=this._getSiblingDataSources(s,s.allDataSource===c?0:1);d.items.push.apply(d.items,S);return d;},_createFacetItemsFromConditionGroup:function(r){var f=[];for(var i=0;i<r.conditions.length;i++){var c=r.conditions[i];for(var j=0;j<c.conditions.length;j++){var d=c.conditions[j];if(d.type===this.model.sinaNext.ConditionType.Simple){f.push(new b({facetAttribute:d.attribute,label:d.valueLabel,filterCondition:d,selected:true}));}else{f.push(new b({facetAttribute:d.conditions[0].attribute,label:d.valueLabel,filterCondition:d,selected:true}));}}}return f;},getAttributeFacetsFromPerspective:function(r,s){var S=r.facets.filter(function(D){return D.type===s.sinaNext.FacetType.Chart;});var c=[];var C={};for(var i=0,l=S.length;i<l;i++){var o=S[i];var d=new F({title:o.title,facetType:'attribute',dimension:o.query.dimension,totalCount:r.totalCount});if(o.items.length===0){continue;}for(var j=0;j<o.items.length;j++){var f=o.items[j];var e=new b({facetAttribute:o.query.dimension,label:f.dimensionValueFormatted,value:f.measureValue,filterCondition:f.filterCondition});e.facetTitle=o.title;e.serverSideItem=true;d.items.push(e);}C[o.query.dimension]=d;c.push(d);}var g={};var h=this._createFacetItemsFromConditionGroup(s.getProperty("/uiFilter/rootCondition"));for(var k=0,p=h.length;k<p;k++){var q=h[k];var t=C[q.facetAttribute];if(!t){var u=q.filterCondition.attribute?q.filterCondition.attribute:q.filterCondition.conditions[0].attribute;t=new F({dimension:u,title:r.query.filter.dataSource.getAttributeMetadata(u).label,facetType:"attribute",items:[q]});C[q.facetAttribute]=t;c.splice(0,0,t);}else{var v=c.indexOf(t);if(v>0){c.splice(v,1);c.splice(0,0,t);}var w=false;for(var m=0,x=t.items.length;m<x;m++){var y=t.items[m];if(q.filterCondition.equals(y.filterCondition)){y.selected=true;w=true;if(!s.config.multiSelect){y.value=null;y.valueLabel=null;}}}if(!w){t.items.push(q);}}g[q.facetAttribute]=t;}if(!s.config.multiSelect){for(var z in g){if(g.hasOwnProperty(z)){var A=g[z];for(var n=A.items.length-1;n>=0;n--){var B=A.items[n];if(!B.selected){A.items.splice(n,1);}}}}}return this.addDataTypeToClientSideFacets(c,s);},addDataTypeToClientSideFacets:function(c,s){var d=s.getDataSource();if(d.type===s.sinaNext.DataSourceType.Category){return $.when([]);}for(var i=0;i<c.length;i++){var f=c[i];var m=d.getAttributeMetadata(f.dimension);f.dataType=m.type;}return $.when(c);},getFacets:function(d,i,s){var f=[this.getDataSourceFacetFromTree(s)];if(d===s.appDataSource||d.type===s.sinaNext.DataSourceType.Category){return $.when(f);}if(!i){return $.when(f);}var c=this.getAttributeFacetsFromPerspective(i,s);var r=c.then(function(A){if(A.length>0){f.push.apply(f,A);}return f;});return r;},getFacetItemsWithFilterConditions:function(s){return this._createFacetItemsFromConditionGroup(s.getProperty("/uiFilter/rootCondition"));},getDialogFacetsFromMetaData:function(m,s){var S=jQuery.map(m.attributeMetadataMap,function(h){return h;});var c=[];for(var i=0,l=S.length;i<l;i++){var o=S[i];if(o.usage.AdvancedSearch){var C=new F({title:o.label,facetType:"attribute",dimension:o.id,dataType:o.type,matchingStrategy:o.matchingStrategy});var f=this._createFacetItemsFromConditionGroup(s.getProperty("/uiFilter/rootCondition"));var d=0;for(var k=0,e=f.length;k<e;k++){var g=f[k];if(g.facetAttribute===C.dimension){d++;C.items.splice(0,0,g);}}C.count=d;c.push(C);}}return c;},getDialogFacetsFromChartQuery:function(r,s,i){var c=new F({dimension:s.chartQuery.dimension});if(r){for(var j=0;j<r.items.length;j++){var f=r.items[j];var d=new b({value:f.measureValue,filterCondition:f.filterCondition,label:f.dimensionValueFormatted,facetAttribute:r.query.dimension});c.items.push(d);}var e;if(i){e=this._createFacetItemsFromConditionGroup(s.getProperty("/uiFilter/rootCondition"));}else{e=s.aFilters;}for(var k=0,l=e.length;k<l;k++){var S=e[k];if(S.facetAttribute===c.dimension){var g=false;for(var m=0,h=c.items.length;m<h;m++){var n=c.items[m];if(S.filterCondition.equals(n.filterCondition)){n.selected=true;g=true;}}if(!g){c.items.splice(c.items.length,0,S);if(S.filterCondition.userDefined){S.advanced=true;}else{S.listed=true;}}else{S.listed=true;}}}}return c;}};return a;});
