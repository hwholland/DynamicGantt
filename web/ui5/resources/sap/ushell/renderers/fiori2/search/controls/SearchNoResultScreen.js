(function(){"use strict";jQuery.sap.require("sap.ui.core.format.NumberFormat");sap.ui.core.Control.extend("sap.ushell.renderers.fiori2.search.controls.SearchNoResultScreen",{metadata:{properties:{searchBoxTerm:"string"}},renderer:function(r,c){var e=$('<div>').text(c.getSearchBoxTerm()).html();r.write('<div class="sapUshellSearch-no-result"');r.writeControlData(c);r.write('>');r.write('<div class="sapUshellSearch-no-result-icon">');r.writeIcon(sap.ui.core.IconPool.getIconURI("travel-request"));r.write('</div><div class="sapUshellSearch-no-result-text">');r.write('<div class="sapUshellSearch-no-result-info">'+sap.ushell.resources.i18n.getText("no_results_info").replace('&1',e)+'</div>');r.write('<div class="sapUshellSearch-no-result-tips">'+sap.ushell.resources.i18n.getText("no_results_tips")+'</div> ');r.write('</div></div>');}});})();
