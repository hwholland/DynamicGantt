/*global sap */
/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */

/*globals jQuery */

jQuery.sap.declare("sap.apf.core.metadata");
jQuery.sap.require("sap.apf.utils.utils");

(function() {
	'use strict';

	/**
	 * @class This class initializes the metadata and the annotations and merges them together. The class provides methods to access metadata information like parameters of an entity type and their
	 *        data types.
	 * @param {Object} oInject Injection of dependencies, which are Hashtable, MessageHandler, coreAi.
	 * @param {string} sAbsolutePathToServiceDocument Absolute Path to service document like "/sap/hba/apps/wca/s/odata/wca.xsodata"
	 */
	sap.apf.core.Metadata = function(oInject, sAbsolutePathToServiceDocument) {

		/**
		 * @description Contains 'metadata'
		 * @returns {String}
		 */
		this.type = "metadata";
		// Private vars
		var that = this;
		var aAllEntityTypes = [];
		var Hashtable = (oInject && oInject.constructors &&  oInject.constructors.Hashtable) || sap.apf.utils.Hashtable;
		var oHtPropertyMetadata = new Hashtable(oInject.instances.messageHandler);
		var oHtFilterableProperties = new Hashtable(oInject.instances.messageHandler);
		var oHtAllProperties = new Hashtable(oInject.instances.messageHandler);
		var oHtParameterEntitySetKeyProperties = new Hashtable(oInject.instances.messageHandler);
		var oHtEntityTypeMetadata = new Hashtable(oInject.instances.messageHandler);
		var oHtEntityTypeOfEntitySet = new Hashtable(oInject.instances.messageHandler);
		var oHtGetSapSemantics = new Hashtable(oInject.instances.messageHandler);
		var oHtAssociationByParameterEntitySet = new Hashtable(oInject.instances.messageHandler);
		var oHtAssociationByParameterEntityType = new Hashtable(oInject.instances.messageHandler);
		var oHtAssociationByAggregateEntitySet = new Hashtable(oInject.instances.messageHandler);
		var oHtEntityTypes = new Hashtable(oInject.instances.messageHandler);
		var ODataModel = oInject.constructors.ODataModel || sap.ui.model.odata.ODataModel;
		var bDeactivateFatalError = false;
		if (oInject.deactivateFatalError) {
			bDeactivateFatalError = true;
		}
		var oMetaModel;
		var oODataModel;
		var sEntityTypeQualifier;
		var sEntityTypeAnnotationsPreFix;

		// Private functions

		function defineApiResult(input) {
			var object;
			function moveToDataType(property) {
				if (!object.dataType) {
					object.dataType = {};
				}
				object.dataType[property] = object[property];
			}

			function convertAnnotationName(sAlternativeName, property) {
				// convert a list of name value pairs into properties
				if (jQuery.isArray(object[property]) === true) {
					(object[property]).forEach(function(obj) {
						object[obj.name] = obj.value;
					});
				} else if (property !== "dataType" && typeof (object[property]) === "object") { // dataType is explicit set by the APF has not to be modified
					if (Object.keys(object[property]).length === 0) {
						object[sAlternativeName] = "true";
					}
					if (property !== sAlternativeName){ // do not map identically
						jQuery.each(object[property], function(objProperty, itsValue) {
							object[sAlternativeName] = itsValue;
						});
					}
				} else {
					object[sAlternativeName] = object[property];
				}
			}

			if (input === null) {
				return {};
			}
			object = jQuery.extend(true, {}, input);
			jQuery.each(object, function(sProperty) {
				switch (sProperty) {
					case 'type': // move the property into the dataType subobject
						moveToDataType(sProperty);
						break;
					case 'maxLength':
						moveToDataType(sProperty);
						break;
					case 'precision':
						moveToDataType(sProperty);
						break;
					default:
						// TODO: remove when clarified that no harm in UI
						// take the annotation name out of a qualified name.
						var sPropertyName = sProperty.split(".").pop();
						if (sPropertyName.search("ISO") === 0) { // avoid lowering the I of ISO
							convertAnnotationName(sPropertyName, sProperty);
						} else {
							// TODO: remove when clarified that no harm in UI
							// lower the cae of the first character of a name.
							convertAnnotationName(sPropertyName.replace(/^./, sPropertyName[0].toLowerCase()), sProperty);
						}
						break;
				}
			});
			return object;
		}

		function getParameterPropertiesFromEntityType(sEntityType, bOnlyKeyProperties) {
			if (oHtParameterEntitySetKeyProperties.hasItem(sEntityType) !== true) {
				var oEntityType;
				var oKeyProperties = {};
				var oResult = {
					allParameters : [],
					keyParameters : []
				};
				if (isParameterEntityType(sEntityType)) {
					oEntityType = getEntityType(sEntityType);
					if (oEntityType.key && oEntityType.key.propertyRef) {
						oEntityType.key.propertyRef.forEach(function(oPropRef) {
							oKeyProperties[oPropRef.name] = null;
						});
					}
					oEntityType.property.forEach(function(oProperty) {
						var oParameter = defineApiResult(oProperty);
						oParameter.isKey = oKeyProperties.hasOwnProperty(oParameter.name);
						oResult.allParameters.push(oParameter);
						if (oParameter.isKey) {
							oResult.keyParameters.push(oParameter);
						}
					});
				}
				oHtParameterEntitySetKeyProperties.setItem(sEntityType, oResult);
			}
			if (!bOnlyKeyProperties) {
				return oHtParameterEntitySetKeyProperties.getItem(sEntityType).allParameters;
			}
			return oHtParameterEntitySetKeyProperties.getItem(sEntityType).keyParameters;
		}

		function getAllPropertiesOfEntityType(sEntityType) {
			var aPropertyNames = [];
			var entityType;
			if (isParameterEntityType(sEntityType)) {
				sEntityType = getEntityTypeOfAggregateEntitySet(sEntityType);
			}
			entityType = getEntityType(sEntityType);

			entityType.property.forEach(function(property) {
				aPropertyNames.push(property.name);
			});

			return aPropertyNames;
		}

		function getAllPropertiesOfExtendedEntityType(sEntityType) {
			var i;
			if (oHtAllProperties.hasItem(sEntityType) === true) {
				return oHtAllProperties.getItem(sEntityType);
			}
			var aAllProperties;
			var aPropertyNames = [];
			var aParameterNames = [];

			var sAggregateEntityType = getEntityTypeOfAggregateEntitySet(sEntityType);
			if (sAggregateEntityType && isAggregateEntityType(sAggregateEntityType)) {
				var oEntityType = getEntityType(sAggregateEntityType);
				oEntityType.property.forEach(function(oProperty) {
					aPropertyNames.push(oProperty.name);
				});
			}

			var aParameters = getParameterPropertiesFromEntityType(sEntityType, false);
			for(i = 0; i < aParameters.length; i++) {
				aParameterNames.push(aParameters[i].name);
			}

			aAllProperties = aPropertyNames.concat(aParameterNames);

			oHtAllProperties.setItem(sEntityType, aAllProperties);
			return aAllProperties;
		}

		function getEntityTypeName(sEntitySet) {
			return oHtEntityTypeOfEntitySet.getItem(sEntitySet);
		}

		function determineEntityTypeName(sEntityTypeOrSetName) {
			var sEntityType;
			if (getEntityType(sEntityTypeOrSetName)) {
				sEntityType = sEntityTypeOrSetName;
			} else {
				sEntityType = getEntityTypeName(sEntityTypeOrSetName);
				sEntityType = sEntityType || getEntityTypeName(sEntityTypeOrSetName + "Results"); // compatibility!!!
			}
			return sEntityType;
		}

		function getFilterablePropertiesFromEntityType(sEntityType) {
			if (oHtFilterableProperties.hasItem(sEntityType) === false) {
				var aResult = [];
				var oEntityType = getEntityType(sEntityType);
				oEntityType.property.forEach(function(property) {
					if (!(property["sap:filterable"] === "false" || property.filterable && property.filterable === "true")) {
						aResult.push(property.name);
					}
				});
				oHtFilterableProperties.setItem(sEntityType, aResult);
			}
			return oHtFilterableProperties.getItem(sEntityType);
		}

		function isParameterEntityType(sEntityType) {
			return getSapSemantics(sEntityType) === "parameters";
		}

		function isAggregateEntityType(sEntityType) {
			return getSapSemantics(sEntityType) === "aggregate";
		}

		function getSapSemantics(sEntityType) {
			if (!oHtGetSapSemantics.hasItem(sEntityType)) {
				var entityType = getEntityType(sEntityType);
				var result = entityType && entityType["sap:semantics"] || "undefined";
				oHtGetSapSemantics.setItem(sEntityType, result);
			}
			return oHtGetSapSemantics.getItem(sEntityType);
		}

		function getPropertyMetadataFromEntityType(sEntityType, sPropertyName) {
			if (oHtPropertyMetadata.hasItem(sEntityType + sPropertyName) === false) {
				var bIsParameterEntityType = isParameterEntityType(sEntityType);
				var entityType = getEntityType(sEntityType);
				var property = oMetaModel.getODataProperty(entityType, sPropertyName);
				if (!property && bIsParameterEntityType) {
					var sAggregateEntityType = getEntityTypeOfAggregateEntitySet(sEntityType);
					entityType = getEntityType(sAggregateEntityType);
					property = oMetaModel.getODataProperty(entityType, sPropertyName);
				}
				oHtPropertyMetadata.setItem(sEntityType + sPropertyName, defineApiResult(property));
			}
			return oHtPropertyMetadata.getItem(sEntityType + sPropertyName);
		}

		//KS sEntityType either from parameter entity set or aggregate entity set
		function getEntityTypeOfAggregateEntitySet(sEntityType) {
			var oRelevantAssociation = oHtAssociationByParameterEntityType.getItem(sEntityType);
			if (oRelevantAssociation) {
				return getEntityTypeName(oRelevantAssociation.toAggregateEntitySet);
			} 
			return sEntityType;
		}

		function getEntityType(sEntityType) {
			if (!sEntityType) {
				return undefined;
			}
			if (!oHtEntityTypes.hasItem(sEntityType)) {
				var oEntityType = oMetaModel.getODataEntityType(sEntityTypeQualifier + sEntityType);
				if (!oEntityType) {
					return oEntityType;
				}
				oHtEntityTypes.setItem(sEntityType, oEntityType);
			}
			return oHtEntityTypes.getItem(sEntityType);
		}

		function initMetadata() {

			oODataModel = createOdataModel();
			var sMessageCode;

			if (!oODataModel.getServiceMetadata()) {
				sMessageCode = "5018";
				if (bDeactivateFatalError) {
					sMessageCode = "11013";
				}
				oInject.instances.messageHandler.putMessage(oInject.instances.messageHandler.createMessageObject({
					code : sMessageCode,
					aParameters : [ sAbsolutePathToServiceDocument ],
					oCallingObject : that
				}));
				that.failed = true;
				return;
			}

			oMetaModel = oODataModel.getMetaModel();

			initializeEntityTypeOfEntitySetsAndAllEntityTypes();

			initializeEntityTypeQualifier();

			initializeEntityTypeAnnotationsPreFix(oODataModel);

			initializeRelevantAssociations();

			function initializeEntityTypeOfEntitySetsAndAllEntityTypes() {
				var oCollector = {};
				var entitySet = oMetaModel.getODataEntityContainer() && oMetaModel.getODataEntityContainer().entitySet;

				if (!entitySet) {
					oInject.instances.messageHandler.putMessage(oInject.instances.messageHandler.createMessageObject({
						code : "5041",
						aParameters : [ sAbsolutePathToServiceDocument ],
						oCallingObject : that
					}));
					return;
				}
				entitySet.forEach(function(entitySet) {
					var entityType = entitySet.entityType.split(/[. ]+/).pop();
					oHtEntityTypeOfEntitySet.setItem(entitySet.name, entityType);
					if (!oCollector.hasOwnProperty(entityType)) {
						oCollector[entityType] = true;
						aAllEntityTypes.push(entityType);
					}
				});
			}

			function initializeEntityTypeQualifier() {
				var entitySet = oMetaModel.getODataEntityContainer() && oMetaModel.getODataEntityContainer().entitySet;
				if (!entitySet) {
					return;
				}
				var aServiceDocumentParts = entitySet[0].entityType.split(".");
				aServiceDocumentParts.pop();
				sEntityTypeQualifier = aServiceDocumentParts.join(".") + ".";

			}

			function initializeEntityTypeAnnotationsPreFix(odataModel) {
				var oAnnotation = odataModel && odataModel.getServiceAnnotations();
				if (oAnnotation && oAnnotation.aliasDefinitions && oAnnotation.aliasDefinitions.Capabilities) {
					sEntityTypeAnnotationsPreFix = oAnnotation.aliasDefinitions.Capabilities + ".";
				}
			}

			function initializeRelevantAssociations() {
				var oEntityContainer = oMetaModel.getODataEntityContainer();
				if (!oEntityContainer || !oEntityContainer.associationSet) {
					return;
				}
				oEntityContainer.associationSet.forEach(function(oEntitySetAssociation) {

					var sEntitySet1 = oEntitySetAssociation.end[0].entitySet,
						sEntitySet2 = oEntitySetAssociation.end[1].entitySet,
						sParameterEntitySet,
						sAggregateEntitySet;
					if (isParameterEntityType(getEntityTypeName(sEntitySet1))) {
						sParameterEntitySet = sEntitySet1;
					} else if (isAggregateEntityType(getEntityTypeName(sEntitySet1))) {
						sAggregateEntitySet = sEntitySet1;
					}
					if (isParameterEntityType(getEntityTypeName(sEntitySet2))) {
						sParameterEntitySet = sEntitySet2;
					} else if (isAggregateEntityType(getEntityTypeName(sEntitySet2))) {
						sAggregateEntitySet = sEntitySet2;
					}
					if (!sParameterEntitySet || !sAggregateEntitySet) {
						return;
					}

					var sNavigationProperty;
					var oParameterEntityType = getEntityType(getEntityTypeName(sParameterEntitySet));
					var done;
					oParameterEntityType.navigationProperty.forEach(function(oNavigationProperty) {
						if (!done && oNavigationProperty.relationship === oEntitySetAssociation.association) {
							sNavigationProperty = oNavigationProperty.name;
							done = true;
						}
					});
					if (!sNavigationProperty) {
						return;
					}

					var oRelevantAssociation = {
						navigationProperty : sNavigationProperty,
						fromParameterEntitySet : sParameterEntitySet,
						toAggregateEntitySet : sAggregateEntitySet,
						fromIsUnique : undefined,
						toIsUnique : undefined
					};

					if (oHtAssociationByParameterEntitySet.hasItem(sParameterEntitySet)) {
						oRelevantAssociation.fromIsUnique = false;
						oHtAssociationByParameterEntitySet.getItem(sParameterEntitySet).fromIsUnique = false;
					} else {
						oRelevantAssociation.fromIsUnique = true;
						oHtAssociationByParameterEntitySet.setItem(sParameterEntitySet, oRelevantAssociation);
						oHtAssociationByParameterEntityType.setItem(getEntityTypeName(sParameterEntitySet), oRelevantAssociation);
					}

					if (oHtAssociationByAggregateEntitySet.hasItem(sAggregateEntitySet)) {
						oHtAssociationByAggregateEntitySet.getItem(sAggregateEntitySet).toIsUnique = false;
					} else {
						oRelevantAssociation.toIsUnique = true;
						oHtAssociationByAggregateEntitySet.setItem(sAggregateEntitySet, oRelevantAssociation);
					}

				});
			}

			function createOdataModel() {
				var annotationUris = oInject.instances.annotationHandler.getAnnotationsForService(sAbsolutePathToServiceDocument);
				var parameterSet = {
						loadMetadataAsync : false,
						annotationURI : annotationUris,
						json : true
				};
				return new ODataModel(sAbsolutePathToServiceDocument, parameterSet);
			}

		}

		// Public functions
		/**
		 * @description Returns all entity types of service documents that are referenced by an entity set
		 * @returns {Array} - EntityTypes Returns entity types
		 */
		this.getEntityTypes = function(){
			return aAllEntityTypes;
		};
		/**
		 * @description Returns all metadata for the property of the provided entity type
		 * @param {String} sEntitySet - identifier of the used OData entity set
		 * @param {String} sPropertyName - identifier of the used OData property
		 * @returns {Object} - metadata of the property
		 */
		this.getPropertyMetadata = function(sEntitySet, sPropertyName) {
			oInject.instances.messageHandler.check(sEntitySet !== undefined && typeof sEntitySet === "string", "sap.apf.core.Metadata:getPropertyMetadata incorrect EntityType name or type");
			oInject.instances.messageHandler.check(sPropertyName !== undefined && typeof sPropertyName === "string", "sap.apf.core.Metadata:getPropertyMetadata incorrect sPropertyName name or type");

			var sEntityType = determineEntityTypeName(sEntitySet);
			if (!sEntityType) {
				return {};
			}

			return getPropertyMetadataFromEntityType(sEntityType, sPropertyName);
		};

		/**
		 * @description Returns the entity set and navigation property that are needed e. g. for building the Uri for executing an OData request
		 * @param {String} sEntitySet - identifier of the used OData entity set
		 * @returns {Object} 		   - uriComponents 
		 * @returns {String|undefined} - uriComponents.entitySet 			- is undefined, if it cannot be determined
		 * @returns {string|undefined} - uriComponents.navigationProperty 	- is undefined, if it is needed and cannot be determined
		 */
		this.getUriComponents = function(sEntitySet) {

			if (!getEntityTypeName(sEntitySet)) {
				if (getEntityTypeName(sEntitySet + "Results")) {
					return {
						entitySet : sEntitySet + "Results",
						navigationProperty : ""
					};
				}
				return null;
			}

			var oRelevantAssociation;
			switch (getSapSemantics(getEntityTypeName(sEntitySet))) {
				case "undefined":
					return {
						entitySet : sEntitySet,
						navigationProperty : ""
					};
				case "parameters":
					oRelevantAssociation = oHtAssociationByParameterEntitySet.getItem(sEntitySet);
					if (!oRelevantAssociation || oRelevantAssociation.fromIsUnique === false) {
						return {
							entitySet : sEntitySet,
							navigationProperty : undefined
						};
					}
					return {
						entitySet : sEntitySet,
						navigationProperty : oRelevantAssociation.navigationProperty
					};
				case "aggregate":
					oRelevantAssociation = oHtAssociationByAggregateEntitySet.getItem(sEntitySet);
					if (!oRelevantAssociation) {
						return {
							entitySet : sEntitySet,
							navigationProperty : ""
						};
					}
					if (oRelevantAssociation.toIsUnique === false) {
						return {
							entitySet : undefined,
							navigationProperty : undefined
						};
					}
					return {
						entitySet : oRelevantAssociation.fromParameterEntitySet,
						navigationProperty : oRelevantAssociation.navigationProperty
					};
				default:
					oInject.instances.messageHandler.check(false, "metadata : getUriComponents - not handled return value for sap semantics");
			}

		};

		/**
		 * @description Returns names of all filterable properties of the provided entity type.
		 * @param {String} sEntitySet - identifier of the used OData entity type
		 * @returns {Array} aResult - names of the filterable properties
		 */
		this.getFilterableProperties = function(sEntitySet) {
			oInject.instances.messageHandler.check(sEntitySet !== undefined && typeof sEntitySet === "string", "sap.apf.core.Metadata:getFilterableProperties incorrect EntityType name or type");

			var sEntityType = determineEntityTypeName(sEntitySet);
			if (!sEntityType) {
				return [];
			}

			sEntityType = getEntityTypeOfAggregateEntitySet(sEntityType);
			return getFilterablePropertiesFromEntityType(sEntityType);

		};

		/**
		 * @description Returns all properties for a given entity set.
		 * @param {String} sEntitySet - identifier of the used OData entity set
		 * @returns {String[]} array of property names
		 */
		this.getAllPropertiesOfEntitySet = function(sEntitySet) {
			oInject.instances.messageHandler.check(sEntitySet !== undefined && typeof sEntitySet === "string", "sap.apf.core.Metadata:getAllPropertiesOfEntitySet incorrect EntitySet name or type");

			var sEntityType = determineEntityTypeName(sEntitySet);

			return getAllPropertiesOfEntityType(sEntityType);
		};

		/**
		 * @description Returns names of all properties (incl. parameters) of all entity types.
		 * @returns {String[]} array of all property names
		 */
		this.getAllProperties = function() {
			var aAllProperties = [];
			var propertiesOfEntityType;

			this.getEntityTypes().forEach(function(entityType) {
				propertiesOfEntityType = getAllPropertiesOfExtendedEntityType(entityType);

				if (propertiesOfEntityType.length === 0) {
					propertiesOfEntityType = getAllPropertiesOfEntityType(entityType);
				}
				aAllProperties = aAllProperties.concat(propertiesOfEntityType);
			});
			aAllProperties = sap.apf.utils.eliminateDuplicatesInArray(oInject.instances.messageHandler, aAllProperties);

			return aAllProperties;
		};

		/**
		 * @description Returns all known properties which are filterable or parameters. 
		 * @returns {String[]} array of filterable property or parameter names
		 */
		this.getFilterablePropertiesAndParameters = function(){
			var result = [];
			var params;
			var entityTypes = this.getEntityTypes();
			entityTypes.forEach(function(entityTypeName){
				var entityType = getEntityType(entityTypeName);
				entityType.property.forEach(function(property) {
					if (!(property["sap:filterable"] === "false") && (property["sap:aggregation-role"] === "dimension")) {
						result.push(property.name);
					}
				});
				params = getParameterPropertiesFromEntityType(entityTypeName, false);
				params.forEach(function(param){
					result.push(param.name);
				});
			});
			return sap.apf.utils.eliminateDuplicatesInArray(oInject.instances.messageHandler, result);
		};
		/**
		 * @description Returns names of all parameter entity set key properties of all entity types.
		 * @returns {Array} aResult - parameter names
		 */
		this.getParameterEntitySetKeyPropertiesForService = function() {
			var aAllParameters = [];

			this.getEntityTypes().forEach(function(entityType) {
				getParameterPropertiesFromEntityType(entityType, true).forEach(function(parameter) {
					aAllParameters.push(parameter.name);
				});
			});
			aAllParameters = sap.apf.utils.eliminateDuplicatesInArray(oInject.instances.messageHandler, aAllParameters);

			return aAllParameters;
		};

		/**
		 * @description Returns names of all key properties of all entity types.
		 * @returns {Array} aResult - key names
		 */
		this.getAllKeys = function() {
			var aAllKeys = [];
			var aKeys = [];

			this.getEntityTypes().forEach(function(entityType) {
				var oEntityType = getEntityType(entityType);
				aKeys = [];
				if (oEntityType.key && oEntityType.key.propertyRef) {
					oEntityType.key.propertyRef.forEach(function(propertyRef) {
						aKeys.push(propertyRef.name);
					});
				}

				aAllKeys = aAllKeys.concat(aKeys);
			});
			aAllKeys = sap.apf.utils.eliminateDuplicatesInArray(oInject.instances.messageHandler, aAllKeys);
			return aAllKeys;
		};

		/**
		 * @description Returns all metadata attributes for a given property. It
		 *              will be searched over all entity types for this property
		 *              and the first match will be returned.
		 * @param {String} sPropertyName
		 *            sPropertyName - identifier of the used OData property
		 * @returns {Object} - Object with attributes of the property
		 */
		this.getAttributes = function(sPropertyName) {
			var done = false;
			var oPropertyAttributes = {};
			this.getEntityTypes().forEach(function(entityType) {
				if (!done) {
					oPropertyAttributes = getPropertyMetadataFromEntityType(entityType, sPropertyName);
					if (oPropertyAttributes.name) {
						done = true;
					}
				}
			});
			return oPropertyAttributes;
		};
		/**
		 * @description Returns metadata which includes parameter entity set key properties and their attributes (data type, default value, ...) for the provided entity type.
		 * @param {String} sEntitySet - identifier of the used OData entity type
		 * @returns {Array} or {undefined} - parameters of the entity type
		 */
		this.getParameterEntitySetKeyProperties = function(sEntitySet) {
			oInject.instances.messageHandler.check(sEntitySet !== undefined && typeof sEntitySet === "string", "sap.apf.core.Metadata:getParameterEntitySetKeyProperties incorrect EntityType name or type");
			var sEntityType = determineEntityTypeName(sEntitySet);

			if (!sEntityType) {
				return [];
			}
			return getParameterPropertiesFromEntityType(sEntityType, true);

		};

		/**
		 * @description Returns the entityType annotations which includes extensions for OData 4.0 like "RequiresFilter"
		 * @param {String} sEntitySet - identifier of the used OData entity set
		 * @returns {Object} - annotations of the entity type
		 */
		this.getEntityTypeAnnotations = function(sEntitySet) {
			var sEntityType = determineEntityTypeName(sEntitySet);
			oInject.instances.messageHandler.check(sEntitySet !== undefined && typeof sEntitySet === "string", "sap.apf.core.Metadata:getEntityTypeAnnotations incorrect EntityType name or type");

			if (oHtEntityTypeMetadata.hasItem(sEntityType) === true) {
				return oHtEntityTypeMetadata.getItem(sEntityType);
			}

			var object = {};
			addAnnotations(sEntityType, object);

			var sAggregatedEntityType = getEntityTypeOfAggregateEntitySet(sEntityType);
			if (sAggregatedEntityType !== sEntityType) {
				addAnnotations(sAggregatedEntityType, object);
			}
			oHtEntityTypeMetadata.setItem(sEntityType, object);
			return oHtEntityTypeMetadata.getItem(sEntityType);

			function addAnnotations(sEntityType, oAnnotations) {
				var sAttributeName;
				var sAnnotationName;
				var shape;
				var oEntityType = getEntityType(sEntityType);
				for(sAttributeName in oEntityType) {
					if( oEntityType.hasOwnProperty(sAttributeName)) {

						if (sAttributeName.indexOf(sEntityTypeAnnotationsPreFix) !== 0) {
							continue;
						}
						sAnnotationName = sAttributeName.split(".").pop();
						sAnnotationName = sAnnotationName.replace(/^./, sAnnotationName[0].toLowerCase());
						for (shape in oEntityType[sAttributeName]) {
							if( oEntityType[sAttributeName].hasOwnProperty(shape)) {
								oAnnotations[sAnnotationName] = oEntityType[sAttributeName][shape];
							}
						}
					}
				}
			}
		};
		/**
		 * @description Returns all entity sets of the service document that can be used as entity set for analytical configuration.
		 * These are all entity sets except those, that have an corresponding parameter entity set. The discovery uses the
		 * associations. They are not the end of an association.
		 * @returns {Array} - EntitySets Returns entity sets
		 */
		this.getEntitySets = function() {
			var entitySetsToBeExcluded = {};
			var validEntitySets = [];
			var container = oMetaModel.getODataEntityContainer();

			if (!container) {
				return [];
			}
			if (container.associationSet) {
				container.associationSet.forEach(function(association) {
					var entityTypeStart,
						entityTypeEnd,
						entitySetEnd;

					entityTypeStart = determineEntityTypeName(association.end[0].entitySet);
					if (!isParameterEntityType(entityTypeStart)){
						return;
					}
					entitySetEnd = association.end[1].entitySet;
					entityTypeEnd = determineEntityTypeName(entitySetEnd);
					if (!isParameterEntityType(entityTypeEnd)) {
						entitySetsToBeExcluded[entitySetEnd] = true;
					}
				});
			}
			if (container.entitySet) {
				container.entitySet.forEach(function(entitySet) {
					if (!entitySetsToBeExcluded[entitySet.name]) {
						validEntitySets.push(entitySet.name);
					}
				});
			}
			return validEntitySets;
		};

		/**
		 * @description Returns the ODataModel corresponding to this metadata.
		 * @returns {sap.ui.model.odata.ODataModel} ODataModel
         */
		this.getODataModel = function() {
			return oODataModel;
		};
		initMetadata();
	};
}());