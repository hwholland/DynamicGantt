sap.ui.define([
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'sap/viz/ui5/controls/common/feeds/FeedItem',
        'sap/viz/ui5/data/FlattenedDataset',
        './CustomerFormat',
        './InitPage'
    ], function(jQuery, Controller, JSONModel, FeedItem, FlattenedDataset, CustomerFormat, InitPageUtil) {
    "use strict";
    
    var Controller = Controller.extend("sap.viz.sample.NegativeValues.NegativeValues", {
        
        dataPath : "test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_profit_percentage",
        
        settingsModel : {
            chartType : {
                name: "Chart Type",
                defaultSelected : 0,
                values : [{
                    type : "Bar",
                    key : "0",
                    json : "/negative1series.json",
                    value : ["Profit"],
                    vizType : "bar",
                    dataset : {
                        dimensions: [{
                            name: "Store Name",
                            value: "{Store Name}"
                        }],
                        measures: [{
                            name: 'Profit',
                            value: '{Profit}'
                        }],
                        data: {
                            path: "/milk"
                        }
                    },
                    vizProperties : {
                        plotArea: {
                            dataLabel: {
                                formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
                                visible: true
                            }
                        },
                        valueAxis: {
                            label: {
                                formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                            },
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            },
                            label : {
                                rotation : 'auto',
                                angle : 45
                            }
                        },
                        title: {
                            visible: false,
                            text: 'Revenue by City and Store Name'
                        }
                    }
                },{
                    type : "Bubble",
                    key : "1",
                    json : "/negative1series.json",
                    value : ["Revenue"],
                    vizType : "bubble",
                    dataset : {
                        measures: [{
                            name: 'Revenue',
                            value: '{Revenue}'
                        }, {
                            name: 'Revenue Growth',
                            value: '{Revenue Growth}'
                        },
                        {
                            name: 'Profit',
                            value: '{Profit}'
                        }],
                        data: {
                            path: "/milk"
                        }
                    },
                    vizProperties : {
                        plotArea: {
                            dataLabel: {
                                formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
                                visible: true,
                                hideWhenOverlap: true,
                                respectShapeWidth:true
                            }
                        },
                        valueAxis: {
                            label: {
                                formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                            },
                            title: {
                                visible: false
                            }
                        },
                        valueAxis2: {
                            label: {
                                formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                            },
                            title: {
                                visible: false
                            }
                        },
                        sizeLegend: {
                            formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
                            title: {
                                visible: true
                            }
                        },
                        title: {
                            visible: false,
                            text: 'Revenue by City and Store Name'
                        }
                    }
                },{
                    type : "Column",
                    key : "2",
                    json : "/negative1series.json",
                    value : ["Profit"],
                    vizType : "column",
                    dataset : {
                        dimensions: [{
                            name: "Store Name",
                            value: "{Store Name}"
                        }],
                        measures: [{
                            name: 'Profit',
                            value: '{Profit}'
                        }],
                        data: {
                            path: "/milk"
                        }
                    },
                    vizProperties : {
                        plotArea: {
                            dataLabel: {
                                formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
                                visible: true
                            }
                        },
                        valueAxis: {
                            label: {
                                formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                            },
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            },
                            label : {
                                rotation : 'auto',
                                angle : 45
                            }
                        },
                        title: {
                            visible: false,
                            text: 'Revenue by City and Store Name'
                        }
                    }
                },{
                    type : "Combined Column + Line",
                    key : "3",
                    json : "/negative1series.json",
                    value : ["Revenue", "Profit"],
                    vizType : "combination",
                    dataset : {
                        dimensions: [{
                            name: "Store Name",
                            value: "{Store Name}"
                        }],
                        measures: [{
                            name: 'Revenue',
                            value: '{Revenue}'
                        }, {
                            name: 'Profit',
                            value: '{Profit}'
                        }],
                        data: {
                            path: "/milk"
                        }
                    },
                    vizProperties : {
                        plotArea: {
                            dataLabel: {
                                visible: true
                            },
                            dataShape: {
                                primaryAxis: ["line", "bar", "bar"]
                            }
                        },
                        valueAxis: {
                            label: {
                                formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                            },
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            },
                            label : {
                                rotation : 'auto',
                                angle : 45
                            }
                        },
                        title: {
                            visible: false
                        }
                    }
                },{
                    type : "Line with time axis",
                    key : "4",
                    json : "/date.json",
                    value : ["Profit"],
                    vizType : "timeseries_line",
                    dataset : {
                        dimensions: [{
                            name: 'Date',
                            value: "{Date}",
                            dataType:'date'
                        }],
                        measures: [{
                            name: 'Profit',
                            value: '{Profit}'
                        }],
                        data: {
                            path: "/milk"
                        }
                    },
                    vizProperties : {
                        plotArea: {
                            window: {
                                start: "7/5/2012",
                                end: "8/13/2012"
                            },
                            dataLabel: {
                                visible: true
                            }
                        },
                        timeAxis: {
                            title: {
                                visible: false
                            },
                            levelConfig: {
                                "year": {
                                    row: 2
                                }
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            },
                            label : {
                                rotation : 'auto',
                                angle : 45
                            }
                        },
                        title: {
                            visible: false
                        }
                    }
                },{
                    type : "Stacked Bar",
                    key : "5",
                    json : "/negative2series.json",
                    value : ["Profit"],
                    vizType : "stacked_bar",
                    dataset : {
                        dimensions: [{
                            name: "Store Name",
                            value: "{Store Name}"
                        }, {
                            name: "Fat Percentage",
                            value: "{Fat Percentage}"
                        }],
                        measures: [{
                            name: 'Profit',
                            value: '{Profit}'
                        }],
                        data: {
                            path: "/milk"
                        }
                    },
                    vizProperties : {
                        plotArea: {
                            dataLabel: {
                                visible: true,
                                formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2
                            }
                        },
                        valueAxis: {
                            label: {
                                formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                            },
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            },
                            label : {
                                rotation : 'auto',
                                angle : 45
                            }
                        },
                        title: {
                            visible: false,
                            text: 'Revenue by City and Store Name'
                        }
                    }
                },{
                    type : "Stacked Column",
                    key : "6",
                    json : "/negative2series.json",
                    value : ["Profit"],
                    vizType : "stacked_column",
                    dataset : {
                        dimensions: [{
                            name: "Store Name",
                            value: "{Store Name}"
                        }, {
                            name: "Fat Percentage",
                            value: "{Fat Percentage}"
                        }],
                        measures: [{
                            name: 'Profit',
                            value: '{Profit}'
                        }],
                        data: {
                            path: "/milk"
                        }
                    },
                    vizProperties : {
                        plotArea: {
                            dataLabel: {
                                visible: true,
                                formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2
                            }
                        },
                        valueAxis: {
                            label: {
                                formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                            },
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            },
                            label : {
                                rotation : 'auto',
                                angle : 45
                            }
                        },
                        title: {
                            visible: false,
                            text: 'Revenue by City and Store Name'
                        }
                    }
                }]
            }
        },
        
        oVizFrame : null, flattenedDataset : null,
        onInit : function (evt) {
            this.initCustomFormat();
            // set explored app's demo model on this sample
            var oModel = new JSONModel(this.settingsModel);
            oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
            this.getView().setModel(oModel);
            
            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties(this.settingsModel.chartType.values[0].vizProperties);
            var dataModel = new JSONModel(this.dataPath + "/negative1series.json");
            oVizFrame.setModel(dataModel);
            
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
            
            InitPageUtil.initPageSettings(this.getView());
        },
        onAfterRendering : function(){
            var chartTypeSelect = this.getView().byId('chartTypeSelect');
            chartTypeSelect.setSelectedIndex(this.settingsModel.chartType.defaultSelected);
        },
        onChartTypeChanged : function(oEvent){
            if(this.oVizFrame){
                var selectedKey = parseInt(oEvent.getSource().getSelectedKey());
                var bindValue = this.settingsModel.chartType.values[selectedKey];
                this.oVizFrame.destroyDataset();
                this.oVizFrame.destroyFeeds();
                this.oVizFrame.setVizType(bindValue.vizType);
                this.oVizFrame.setVizProperties(bindValue.vizProperties);
                var feedValueAxis = new FeedItem({
                    'uid': "valueAxis",
                    'type': "Measure",
                    'values': bindValue.value
                }),
                feedCategoryAxis = new FeedItem({
                    'uid': "categoryAxis",
                    'type': "Dimension",
                    'values': ["Store Name"]
                }),
                feedValueAxis2 = new FeedItem({
                    'uid': "valueAxis2",
                    'type': "Measure",
                    'values': ["Revenue Growth"]
                }),
                feedBubbleWidth = new FeedItem({
                    'uid': "bubbleWidth",
                    'type': "Measure",
                    'values': ["Profit"]
                }),
                feedTimeAxis = new FeedItem({
                    'uid': "timeAxis",
                    'type': "Dimension",
                    'values': ["Date"]
                }),
                feedColor = new FeedItem({
                    'uid': "color",
                    'type': "Dimension",
                    'values': ["Fat Percentage"]
                });
                switch(selectedKey){
                    case 0:
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedCategoryAxis);
                        break;
                    case 1:
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedValueAxis2);
                        this.oVizFrame.addFeed(feedBubbleWidth);
                        break;
                    case 2:
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedCategoryAxis);
                        break;
                    case 3:
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedCategoryAxis);
                        break;
                    case 4:
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedTimeAxis);
                        break;
                    default : 
                        this.oVizFrame.addFeed(feedValueAxis);
                        this.oVizFrame.addFeed(feedCategoryAxis);
                        this.oVizFrame.addFeed(feedColor);
                }
                var oDataset = new FlattenedDataset(bindValue.dataset);
                this.oVizFrame.setDataset(oDataset);
                var dataModel = new JSONModel(this.dataPath + bindValue.json);
                this.oVizFrame.setModel(dataModel);
            }
        },
        initCustomFormat : function(){
            CustomerFormat.registerCustomFormat();
        }
    }); 
 
    return Controller;
 
});