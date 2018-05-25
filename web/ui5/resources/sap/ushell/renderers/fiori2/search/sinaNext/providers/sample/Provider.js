sinaDefine(['../../core/core','../../core/util','./template','../../sina/NavigationTarget'],function(c,u,t,N){"use strict";return c.defineClass({id:'sample',_initAsync:function(p){var a=this;a.template=t;a.sina=p.sina;a.NavigationTarget=N;var d=t(a);d._init(d);var r=c.Promise.resolve({capabilities:this.sina._createCapabilities({fuzzy:false})});return r;},getSuggestionList:function(a){var l=this._stringify(a);var r=new RegExp("\"valueFormatted\"\:\"([^\"/]+?)\",","g");var m=[];l.replace(r,function(){m.push(arguments[1]);});var s=m.toString().split(' ');s=s.toString().split(',');m=m.concat(s);m=m.filter(function(i,p){if(i!==''){return m.indexOf(i)==p;}});return m;},_stringify:function(o){var a=[];var s=JSON.stringify(o,function(k,v){if(typeof v==='object'&&v!==null){if(a.indexOf(v)!==-1){return;}a.push(v);}return v;});a=null;return s;},adjustImageViewing:function(){var a,b,l;try{$(".sapUshellSearchResultListItem-Image").on('mouseenter',function(){a=$(this).clone();$('body').append(a);b=($(window).height()-$(a).outerHeight())*0.33;l=($(window).width()-$(a).outerWidth())*0.33;a.css({position:"absolute",top:b+"px",left:l+"px"}).show();});$(".sapUshellSearchResultListItem-Image").on('mouseleave',function(){a.remove();});}catch(e){}},applyFilters:function(a,s){var b=[];if(!s.filter.rootCondition.conditions.length>0||!s.filter.rootCondition.conditions[0].conditions.length>0){return a;}var d=[];var e=[];for(var g=0;g<s.filter.rootCondition.conditions.length;g++){var f=s.filter.rootCondition.conditions[g].conditions;for(var h=0;h<f.length;h++){d.push([f[h].attribute,f[h].value]);e.push(f[h].attribute);}}var l=false;for(var i=0;i<a.length;i++){var o=a[i];var q=[];for(var j=0;j<d.length;j++){l=false;for(var k=0;k<o.detailAttributes.length;k++){var r=o.detailAttributes[k];if(r.id===d[j][0]&&r.value===d[j][1]){l=true;}}for(var m=0;m<o.titleAttributes.length;m++){var v=o.titleAttributes[m];if(v.id===d[j][0]&&v.value===d[j][1]){l=true;}}d[j][2]=l;q.push(l);}if(q.toString().match(/false/)===null){b.push(o);}else{var w=[];var x=e.filter(function(o,z){return e.indexOf(o)==z;});for(var n=0;n<x.length;n++){l=false;var y=x[n];for(var p=0;p<d.length;p++){if(d[p][0]===y&&d[p][2]===true){l=true;break;}}w.push(l);}if(w.toString().match(/false/)===null){b.push(o);}}}return b;},adjustHighlights:function(a,s){var n=[];var b="";for(var i=0;i<a.length;i++){var d=a[i];var e=true;b="";d.titleHighlighted=this.addHighlight(d.title,s);if(d.titleHighlighted!==d.title){e=false;}for(var j=0;j<d.detailAttributes.length;j++){var f=d.detailAttributes[j];b=f.metadata.type;if(b==="String"||b==="Longtext"||b==="Integer"){f.valueHighlighted=this.addHighlight(f.valueFormatted,s);if(f.valueHighlighted!==f.valueFormatted){e=false;}}}for(var k=0;k<d.titleAttributes.length;k++){var g=d.titleAttributes[k];b=g.metadata.type;if(b==="String"||b==="Longtext"||b==="Integer"){g.valueHighlighted=this.addHighlight(g.valueFormatted,s);if(g.valueHighlighted!==g.valueFormatted){e=false;}}}if(e===false||s==="*"){n.push(d);}}return n;},addHighlight:function(h,s){if(typeof h!='string'||typeof s!='string'){return h;}var p=h.toLowerCase().indexOf(s.toLowerCase());if(p>-1){var a=p+s.length;var n=h.substring(0,p)+'<b>'+h.substring(p,a)+'</b>'+h.substring(a);return n;}else{return h;}},augmentDetailAttributes:function(r){for(var i=0;i<r.length;i++){var a=r[i].detailAttributes;for(var j=0;j<a.length;j++){var b=a[j];b=u.addPotentialNavTargetsToAttribute(this.sina,b);}}return r;},executeSearchQuery:function(s){var a=this;a.searchQuery=s;return new c.Promise(function(r,b){var d,e,f;var i=t(a);var g=i.searchResultSetItemArray;g=a.augmentDetailAttributes(g);var h=i.searchResultSetItemArray2;h=a.augmentDetailAttributes(h);var j=g.concat(h);a.searchQuery=s;e=s.filter.searchTerm;f=s.filter.dataSource.id;var k=a.generateFacets(s);var l;if(f==="Scientists"){l=a.adjustHighlights(g,e);l=a.applyFilters(l,s);d=a.sina._createSearchResultSet({items:l,facets:k,type:"",query:s,title:"",totalCount:l.length});}else if(f==="Mysterious_Sightings"){l=a.adjustHighlights(h,e);l=a.applyFilters(l,s);d=a.sina._createSearchResultSet({items:l,facets:k,type:"",query:s,title:"",totalCount:l.length});}else if(f==="All"){l=a.adjustHighlights(g,e);l=a.applyFilters(l,s);var m=l.length;l=a.adjustHighlights(h,e);l=a.applyFilters(l,s);var n=l.length;k[0].items[0].measureValue=m;k[0].items[0].measureValueFormatted=''+m;k[0].items[1].measureValue=n;k[0].items[1].measureValueFormatted=''+n;l=a.adjustHighlights(j,e);l=a.applyFilters(l,s);d=a.sina._createSearchResultSet({items:l,facets:k,type:"",query:s,title:"",totalCount:l.length});}r(d);});},executeSuggestionQuery:function(q){var a=this;var b=q.filter.searchTerm;this.template(this);var d=this.template(this);var e=d.searchResultSetItemArray.concat(d.searchResultSetItemArray2);var f=this.getSuggestionList(e);var g=f.filter(function(s){var j=new RegExp("^"+b,"gi");return s.match(j)});if(g.length===0){g=f;}var h=[];var S=function(j){var k=a.sina.SuggestionCalculationMode.Data;var l=q.filter.clone();l.setSearchTerm(j);return a.sina._createSearchTermSuggestion({searchTerm:j,calculationMode:k,filter:l,label:j});};for(var i=0;i<g.length;i++){h.push(new S(g[i]))}var r=this.sina._createSuggestionResultSet({title:'Suggestions',query:q,items:h});return new c.Promise(function(j,k){j(r);});},executeChartQuery:function(q){var a=this.generateFacets(q);var w=1;if(q.dimension==="LOCATION"){w=0;}return new c.Promise(function(r,b){r(a[w]);});},generateFacets:function(s){var a=this;if(s.filter.dataSource.id==="All"){var d=s.filter.sina.allDataSource;var b=[a.sina._createDataSourceResultSetItem({dataSource:s.filter.sina.dataSources[1],dimensionValueFormatted:d.labelPlural,measureValue:4,measureValueFormatted:'4'}),a.sina._createDataSourceResultSetItem({dataSource:s.filter.sina.dataSources[2],dimensionValueFormatted:d.labelPlural,measureValue:5,measureValueFormatted:'5'})];var e=[a.sina._createDataSourceResultSet({title:s.filter.dataSource.label,titleHighlighted:s.filter.dataSource.label,items:b,query:s})];return e;}else{var f=[];var g=this.template(this);var h=a.sina.createFilter({searchTerm:a.searchQuery.filter.searchTerm,dataSource:a.searchQuery.filter.dataSource,rootCondition:a.searchQuery.filter.rootCondition.clone()});var l=[];var m,n,i,j,k,o;var r=g.searchResultSetItemArray;if(s.filter.dataSource.id==="Mysterious_Sightings"){r=g.searchResultSetItemArray2;}var p;var q=[];for(i=0;i<r.length;i++){o=r[i].detailAttributes;for(j=0;j<o.length;j++){if(o[j].id==="LOCATION"){p=o[j].value;if(q.indexOf(p)===-1){q.push(p);m=a.sina._createChartResultSetItem({filterCondition:a.sina.createSimpleCondition({attribute:"LOCATION",operator:a.sina.ComparisonOperator.Equals,value:p}),dimensionValueFormatted:p,measureValue:1,measureValueFormatted:'1',dataSource:a.searchQuery.filter.dataSource});l.push(m);}else{for(k=0;k<l.length;k++){if(l[k].filterCondition.value===p){l[k].measureValue=l[k].measureValue+1;l[k].measureValueFormatted=''+l[k].measureValue;}}}}}}n=a.sina._createChartResultSet({items:l,query:a.sina.createChartQuery({filter:h,dimension:"LOCATION"}),title:"Locations",type:''});f.push(n);var v;var w=[];l=[];for(i=0;i<r.length;i++){o=r[i].titleAttributes;if(s.filter.dataSource.id==="Mysterious_Sightings"){o=r[i].detailAttributes;}for(j=0;j<o.length;j++){if(o[j].id==="SCIENTIST"){v=o[j].value;if(w.indexOf(v)===-1){w.push(v);m=a.sina._createChartResultSetItem({filterCondition:a.sina.createSimpleCondition({attribute:"SCIENTIST",operator:a.sina.ComparisonOperator.Equals,value:v}),dimensionValueFormatted:v,measureValue:1,measureValueFormatted:'1',dataSource:a.searchQuery.filter.dataSource});l.push(m);}else{for(k=0;k<l.length;k++){if(l[k].filterCondition.value===v){l[k].measureValue=l[k].measureValue+1;l[k].measureValueFormatted=''+l[k].measureValue;}}}}}}n=a.sina._createChartResultSet({items:l,query:a.sina.createChartQuery({filter:h,dimension:"SCIENTIST"}),title:"Scientists",type:''});f.push(n);return f;}}});});