// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ushell.resources");jQuery.sap.declare("sap.ushell.ui.launchpad.PlusTileRenderer");sap.ushell.ui.launchpad.PlusTileRenderer={};var t=sap.ushell.resources.i18n;sap.ushell.ui.launchpad.PlusTileRenderer.render=function(r,c){r.write("<li");r.writeAttribute("tabindex","-1");r.writeControlData(c);r.addClass("sapUshellTile");r.addClass("sapUshellPlusTile");r.writeClasses();r.writeAccessibilityState(c,{label:t.getText("TilePlus_label")});r.write(">");r.renderControl(c.oIcon);r.write("</li>");};}());
