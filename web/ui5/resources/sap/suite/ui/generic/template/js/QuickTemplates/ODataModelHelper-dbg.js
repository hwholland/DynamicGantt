sap.ui.define(["sap/ui/base/Object", "./AnnotationHelper",
        "sap/ui/model/odata/AnnotationHelper"],
    function (BaseObject, QCAnnotationHelper, ODataAnnoHelper) {
        "use strict";


        /*eslint camelcase: [2, {properties: "never"}]*/
        var ODataModelHelper = BaseObject.extend("sap.suite.ui.generic.template.js.QuickTemplates.ODataModelHelper");


        ODataModelHelper.initializeObjectProperties = function (oObjectContext, propertyPaths, createParams) {
            var targetObjects = [];
            var key = oObjectContext.getModel().getKey(oObjectContext.getObject());
            var oOrigObject = oObjectContext.getModel().oData[key];
            if (oOrigObject) {
                targetObjects.push(oOrigObject);
            }
            var oChangedObject = oObjectContext.getModel().mChangedEntities[key];
            if (oChangedObject) {
                targetObjects.push(oChangedObject);
            }
            var oContextMetaData = QCAnnotationHelper.getMetaDataForContext(oObjectContext);
            var i = 0;
            if (propertyPaths && Array.isArray(propertyPaths)) {
                jQuery.each(propertyPaths, function (index, path) {
                    var pathComps = path.split("/");
                    var ownProperty = pathComps[0];
                    var childPath = null;
                    if (pathComps.length > 1) {
                        childPath = pathComps.slice(1).join("/");
                    }

                    // if path component is a number, assume it is an index....just continue with next component
                    if (jQuery.isNumeric(ownProperty) && childPath) {
                      ODataModelHelper.initializeObjectProperties(oObjectContext, [childPath], createParams);
                      return;
                    }

                    i = 0;
                    var isNavProp = false;
                    if (oContextMetaData.entityType.navigationProperty) {
                      for (; i < oContextMetaData.entityType.navigationProperty.length; i++) {
                        if (oContextMetaData.entityType.navigationProperty[i].name === ownProperty) {
                          isNavProp = true;
                          break;
                        }
                      }
                    }

                    if (!isNavProp) {
                        jQuery.each(targetObjects, function (i, targetObject) {
                            targetObject[ownProperty] = "";
                        });
                    } else if (!oOrigObject[ownProperty]) {
                        var createdContext = oObjectContext.getModel().createEntry(oObjectContext.getPath() + "/" + ownProperty, createParams);
                        oOrigObject[ownProperty] = { __deferred: {} };
                        ODataModelHelper.restoreNavigationPropertyReferences(oObjectContext, ownProperty, createdContext);
                        if (childPath) {
                            ODataModelHelper.initializeObjectProperties(createdContext, [childPath], createParams);
                        }
                    }
                });
            }

        };

        ODataModelHelper.restoreLineItemReferences = function (entityType, oContext) {
            var oInterface = QCAnnotationHelper.createFormatterInterface(oContext);

            var oMetaDataContext = QCAnnotationHelper.getMetaModelContextForFacetType(oInterface,
                entityType, "LineItem");

            if (oMetaDataContext) {
                var sChildPropertyPath = ODataAnnoHelper.getNavigationPath(oMetaDataContext);
                sChildPropertyPath = sChildPropertyPath.replace(/[{}]/g, '');
                ODataModelHelper.restoreNavigationPropertyReferences(oContext, sChildPropertyPath);
            }
        };

        ODataModelHelper.restoreNavigationPropertyReferences = function (oParentContext, navProp, oChildContext) {
            if (!navProp) {
                return;
            }


            if (!oParentContext.getObject()) {
                return;
            }

            var oMetaModel = oParentContext.getModel().getMetaModel();
            var sObjectKey = oParentContext.getModel().getKey(oParentContext.getObject());
            var oCurrentObject = oParentContext.getModel().oData[sObjectKey];
            var oEntityTypeMeta = oMetaModel.getODataEntityType(oCurrentObject.__metadata.type);


            var oNavPropAssociationEnd = oMetaModel.getODataAssociationEnd(oEntityTypeMeta, navProp);

            var sNavPropEntitySetName = null;
            var oEntitySets = oMetaModel.getProperty(oMetaModel.getODataEntityContainer(oNavPropAssociationEnd.type)).entitySet;
            jQuery.each(oEntitySets, function (i, eSet) {
                if (eSet.entityType === oNavPropAssociationEnd.type) {
                    sNavPropEntitySetName = eSet.name;
                }
            });

            if (!oCurrentObject[navProp]) {
                oCurrentObject[navProp] = {};
            }
            if (oCurrentObject[navProp].__list) {
                oCurrentObject[navProp].__list = [];
            }


            var addChildEntity = function (key) {
                if (oCurrentObject[navProp].__deferred) {
                    delete oCurrentObject[navProp].__deferred;
                }
                if (oNavPropAssociationEnd.multiplicity === "*") {
                    if (!oCurrentObject[navProp].__list) {
                        oCurrentObject[navProp].__list = [];
                    }
                    oCurrentObject[navProp].__list.push(key);
                } else {
                    oCurrentObject[navProp].__ref = key;
                }
            };

            if (!oChildContext) {
                var modelKeys = Object.keys(oParentContext.getModel().oData);
                jQuery.each(modelKeys, function (i, key) {
                    if (key.indexOf(sNavPropEntitySetName) >= 0) {
                        addChildEntity(key);
                    }
                });
            } else {
                var key = oChildContext.getPath().substring(1);
                addChildEntity(key);
            }

        };

        ODataModelHelper.findObjects = function () {
            var parentObj, obj, params;
            if (arguments.length === 3) {
                parentObj = arguments[0];
                obj = arguments[1];
                params = arguments[2];
            } else if (arguments.length == 2) {
                obj = arguments[0];
                params = arguments[1];
            }

            var key = params.key || undefined,
                fnMatchCallBack = params.matchCallback || undefined,
                fnNonMatchCallback = params.noMatchCallback || undefined,
                maxNestedLevel = params.maxNestedLevel || 3;

            var doRecursion = true;

            if (!maxNestedLevel) {
                maxNestedLevel = 3;
            }

            if (!ODataModelHelper.findObjects._recursionCount) {
                ODataModelHelper.findObjects._recursionCount = 0;
            }
            ODataModelHelper.findObjects._recursionCount++;

            if (ODataModelHelper.findObjects._recursionCount > maxNestedLevel) {
                ODataModelHelper.findObjects._recursionCount--;
                return;
            }

            var isObject = function (o) {
                var s = Object.prototype.toString.call(o);
                return (s === '[object Array]' || s === '[object Object]');
            };
            var hasOwn = Object.prototype.hasOwnProperty.bind(obj);

            if (obj) {
                for (var i in obj) {
                    if (hasOwn(i)) {

                        var bIsObject = isObject(obj[i]);
                        if (obj[i] && bIsObject) {
                            obj[i].__nestedKey = i;
                        }
                        doRecursion = true;
                        if (i === key && fnMatchCallBack) {
                            doRecursion = fnMatchCallBack(parentObj, obj, obj[i]);
                        } else if (fnNonMatchCallback) {
                            doRecursion = fnNonMatchCallback(parentObj, obj, obj[i]);
                        }
                        if (doRecursion && bIsObject) {
                            ODataModelHelper.findObjects(obj, obj[i], {
                                key: key,
                                matchCallback: fnMatchCallBack,
                                noMatchCallback: fnNonMatchCallback,
                                maxNestedLevel: maxNestedLevel
                            });
                        }
                        if (obj[i] && bIsObject) {
                            delete obj[i].__nestedKey;
                        }
                    }
                }
            }

            ODataModelHelper.findObjects._recursionCount--;
        };

        return ODataModelHelper;

    }, true);
