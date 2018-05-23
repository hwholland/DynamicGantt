/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

// ------------------------------------------------------------------------------------------------------------
// Provides class sap.suite.ui.template.lib.NavigationController to handle navigation/routing related tasks
// ------------------------------------------------------------------------------------------------------------
sap.ui.define([
	"sap/ui/base/Object", "sap/ui/core/ComponentContainer", "sap/ui/core/routing/HashChanger", "sap/ui/core/routing/History",
	"sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/MessageBox", "sap/m/MessagePage", "sap/m/Link"
], function(BaseObject, ComponentContainer, HashChanger, History, Filter, FilterOperator, MessageBox, MessagePage, Link) {
	"use strict";

	function getMethods(oComponent, oTemplateContract, oNavigationController) {

		function fnTruncateHash(sHash, sMatch, iDelta) {
			var iIndex;
			if (sHash && sMatch) {
				if (isNaN(iDelta)) {
					iDelta = 0;
				}
				iIndex = sHash.indexOf(sMatch);
				if (iIndex > -1) {
					sHash = sHash.substring(0, iIndex - iDelta);
				}
			}
			return sHash;
		}

		function fnNavigateToContext(oTargetContext, sNavigationProperty, bReplace) {
			var sHash = oNavigationController.oRouter.oHashChanger.getHash(),
				sPath;

			if (oTargetContext) {
				// get the navigation path from binding context
				sPath = oNavigationController._getNavigationPath(oTargetContext, sNavigationProperty);
				// Store the context path and use it in _handleNavigation, so no data retrieval is done!
				oNavigationController._oTargetContextPath = oTargetContext.getPath();
			} else {
				sPath = sNavigationProperty;
			}
			if (sPath) {
				if (sNavigationProperty) {
					// add a leading "/" is none exists
					if (sNavigationProperty.indexOf("/") < 0) {
						sNavigationProperty = "/" + sNavigationProperty;
					}
					// hash contains EntitySet(Key)/NavProp() -> only EntitySet(Key) is required
					sHash = fnTruncateHash(sHash, sNavigationProperty);
					// get hash path until "?"
					sHash = fnTruncateHash(sHash, "?");

					// just concatenate current hash with selected path e.g. Root(Key) + / + NavProp(Key)
					if (sHash) {
						sPath = sHash + "/" + sPath;
					}
				}
				// navigate to context
				oNavigationController._navigate(sPath, bReplace);
			}
		}

		/**
		 * Navigates to the message page and shows the specified content.
		 *
		 * @public
		 * @param {Object} mParameters - The parameters for message page
		 */
		function fnNavigateToMessagePage(mParameters) {
			var sEntitySet, sTitle, bReplaceURL, sText, oEntitySet, oEntityType, oHeaderInfo, sIcon = null,
				oMetaModel;
			if (mParameters) {
				sEntitySet = mParameters.entitySet;
				sTitle = mParameters.title;
				sText = mParameters.text;
				sIcon = mParameters.icon;
				bReplaceURL = mParameters.replaceURL;
			}

			if (sEntitySet) {
				oMetaModel = oNavigationController.oComponent.getModel().getMetaModel();
				if (oMetaModel) {
					oEntitySet = oMetaModel.getODataEntitySet(sEntitySet);
					oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
					oHeaderInfo = oEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"];
				}
				if (oHeaderInfo && oHeaderInfo.TypeImageUrl && oHeaderInfo.TypeImageUrl.String) {
					sIcon = oHeaderInfo.TypeImageUrl.String;
				}
			}
			if (oNavigationController.oMessagePage) {
				oNavigationController.oMessagePage.destroy();
			}
			oNavigationController.oMessagePage = new MessagePage({
				title: sTitle,
				text: sText,
				icon: sIcon,
				customDescription: new Link({
					text: oTemplateContract.getText("ST_GENERIC_RETURN_TO_MAIN"),
					press: oNavigationController.navigateBack.bind(oNavigationController, bReplaceURL)
				})
			});

			oTemplateContract.oNavContainer.addPage(this.oMessagePage);
			oTemplateContract.oNavContainer.to(this.oMessagePage);
		}

		return {
			/**
			 * Navigates to the specified context.
			 *
			 * @public
			 * @param {Object} oTargetContext - The context to navigate to (or null - e.g. when the navigationProperty should be appended to the current path)
			 * @param {string} sNavigationProperty - The navigation property
			 * @param {boolean} bReplace If this is true the navigation/hash will be replaced
			 */
			navigateToContext: fnNavigateToContext,
		/**
		 * Navigates to the message page and shows the specified content.
		 *
		 * @public
		 * @param {Object} mParameters - The parameters for message page
		 */
		 navigateToMessagePage: fnNavigateToMessagePage
		};
	}

	/*
	 * Handles all navigation and routing-related tasks for the application.
	 *
	 * @class The NavigationController class creates and initializes a new navigation controller with the given
	 *        {@link sap.suite.ui.generic.template.lib.AppComponent AppComponent}.
	 * @param {sap.suite.ui.generic.template.lib.AppComponent} oComponent The AppComponent instance
	 * @public
	 * @extends sap.ui.base.Object
	 * @version 1.38.16
	 * @since 1.30.0
	 * @alias sap.suite.ui.generic.template.lib.NavigationController
	 */
	var NavigationController = BaseObject.extend("sap.suite.ui.generic.template.lib.NavigationController", {
		metadata: {
			library: "sap.suite.ui.generic.template"
		},
		constructor: function(oComponent, oTemplateContract) {
			if (!oComponent || !oComponent.getRouter()) {
				throw "No component with router passed";
			}
			// inherit from base object.
			BaseObject.apply(this, arguments);
			this.oRouter = oComponent.getRouter();
			this.oViews = {};
			this.oComponent = oComponent;
			this._oTemplateContract = oTemplateContract;
			this._sNavigationTargetId = this._oTemplateContract.oNavContainer.getId();

			this.oRouter.attachRouteMatched(this._handleRouteMatched, this);
			this.oRouter.attachBypassed(this._handleBypassed, this);

			// TODO: this has to be clarified and fixed
			this.oRouter._oViews._getViewWithGlobalId = function(oView) {
				// Test only
				if (!this.oViews[oView.viewName]) {
					var oRoute = this.oRouter.getRoute(oView.viewName);
					if (oRoute && oRoute._oConfig) {
						this.oViews[oView.viewName] = this._createComponentInstance(oRoute._oConfig);
					} else {
						this.oViews[oView.viewName] = sap.ui.view({
							viewName: oView.viewName,
							type: oView.type,
							height: "100%"
						});
					}
				}
				return this.oViews[oView.viewName];
			}.bind(this);
			this._oHashChanger = HashChanger.getInstance();
			this._generateRoutingMetadata();
			this._initialise();
			jQuery.extend(this, getMethods(oComponent, oTemplateContract, this));
		}
	});

	NavigationController._sChanges = "Changes";

	/**
	 * Initialises the necessary info
	 *
	 * @private
	 */
	NavigationController.prototype._initialise = function() {
		var oData;
		oData = this.oComponent.getComponentData();
		if (oData) {
			this._oStartupParameters = oData.startupParameters;
		}
		// check if there entitySet and startup parameters are present and no hash exists!
		if (this._sEntitySet && this._oStartupParameters && !this._oHashChanger.getHash()) {
			this._processStartupParameters();
		} else {
			this._initialiseRouting();
		}
	};

	/**
	 * checks the startup parameters for triggering navigation
	 *
	 * @private
	 */
	NavigationController.prototype._processStartupParameters = function() {
		var oModel, oNavigationController = this, bCreateWithContext;
		// wait for the ODataMetaModel to be loaded
		oModel = this.oComponent.getModel();
		oModel.getMetaModel().loaded().then(function() {

			var oEntitySet, oEntityType, fCheckKeys, bCheckKeys, aSemanticKey, sHash;
			fCheckKeys = function(aKeys, mParams) {
				var i, iLength, bSuccess = false,
					oKey, sKeyProperty;
				if (mParams && aKeys) {
					iLength = aKeys.length;
					for (i = 0; i < iLength; i++) {
						// assume key handling shall be successful
						bSuccess = true;
						oKey = aKeys[i];
						// Keys are located either at name (resource/entity key) or PropertyPath (SemanticKey annotation)
						sKeyProperty = oKey.name || oKey.PropertyPath;
						if (!mParams[sKeyProperty] || mParams[sKeyProperty].length > 1) {
							// if no key params or multiple key params are present set unsuccessful and break
							bSuccess = false;
							break;
						}
					}
				}
				return bSuccess;
			};

			//Create with context
			if (this._oStartupParameters && this._oStartupParameters.createWithContext && this._oStartupParameters.createWithContext == "true") {
				oEntitySet = oModel.getMetaModel().getODataEntitySet(this._sEntitySet);
				if (oEntitySet['com.sap.vocabularies.Common.v1.DraftRoot'] && oEntitySet['com.sap.vocabularies.Common.v1.DraftRoot'].NewAction) {
					var oFunctionImport = oModel.getMetaModel().getODataFunctionImport(oEntitySet['com.sap.vocabularies.Common.v1.DraftRoot'].NewAction.String.split("/")[1]);
					var oUrlParameters = {};
					bCreateWithContext = true;

					if (oFunctionImport && oFunctionImport.parameter) {
						for (var i = 0; i < oFunctionImport.parameter.length; i++) {
							if (oFunctionImport.parameter[i].mode == "In" && this._oStartupParameters[oFunctionImport.parameter[i].name]) {
								oUrlParameters[oFunctionImport.parameter[i].name] = this._oStartupParameters[oFunctionImport.parameter[i].name];
							}
						}

						// TODO: use Smart Templates busy indicator
						sap.ui.core.BusyIndicator.show();

						oModel.callFunction("/" + oFunctionImport.name, {
							success: function (oData, oResponse) {
								oNavigationController._initialiseRouting();
								sap.ui.core.BusyIndicator.hide();
								var oModelUtil = new sap.ui.generic.app.util.ModelUtil(oModel);
								var oContext = oModelUtil.getContextFromResponse(oData);
								if (oContext) {
									oNavigationController.navigateToContext(oContext, null, true);
								} else {
									oNavigationController.navigateToMessagePage({
										title: oNavigationController._oTemplateContract.getText("ST_GENERIC_UNKNOWN_NAVIGATION_TARGET"),
										replaceURL: true
									});
								}
							},
							error: function (oError) {
								sap.ui.core.BusyIndicator.hide();
								oNavigationController.navigateToMessagePage({
									title: oNavigationController._oTemplateContract.getText("ST_GENERIC_UNKNOWN_NAVIGATION_TARGET"),
									replaceURL: true
								});
							},
							method: "POST",
							urlParameters: oUrlParameters
						});
					} else {
						this.navigateToMessagePage({
							title: oNavigationController._oTemplateContract.getText("ST_GENERIC_UNKNOWN_NAVIGATION_TARGET"),
							replaceURL: true
						});
					}
				}
			}

			if (!bCreateWithContext) {
				//check: only if the page exists a navigation is allowed
				if (this._sEntitySet && this.oRouter.getRoute(this._sEntitySet)) {
					oEntitySet = oModel.getMetaModel().getODataEntitySet(this._sEntitySet);
					if (oEntitySet) {
						oEntityType = oModel.getMetaModel().getODataEntityType(oEntitySet.entityType);
					}
					if (oEntityType) {
						bCheckKeys = fCheckKeys(oEntityType.key.propertyRef, this._oStartupParameters);
					}

					if (bCheckKeys) {
						// if entity key check passes, a full technical key can be
						// created
						sHash = oModel.createKey(this._sEntitySet, this._oStartupParameters);
						if (sHash) {
							this._oHashChanger.replaceHash(sHash);
						}
					} else {
						// get the semantic key annotation
						aSemanticKey = oEntityType["com.sap.vocabularies.Common.v1.SemanticKey"];
						bCheckKeys = fCheckKeys(aSemanticKey, this._oStartupParameters);

						if (bCheckKeys) {
							this._readObject(aSemanticKey, this._oStartupParameters, oModel);
							// read will trigger the initialisation as needed
							return;
						}
					}
				}
				this._initialiseRouting();
			}
		}.bind(this));
	};

	/**
	 * Creates necessary routing info and initialises the Router
	 *
	 * @private
	 */
	NavigationController.prototype._initialiseRouting = function() {
		var sHash;
		this._oHistory = new History(this._oHashChanger);
		if (!this._oHashChanger.getHash()) {
			sHash = "";
			// no route is set yet, check if start entity was passed via parameter
			if (this._oStartupParameters && this._oStartupParameters.route && this._oStartupParameters.route.length === 1) {
				sHash = this._oStartupParameters.route[0];
				this._oHashChanger.replaceHash(sHash);
			}
		}
		this.oRouter.initialize();
	};



	NavigationController.prototype._preprocessForComplexTable = function(aPages) {
		for (var iPage in aPages) {
			var oPage = aPages[iPage];
			if (oPage && oPage.component && oPage.component.settings && oPage.component.settings.sections) {
				for (var iSection in oPage.component.settings.sections ) {
					var oSection = oPage.component.settings.sections[iSection];
					if (oSection.tableMode === "ComplexTable") {
						oPage = this._generateRouteForComplexTable(oPage, iSection);
					}
				}
			}
			if (oPage && oPage.pages) {
				oPage.pages = this._preprocessForComplexTable(oPage.pages);
			}
			aPages[iPage] = oPage;
		}
		return aPages;
	};

	NavigationController.prototype._generateRouteForComplexTable = function(oPage, iSection) {
	// TODO: can sNavProp and sEntitySet be retrieved based on Faced ID -> Annotation Path -> ... AT PREPROCESSING TIME?
		/*
		var oModel = this.oComponent.getModel();
		var oMetaModel = oModel.getMetaModel();
		*/
		var oSection = oPage.component.settings.sections[iSection];
		var sNavProp = oSection.navigationProperty;
		var sEntitySet = oSection.entitySet;
		var sGridTable = oPage.component.settings.gridTable;
		var sSmartVariantManagement = true; //always set to true
		var oSubPage;
		if (oPage.pages) {
			oSubPage = this._getApplicableSubPage(oPage.pages, sNavProp, sEntitySet);
		}

		var oNewPage = {
				"navigationProperty": sNavProp,
				"entitySet": sEntitySet,
				"component": {
					"name": "sap.suite.ui.generic.template.ListReport",
					"list": true,
					"settings" : {
						"gridTable" : sGridTable,
						//"multiSelect" : true, // TODO handle multi select also via RTA?
						"complexListId": iSection,
						"smartVariantManagement": sSmartVariantManagement
					}
				},
				"pages": [ oSubPage ]
			};
		if (!oPage.pages) {
			oPage.pages = [];
		}
		oPage.pages.push(oNewPage);
		return oPage;
	};

	NavigationController.prototype._getApplicableSubPage = function(aPages, sNavProp, sEntitySet) {
		for (var iPage in aPages) {
			var oPage = aPages[iPage];
			if (oPage.navigationProperty === sNavProp && oPage.entitySet === sEntitySet) {
				return oPage;
			}
		}
	};



	/**
	 * Creates necessary routing metadata from configuration and adds it to the Router
	 *
	 * @private
	 */
	NavigationController.prototype._generateRoutingMetadata = function() {
		var oConfig = this.oComponent.getConfig(),
			oTopRouteConfig, oTopRoute;
		if (!oConfig.pages || !oConfig.pages.length || oConfig.pages.length === 0) {
			throw new Error("Route Configuration missing");
		} else if (oConfig.pages.length > 1) {
			throw new Error("Currently only one Top route supported");
		} else {
			// preprocess route configuration
			oConfig.pages = this._preprocessForComplexTable(oConfig.pages);
			// create Top-Route
			// currently only one top route supported
			oTopRouteConfig = oConfig.pages[0];

			// Store the top route's entitySet, since it could be used later
			this._sEntitySet = oTopRouteConfig.entitySet;

			oTopRoute = this._createRoute(oTopRouteConfig, "root", 0);
			this.oRouter.addRoute(oTopRoute);

			this._createQueryRoute(oTopRoute);

			this._createChildRoutes(oTopRouteConfig, 0, null);
		}
	};

	/**
	 * Creates child route from the specified route configuration
	 *
	 * @private
	 * @param {Object} oRoute - the route configuration
	 * @param {Number} iLevel - the level
	 * @param {Object} oParent - the parent route (if any)
	 */
	NavigationController.prototype._createChildRoutes = function(oRoute, iLevel, oParent) {
		var i, iLen;
		if (oRoute.pages) {
			iLen = oRoute.pages.length;
			for (i = 0; i < iLen; i++) {
				this._createRoutes(oRoute.pages[i], (iLevel + 1), oParent);
			}
		}
	};

	/**
	 * Creates all necessary route(s) metadata from configuration and adds it to the Router instance
	 *
	 * @private
	 * @param {Object} oRoute - the route configuration
	 * @param {Number} iLevel - the level
	 * @param {Object} oParent - the parent route (if any)
	 */
	NavigationController.prototype._createRoutes = function(oRoute, iLevel, oParent) {
		if (oRoute.component){ //in case of intent there is no internal route to be created
			var oNewRoute = this._createRoute(oRoute, oRoute.component.list ? "aggregation" : "detail", iLevel, oParent);
			this.oRouter.addRoute(oNewRoute);
			this._createQueryRoute(oNewRoute);
			this._createChildRoutes(oRoute, iLevel, oNewRoute);
		}
	};

	/**
	 * Creates a Query route from the specified route and adds it to the router
	 *
	 * @private
	 * @param {Object} oRoute - the route configuration
	 */
	NavigationController.prototype._createQueryRoute = function(oRoute) {
		var oQueryRoute = jQuery.extend({}, oRoute);
		oQueryRoute.name = oRoute.name + "query";
		oQueryRoute.pattern = oRoute.pattern + "{?query}";
		this.oRouter.addRoute(oQueryRoute);
	};

	/**
	 * Creates and returns a route metadata from configuration
	 *
	 * @private
	 * @param {Object} oRoute - the route configuration
	 * @param {string} sOperation - the operation for which the route has to be created
	 * @param {Number} iLevel - the level
	 * @param {Object} oParentRoute - the parent route (if any)
	 * @returns {Object} the created route metadata
	 */
	NavigationController.prototype._createRoute = function(oRoute, sOperation, iLevel, oParentRoute) {
		var sPathPattern, oNewRoute;
		sPathPattern = oRoute.navigationProperty || oRoute.entitySet;

		oNewRoute = jQuery.extend({}, oRoute);
		oNewRoute.path = "/" + oRoute.entitySet;
		oNewRoute.operation = sOperation;
		oNewRoute.viewLevel = iLevel;
		// TODO: use only component name here?
		oNewRoute.template = oRoute.component ? (oRoute.component.name || oRoute.component) : oRoute.template;

		switch (sOperation) {
			case "root":
				oNewRoute.name = 'root';
				oNewRoute.pattern = '';
				break;
			case "aggregation":
				oNewRoute.name = sPathPattern + "~aggregation";
				oNewRoute.pattern = sPathPattern;
				break;
			default:
				oNewRoute.name = sPathPattern;
				oNewRoute.pattern = sPathPattern + "({keys" + iLevel + "})";
				break;
		}

		if (oParentRoute) {
			oNewRoute.name = oParentRoute.name + "/" + oNewRoute.name;
			oNewRoute.pattern = oParentRoute.pattern + "/" + oNewRoute.pattern;
			oNewRoute.parentEntitySet = oParentRoute.entitySet;
		}
		oNewRoute.view = oNewRoute.name; // TODO: simplify this
		oNewRoute.controlId = this._sNavigationTargetId;
		oNewRoute.controlAggregation = "pages";
		return oNewRoute;
	};

	/**
	 * Creates a new ComponentContainer with template from routing configuration
	 *
	 * @private
	 * @param {Object} oRouteConfig - the route configuration
	 * @returns {sap.ui.core.ComponentContainer} instance of the component container
	 */
	NavigationController.prototype._createComponentInstance = function(oRouteConfig) {
		var sTemplate, sEntitySet, oComponentContainer, oSettings;
		sTemplate = oRouteConfig.template;
		sEntitySet = oRouteConfig.entitySet;

		oSettings = {
			appComponent: this.oComponent,
			isLeaf: !oRouteConfig.pages || !oRouteConfig.pages.length,
			subPages: oRouteConfig.pages,
			entitySet: sEntitySet,
			navigationProperty: oRouteConfig.navigationProperty,
			routeConfig: oRouteConfig,
			componentData: {
				preprocessorsData: {}
			}
		};

		if (oRouteConfig.component.settings) {
			// consider component specific settings from app descriptor
			jQuery.extend(oSettings, oRouteConfig.component.settings);
		}

		try {
			oComponentContainer = new ComponentContainer({
				name: sTemplate,
				propagateModel: true,
				width: '100%',
				height: '100%',
				handleValidation: true,
				settings: oSettings
			});
			return oComponentContainer;
		} catch (e) {
			throw new Error("Component " + sTemplate + " could not be loaded");
		}
	};

	/**
	 * Event hander fired by router once it finds a match
	 *
	 * @private
	 * @param {Object} oEvt - the event object
	 */
	NavigationController.prototype._handleRouteMatched = function(oEvt) {
		this._oTemplateContract.oApplication.onRouteMatched(oEvt);
		var oView, oRouteConfig, sKey, oKeys, sPath;
		oView = oEvt.getParameter("view");
		oRouteConfig = oEvt.getParameter("config");

		// remove all messages before setting a new binding context
		// sap.ui.getCore().getMessageManager().removeAllMessages();

		// If the path from a binding context exists --> use it instead of checking for operation in route config
		if (this._oTargetContextPath) {
			sPath = this._oTargetContextPath;
			// delete the path from binding context, so it not read again
			delete this._oTargetContextPath;
			//
		} else if (oRouteConfig.operation !== "root") { // check for operation
			if (oRouteConfig.operation === "aggregation") {
				sPath = "/" + oRouteConfig.pattern;
			} else {
				// The view is for an instance
				sPath = this._getContextPath(oRouteConfig);
			}
			oKeys = oEvt.getParameter("arguments");
			delete oKeys["?query"];
			if (oKeys) {
				for (sKey in oKeys) {
					// replace each key in pattern with corresponding key in argument
					sPath = sPath.replace("{" + sKey + "}", oKeys[sKey]);
				}
			}
		}

		// Bind the view from the path
		this._activateView(oView, sPath);
	};

	/**
	 * calls onActivate on the specified view, if it exists
	 *
	 * @private
	 * @param {Object} oView - the view
	 * @param {string} sPath - the path in the model
	 * @param {boolean} bDelayedActivate - optional boolean flag, true if activate is (re-)triggered delayed
	 */
	NavigationController.prototype._activateView = function(oView, sPath, bDelayedActivate) {
		var oOldPage, oOldComponent, oComponent, oViewEventDelegate;
		if (oView) {
			// Check if a component exists
			if (oView.getComponentInstance) {
				oComponent = oView.getComponentInstance();
				// if no component exists --> delay handling for activation/binding by attaching to the rendering delegate
				if (!oComponent) {
					oViewEventDelegate = {
						onBeforeRendering: function() {
							// at this point of time the component should exists;
							// --> if so, retrigger the activate call
							oView.removeEventDelegate(oViewEventDelegate, this);
							if (oView.getComponentInstance && oView.getComponentInstance()) {
								this._activateView(oView, sPath, true);
							}
						}
					};
					oView.addEventDelegate(oViewEventDelegate, this);
					return;
				}
			}

			// Check if an old/active view exists
			// try to use previous page - since it should be the old one by default
			oOldPage = this._oTemplateContract.oNavContainer.getPreviousPage();
			// if activate was not delayed and the view is not same as the current page - use the current page; since we still might not haven
			// transitioned to the new page
			if (!bDelayedActivate && (oOldPage || oView !== this._oTemplateContract.oNavContainer.getCurrentPage())) {
				oOldPage = this._oTemplateContract.oNavContainer.getCurrentPage();
			}
			// trigger onDeactivate on the old component instance
			if (oOldPage && oOldPage.getComponentInstance) {
				oOldComponent = oOldPage.getComponentInstance();
				if (oOldComponent && oOldComponent.onDeactivate) {
					oOldComponent.onDeactivate();
				}
			}

			// trigger onActivate on the component instance
			if (oComponent) {
				oComponent.onActivate(sPath);
			}
		}
	};

	/**
	 * Sets/Replaces the hash via the router/hash changer
	 *
	 * @private
	 * @param {string} sHash - the hash string
	 * @param {boolean} bReplace - whether the hash should be replaced
	 */
	NavigationController.prototype._navigate = function(sHash, bReplace) {
		if (!sHash) {
			sHash = ""; // when no hash is passed, undefined seems to be used in the URL
		}
		if (bReplace) {
			this.oRouter.oHashChanger.replaceHash(sHash);
		} else {
			this.oRouter.oHashChanger.setHash(sHash);
		}
	};

	/**
	 * Navigates to the root view.
	 *
	 * @public
	 * @param {boolean} bReplace If this is true the navigation/hash will be replaced
	 */
	NavigationController.prototype.navigateToRoot = function(bReplace) {
		this._navigate("", bReplace);
	};

	/**
	 * Navigates back to the previous view.
	 *
	 * @public
	 * @param {boolean} bReplace If this is true the navigation/hash will be replaced
	 */
	NavigationController.prototype.navigateBack = function(bReplace) {
		this._navigate(this._oHistory ? this._oHistory.getPreviousHash() : "", bReplace);
	};

	/**
	 * get the navigation path from binding context
	 *
	 * @private
	 * @param {Object} oTargetContext - the binding context
	 * @param {string} sNavigationProperty - the navigation property that should replace the entity
	 * @returns {string} the resolved path
	 */
	NavigationController.prototype._getNavigationPath = function(oTargetContext, sNavigationProperty) {
		var sPath, aPath, sEntitySet;
		// Get the path from binding context without "/"
		sPath = oTargetContext.getPath().substring(1);
		// Get the entityset from path
		aPath = sPath.split('(');
		if (aPath[0]) {
			sEntitySet = aPath[0];
		}
		// Replace the entitySet with navigationProperty in the path, if it is specified
		if (sNavigationProperty) {
			sPath = sPath.replace(sEntitySet, sNavigationProperty);
			if (sPath.indexOf("/") === 0) {
				sPath = sPath.substring(1);
			}
		}
		return sPath;
	};

	/**
	 * get the context path from navigation path/pattern
	 *
	 * @private
	 * @param {Object} oRouteConfig - the route configuration
	 * @returns {String} the context path
	 */
	NavigationController.prototype._getContextPath = function(oRouteConfig) {
		var sPath, sPathPattern, iIndex;
		if (oRouteConfig) {
			// get the pattern from route configuration
			sPath = oRouteConfig.pattern;
			// get the current path pattern from either navigation property or the entitySet
			sPathPattern = oRouteConfig.navigationProperty || oRouteConfig.entitySet;
			if (sPath && sPathPattern) {
				iIndex = sPath.indexOf("{?query}");
				// if the query is not at the beginning there is a query suffix
				if (iIndex > 0) {
					// get the current path by ignoring the query suffix
					sPath = sPath.substring(0, iIndex);
				}
				// reset the index
				iIndex = -1;
				// Look for path pattern with ({key
				sPathPattern += "({keys";
				iIndex = sPath.indexOf(sPathPattern);
				// if the pattern is not at the beginning there is a parent path prefix
				if (iIndex > 0) {
					// get the current path by ignoring the parent prefix
					sPath = sPath.substring(iIndex);
				}
				// replace the navigation property with entity set to form the binding context path
				if (oRouteConfig.navigationProperty) {
					sPath = sPath.replace(oRouteConfig.navigationProperty, oRouteConfig.entitySet);
				}
				// context always needs to start with a "/"
				sPath = "/" + sPath;
			}
		}
		return sPath;
	};

	/**
	 * Event handler fired by router when no matching route is found
	 *
	 * @private
	 * @param {Object} oEvt - the event object
	 */
	NavigationController.prototype._handleBypassed = function() {
		this._oTemplateContract.oApplication.onBypassed();
		this.navigateToMessagePage({
			title: this._oTemplateContract.getText("ST_GENERIC_UNKNOWN_NAVIGATION_TARGET"),
			replaceURL: true
		});
	};

	/**
	 * Returns a map of views currently existing in the navigation controller.
	 *
	 * @protected
	 * @returns {Object} the views from the navigation controller
	 */
	NavigationController.prototype.getViews = function() {
		return this.oViews;
	};

	/**
	 * Returns the NavContainer instance used in the application.
	 *
	 * @protected
	 * @returns {sap.m.NavContainer} the NavContainer instance
	 */
	NavigationController.prototype.getNavContainer = function() {
		return this._oTemplateContract.oNavContainer;
	};

	/**
	 * perform a read with the specified data and trigger further initialisation of router
	 *
	 * @private
	 * @param {Array} aKeys - the keys used to create the filter
	 * @param {Object} mParams - object containing parameters
	 * @param {Object} oModel- the odata model instance
	 */
	NavigationController.prototype._readObject = function(aKeys, mParams, oModel) {
		var i, iLen, sProperty, sValue, aFilters = [];
		if (aKeys && mParams && oModel) {
			iLen = aKeys.length;
			for (i = 0; i < iLen; i++) {
				// get property from property path
				sProperty = aKeys[i].PropertyPath;
				// get value from parameter array (should have only 1)
				sValue = mParams[sProperty][0];
				aFilters.push(new Filter(sProperty, FilterOperator.EQ, sValue));
			}
			oModel.read("/" + this._sEntitySet, {
				filters: aFilters,
				success: function(oResult) {
					var oRow, i, iLength, sKey;
					if (oResult && oResult.results) {
						iLength = oResult.results.length;
						for (i = 0; i < iLength; i++) {
							oRow = oResult.results[i];
							if (oRow && oRow.IsActiveEntity) {
								break;
							}
							oRow = null;
						}
						if (!oRow) {
							oRow = oResult.results[0];
						}
					}
					if (oRow) {
						sKey = oModel.getKey(oRow);
					}
					if (sKey) {
						this._oHashChanger.replaceHash(sKey);
					}
					this._initialiseRouting();
				}.bind(this),
				error: function(oError) {
					// just continue with initialisation in case of errors
					this._initialiseRouting();
				}.bind(this)
			});
		}

	};

	/**
	 * Sets the root page to dirty
	 *
	 * @public
	 */
	NavigationController.prototype.setRootPageToDirty = function() {
		var oViews = this.getViews();
		if (oViews && oViews.root) {
			var oInstance = oViews.root.getComponentInstance();
			if (oInstance && typeof oInstance.setIsRefreshRequired === "function") {
				oInstance.setIsRefreshRequired(true);
			}
		}
	};

	/**
	 * Sets parent page to dirty
	 * @param {Object} oComponent - the component which parent shall be set to dirty
	 * @param {String} sNavigationProperty - only this navigation property is set to dirty
	 * @public
	 */
	NavigationController.prototype.setParentToDirty = function(oComponent, sNavigationProperty, bNoRecursive) {
		var oSettings, oParentSettings, oParent, mRefreshInfos, mComponentRegistry = this._oTemplateContract.componentRegistry;

		// find current view and search its parent
		var sMyId = oComponent.getId();
		oSettings = oComponent.getComponentContainer().getSettings();
		var oRouteConfig = oSettings && oSettings.routeConfig;
		if (oRouteConfig){
			if (oRouteConfig.viewLevel === 0) {
				return false;
			} else {
				for (var sComponentId in mComponentRegistry){
					if (sComponentId !== sMyId){
						oParentSettings = mComponentRegistry[sComponentId].oComponent.getComponentContainer().getSettings();

						if (oParentSettings && oParentSettings.routeConfig && oParentSettings.routeConfig.viewLevel === (oRouteConfig.viewLevel - 1) && (oRouteConfig.viewLevel === 1 || oParentSettings.routeConfig.entitySet === oRouteConfig.parentEntitySet)) {
							oParent = mComponentRegistry[sComponentId].oComponent;


							if (sNavigationProperty) {
								mRefreshInfos = mComponentRegistry[sComponentId].oGenericData.mRefreshInfos;
								mRefreshInfos[sNavigationProperty] = true;
							} else {
								if (typeof oParent.setIsRefreshRequired === "function") {
									oParent.setIsRefreshRequired(true);
								}
							}


							// there could be more components with the same entity set on the parent level - not yet supported due to unique ID concept but will be replaced once we have the component hierarchy/
							break;
						}
					}
				}

				if (oParent && !bNoRecursive){
					// check if parent has complex tables as children and set them to dirty
					this._setComplexTableChildrenToDirty(oParent, sNavigationProperty);
				}

			}
		}
	};

	/**
	 * Sets parent page to dirty
	 * @param {Object} oComponent - the component that shall be set to dirty
	 * @param {String} sNavigationProperty - only this navigation property is set to dirty
	 * @public
	 */

	NavigationController.prototype.setMeToDirty = function(oComponent, sNavigationProperty) {

		if (sNavigationProperty) {
			var mRefreshInfos = this._oTemplateContract.componentRegistry[oComponent.getId()].oGenericData.mRefreshInfos;
			mRefreshInfos[sNavigationProperty] = true;
		} else {
			if (typeof oComponent.setIsRefreshRequired === "function"){
				oComponent.setIsRefreshRequired(true);
			}
		}

		// complex table need to be considered in a special way
		var oSettings = oComponent.getComponentContainer().getSettings();
		var bComplexTable = sap.suite.ui.generic.template.js.AnnotationHelper.isComplexTable(oSettings.routeConfig);
		if (bComplexTable){
			// component is a complex table, set parent to dirty
			this.setParentToDirty(oComponent, sNavigationProperty, true);
		} else {
			// check if component has complex table children and set them to dirty
			this._setComplexTableChildrenToDirty(oComponent, sNavigationProperty);
		}
	};

	/**
	 * set all complex table children to dirty
	 *
	 * @private
	 */
	NavigationController.prototype._setComplexTableChildrenToDirty = function(oComponent, sNavigationProperty) {
		var oParentSettings, oComplexTableSettings, bIsComplexTable, mComponentRegistry = this._oTemplateContract.componentRegistry;

		oParentSettings = oComponent.getComponentContainer().getSettings();

		for (var sComponentId in mComponentRegistry){
			oComplexTableSettings = mComponentRegistry[sComponentId].oComponent.getComponentContainer().getSettings();
			bIsComplexTable = sap.suite.ui.generic.template.js.AnnotationHelper.isComplexTable(oComplexTableSettings.routeConfig);
			if (bIsComplexTable){

				if (oParentSettings.routeConfig && oParentSettings.routeConfig.viewLevel === (oComplexTableSettings.routeConfig.viewLevel - 1) && (oParentSettings.routeConfig.entitySet === oComplexTableSettings.routeConfig.parentEntitySet)) {
					var oComplexTableComponent = mComponentRegistry[sComponentId].oComponent;
					if (typeof oComplexTableComponent.setIsRefreshRequired === "function") {
						oComplexTableComponent.setIsRefreshRequired(true);
					}
				}
			}
		}
	};

	/**
	 * get children - temporarily added, to be refactored
	 *
	 * @private
	 */
	NavigationController.prototype._getChildren = function(sView, oOtherViews) {
		var aChildren = [];
		var oOtherViews = oOtherViews || this.getViews();
		var oSettings = oOtherViews[sView].getSettings();
		for (var sOtherView in oOtherViews) {
			var oOtherSettings = oOtherViews[sOtherView].getSettings();
			if (oSettings.routeConfig.viewLevel + 1 === oOtherSettings.routeConfig.viewLevel
				&& oSettings.routeConfig.entitySet === oOtherSettings.routeConfig.parentEntitySet) {
				aChildren.push(sOtherView);
			}
		}
		return aChildren;
	};

	/**
	 * get successors - temporarily added, to be refactored
	 *
	 * @private
	 */
	NavigationController.prototype._getSuccessors = function(sView, oViews) {
		var aSuccessors = [];
		var aChildren = this._getChildren(sView, oViews);
		for (var i = 0; i < aChildren.length; i++){
			aSuccessors = aSuccessors.concat(this._getSuccessors(aChildren[i], oViews));
		}
		return aSuccessors.concat(aChildren);
	};

	/**
	 * Unbind all children components
	 * @param {Object} oComponent - the component which children should be unbinded
	 * @public
	 */
	NavigationController.prototype.unbindChildren = function(oComponent) {
		var oViews = this.getViews();
		var sMyId = oComponent.getId();
		for (var sView in oViews) {
			var oInstance = oViews[sView].getComponentInstance();
			if (oInstance && oInstance.getId() === sMyId) {
				var aSuccessors = this._getSuccessors(sView, oViews);
				for (var i = 0; i < aSuccessors.length; i++) {
					oViews[aSuccessors[i]].unbindElement();
				}
			}
		}
	};

	/**
	 * Cleans up the resources.
	 *
	 * @public
	 */
	NavigationController.prototype.destroy = function() {
		BaseObject.prototype.destroy.apply(this, arguments);
		if (this._oHistory && this._oHistory.destroy) {
			this._oHistory.destroy();
		}
		this._oHistory = null;
		this.oRouter = null;
		this.oViews = null;
		this.oComponent = null;
	};

	return NavigationController;

});
