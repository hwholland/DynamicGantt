sinaDefine(['../core/core','./Suggestion','./SuggestionType'],function(c,S,a){return S.derive({type:a.SearchTerm,_meta:{properties:{searchTerm:{required:true},filter:{required:true},childSuggestions:{required:false,default:function(){return[];}}}},});});