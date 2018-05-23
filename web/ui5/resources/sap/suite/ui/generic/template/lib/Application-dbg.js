sap.ui.define(["sap/ui/base/Object", "sap/ui/core/routing/History", "sap/ui/core/routing/HistoryDirection"], function(BaseObject, History,
	HistoryDirection) {
	"use strict";

	/* An instance of this class represents a Smart Template based application. Thus, there is a one-to-one relationship between
	 * instances of this class and instances of sap.suite.ui.generic.template.lib.AppComponent.
	 * However, this class is only used inside the sap.suite.ui.generic.template.lib package. It is not accessible to template developers
	 * or breakout developers.
	 * Instances of this class are generated in sap.suite.ui.generic.template.lib.TemplateAssembler.
	 * Note that TemplateAssembler also possesses a reference to the instance of this class which represents the app currently
	 * running.
	 * oTemplateContract: An object which is used for communication between this class and the AppComponent and its helper classes.
	 * Note that this class injects its api to these classes into the template contract object.
	 * Currently this class supports two use cases:
	 * 1. For non-draft apps it contains the information whether the app is currently in display or in edit state (methods set/getEditableNDC)
	 * 2. A 'navigation' model is supported. Thereby, we consider navigation to take place each time a route name or a route pattern is changed (but not when only the parameters added to the route are changed)
	 */
	function getMethods(oTemplateContract) {

		var oCurrentDisplay = { // an object containing information about the view currently displayed
		    // note that an attribute fnResolve will be added to this object. It contains the function that resolves the promise contained in attribute api.promise
			api: {
				promise: Promise.resolve()
			} // this object is exposed via method getCurrentDisplayObject
		};
		var oDataForNextPage = {}; // data bag that is transferred to the next page

		// this function is called as soon as the navigation to the current view is finished.
		function fnDisplayedPageReached() {
			oCurrentDisplay.fnResolve(); // resolve the promise that waits for the navigation to be finished
		}

		var oRouteParameters = {}; // parameters of the routing event for the view currently displayed. Handled by function isNewRoute.
		// this function is called when a route is matched. It returns the information whether this is a new route in the sense
		// of the navigation model realized by this class. 
		function isNewRoute(oEvent) {
			var oNewRouteParameters = oEvent.getParameters();
			if (oNewRouteParameters.name !== oRouteParameters.name) {
				oRouteParameters = oNewRouteParameters;
				return true;
			}
			var oMerged = jQuery.extend({}, oRouteParameters.arguments, oNewRouteParameters.arguments);
			for (var sId in oMerged) {
				if (!sId.startsWith("?") && oMerged[sId] !== oRouteParameters.arguments[sId]) {
					oRouteParameters = oNewRouteParameters;
					return true;
				}
			}
			return false;
		}
		
		 function getCurrentDisplayObject() {
			return oCurrentDisplay.api;
		}

		var oHistory = History.getInstance();
		var sCurrentlyDisplayed; // id of the component container currently displayed
		oTemplateContract.oApplication = { // inject own api for AppComponent into the Template Contract. Other classes (NavigationController, BusyHelper) will call these functions accordingly.
			onAfterNavigate: function(oEvent) { // called when navigation has finished
				sCurrentlyDisplayed = oEvent.getParameter("toId");
				fnDisplayedPageReached();
			},

			onBypassed: function() {
				oRouteParameters = {};
				oCurrentDisplay.api.outdated = true;
				oCurrentDisplay.api = {
					promise: Promise.reject() // prevent promises pending forever
				};
				oCurrentDisplay.fnResolve = jQuery.noop;
				oCurrentDisplay.api.promise.catch(jQuery.noop); // prevent log entries
			},
			
			onRouteMatched: function(oEvent) {
				if (!isNewRoute(oEvent)) {
					return; // ignore route changes which are not cosidered as navigation for our model
				}
				oCurrentDisplay.api.outdated = true; // mark the old object as outdated
				oCurrentDisplay.api = {// and create a new one
					isBack: oHistory.getDirection() === HistoryDirection.Backwards,
					dataFromLastPage: oDataForNextPage,
					promise: new Promise(function(fnResolve) {
						oCurrentDisplay.fnResolve = fnResolve;
					})
				};
				oDataForNextPage = {}; // create a new data bag for next page
				var sNewId = oEvent.getParameter("view").getId();
				if (!sCurrentlyDisplayed || sNewId === sCurrentlyDisplayed) { // no view navigation will take place -> page is reached
					sCurrentlyDisplayed = sNewId;
					fnDisplayedPageReached();
				}
			},
			
			getCurrentDisplayObject: getCurrentDisplayObject
		};

		var bIsEditable = false;
		return {
			setEditableNDC: function(isEditable) {
				bIsEditable = isEditable;
			},
			getEditableNDC: function() {
				return bIsEditable;
			},
			// Return an object containing information about the current page. It contains the following attributes:
				// isBack: has this view been reached via back navigation
				// dataFromLastPage: data bag containing data provided by the previous view
				// promise: a promise that is resolved as soon as the navigation to the view has been finished
				// outdated: this attribute is added (value: true) as soon as a new navigation to another view is started.
					// Note that this is the point in time getCurrentDisplayObject will already return another object.
					// Hence, only clients are affected that have stored a reference to the object returned by this function in their memory.
			getCurrentDisplayObject: getCurrentDisplayObject,
			// add data to the data bag that will be handed over to the next page. Note that this method can be called several times. 
			addDataForNextPage: function(oDataBag) {
				jQuery.extend(oDataForNextPage, oDataBag);
			},
			setBusyReason: function(){
				oTemplateContract.oBusyHelper.setBusyReason.apply(oTemplateContract.oBusyHelper, arguments);	
			}
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.lib.Application", {
		constructor: function(oTemplateContract) {
			jQuery.extend(this, getMethods(oTemplateContract));
		}
	});
});