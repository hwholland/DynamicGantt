sap.ui.define(["sap/ui/base/Object", "sap/ui/model/Context",
        "sap/ui/model/odata/AnnotationHelper"],
    function (BaseObject, Context, ODataAnnoHelper) {
        "use strict";


        /*eslint camelcase: [2, {properties: "never"}]*/
        var AnnotationHelper = BaseObject.extend("sap.suite.ui.generic.template.js.QuickTemplates.AnnotationHelper");


        AnnotationHelper.resolveFieldGroupTarget = function (oContext) {
            var facet = AnnotationHelper._getFacetOfType(oContext, "FieldGroup");
            if (facet) {
                return ODataAnnoHelper.resolvePath(oContext.getModel().createBindingContext(oContext.getPath() + "/" + facet.index + "/Target"));
            }
            return null;
        };

        AnnotationHelper.resolveLineItemTarget = function (oContext) {
            var facet = AnnotationHelper._getFacetOfType(oContext, "LineItem");
            if (facet) {
                return ODataAnnoHelper.resolvePath(oContext.getModel().createBindingContext(oContext.getPath() + "/" + facet.index + "/Target"));
            }
            return null;
        };

        AnnotationHelper.resolveFieldGroupFacet = function (oContext) {
            var facet = AnnotationHelper._getFacetOfType(oContext, "FieldGroup");
            if (facet) {
                return oContext.getPath() + "/" + facet.index;
            }
            return undefined;
        };

        AnnotationHelper.resolveLineItemFacet = function (oContext) {
            var facet = AnnotationHelper._getFacetOfType(oContext, "LineItem");
            if (facet) {
                return oContext.getPath() + "/" + facet.index;
            }
            return undefined;
        };

        AnnotationHelper._getFacetOfType = function (oContext, facetType) {
            var facets = oContext.getObject();

            var targetIndex = -1;
            var targetFacet = null;
            if (Array.isArray(facets)) {
                jQuery.each(facets, function (i, facet) {
                    if (facet.Target && facet.Target.AnnotationPath && facet.Target.AnnotationPath.indexOf(facetType) >= 0) {
                        targetIndex = i;
                        targetFacet = facet;
                    }
                });
            }

            if (targetIndex >= 0) {
                return {
                    facet: targetFacet,
                    index: targetIndex
                };

            }
            return undefined;
        };


        AnnotationHelper.getAllPropertyPathsFromFacet = function (context, facetType) {
            var oInterface = AnnotationHelper.createFormatterInterface(context);

            var oMetaModel = context.getModel().getMetaModel();
            var oMetaData = AnnotationHelper.getMetaDataForContext(context);
            var oMetaDataContext = AnnotationHelper.getMetaModelContextForFacetType(oInterface,
                    oMetaData.entityType.namespace + "." + oMetaData.entityType.name, facetType);

            var oResolvedPath = ODataAnnoHelper.resolvePath(oMetaDataContext);
            var oResolvedProperty = oMetaModel.getProperty(oResolvedPath);

            var array = oResolvedProperty.Data || oResolvedProperty;

            var propertyPaths = [];

            if (array && Array.isArray(array)) {
                jQuery.each(array, function (index, anno) {
                    if (anno.RecordType == 'com.sap.vocabularies.UI.v1.DataField' && anno.Value && anno.Value.Path) {
                        propertyPaths.push(anno.Value.Path);
                    }
                });
            }

            return propertyPaths;
        };


        AnnotationHelper.getMetaModelContextForFacetType = function (oInterface, entityType, facetType) {
            var oMetaModel = oInterface.getModel() || oInterface.getModel(0);

            var oEntityTypeMeta = oMetaModel.getODataEntityType(entityType);

            var aSupportedQuickActions = ["QuickCreate", "QuickView"];

            var sFacetKey = "";
            var oMetaDataContext = null;

            var facets = null;

            for (var i = 0; i < aSupportedQuickActions.length; i++) {
                sFacetKey = "com.sap.vocabularies.UI.v1." + aSupportedQuickActions[i] + "Facets";
                if (oEntityTypeMeta[sFacetKey]) {
                    facets = oEntityTypeMeta[sFacetKey];
                    break;
                }
            }

            if (facets) {
                var targetIndex = -1;
                if (Array.isArray(facets)) {
                    jQuery.each(facets, function (i, facet) {
                        if (facet.Target && facet.Target.AnnotationPath && facet.Target.AnnotationPath.indexOf(facetType) >= 0) {
                            targetIndex = i;
                        }
                    });
                }

                if (targetIndex >= 0) {
                    oMetaDataContext = new Context(oMetaModel, oEntityTypeMeta.$path + "/" + sFacetKey + "/" + targetIndex + "/Target");
                }
            }

            return oMetaDataContext;
        };

        AnnotationHelper.formatExpandBindingPathForHeaderObject = function (oInterface, entityType) {

            var headerPaths = AnnotationHelper.getNavigationPathsFromFacet(oInterface, entityType, "FieldGroup");

            return AnnotationHelper.formatExpandPaths(headerPaths);

        };


        AnnotationHelper.getMetaDataForContext = function (oContext) {

            var oMetaModel = oContext.getModel().getMetaModel();

            var oEntityTypeMeta = oMetaModel.getODataEntityType(oContext.getObject().__metadata.type);

            var sEntitySetName = null;
            var oEntitySets = oMetaModel.getProperty(oMetaModel.getODataEntityContainer(true)).entitySet;
            jQuery.each(oEntitySets, function (i, eSet) {
                if (eSet.entityType === oContext.getObject().__metadata.type) {
                    sEntitySetName = eSet.name;
                }
            });

            var oEntitySetMeta = oMetaModel.getODataEntitySet(sEntitySetName);

            return {
                entityType: oEntityTypeMeta,
                entitySet: oEntitySetMeta
            };
        };

        AnnotationHelper.getNavigationPathsFromFacet = function (oInterface, entityType, facetType) {
            var oMetaModel = oInterface.getModel() || oInterface.getModel(0);
            var oMetaDataContext = AnnotationHelper.getMetaModelContextForFacetType(oInterface, entityType, facetType);

            if (!oMetaDataContext) {
                return [];
            }

            var oResolvedPath = ODataAnnoHelper.resolvePath(oMetaDataContext);
            var oResolvedProperty = oMetaModel.getProperty(oResolvedPath);
            var oNavPaths = {};
            var pathComponent = "/";
            if (oResolvedProperty.Data) {
                pathComponent += "Data/";
            }
            var array = oResolvedProperty.Data || oResolvedProperty;

            if (array && Array.isArray(array)) {
                jQuery.each(array, function (i, dataField) {
                    if (dataField.RecordType == 'com.sap.vocabularies.UI.v1.DataField' && dataField.Value && dataField.Value.Path) {
                        var metaContext = new Context(oMetaModel, oResolvedPath + pathComponent + i + "/Value");
                        var navPath = ODataAnnoHelper.getNavigationPath(metaContext);
                        navPath = navPath.replace(/[{}]/g, '');
                        if (navPath) {
                            oNavPaths[navPath] = "";
                        }
                    }
                });
            }

            return Object.keys(oNavPaths);

        };

        AnnotationHelper.getLineItemsNavPropertyName = function (oInterface, entityType) {
            var oMetaDataContext = AnnotationHelper.getMetaModelContextForFacetType(oInterface, entityType, "LineItem");
            if (oMetaDataContext) {
                var sChildPropertyPath = ODataAnnoHelper.getNavigationPath(oMetaDataContext);
                sChildPropertyPath = sChildPropertyPath.replace(/[{}]/g, '');
                return sChildPropertyPath;
            }
            return undefined;
        };


        AnnotationHelper.formatBindingPathForLineItems = function (oInterface, entityType, bIsDraft) {

            var sLineItemProperty = AnnotationHelper.getLineItemsNavPropertyName(oInterface, entityType);

            if (arguments.length === 2) {
                bIsDraft = false;
            }

            if (bIsDraft) {
                var lineItemNavPaths = AnnotationHelper.getNavigationPathsFromFacet(oInterface, entityType, "LineItem");
                if (lineItemNavPaths && lineItemNavPaths.length > 0) {
                    return "{path: '" + sLineItemProperty + "', parameters : {expand:'"
                        + AnnotationHelper.formatExpandPaths(lineItemNavPaths)
                        + "'}}";
                }
            }

            return "{path: '" + sLineItemProperty + "'}";

        };

        AnnotationHelper.formatExpandPaths = function (aExpandPaths) {
            var sExpandParam = "";
            for (var i = 0; i < aExpandPaths.length; i++) {
                sExpandParam += aExpandPaths[i];
                if (i < aExpandPaths.length - 1) {
                    sExpandParam += ",";
                }
            }
            return sExpandParam;
        };

        AnnotationHelper.createFormatterInterface = function (oBindingContext) {

            var oMetaContext = oBindingContext.getModel().getMetaModel().getMetaContext(oBindingContext.getPath());

            var oInterface = {
                getModel: function () {
                    return oBindingContext.getModel().getMetaModel();
                },

                getContext: function () {
                    return oMetaContext;
                },

                getPath: function () {
                    return oMetaContext.getPath();
                }
            };

            return oInterface;

        };


        AnnotationHelper.formatBindingPathForLineItems.requiresIContext = true;
        AnnotationHelper.getMetaModelContextForFacetType.requiresIContext = true;
        AnnotationHelper.formatExpandBindingPathForHeaderObject.requiresIContext = true;
        AnnotationHelper.resolveFieldGroupTarget.requiresIContext = true;
        AnnotationHelper.resolveLineItemTarget.requiresIContext = true;
        AnnotationHelper.resolveLineItemFacet.requiresIContext = true;
        AnnotationHelper.resolveFieldGroupFacet.requiresIContext = true;


        return AnnotationHelper;

    }, true);
