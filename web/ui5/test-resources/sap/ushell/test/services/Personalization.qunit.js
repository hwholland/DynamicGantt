// @copyright@
/**
 * @fileOverview QUnit tests for sap.ushell.services.Personalization
 */
(function () {
    "use strict";

    /*jslint nomen: true, sub: true*/
    /*global asyncTest, deepEqual, equal, module, QUnit,
    ok, parseInt, start, strictEqual, stop, test, throws,
    sinon, jQuery, sap, window
     */

    jQuery.sap.declare("sap.ushell.adapters.mock.PersonalizationAdapter");
    jQuery.sap.require("sap.ushell.test.utils");
    jQuery.sap.require("sap.ushell.services.Personalization");
    jQuery.sap.require("sap.ui.core.UIComponent");
    jQuery.sap.require("sap.ushell.shells.demo.fioriDemoConfig");

    var sCONTAINERPREFIX = "sap.ushell.personalization#",
        sCONTAINER = "sap.ushell.test.personalization",
        sITEM = "serviceTest",
        sITEMKEY = "ItemKey",
        sABAPTIMESTAMPFORMAT = "yyyyMMddHHmmss",
        sVARIANT_KEY = "VariantKey",
        sVARIANT_SET_KEY = "variantSetKey",
        sVARIANT_NAME = "Variant Name",
        sCachedConfig;




    //  ............................................................................
    //
    //             Transient Personalizer
    //
    //  ............................................................................

    module("sap.ushell.services.Personalization: TransientPersonalizer", {
        setup : function () {
            this.oITEMVALUE = {"v1": "false"};
            this.oTransientPersonalizer = new sap.ushell.services.Personalization(null).getTransientPersonalizer();
        },
        teardown : function () {
            delete this.oITEMVALUE;
            delete this.oTransientPersonalizer;
        }
    });


    test("setValue/getValue", function () {
        this.oTransientPersonalizer.setValue(this.oITEMVALUE);
        QUnit.assert.equal(this.oITEMVALUE, this.oTransientPersonalizer.getValue(),
                "getValue returned the previous setted value correctly");
    });

    asyncTest("setPersData + getValue", function () {
        var that = this;

        this.oTransientPersonalizer.setPersData(this.oITEMVALUE)
            .done(function () {
                start();
                deepEqual(that.oITEMVALUE, that.oTransientPersonalizer.getValue(), "Written data was read");
            });
    });

    asyncTest("setValue + getPersData", function () {
        var that = this;

        this.oTransientPersonalizer.setValue(this.oITEMVALUE);
        this.oTransientPersonalizer.getPersData()
            .done(function (oReadValue) {
                start();
                deepEqual(that.oITEMVALUE, oReadValue, "Written data was read");
            });
    });

    asyncTest("setPersData, getPersData, delPersData", function () {
        var that = this;

        this.oTransientPersonalizer.setPersData(this.oITEMVALUE)
            .done(function () {
                start();
                deepEqual(that.oITEMVALUE, that.oTransientPersonalizer.getValue(), "Pers data was written");
                stop();
                that.oTransientPersonalizer.getPersData()
                    .done(function (oReadValue) {
                        start();
                        deepEqual(that.oITEMVALUE, oReadValue, "Pers data was read");
                        stop();
                        that.oTransientPersonalizer.delPersData()
                            .done(function () {
                                start();
                                deepEqual(undefined, that.oTransientPersonalizer.getValue(), "Pers data was deleted");
                            });
                    });
            });
    });



    //  ............................................................................
    //
    //               Personalizer
    //
    //  ............................................................................


    module("sap.ushell.services.Personalization: Personalizer", {
        setup : function () {
            this.oAdapter = {};
            this.oService = {};
            this.oPersonalizer = {};
            this.oPersId = {
                container : sCONTAINER,
                item : sITEM
            };
            var oSystem;

            this.oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
            stop();
            this.oService = new sap.ushell.services.Personalization(this.oAdapter);
            this.oPersonalizer = this.oService.getPersonalizer(this.oPersId, { validity : Infinity });
            this.oPersonalizer.delPersData().done(function () {
                start();
            }).fail(function () {
                start();
            });
        },
        teardown : function () {
            //stop();
//            this.oPersonalizer.getPersonalizer(this.oPersId).delPersData().done(function () {
//                start();
//            }).fail(function () { start() });
            delete this.oAdapter;
            delete this.oPersId;
            delete this.oPersonalizer;
        }
    });


    asyncTest("set + get + delete", function () {
        var oPromiseSetter,
            that = this;

        oPromiseSetter = this.oPersonalizer.setPersData(this.oItemValue);
        oPromiseSetter.done(function () {
            var oPromiseGetter1;
            start();
            ok(true, "Personalization data was set");
            stop();
            oPromiseGetter1 = that.oPersonalizer.getPersData();
            oPromiseGetter1.done(function (oReadValue) {
                var oPromiseDel;

                start();
                ok(true, "Personalization data was gotten");
                deepEqual(oReadValue, that.oItemValue,
                        "Read value is the written value");
                stop();
                oPromiseDel = that.oPersonalizer.delPersData();
                oPromiseDel.done(function () {
                    var oPromiseGetter2;

                    oPromiseGetter2 = that.oPersonalizer.getPersData();
                    oPromiseGetter2.done(function (oReadValue) {
                        start();
                        ok(true, "Personalization data was deleted");
                        equal(oReadValue, undefined,
                                "Personalization data was deleted - value is undefined");
                    });
                    oPromiseGetter2.fail(function () {
                        start();
                        ok(false, "'Error' fail function of getter2 was triggered");
                    });
                    oPromiseDel.fail(function () {
                        start();
                        ok(false, "'Error' fail function of deleter was triggered");
                    });
                });
                oPromiseGetter1.fail(function () {
                    start();
                    ok(false, "'Error' fail function of getter1 was triggered");
                });
            });
            oPromiseSetter.fail(function () {
                start();
                ok(false, "'Error' fail function of setter was triggered");
            });
        });
    });

    asyncTest("delete non-existent item", function () {
        var oPromiseDeleter;

        oPromiseDeleter = this.oPersonalizer.delPersData();
        oPromiseDeleter.done(function () {
            start();
            ok(true, "Deletion of non-existent item did not lead to an error");
        });
        oPromiseDeleter.fail(function () {
            start();
            ok(false, "'Error' fail function of deleter was triggered");
        });
    });

    test("getPersonalizer", function () {
        var fnGetContainer = sinon.stub(this.oService, "getContainer"),
            oPersonalizer,
            oScope = {},
            oComponent = {};

        //code under test
        oPersonalizer = this.oService.getPersonalizer(this.oPersId, oScope, oComponent);
        oPersonalizer._getContainer("foo");

        // tests
        ok(fnGetContainer.calledOnce);
        sinon.assert.calledWithExactly(fnGetContainer, "foo", oScope, oComponent);
    });

    test("getPersonalizer with wrong oPersId", function () {
        var oPersonalizer,
            oPersId;

        oPersId = {
            wrongContainer : sCONTAINER,
            wrongItem : "DummyNonExisting"
        };
        try {
            oPersonalizer = new sap.ushell.services.Personalization(this.oAdapter).getPersonalizer(oPersId);
            ok(false, "Wrong oPersId wasn't detected");
        } catch (e1) {
            ok(true, "Wrong oPersId was detected");
        }

        oPersId = {
            container : {
                value1 : "value1",
                value2 : "value2"
            },
            item : "DummyNonExisting"
        };
        try {
            oPersonalizer = new sap.ushell.services.Personalization(this.oAdapter).getPersonalizer(oPersId);
            oPersonalizer.setPersData({ value : "value100" });
            ok(false, "Wrong oPersId wasn't detected");
        } catch (e2) {
            ok(true, "Wrong oPersId was detected");
        }

        oPersId = {
            container : sCONTAINER,
            item : {
                value1 : "value1",
                value2 : "value2"
            }
        };
        try {
            oPersonalizer = new sap.ushell.services.Personalization(this.oAdapter).getPersonalizer(oPersId);
            oPersonalizer.setPersData({ value : "value100" });
            ok(false, "Wrong oPersId wasn't detected");
        } catch (e3) {
            ok(true, "Wrong oPersId was detected");
        }
    });




    //  ............................................................................
    //
    //             Variant Version 2
    //
    //  ............................................................................


    module("sap.ushell.services.Personalization: Variant V2", {
        setup : function () {
            this.oService = {};
            this.oVariant = {};
            this.oContainerVSAdapter = {};
            this.oVariantSet = {};
            this.oVariant1 = {};
            this.oITEMVALUE = {
                Item1 : "Item 1",
                Item2 : "Item 2"
            };
            var oSystem,
                oAdapter,
                that = this;
            stop();
            oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
            this.oService = new sap.ushell.services.Personalization(oAdapter);
            //this.oService.delContainer()
            this.oService.createEmptyContainer(sCONTAINER, { validity : Infinity })
                .done(function (oContainer) {
                    start();
                    that.oContainerVSAdapter = new sap.ushell.services.Personalization.VariantSetAdapter(oContainer);
                    that.oVariant = new sap.ushell.services.PersonalizationContainerVariant(sVARIANT_KEY,
                            sVARIANT_NAME, that.oITEMVALUE);
                    that.oVariantSet = that.oContainerVSAdapter.addVariantSet(sVARIANT_SET_KEY);
                    that.oVariant1 = that.oVariantSet.addVariant(sVARIANT_NAME);
                    that.oVariant1.setItemValue("Item_1", that.oITEMVALUE);
                });
        },
        teardown : function () {
            if (this.thestub) {
                this.thestub.restore();
            }
            this.oService.delContainer(sCONTAINER, { validity : Infinity });
            this.oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
            delete this.oService;
            delete this.oContainerVSAdapter;
            delete this.oITEMVALUE;
            delete this.oVariant;
            delete this.oVariant1;
            delete this.oVariantSet;
        }
    });

    // ........... Variant Tests ...........

    test("Variant: create variant and check variant key, name and data", function () {
        // check variant key
        QUnit.assert.equal(sVARIANT_KEY, this.oVariant.getVariantKey(),
                "Variant key is correctly stored");
        // check variant name
        QUnit.assert.equal(sVARIANT_NAME, this.oVariant.getVariantName(),
                "Variant name is correctly stored");
        // check variant data
        QUnit.assert.equal(this.oITEMVALUE.Item1, this.oVariant.getItemValue("Item1"),
                "Item1 value is correctly stored");
        QUnit.assert.equal(this.oITEMVALUE.Item2, this.oVariant.getItemValue("Item2"),
                "Item2 value is correctly stored");
    });

    test("Variant: create variant add, change and delete item", function () {
        var aItemKeys;

        // add
        this.oVariant.setItemValue("Item3", "Item 3");
        QUnit.assert.equal(this.oITEMVALUE.Item3, this.oVariant.getItemValue("Item3"),
                "Item3 value is correctly stored");
        QUnit.assert.equal(true, this.oVariant.containsItem("Item3"), "containsItem works correctly");
        // change
        this.oVariant.setItemValue("Item1", "Item 42");
        QUnit.assert.equal("Item 42", this.oVariant.getItemValue("Item1"),
                "Item1 value is changed correctly");
        QUnit.assert.equal("Item 42", this.oITEMVALUE.Item1,
                "Data object handed over to constructor is changed!");
        // get keys
        aItemKeys = this.oVariant.getItemKeys();
        deepEqual([ "Item1", "Item2", "Item3" ], aItemKeys,
                "The correct array of item keys is returned by getItemKeys");
        // delete
        this.oVariant.delItem("Item2");
        QUnit.assert.equal(false, this.oVariant.containsItem("Item2"),
                "delItem works correctly");
        QUnit.assert.equal(undefined, this.oVariant.getItemValue("Item2"),
                "getItemValue for a non-existant item returns undefined");
    });

    test("Variant: create a variant with a non-string key", function () {
        var sVariantKey, unused;

        sVariantKey = ["0"];
        try {
            unused = new sap.ushell.services.PersonalizationContainerVariant(
                sVariantKey, sVARIANT_NAME, {});
            unused = !unused; // eslint
            ok(false, "Error: Non-string key was not detected.");
        } catch (e) {
            ok(true, "Non-string key was was detected.");
        }
    });

    test("Variant: create a variant with a non-string name", function () {
        var sVariantName, unused;

        sVariantName = ["ArrayVariantName"];
        try {
            unused = new sap.ushell.services.PersonalizationContainerVariant(
                sVARIANT_KEY, sVariantName, {});
            unused = !unused; // eslint
            ok(false, "Error: Non-string name was not detected.");
        } catch (e) {
            ok(true, "Non-string name was was detected.");
        }
    });

    test("Variant: create a variant with an exotic name", function () {
        var sVariantName, unused;

        sVariantName = "未经";
        unused = new sap.ushell.services.PersonalizationContainerVariant(
            sVARIANT_KEY, sVariantName, {});
        unused = !unused; // eslint
        ok(true, "Variant name '" + sVariantName + "' was handled with no error during variant creation.");
    });

    test("Variant: delete a non-existent item", function () {
        this.oVariant.delItem("NonExistentItemKey...");
        ok(true, "Non-existent item was deleted without error.");
    });

    test("Variant: getItemValue for non-existent item", function () {
        var oItemValue;

        oItemValue = this.oVariant.getItemValue("NonExistentItemKey...");
        QUnit.assert.equal(undefined, oItemValue, "Correct value undefined was returned.");
    });

    test("Variant: serialization", function () {
        var oVariantData = {},
            oSerializationResult = {},
            oSerializationExp = {};

        this.oVariant = new sap.ushell.services.PersonalizationContainerVariant(sVARIANT_KEY, sVARIANT_NAME, {});
        oVariantData.item1 = this.oITEMVALUE;
        oVariantData.item2 = this.oITEMVALUE;
        oSerializationExp.name = sVARIANT_NAME;
        oSerializationExp.variantData = oVariantData;
        this.oVariant.setItemValue("item1", this.oITEMVALUE);
        this.oVariant.setItemValue("item2", this.oITEMVALUE);
        oSerializationResult = this.oVariant._serialize();
        QUnit.assert.deepEqual(oSerializationResult, oSerializationExp,
                "Serialization of variant works correctly");
    });


    test("Variant: set variant name", function () {
        var sNEW_VARIANT_NAME = "New variant name",
            sVariantKey,
            oVariant2;

        this.oVariant1.setVariantName(sNEW_VARIANT_NAME);

        // -- test
        // -- assertions
        sVariantKey = this.oVariantSet.getVariantKeyByName(sNEW_VARIANT_NAME);
        QUnit.assert.equal(sVariantKey, this.oVariant1.getVariantKey(),
            "Variant set contains variant with new name '" + sNEW_VARIANT_NAME + "'");

        oVariant2 = this.oVariantSet.getVariant(sVariantKey);
        QUnit.assert.deepEqual(oVariant2.getItemValue("Item_1"), this.oITEMVALUE,
            "Renamed variant has same value for Item_1");

        oVariant2 = this.oVariantSet.getVariant(sVariantKey);
        QUnit.assert.deepEqual(oVariant2.getItemValue("Item_1"), this.oITEMVALUE,
            "Renamed variant has same value for Item_1 (after getVariant())");

        this.oVariantSet = this.oContainerVSAdapter.getVariantSet(sVARIANT_SET_KEY);
        sVariantKey = this.oVariantSet.getVariantKeyByName(sNEW_VARIANT_NAME);
        QUnit.assert.equal(sVariantKey, this.oVariant1.getVariantKey(),
            "Variant set updated in container");
        oVariant2 = this.oVariantSet.getVariant(sVariantKey);
        QUnit.assert.deepEqual(oVariant2.getItemValue("Item_1"), this.oITEMVALUE,
            "Variant set data updated in container");
    });


    test("Variant: set variant name - input validation", function (assert) {
        // -- test
        // -- assertions
        assert.throws(function () {
            this.oVariant1.setVariantName(0);
        }, /Parameter value of sVariantName is not a string/, "Exception raised if sVariantName not a string ");

    });


    test("Variant: set variant name - variant does not exist in variant set", function (assert) {
        var sNEW_VARIANT_NAME = "New variant name",
            sVariantKey;

        sVariantKey = this.oVariant1.getVariantKey();
        this.oVariantSet.delVariant(sVariantKey);

        // -- test
        // -- assertions
        assert.throws(function () {
            this.oVariant1.setVariantName(sNEW_VARIANT_NAME);
        }, /Variant does not longer exist/, "Exception raised if variant does not exist anymore");

    });


    test("Variant: set variant name - new variant already exists", function (assert) {
        var sNEW_VARIANT_NAME = "New variant name",
            oVariant2 = this.oVariantSet.addVariant(sNEW_VARIANT_NAME);

        oVariant2 = oVariant2; // eslint

        // -- test
        // -- assertions
        assert.throws(function () {
            this.oVariant1.setVariantName(sNEW_VARIANT_NAME);
        }, /Variant with name 'New variant name' already exists in variant set/, "Exception raised if new variant already exists");
    });





    //  ............................................................................
    //
    //               Container Version 2
    //
    //  ............................................................................

    module("sap.ushell.services.Personalization: Container V2", {
        setup : function () {
            this.oService = {};
            this.oContainer = {};
            this.oVariantSet = {};
            this.oContainerVSAdapter = {};
            this.oITEMVALUE = {"v1": "false"};
            this.oComponent = undefined;
            var oSystem,
                oAdapter,
                that = this;
            oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
            this.oService = new sap.ushell.services.Personalization(oAdapter);
            stop();
            this.oService.createEmptyContainer(sCONTAINER, { validity : Infinity })
                .done(function (oContainer) {
                    start();
                    that.oContainer = oContainer;
                    that.oContainerVSAdapter = new sap.ushell.services.Personalization.VariantSetAdapter(that.oContainer);
                    that.oVariantSet = that.oContainerVSAdapter.addVariantSet(sVARIANT_SET_KEY);
                });
        },
        teardown : function () {
            if (this.oService.getContainer.restore) {
                this.oService.getContainer.restore();
            }
            if (sap.ushell.services.Personalization.ContextContainer.restore) {
                sap.ushell.services.Personalization.ContextContainer.restore();
            }
            this.oService.delContainer(sCONTAINER, { validity : Infinity });
            this.oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
            delete this.oService;
            delete this.oContainer;
            delete this.oVariantSet;
            delete this.oITEMVALUE;
            delete this.oContainerVSAdapter;
        }
    });


 // ........... Container Item Tests ...........


    test("Items: set, get and delete undefined value (!) item", function () {
        var oItemValueRead;
//        oItemValue = undefined; // !!!

        // demonstrate that one can set / get undefined
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " is not exisiting");
        this.oContainer.setItemValue(sITEMKEY, this.oITEMVALUE);
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " exisits after setItemValue");
        oItemValueRead = this.oContainer.getItemValue(sITEMKEY);
        deepEqual(this.oITEMVALUE, oItemValueRead, "getItemValue returns the correct value for " + sITEMKEY);
        // does not hold ok(oItemValue !== oItemValueRead, "distinct objects");
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), "containsItem returned true correctly for " + sITEMKEY);
        this.oContainer.delItem(sITEMKEY);
        QUnit.assert.equal(typeof this.oContainer.getItemValue(sITEMKEY), "undefined", "Item was deleted, getItemValue returned null");
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), "containsItem returned false correctly");
    });


    test("Items: set, get and delete null value (!) item", function () {
        var oItemValueRead;

        // demonstrate that one can set / get undefined
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " is not exisiting");
        this.oContainer.setItemValue(sITEMKEY, this.oITEMVALUE);
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " exisits after setItemValue");
        oItemValueRead = this.oContainer.getItemValue(sITEMKEY);
        deepEqual(this.oITEMVALUE, oItemValueRead, "getItemValue returns the correct value for " + sITEMKEY);
        // does not hold ok(oItemValue !== oItemValueRead, "distinct objects");
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), "containsItem returned true correctly for " + sITEMKEY);
        this.oContainer.delItem(sITEMKEY);
        QUnit.assert.equal(typeof this.oContainer.getItemValue(sITEMKEY), "undefined", "Item was deleted, getItemValue returned null");
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), "containsItem returned false correctly");
    });

    [
        {},
        { v1 : "abc" },
        { v1 : "abc", v2 : [1, 2], v3 : { v1 : "abc" } },
        [1, 2, 3],
        []
    ].forEach(function (oFixture2) {
        test("Items: set, get and delete value (!) item", function () {
            var oItemValue = oFixture2,
                oItemValueRead;

            QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " is not exisiting");
            this.oContainer.setItemValue(sITEMKEY, oItemValue);
            QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " exisits after setItemValue");
            oItemValueRead = this.oContainer.getItemValue(sITEMKEY);
            deepEqual(oItemValue, oItemValueRead, "getItemValue returns the correct value for " + sITEMKEY);
            ok(oItemValue !== oItemValueRead, "distinct objects");
            QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), "containsItem returned true correctly for " + sITEMKEY);
            this.oContainer.delItem(sITEMKEY);
            ok(this.oContainer.getItemValue(sITEMKEY) === undefined, "Item was deleted, getItemValue returned null");
            QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), "containsItem returned false correctly");
        });
    });


    [
        { obj : -Infinity, repr : null },
        { obj : /abc/, repr : {} },
        { obj : Number(1234), repr : 1234 },
        { obj : Number(Infinity), repr : null}
    ].forEach(function (oFixture) {
        test("Items: set, get and delete mapped value item", function () {
            var oItemValue = oFixture.obj,
                oItemValueRead;

            QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " is not exisiting");
            this.oContainer.setItemValue(sITEMKEY, oItemValue);
            QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " exisits after setItemValue");
            oItemValueRead = this.oContainer.getItemValue(sITEMKEY);
            deepEqual(oFixture.repr, oItemValueRead, "getItemValue returns the correct value for " + sITEMKEY);
            QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), "containsItem returned true correctly for " + sITEMKEY);
            this.oContainer.delItem(sITEMKEY);
            ok(this.oContainer.getItemValue(sITEMKEY) === undefined, "Item was deleted, getItemValue returned null");
            QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), "containsItem returned false correctly");
        });
    });

    test("getKey", function () {
        equal(this.oContainer.getKey(), sCONTAINER, "correct key returned");
    });

    test("Items: set, get and delete recursive item", function () {
        var oItemValueRead;

        // create circular object
        this.oITEMVALUE.nested = this.oITEMVALUE;
        equal(this.oContainer.getKey(), sCONTAINER);
        // nested structures are silently converted to undefined
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " is not exisiting");
        this.oContainer.setItemValue(sITEMKEY, "legal");
        try {
            this.oContainer.setItemValue(sITEMKEY, this.oITEMVALUE);
            ok(false, "no exception");
        } catch (e) {
            ok(true, "had exception");
        }
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEMKEY), sITEMKEY + " exisits after setItemValue");
        oItemValueRead = this.oContainer.getItemValue(sITEMKEY);
        deepEqual(oItemValueRead, "legal", "getItemValue returns undefined for " + sITEMKEY);
    });



    test("Items: set, get and delete item, check difficult keynames", function () {
        var sITEM_KEY = "hasOwnProperty",
            oItemValueRead;

        this.oContainer.delItem(sITEM_KEY);
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEM_KEY), "hasOwnProperty is not exisiting");
        this.oContainer.setItemValue(sITEM_KEY, this.oItemValue);
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEM_KEY), "hasOwnProperty exisits after setItemValue");
        oItemValueRead = this.oContainer.getItemValue(sITEM_KEY);
        deepEqual(this.oItemValue, oItemValueRead, "getItemValue returns the correct value for hasOwnProperty");
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEM_KEY), "containsItem returned true correctly for hasOwnProperty");
        this.oContainer.delItem(sITEM_KEY);
        QUnit.assert.equal(null, this.oContainer.getItemValue(sITEM_KEY), "Item was deleted, getItemValue returned null");
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEM_KEY), "containsItem returned false correctly");
    });


    test("Items: add items with and with no prefix, read them", function () {
        var aActItemKeys,
            that = this;

        // check if the container is empty
        QUnit.assert.equal(this.oContainer.getItemKeys().length, 0, "Container is empty");
        // add item1 with no item prefix
        // dirty hack
        this.oContainer._setItemValueInternal("item1", "prefix0", this.oITEMVALUE);
        // add item2 with item prefix
        this.oContainer.setItemValue("item2", this.oITEMVALUE);
        // add item 3 with item prefix
        this.oContainer.setItemValue("item3", this.oITEMVALUE);
        aActItemKeys = this.oContainer.getItemKeys();
        QUnit.assert.equal(aActItemKeys.length, 2, "Container has 3 items: '" + aActItemKeys + "'");
        ok(true, "Internal item keys are: " + this.oContainer._oItemMap.keys() + "'");
        QUnit.assert.equal(false, this.oContainer.containsItem("item1"), "'item1' is not detected by containsItem due to automatic prefixing!");
        stop();

        this.oContainer.save()
            .fail(function () {
                start();
                ok(false, "Error during container save");
            })
            .done(function () {
                start();
                ok(true, "Successful container save");
                stop();
                that.oContainer.load()
                    .fail(function () {
                        start();
                        ok(false, "Error during container reload");
                    })
                    .done(function () {
                        start();
                        ok(true, "Successful container relaod");
                        // check if prefix was added to item1
                        QUnit.assert.equal(false, that.oContainer.containsItem("item1"), "Container contains 'item1'");
                        that.oContainer.delItem("item1");
                        that.oContainer.delItem("item2");
                        that.oContainer.delItem("item3");
                        QUnit.assert.equal(that.oContainer.getItemKeys().length, 0, "All items are deleted");
                    });
            });
    });


    test("Items: Delete non-existent item", function () {
        ok(!this.oContainer.containsItem(sITEMKEY), "Item is not existing");
        try {
            this.oContainer.delItem(sITEMKEY);
            ok(true, "Non-existent item was deleted without error");
        } catch (e) {
            ok(false, "Error during deletion of non-existing item");
        }
    });


    test("Items: Get value of non-existent item", function () {
        var oItemValue;

        ok(!this.oContainer.containsItem(sITEMKEY), "Item is not existing");
        try {
            oItemValue = this.oContainer.getItemValue(sITEMKEY);
            ok(oItemValue === undefined, "Value of a non-existing item is undefined");
        } catch (e) {
            ok(false, "Error during getItemvalue of non-existing item");
        }
    });


    test("Variant Set: add and delete variant", function () {
        var sVariantKey1,
            sVariantKey2,
            oVariant1,
            oVariant2;

        QUnit.assert.equal(true, this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was added");
        oVariant1 = this.oVariantSet.addVariant("Variant number one added");
        sVariantKey1 = oVariant1.getVariantKey();
        QUnit.assert.equal(true, this.oVariantSet.containsVariant(sVariantKey1),
                "Variant '" + sVariantKey1 + "' was added");
        // add variant 1
        oVariant2 = this.oVariantSet.addVariant("Variant number two");
        sVariantKey2 = oVariant2.getVariantKey();
        QUnit.assert.equal(true, this.oVariantSet.containsVariant(sVariantKey2),
                "Variant '" + sVariantKey2 + "' was added");
        // delete variant 0
        this.oVariantSet.delVariant(sVariantKey1);
        QUnit.assert.equal(false, this.oVariantSet.containsVariant(sVariantKey1),
                "Variant '" + sVariantKey1 + "' was deleted");
        // delete variant 1
        this.oVariantSet.delVariant(sVariantKey2);
        QUnit.assert.equal(false, this.oVariantSet.containsVariant(sVariantKey2),
                "Variant '" + sVariantKey2 + "' was deleted");
        // delete variant set
        this.oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
        QUnit.assert.equal(false, this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was deleted");
    });


    test("Variant Set: add existing variant set", function () {
        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!this.oVariantSet.getVariantKeyByName(sVARIANT_NAME),
                "Variant with name '" +  sVARIANT_NAME + "' does not exist");
        this.oVariantSet.addVariant(sVARIANT_NAME); // add it once
        try {
            this.oVariantSet.addVariant(sVARIANT_NAME); // add it twice
            ok(false, "Error: adding the same named variant twice was not detected");
        } catch (e) {
            ok(true, "Exception for adding the same variant twice is correct");
        }
    });


    test("Variant Set: set current variant and check", function () {
        var oVariant,
            sVariantKeyExp;

        if (this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY)) {
            this.oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
        }

        oVariant = this.oVariantSet.addVariant("V1");
        oVariant.setItemValue("item", this.oItemValue);
        sVariantKeyExp = oVariant.getVariantKey();
        this.oVariantSet.setCurrentVariantKey(sVariantKeyExp);

        QUnit.assert.deepEqual(this.oVariantSet.getCurrentVariantKey(), sVariantKeyExp,
                "currentVariantKey was set correctly");
    });


    test("Variant Set: delete non-existent variant", function () {
        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!this.oVariantSet.containsVariant(sVARIANT_KEY),
                "Variant '" + sVARIANT_KEY + "' does not exist");
        try {
            this.oVariantSet.delVariant(sVARIANT_KEY);
            ok(true, "Non-existing variant was deleted without error/exception");
        } catch (e) {
            ok(false, "Error: Exception during deletion of a non-existing variant");
        }
    });


    test("Variant Set: get non-existent variant", function () {
        var oVariant;

        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!this.oVariantSet.containsVariant(sVARIANT_KEY),
                "Variant '" + sVARIANT_KEY + "' does not exist");
        try {
            oVariant = this.oVariantSet.getVariant(sVARIANT_KEY);
            ok(oVariant === undefined, "getVariant returns undefined for a non-existing variant");
        } catch (e) {
            ok(false, "Error: Exception during getVariant for a non-existing variant");
        }
    });


    test("Variant Set: add variant with an exotic name", function () {
        var sVARIANT_EXOTIC_NAME = "未经",
            oVariant;

        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!this.oVariantSet.getVariantKeyByName(sVARIANT_EXOTIC_NAME),
                "Variant with name '" +  sVARIANT_EXOTIC_NAME + "' does not exist");
        try {
            oVariant = this.oVariantSet.addVariant(sVARIANT_EXOTIC_NAME);
            ok(oVariant instanceof sap.ushell.services.Personalization.Variant, "addVariant returns a variant object");
        } catch (e) {
            ok(false, "Error: Exception during addVariant");
        }
    });


    test("Variant Set: add variant to a big max key variant set", function () {
        var sVARIANT_KEY1 = "999999",
            sVARIANT_NAME2 = "VARIANT_1115",
            oVariant2;

        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!this.oVariantSet.containsVariant(sVARIANT_KEY1),
                "Variant with key '" +  sVARIANT_KEY1 + "' does not exist");
        // add variant manually
        this.oVariantSet._oVariantSetData.variants[sVARIANT_KEY1] = { name : sVARIANT_NAME, variantData : {} };
        ok(this.oVariantSet.containsVariant(sVARIANT_KEY1),
                "Variant with key '" +  sVARIANT_KEY1 + "' and name '" + sVARIANT_NAME + "' was added");
        oVariant2 = this.oVariantSet.addVariant(sVARIANT_NAME2);
        ok(parseInt(oVariant2.getVariantKey(), 10) === parseInt(sVARIANT_KEY1, 10) + 1, "variant key was increased correctly");
    });


    test("Variant Set: getVariantKeyByName standard", function () {
        var oVariant;

        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        oVariant = this.oVariantSet.addVariant(sVARIANT_NAME);
        QUnit.assert.equal(this.oVariantSet.getVariantKeyByName(sVARIANT_NAME), oVariant.getVariantKey(),
                "getVariantKey returns the correct key");
    });


    test("Variant Set: getVariantKeyByName with non-existing name", function () {
        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        QUnit.assert.equal(this.oVariantSet.getVariantKeyByName(sVARIANT_NAME), undefined,
                "getVariantKey returns undefined for a non-existing name");
    });


    test("Variant Set: getVariantKeyByName with non-string name", function () {
        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        QUnit.assert.equal(this.oVariantSet.getVariantKeyByName(this.oVariantSet), undefined,
                "getVariantKey returns undefined for a non-string name");
    });


    test("Variant Set: getVariantNamesAndKeys", function () {
        var sVARIANT_NAME1 = "VARIANT_1",
            sVARIANT_NAME2 = "VARIANT_2",
            sVARIANT_NAME3 = "VARIANT_3",
            sVariantKey1,
            sVariantKey2,
            sVariantKey3,
            aVariantNamesAndKeys;

        ok(this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        sVariantKey1 = this.oVariantSet.addVariant(sVARIANT_NAME1).getVariantKey();
        sVariantKey2 = this.oVariantSet.addVariant(sVARIANT_NAME2).getVariantKey();
        sVariantKey3 = this.oVariantSet.addVariant(sVARIANT_NAME3).getVariantKey();
        aVariantNamesAndKeys = this.oVariantSet.getVariantNamesAndKeys();
        QUnit.assert.equal(aVariantNamesAndKeys[sVARIANT_NAME1], sVariantKey1, "result for variant 1 is correct");
        QUnit.assert.equal(aVariantNamesAndKeys[sVARIANT_NAME2], sVariantKey2, "result for variant 2 is correct");
        QUnit.assert.equal(aVariantNamesAndKeys[sVARIANT_NAME3], sVariantKey3, "result for variant 3 is correct");
    });


    test("Variant Set: add and delete variant sets", function () {
        var aActVariantSetKeys,
            aExpVariantSetKeys,
            that = this;

        aExpVariantSetKeys = ["variantSetKey", "variantSet1", "variantSet2"];
        that.oContainerVSAdapter.addVariantSet(aExpVariantSetKeys[1], that.oITEMVALUE);
        that.oContainerVSAdapter.addVariantSet(aExpVariantSetKeys[2], that.oITEMVALUE);

        // check variant sets
        aActVariantSetKeys = this.oContainerVSAdapter.getVariantSetKeys();
        aExpVariantSetKeys.forEach(function (sVariantSetKey, index) {
            deepEqual(aActVariantSetKeys[index], sVariantSetKey,
                "'" + sVariantSetKey + "' exists");
        });
        // delete
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            that.oContainerVSAdapter.delVariantSet(sVariantSetKey);
        });
        // check deletion
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            QUnit.assert.equal(false, that.oContainerVSAdapter.containsVariantSet(sVariantSetKey),
                "Container does not have variantSet '" + sVariantSetKey + "'");
        });
    });


    test("Variant Set: Delete non-existent variant set", function () {
        ok(!this.oContainerVSAdapter.containsVariantSet("NonExistingVariantSet"), "Variant set is not existing");
        try {
            this.oContainerVSAdapter.delVariantSet("NonExistingVariantSet");
            ok(true, "Non-existent variant set was deleted without error");
        } catch (e) {
            ok(false, "Error during deletion of non-existing variant set");
        }
    });

    test("Variant Set: Get non-existent variant set", function () {
        var oVariantSet;

        ok(!this.oContainerVSAdapter.containsVariantSet("NonExistingVariantSet"), "Variant set is not existing");
        try {
            oVariantSet = this.oContainerVSAdapter.getVariantSet("NonExistingVariantSet");
            ok(oVariantSet === undefined, "Non-existent variant set object is undefined");
        } catch (e) {
            ok(false, "Error during getVariantSet for a non-existing variant set");
        }
    });


    test("Variant Set: Add variant set that exists", function () {
        try {
            this.oContainerVSAdapter.addVariantSet(sVARIANT_SET_KEY);
            ok(false, "Existence of variant set was not detected");
        } catch (e) {
            ok(true, "Existence of variant set was detected");
        }
    });


    test("Container: add items and variant sets, read them separately", function () {
        var aActItemKeys,
            aExpItemKeys,
            aActVariantSetKeys,
            aExpVariantSetKeys,
            bOk = true,
            that = this;

        aExpItemKeys = ["item1", "item2", "item3"];
        aExpVariantSetKeys = ["variantSet1", "variantSet2"];
        // add items
        aExpItemKeys.forEach(function (sItemKey) {
            that.oContainer.setItemValue(sItemKey, that.oITEMVALUE);
        });
        // add variant sets
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            that.oContainerVSAdapter.addVariantSet(sVariantSetKey, that.oITEMVALUE);
        });
        // check items
        aActItemKeys = this.oContainer.getItemKeys();
        bOk = true;
        aExpItemKeys.forEach(function (sItemKey) {
            if (aActItemKeys.indexOf(sItemKey) === -1) {
                ok(false, "Container does not contain item '" + sItemKey + "'");
                bOk = false;
            }
        });
        if (bOk) { ok(true, "Item keys are correct: " + aActItemKeys); }
        // check variant sets
        aActVariantSetKeys = this.oContainerVSAdapter.getVariantSetKeys();
        bOk = true;
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            if (aActVariantSetKeys.indexOf(sVariantSetKey) === -1) {
                ok(false, "Container does not contain variant set '" + sVariantSetKey + "'");
            }
        });
        if (bOk) { ok(true, "Variant set keys are correct: " + aActVariantSetKeys); }
    });


    test("Container: add and delete variantSets/Items", function () {
        var oVariant,
            that = this;

        this.oContainer.setItemValue(sITEMKEY, this.oITEMVALUE);
        this.oContainer.setItemValue("itemKey2", "item2");

        // add variant V1
        oVariant = this.oVariantSet.addVariant("V1");
        oVariant.setItemValue("I1", {
            Val1 : "value 1",
            Val2 : "value 2"
        });
        oVariant.setItemValue("I2", {
            Filter1 : "24",
            Filter2 : "1000"
        });
        // add variant V2
        oVariant = this.oVariantSet.addVariant("V2");
        oVariant.setItemValue("I1", {
            Val1 : "value 11",
            Val2 : "value 12"
        });
        oVariant.setItemValue("I2", {
            Filter1 : "48",
            Filter2 : "50000"
        });
        // save container
        this.oContainer.save().fail(function () {
            ok(false, "Save failed");
        });
        stop();
        start();
        this.oContainer.delItem("itemKey2");
        this.oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
        this.oContainer.setItemValue("itemKey3", "item3");
        this.oContainer.save()
            .done(function () {
                ok(!that.oContainer.containsItem("itemKey2"), "itemKey2 was deleted");
                ok(!that.oContainerVSAdapter.containsVariantSet(that.sVARIANT_SET_KEY),
                        that.sVARIANT_SET_KEY + " was deleted");
                ok(that.oContainer.containsItem("itemKey3"),
                        "itemKey3 was added");
            })
            .fail(function () {
                ok(false, "Save failed");
            });
    });

    test("getContainer", function () {
        var fnCreateContainer = sinon.spy(this.oService, "_createContainer"),
            oScope = {};

        //code under test
        this.oService.getContainer("ContainerKey", oScope, this.oComponent);

        // tests
        ok(fnCreateContainer.calledOnce);
        sinon.assert.calledWithExactly(fnCreateContainer, "ContainerKey", oScope, false, this.oComponent);
    });

    test("createEmptyContainer", function () {
        var fnCreateContainer = sinon.spy(this.oService, "_createContainer"),
            oScope = {};

        //code under test
        this.oService.createEmptyContainer("ContainerKey", oScope, this.oComponent);

        // tests
        ok(fnCreateContainer.calledOnce);
        sinon.assert.calledWithExactly(fnCreateContainer, "ContainerKey", oScope, true,
            this.oComponent);
    });

    test("_createContainer", function () {
        var fnContextContainer = sinon.spy(sap.ushell.services.Personalization, "ContextContainer"),
            oScope = {
                validity: 1,
                keyCategory: "GENERATED_KEY",
                writeFrequency: "HIGH",
                clientStorageAllowed: false
            };

        //code under test
        this.oService._createContainer("ContainerKey", oScope, false, this.oComponent);

        // tests
        ok(fnContextContainer.calledOnce);
        strictEqual(fnContextContainer.firstCall.args[0], this.oService);
        strictEqual(fnContextContainer.firstCall.args[1], this.oService._oAdapterWithBackendAdapter);
        strictEqual(fnContextContainer.firstCall.args[2], "sap.ushell.personalization#ContainerKey");
        deepEqual(fnContextContainer.firstCall.args[3], oScope);
        strictEqual(fnContextContainer.firstCall.args[4], this.oComponent);
    });

    test("ContextContainer", function () {
        var oService = {},
            oAdapter = {
                getAdapterContainer: sinon.spy()
            },
            oScope = {},
            unusedContainer;

        //code under test
        unusedContainer = new sap.ushell.services.Personalization.ContextContainer(oService, oAdapter,
            "ContainerKey", oScope, this.oComponent);
        unusedContainer = !unusedContainer; // because of JSLint complains

        // tests
        ok(oAdapter.getAdapterContainer.calledOnce);
        sinon.assert.calledWithExactly(oAdapter.getAdapterContainer, "ContainerKey", oScope,
                undefined);
    });

    test("ContextContainer: component parsing", function () {
        var oService = {},
            oAdapter = {
                getAdapterContainer: sinon.spy()
            },
            oScope = {},
            unusedContainer;

        //code under test
        unusedContainer = new sap.ushell.services.Personalization.ContextContainer(oService, oAdapter,
            "ContainerKey", oScope, this.oComponent);
        ok(true, "no error thrown because the right component was passed");

        //code under test
        unusedContainer = new sap.ushell.services.Personalization.ContextContainer(oService, oAdapter,
            "ContainerKey", oScope, undefined);
        ok(true, "no error thrown because the right component was passed");

        [ 0, 1, [], ["A"], {} ].forEach(function (sNoComponent) {
            //code under test
            try {
                unusedContainer = new sap.ushell.services.Personalization.ContextContainer(oService, oAdapter,
                        "ContainerKey", oScope, sNoComponent);
                ok(false, "should not get here");
            } catch (ex) {
                equal(ex.message, "oComponent passed must be a UI5 Component or must be undefined", "correct exception thrown");
            }
        });

        unusedContainer = unusedContainer; // eslint
    });

    test("WindowAdapter.getAdapterContainer", function () {
        var oWindowAdapter,
            oService = {},
            oAdapter = {
                getAdapterContainer: sinon.spy()
            },
            oScope = {};

        oWindowAdapter = new sap.ushell.services.Personalization.WindowAdapter(oService, oAdapter);
        //code under test
        oWindowAdapter.getAdapterContainer("ContainerKey", oScope, "sap.ushell.test.AppSample");

        // tests
        ok(oAdapter.getAdapterContainer.calledOnce);
        sinon.assert.calledWithExactly(oAdapter.getAdapterContainer, "ContainerKey", oScope,
            "sap.ushell.test.AppSample");
    });

    asyncTest("Container: Get container with non-string key", function () {
        try {
            this.oService.getContainer(this.oService)
                .done(function () {
                    start();
                    ok(false, "Error: Container with a non-string key was not prohibited");
                })
                .fail(function () {
                    start();
                    ok(false, "Error: Container with a non-string key was not prohibited");
                });
        } catch (e) {
            start();
            ok(true, "Non-string sContainerKey led to an exception");
        }
    });

    test("Container: Container constructor with empty key", function () {
        try {
            var oContainer = new sap.ushell.services.PersonalizationContainer({}, ""); // oAdapter, sContainerKey
            oContainer = oContainer; // eslint
            ok(false, "Error: Container with an empty key was not prohibited");
        } catch (e) {
            //start();
            ok(true, "Empty sContainerKey led to an exception");
        }
    });

    test("Container: Container constructor with non-string key", function () {
        try {
            var oContainer = new sap.ushell.services.PersonalizationContainer({}, {}); // oAdapter, sContainerKey
            oContainer = oContainer; // eslint
            ok(false, "Error: Container with a non-string key was not prohibited");
        } catch (e) {
            //start();
            ok(true, "Non-string sContainerKey led to an exception");
        }
    });




    //  ............................................................................
    //
    //               Container Version 2 - Validity
    //
    //  ............................................................................

    [
        {validity: 0, hasValiditypersistence : false},
        {validity: 30, hasValiditypersistence : true},
        {validity: Infinity, hasValiditypersistence : false}
    ].forEach(function (oFixture) {
        module("sap.ushell.services.Personalization  (" + oFixture.validity + "): Container V2 - Validity", {
            setup : function () {
                this.oService = {};
                this.oAdapter = {};
                this.oContainer = {};
                this.oContainerVSAdapter = {};
                this.oITEMVALUE = {"v1": "false"};
                var oSystem = {},
                    that = this;
                sap.ushell.test.restoreSpies(
                    jQuery.sap.log.error
                );
                this.oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
                this.oService = new sap.ushell.services.Personalization(this.oAdapter);
                this.oService.getContainer(sCONTAINER, { validity : oFixture.validity })
                    .done(function (oContainer) {
                        //start();
                        that.oContainer = oContainer;
                        that.oContainerVSAdapter = new sap.ushell.services.Personalization.VariantSetAdapter(that.oContainer);
                    });
            },
            teardown : function () {
                if (this.thestub) {
                    this.thestub.restore();
                }
                sap.ushell.test.restoreSpies(
                    jQuery.sap.log.error
                );
                this.oService.delContainer(sCONTAINER, { validity : oFixture.validity });
                delete this.oService;
                delete this.oAdapter;
                delete this.oContainer;
                delete this.oContainerVSAdapter;
                delete this.oITEMVALUE;
            }
        });

        asyncTest("Container (" + oFixture.validity + "): get (new) + save + get + validity expired = clear faked clock!", function () {
            var oPromiseCreator,
                oService = this.oService,
                that = this;

            // jQuery.sap.require("sap.ui.core.format.DateFormatter");
            oPromiseCreator = oService.createEmptyContainer(sCONTAINER, { validity : oFixture.validity});
            oPromiseCreator.done(function (oContainer) {
                var oPromiseGetter1,
                    fmt;
                start();
                oContainer.setItemValue(sITEMKEY, that.oITEMVALUE);
                ok(true, "Personalization data was set");
                // simulate the clock!
                that.theFakeTime = new Date("Jan 2 2013 01:50");
                that.thestub = sinon.stub(sap.ushell.services.Personalization.ContextContainer.prototype, "_getNow", function () { return that.theFakeTime; });
                fmt = sap.ui.core.format.DateFormat.getDateInstance({ pattern : sABAPTIMESTAMPFORMAT});
                that.thetime = fmt.format(that.theFakeTime, true);
                that.theExpireTime = fmt.format(new Date(that.theFakeTime.getTime() + oFixture.validity * 60000), true);
                //stop();
                oContainer.save().done(function () {
                    //start();
                    that.theFakeTime = new Date("Jan 2 2013 01:55");
                    stop();
                    // obtain the (existing) Container (again)
                    oPromiseGetter1 = oService.getContainer(sCONTAINER, { validity : oFixture.validity });
                    oPromiseGetter1.done(function (oContainer) {
                        var oReadValueSTO,
                            oReadValueEXP,
                            oReadValue2;
                        start();
                        ok(true, "Personalization data was gotten");
                        deepEqual(oContainer.getItemValue(sITEMKEY).v1, "false", "value present!");
                        deepEqual(oContainer.getItemKeys(), [ "ItemKey" ], "expired!");
                        oReadValue2 = oContainer._getItemValueInternal("ADMIN#", "sap-ushell-container-scope");
                        oReadValueSTO = oContainer._getItemValueInternal("ADMIN#", "sap-ushell-container-storageUTCTimestamp");
                        oReadValueEXP = oContainer._getItemValueInternal("ADMIN#", "sap-ushell-container-expireUTCTimestamp");
                        if (oFixture.hasValiditypersistence) {
                            deepEqual(oReadValue2.validity, oFixture.validity, "scope variable set;");
                            deepEqual(oReadValueSTO, that.thetime, "storage set;");
                            deepEqual(oReadValueEXP, that.theExpireTime, "expire set;");
                        } else {
                            deepEqual(oReadValueSTO, undefined, "storage not set;");
                            deepEqual(oReadValueEXP, undefined, "expire not set;");
                        }
                        that.theFakeTime = new Date("Jan 2 2013 04:55");
                        stop();
                        oService.getContainer(sCONTAINER, { validity : oFixture.validity }).done(function (oContainer) {
                            start();
                            if (oFixture.hasValiditypersistence) {
                                deepEqual(oContainer.getItemKeys(), [], "expired!");
                                deepEqual(oContainer.getItemValue(sITEMKEY), undefined, "expired!");
                            } else {
                                deepEqual(oContainer.getItemValue(sITEMKEY).v1, "false", "value present!");
                            }


                        // -- failed operations
                        }).fail(function () {
                            start();
                            ok(false, "'Error' fail function of getter2 was triggered");
                        });
                    }).fail(function () {
                        start();
                        ok(false, "'Error' fail function of getter1 was triggered");
                    });
                });
                oPromiseCreator.fail(function () {
                    start();
                    ok(false, "'Error' fail function of setter was triggered");
                });
            });
        });


        asyncTest("Container (" + oFixture.validity + "): get (new) + save + get + delete", function () {
            var oPromiseCreator,
                oService = this.oService,
                oItemValue = this.oITEMVALUE;

            oPromiseCreator = oService.getContainer(sCONTAINER, {validity : oFixture.validity});
            oPromiseCreator.done(function (oContainer) {
                var oPromiseGetter1,
                    oReadValue,
                    oReadValue2;
                oContainer.setItemValue(sITEMKEY, oItemValue);
                // not serialized !!!!
                oItemValue.v2 = "true";
                oReadValue = oContainer.getItemValue(sITEMKEY);
                deepEqual(oReadValue, {"v1" : "false"},
                        "Read value is the value at time of set");
                ok(oReadValue !== oItemValue,
                        "distinct object from set returned in get");
                oReadValue2 = oContainer.getItemValue(sITEMKEY);
                ok(oReadValue2 !== oReadValue,
                        "distinct object returned in get");
                start();
                ok(true, "Personalization data was set");
                stop();

                oContainer.save().done(function () {
                    start();
                    stop();
                    // obtain the (existing) Container (again)
                    oPromiseGetter1 = oService.getContainer(sCONTAINER, { validity : oFixture.validity });
                    oPromiseGetter1.done(function (oContainer) {
                        var oPromiseDel,
                            oReadValue;

                        start();
                        ok(true, "Personalization data was gotten");
                        oReadValue = oContainer.getItemValue(sITEMKEY);
                        deepEqual(oReadValue, { "v1" : "false"},
                                "Read value is the saved value");

                        oReadValue.v3 = "1111";
                        oReadValue2 = oContainer.getItemValue(sITEMKEY);
                        deepEqual(oReadValue2.v3, undefined,
                                "Read value is not a live object;");
                        ok(oReadValue !== oReadValue2,
                                "Same object ! the live written value");
                        stop();

                        oPromiseDel = oService.delContainer(sCONTAINER, { validity : oFixture.validity });
                        oPromiseDel.done(function () {
                            var oPromiseGetter2;
                            oPromiseGetter2 = oService.getContainer(sCONTAINER, { validity : oFixture.validity });
                            oPromiseGetter2.done(function (oContainer) {
                                start();
                                oReadValue = oContainer.getItemValue(sITEMKEY);
                                ok(true, "Personalization data was deleted");
                                equal(oReadValue, undefined,
                                        "Personalization data was deleted - value is undefined");
                            });


                         // -- failed operations
                            oPromiseGetter2.fail(function () {
                                start();
                                ok(false, "'Error' fail function of getter2 was triggered");
                            });
                            oPromiseDel.fail(function () {
                                start();
                                ok(false, "'Error' fail function of deleter was triggered");
                            });
                        });
                        oPromiseGetter1.fail(function () {
                            start();
                            ok(false, "'Error' fail function of getter1 was triggered");
                        });
                    });
                    oPromiseCreator.fail(function () {
                        start();
                        ok(false, "'Error' fail function of setter was triggered");
                    });
                }).fail(function () {
                    start();
                    ok(false, "'Error' fail function of save was triggered");
                });
            });
        });


        asyncTest("Container (" + oFixture.validity + "): get (new) + save + get + validity set?", function () {
            var oPromiseCreator,
                oService = this.oService,
                oItemValue = this.oITEMVALUE;

            oPromiseCreator = oService.getContainer(sCONTAINER, {validity : oFixture.validity});
            oPromiseCreator.done(function (oContainer) {
                var oPromiseGetter1,
                    oReadValue2,
                    fmt,
                    rawTime,
                    thetime,
                    theExpireTime;

                oContainer.setItemValue(sITEMKEY, oItemValue);
                start();
                ok(true, "Personalization data was set");
                stop();
                fmt = sap.ui.core.format.DateFormat.getDateInstance({pattern : sABAPTIMESTAMPFORMAT});
                rawTime = new Date();
                thetime = fmt.format(rawTime, true);
                theExpireTime = fmt.format(new Date(rawTime.getTime() + oFixture.validity * 60000), true);

                oContainer.save().done(function () {
                    var oReadValueSTO,
                        oReadValueEXP,
                        delta;

                    start();
                    oReadValue2 = oContainer._getItemValueInternal("ADMIN#", "sap-ushell-container-scope");
                    oReadValueSTO = oContainer._getItemValueInternal("ADMIN#", "sap-ushell-container-storageUTCTimestamp");
                    oReadValueEXP = oContainer._getItemValueInternal("ADMIN#", "sap-ushell-container-expireUTCTimestamp");

                    if (oFixture.hasValiditypersistence) {
                        deepEqual(oReadValue2.validity, oFixture.validity, "scope variable set;");
                        delta = parseInt(oReadValueSTO, 10) - parseInt(thetime, 10);
                        ok(delta <= 2 && delta >= -2, "storage set;" + oReadValueSTO + "=?=" + thetime);
                        delta = parseInt(oReadValueEXP, 10) - parseInt(theExpireTime, 10);
                        ok(delta <= 2 && delta >= -2, "expire set;" + oReadValueEXP + "=?=" + theExpireTime);
                    } else {
                        deepEqual(oReadValueSTO, undefined, "storage not set;");
                        deepEqual(oReadValueEXP, undefined, "expire not set;");
                    }
                    stop();

                    // obtain the (existing) Container (again)
                    oPromiseGetter1 = oService.getContainer(sCONTAINER, {validity : oFixture.validity});
                    oPromiseGetter1.done(function (oContainer) {
                        var oReadValueSTO,
                            oReadValueEXP;

                        start();
                        ok(true, "Personalization data was gotten");
                        oReadValueSTO = oContainer._getItemValueInternal("ADMIN#", "sap-ushell-container-storageUTCTimestamp");
                        oReadValueEXP = oContainer._getItemValueInternal("ADMIN#", "sap-ushell-container-expireUTCTimestamp");

                        if (oFixture.hasValiditypersistence) {
                            deepEqual(oReadValueSTO, thetime, "storage set;");
                            deepEqual(oReadValueEXP, theExpireTime, "expire set;");
                        } else {
                            deepEqual(oReadValueSTO, undefined, "storage not set;");
                            deepEqual(oReadValueEXP, undefined, "expire not set;");
                        }


                     // -- failed operations
                    }).fail(function () {
                        start();
                        ok(false, "'Error' fail function of getter1 was triggered");
                    });
                });
                oPromiseCreator.fail(function () {
                    start();
                    ok(false, "'Error' fail function of setter was triggered");
                });
            });
        });


        asyncTest("Container (" + oFixture.validity + "): get (new) + nosave,  get + delete", function () {
            var oPromiseCreator,
                oService = this.oService,
                oItemValue = this.oITEMVALUE;

            oPromiseCreator = oService.getContainer(sCONTAINER, { validity : oFixture.validity });
            oPromiseCreator.done(function (oContainer) {
                var oPromiseGetter1,
                    oReadValue,
                    oReadValue2;

                oContainer.setItemValue(sITEMKEY, oItemValue);
                // not serialized !!!!
                oItemValue.v2 = "true";
                oReadValue = oContainer.getItemValue(sITEMKEY);
                deepEqual(oReadValue, {"v1" : "false"}, "Read value is the value at time of set");
                ok(oReadValue !== oItemValue, "distinct object from set returned in get");

                oReadValue2 = oContainer.getItemValue(sITEMKEY);
                ok(oReadValue2 !== oReadValue, "distinct object returned in get");
                start();
                ok(true, "Personalization data was set");
                stop();

                // obtain the (existing) Container (again)
                oPromiseGetter1 = oService.getContainer(sCONTAINER, { validity : oFixture.validity });
                oPromiseGetter1.done(function (oContainer) {
                    var oPromiseDel,
                        oReadValue;

                    start();
                    ok(true, "Personalization data was gotten");
                    oReadValue = oContainer.getItemValue(sITEMKEY);
                    deepEqual(oReadValue, undefined, "not saved value is initial");
                    stop();

                    oPromiseDel = oService.delContainer(sCONTAINER, { validity : oFixture.validity });
                    oPromiseDel.done(function () {
                        var oPromiseGetter2;
                        oPromiseGetter2 = oService.getContainer(sCONTAINER, { validity : oFixture.validity });
                        oPromiseGetter2.done(function (oContainer) {
                            start();
                            oReadValue = oContainer.getItemValue(sITEMKEY);
                            ok(true, "Personalization data was deleted");
                            equal(oReadValue, undefined,
                                    "Personalization data was deleted - value is undefined");
                        });


                        // -- failed operations
                        oPromiseGetter2.fail(function () {
                            start();
                            ok(false, "'Error' fail function of getter2 was triggered");
                        });
                        oPromiseDel.fail(function () {
                            start();
                            ok(false, "'Error' fail function of deleter was triggered");
                        });
                    });
                    oPromiseGetter1.fail(function () {
                        start();
                        ok(false, "'Error' fail function of getter1 was triggered");
                    });
                });
                oPromiseCreator.fail(function () {
                    start();
                    ok(false, "'Error' fail function of setter was triggered");
                });
            });
        });


        asyncTest("Container (" + oFixture.validity + "): get save, create (empty)!", function () {
            var oPromiseCreator,
                oService = this.oService,
                oItemValue = this.oITEMVALUE;

            oPromiseCreator = oService.getContainer(sCONTAINER, { validity : oFixture.validity });
            oPromiseCreator.done(function (oContainer) {
                oContainer.setItemValue(sITEMKEY, oItemValue);
                oContainer.setItemValue("Stale", oItemValue);
                // not serialized !!!!
                oItemValue.v2 = "true";
                oContainer.getItemValue(sITEMKEY);
                start();
                ok(true, "Personalization data was set");
                stop();

                // save
                oContainer.save().done(function () {
                    var oPromiseGet,
                        oReadValue;

                    start();
                    ok(true, "Personalization data was gotten");
                    oReadValue = oContainer.getItemValue(sITEMKEY);
                    deepEqual(oReadValue, { v1 : "false" }, "not saved value is initial");
                    stop();

                    oPromiseGet = oService.createEmptyContainer(sCONTAINER, { validity : oFixture.validity });
                    oPromiseGet.done(function (oContainer) {
                        start();
                        oReadValue = oContainer.getItemValue(sITEMKEY);
                        ok(true, "Personalization data was deleted");
                        equal(oReadValue, undefined,
                                "Personalization data was deleted - value is undefined");
                        equal(oContainer.getItemKeys().length, 0,
                                "Personalization data was deleted - value is undefined");

                        oContainer.setItemValue(sITEMKEY, { v333 : true });
                        stop();
                        oContainer.save().done(function () {
                            start();
                            stop();
                            oService.getContainer(sCONTAINER, { validity : oFixture.validity }).done(function (oContainer) {
                                start();
                                oReadValue = oContainer.getItemValue("Stale");
                                equal(oReadValue, undefined,
                                        "Personalization data was cleared - value is undefined");
                                oReadValue = oContainer.getItemValue(sITEMKEY);
                                deepEqual(oReadValue, { v333 : true }, " new value set after");


                                // -- failed operations
                            }).fail(function () {
                                start();
                                ok(false, "'Error' fail function of getter2 was triggered");
                            });
                        }).fail(function () {
                            start();
                            ok(false, "'Error' fail function of getter2 was triggered");
                        });
                    }).fail(function () {
                        start();
                        ok(false, "'Error' fail function of getter2 was triggered");
                    });
                }).fail(function () {
                    start();
                    ok(false, "'Error' fail function of savewas triggered");
                });
                oPromiseCreator.fail(function () {
                    start();
                    ok(false, "'Error' fail function of setter was triggered");
                });
            });
        });


        asyncTest("Container (" + oFixture.validity + "): reload restores original data", function () {
            var that = this;

            this.oService.getContainer(sCONTAINER, { validity : oFixture.validity })
                  .done(function (oContainer) {
                    start();
                    oContainer.setItemValue(sITEMKEY, that.oITEMVALUE);
                    QUnit.assert.equal(oContainer.getItemValue(sITEMKEY).v1, "false", sITEMKEY + " added");
                    stop();

                    oContainer.save()
                        .done(function () {
                            start();
                            ok(true, "Data saved");
                            QUnit.assert.equal(oContainer.getItemValue(sITEMKEY).v1, "false", sITEMKEY + " still there after save");
                            oContainer.setItemValue(sITEMKEY, "item2");
                            QUnit.assert.equal(oContainer.getItemValue(sITEMKEY), "item2", sITEMKEY + " changed to item2 (no save)");
                            stop();

                            oContainer.load()
                                .done(function () {
                                    start();
                                    equal(oContainer.getItemValue(sITEMKEY).v1, "false",
                                            sITEMKEY + " loaded with correct value '" + that.oITEMVALUE.v1 + "'");
                                })


                                // -- failed operations
                                .fail(function () {
                                    start();
                                    ok(false, "Load failed");
                                });
                        })
                        .fail(function () {
                            start();
                            ok(false, "Save failed");
                            stop();
                        });
                });
        });


        asyncTest("Container ( " + oFixture.validity + "): get  setItem length warnings", function () {
            var that = this,
                sContainerKey = "AveryLongContainerKeyMoreThan40CharsWithT",
                oSpyAdapterGet = sinon.spy(jQuery.sap.log, "error");

            this.oService.getContainer(sContainerKey, {validity : oFixture.validity}).done(function (oContainer) {
                deepEqual(jQuery.sap.log.error.getCall(0).args[0], "Personalization Service container key (\"AveryLongContainerKeyMoreThan40CharsWithT\") should be less than 40 characters [current :41]");
                that.oItemValue = { "v1": "false" };
                oContainer.setItemValue(sContainerKey, that.oItemValue);
                deepEqual(jQuery.sap.log.error.getCall(1).args[0], "Personalization Service item key/variant set name (\"AveryLongContainerKeyMoreThan40CharsWithT\") should be less than 40 characters [current :41]");
                deepEqual(jQuery.sap.log.error.getCall(1).args[0], "Personalization Service item key/variant set name (\"AveryLongContainerKeyMoreThan40CharsWithT\") should be less than 40 characters [current :41]");
                start();
                ok(true, "Personalization data was set");
                oSpyAdapterGet.restore();
                //stop();
            }).fail(function () {
                start();
                ok(false, "'Error' fail function of save was triggered");
                oSpyAdapterGet.restore();
            });
        });


        asyncTest("AppContainer ( " + oFixture.validity + "): get setItem length 40 no warnings", function () {
            var that = this,
                sContainerKey = "AveryLongContainerKeyMoreThan40CharsWith",
                oSpyAdapterGet = sinon.spy(jQuery.sap.log, "error");

            this.oService.createEmptyContainer(sContainerKey, {validity : oFixture.validity}).done(function (oContainer) {
                deepEqual(jQuery.sap.log.error.getCall(0), null);
                that.oItemValue = { "v1": "false" };
                oContainer.setItemValue(sContainerKey, that.oItemValue);
                deepEqual(jQuery.sap.log.error.getCall(0), null);
                start();
                ok(true, "Personalization data was set");
                oSpyAdapterGet.restore();
                //stop();
            }).fail(function () {
                start();
                ok(false, "'Error' fail function of save was triggered");
                oSpyAdapterGet.restore();
            });
        });


        asyncTest("Container (" + oFixture.validity + "): Error during load inside constructor", function () {
            var that = this;

            if (oFixture.validity === 0) {
                start();
                ok(true, "validity 0, adapter throws no errors, mock not relevant");
                return;
            }
            //standard setup already filled the windowAdapter. Thus the mock adapter code is not excecuted
            //so we have to delete the window content to simulate the error behaviour
            sap.ushell.services.Personalization.WindowAdapter.prototype.data = {};

            this.oAdapter.setErrorProvocation(sCONTAINER);
            this.oService.getContainer(sCONTAINER, { validity : oFixture.validity })
                .done(function (oContainer) {
                    start();
                    ok(false, "Error: Load of container should have failed");
                })
                .fail(function (oContainer) {
                    start();
                    ok(true, "Load of container failed");
                    that.oAdapter.resetErrorProvocation(sCONTAINER);
                    that.oService._oContainerMap.remove(sCONTAINERPREFIX + sCONTAINER);
                  // dirty hack to get a new deferred object during the deletion
                    stop();

                    that.oService.delContainer(sCONTAINER, { validity : oFixture.validity })
                        .done(function () {
                            start();
                            ok(true, "Deletion of container succeeded");
                        })
                        .fail(function () {
                            start();
                            ok(false, "Deletion of container failed");
                        });
                });
        });


        asyncTest("Container (" + oFixture.validity + "): Error during save", function () {
            var that = this;

            if (oFixture.validity === 0) {
                start();
                ok(true, " validity 0, adapter throws no errors, mock not relevant");
                return;
            }

            this.oService.getContainer(sCONTAINER, { validity : oFixture.validity })
                .done(function (oContainer) {
                    start();
                    ok(true, "Load of container succeeded");
                    that.oAdapter.setErrorProvocation(sCONTAINER);
                    stop();
                    oContainer.save()
                        .done(function () {
                            start();
                            ok(false, "Error: Save of container succeeded");
                        })
                        .fail(function () {
                            start();
                            ok(true, "Save of container failed");
                        });
                })
                .fail(function (oContainer) {
                    start();
                    ok(false, "Error: Load of container failed");
                });
        });


        asyncTest("Container (" + oFixture.validity + "): Error during deletion", function () {
            var that = this;

            if (oFixture.validity === 0) {
                start();
                ok(true, " validity 0, adapter throws no errors, mock not relevant");
                return;
            }

            this.oService.getContainer(sCONTAINER, { validity : oFixture.validity })
                .done(function (oContainer) {
                    start();
                    ok(true, "Load of container succeeded");
                    that.oAdapter.setErrorProvocation(sCONTAINER);
                    stop();
                    that.oService.delContainer(sCONTAINER, { validity : oFixture.validity })
                        .done(function () {
                            start();
                            ok(false, "Error: Deletion of container succeeded");
                        })
                        .fail(function () {
                            start();
                            ok(true, "Deletion of container failed");
                        });
                })
                .fail(function (oContainer) {
                    start();
                    ok(false, "Error: Load of container failed");
                });
        });


        asyncTest("Container (" + oFixture.validity + "): check for container not a singleton", function () {
            var that = this;

            this.oService.getContainer(sCONTAINER, { validity : oFixture.validity })
                .done(function (oContainer1) {
                    start();
                    ok(true, "Load of container 1 succeeded");
                    stop();
                    that.oService.getContainer(sCONTAINER, { validity : oFixture.validity })
                        .done(function (oContainer2) {
                            start();
                            ok(true, "Load of container 2 succeeded");
                            ok(oContainer1 !== oContainer2, "Container is not a singleton");
                            oContainer1.setItemValue("once", "aValue");
                            oContainer2.setItemValue("once", "anotherInstanceValue");
                            equal("aValue", oContainer1.getItemValue("once"), "Container is not a singleton, distinct storage");
                            equal("anotherInstanceValue", oContainer2.getItemValue("once"), "Container is not a singleton, distinct storage");
                        })
                        .fail(function () {
                            start();
                            ok(false, "Error: Load of container 2  failed");
                        });
                })
                .fail(function (oContainer) {
                    start();
                    ok(false, "Error: Load of container 1 failed");
                });
        });


        test("Container (" + oFixture.validity + "): Mix of container and personalizer", function () {
            // Personalizer does reuse of the container
            var oPersId,
                oPersonalizer,
                that = this;

            this.oContainer.setItemValue(sITEMKEY, this.oITEMVALUE);
            ok(this.oContainer.containsItem(sITEMKEY), sITEMKEY + " was added");
            oPersId = {
                container : sCONTAINER,
                item : sITEMKEY
            };

            this.oContainer.save().done(function () {
                //start();
                oPersonalizer = that.oService.getPersonalizer(oPersId);
                oPersonalizer.getPersData()
                    .done(function (oReadItemValue) {
                        //start();
                        deepEqual(that.oITEMVALUE, oReadItemValue, "distinct for validity 0");
                    })
                    // -- failed operations
                    .fail(function () {
                        //start();
                        ok(false, "Error: getPersData failed");
                    });
            }).fail(function () {
                //start();
                ok(false, "Error: save failed");
            });
        });


        test("Variant Set (" + oFixture.validity + "): save and simulate browser reload 1", function () {
            this.aVariantExp = [];
            this.oVariantNameAndKeysExp = {};
            var oVariantSet,
                oVariant1,
                oVariant2,
                oItemMap,
                that = this;

            // add variant set
            if (this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY)) {
                this.oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
            }
            ok(!this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                    "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
            oVariantSet = this.oContainerVSAdapter.addVariantSet(sVARIANT_SET_KEY);
            oItemMap = new sap.ushell.utils.Map();

            function buildVariantObject(aVariants, sVariantKey, va) {
                aVariants[sVariantKey] = { "key" : va.getVariantKey(),
                        "name" : va.getVariantName(),
                        "items" : {}
                    };
                va.getItemKeys().forEach(function (sItemKey) {
                    aVariants[sVariantKey].items[sItemKey] = va.getItemValue(sItemKey);
                });
            }
            oVariant1 = oVariantSet.addVariant("V1");
            oVariant1.setItemValue("I1", {
                Val1 : "value 1",
                Val2 : "value 2"
            });
            oVariant1.setItemValue("I2", {
                Filter1 : "24",
                Filter2 : "1000"
            });
            oItemMap.entries = oVariant1;
            this.oVariantNameAndKeysExp.V1 = oVariant1.getVariantKey();
            buildVariantObject(this.aVariantExp, oVariant1.getVariantKey(), oVariant1);
            // add variant V2
            oVariant2 = oVariantSet.addVariant("V2");
            oVariant2.setItemValue("I1", {
                Val1 : "value 11",
                Val2 : "value 12"
            });
            oVariant2.setItemValue("I2", {
                Filter1 : "48",
                Filter2 : "50000"
            });
            oItemMap.entries = oVariant2;
            buildVariantObject(this.aVariantExp, oVariant2.getVariantKey(), oVariant2);
            this.oVariantNameAndKeysExp.V2 = oVariant2.getVariantKey();
            // save
            this.oContainer.save().done(function () {
                //start();
                // simulate browser reload
                delete this.oContainer;
                that.oService._oContainerMap.remove(sCONTAINERPREFIX + sCONTAINER);
                stop();
                that.oService.getContainer(sCONTAINER, { validity : oFixture.validity }).done(function (oContainer) {
                    var aVariantKeys = [],
                        aVariants = [],
                        oVariantNameAndKeys,
                        oContainerVSAdapter = new sap.ushell.services.Personalization.VariantSetAdapter(oContainer);
                    start();

                    ok(oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                            "Variant set '" + sVARIANT_SET_KEY + "' exists after save");
                    oVariantSet = oContainerVSAdapter.getVariantSet(sVARIANT_SET_KEY);

                    oVariantNameAndKeys = oVariantSet.getVariantNamesAndKeys();
                    QUnit.assert.deepEqual(oVariantNameAndKeys, that.oVariantNameAndKeysExp,
                        "Variant names and keys are correct");
                    QUnit.assert.deepEqual(oVariantSet.getVariantKeyByName("V1"), that.oVariantNameAndKeysExp.V1);
                    QUnit.assert.deepEqual(oVariantSet.getVariantKeyByName("V2"), that.oVariantNameAndKeysExp.V2);
                    aVariantKeys = oVariantSet.getVariantKeys();
                    aVariantKeys.forEach(function (sVariantKey) {
                        var va = oVariantSet.getVariant(sVariantKey);
                        buildVariantObject(aVariants, sVariantKey, va);
                    });
                    QUnit.assert.deepEqual(aVariants, that.aVariantExp, "Entire variant is correct");
                    oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
                    ok(!oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY),
                            "Variant set '" + sVARIANT_SET_KEY + "' was deleted");
                });
            }).fail(function () {
                ok(false, "Save failed");
            });
        });


        test("Variant Set (" + oFixture.validity + "): save and simulate browser reload 2", function () {
            var oVariantSet,
                oVariant,
                that = this;

            // add variant set
            if (this.oContainerVSAdapter.containsVariantSet(sVARIANT_SET_KEY)) {
                this.oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
            }

            oVariantSet = this.oContainerVSAdapter.addVariantSet(sVARIANT_SET_KEY);
            // add variant V1
            oVariant = oVariantSet.addVariant("V1");
            oVariant.setItemValue("I1", {
                Val1 : "value 1",
                Val2 : "value 2"
            });
            oVariant.setItemValue("I2", {
                Filter1 : "24",
                Filter2 : "1000"
            });
            // add variant V2
            oVariant = oVariantSet.addVariant("V2");
            oVariant.setItemValue("I1", {
                Val1 : "value 11",
                Val2 : "value 12"
            });
            oVariant.setItemValue("I2", {
                Filter1 : "48",
                Filter2 : "50000"
            });
            // save container
            this.oContainer.save().done(function () {
                //start();
                // tabula rasa
                delete that.oContainer;
                that.oService._oContainerMap.remove(sCONTAINER);
                // new container
                stop();
                that.oService.getContainer(sCONTAINER, { validity: oFixture.validity }).done(function (oContainer) {
                    var aVariantKeys = [],
                        aVariants = [],
                        oVariant,
                        sVariantKey = "",
                        that = this;
                    start();
                    // !!!!!!!!!!!!!!!!!!!!!!!!!!
                    that.oContainer = oContainer;
                    that.oContainerVSAdapter = new sap.ushell.services.Personalization.VariantSetAdapter(oContainer);
                    oVariantSet = that.oContainerVSAdapter.getVariantSet(sVARIANT_SET_KEY);
                    oVariant = oVariantSet.addVariant("V3");
                    oVariant.setItemValue("I1", {
                        Val1 : "value 111",
                        Val2 : "value 123"
                    });
                    oVariant.setItemValue("I2", {
                        Filter1 : "489",
                        Filter2 : "90000"
                    });
                    sVariantKey = oVariantSet.getVariantKeyByName("V2");
                    oVariantSet.delVariant(sVariantKey);
                    sVariantKey = oVariantSet.getVariantKeyByName("V1");
                    oVariantSet.delVariant(sVariantKey);
                    oVariant = oVariantSet.addVariant("V1");
                    oVariant.setItemValue("I3", {
                        Val1 : "value 01",
                        Val2 : "value 02"
                    });
                    oVariant.setItemValue("I4", {
                        Filter1 : "240",
                        Filter2 : "10009"
                    });
                    that.oContainerVSAdapter.save(); // delegates!
                    aVariantKeys = oVariantSet.getVariantKeys();
                    aVariantKeys.forEach(function (sVariantKey) {
                        aVariants.push(oVariantSet.getVariant(sVariantKey));
                    });
                    QUnit.assert.equal(2, aVariants.length, "Variant Set contains two items");
                    QUnit.assert.equal("V3", aVariants[0].getVariantName(), "First variant in set is V3");
                    QUnit.assert.deepEqual(aVariants[0].getItemValue("I1"), {
                        Val1 : "value 111",
                        Val2 : "value 123"
                    }, "Item value I1 from V3 still exist");
                    QUnit.assert.deepEqual(aVariants[0].getItemValue("I2"), {
                        Filter1 : "489",
                        Filter2 : "90000"
                    }, "Item value I2 from V3 still exist");
                    QUnit.assert.equal("V1", aVariants[1].getVariantName(), "Second variant in set is V1");
                    QUnit.assert.deepEqual(aVariants[1].getItemValue("I3"), {
                        Val1 : "value 01",
                        Val2 : "value 02"
                    }, "Item value I3 from V1 still exist");
                    QUnit.assert.deepEqual(aVariants[1].getItemValue("I4"), {
                        Filter1 : "240",
                        Filter2 : "10009"
                    }, "Item value I4 from V1  still exist");
                    // delete variant set
                    that.oContainerVSAdapter.delVariantSet(sVARIANT_SET_KEY);
                });
            }).fail(function () {
                ok(false, "Save failed");
            });
        });
    });


    // ............................................................................
    //
    //               Container Version 2 - Validity 0 & reload
    //
    // ............................................................................

    module("sap.ushell.services.Personalization Container V2 - validity 0 & launchpad reload", {
        setup : function () {
            var oSystem = {};

            // the config has to be reset after the test
            if (!sCachedConfig) {
                sCachedConfig = JSON.stringify(window["sap-ushell-config"]);
            }

            sap.ushell.services.Personalization.WindowAdapter.prototype.data = {};
            this.oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
            this.oService = new sap.ushell.services.Personalization(this.oAdapter);
        },
        teardown : function () {
            if (sap.ushell.adapters.mock.AdapterContainer.restore) {
                sap.ushell.adapters.mock.AdapterContainer.restore();
            }
            if (sap.ushell.services.Personalization.WindowAdapterContainer.restore) {
                sap.ushell.services.Personalization.WindowAdapterContainer.restore();
            }
            delete this.oAdapter;
            delete this.oService;
            window["sap-ushell-config"] = JSON.parse(sCachedConfig);
        }
    });

    test("reload = false", function () {
        // Use a validity 0 container with relaod = false and check if the window adapter container is used
        // and the mock adapter container is not.
        var sContainerName = "ContainerReloadFalse",
            fnMockAdapterContainer;

        // Arrange
        fnMockAdapterContainer = sinon.spy(sap.ushell.adapters.mock, "AdapterContainer");
        window["sap-ushell-config"] = {
            "services": {
                "ShellNavigation" : {
                    "config" : {
                        "reload" : false
                    }
                }
            }
        };
        // Act
        this.oService.getContainer(sContainerName, { validity : 0 })
            .done(function (oContainer) {
                // Assert
                ok(!fnMockAdapterContainer.called, "Mock adapter was not called");
            });
    });

    test("reload not set", function () {
        // Use a validity 0 container with relaod not set and check if the window adapter container is used
        // and the mock adapter container is not.
        var sContainerName = "ContainerReloadFalse",
            fnMockAdapterContainer;

        // Arrange
        fnMockAdapterContainer = sinon.spy(sap.ushell.adapters.mock, "AdapterContainer");
        window["sap-ushell-config"] = {
            "services": {
                "ShellNavigation" : undefined
            }
        };
        // Act
        this.oService.getContainer(sContainerName, { validity : 0 })
            .done(function (oContainer) {
                // Assert
                ok(!fnMockAdapterContainer.called, "Mock adapter was not called");
            });
    });


    test("reload = true", function () {
        // Use a validity 0 container with reload = true and check if the mock adapter container is used
        // (with 1.28, the window adapter container is always used)
        var sContainerName = "ContainerReloadTrue",
            fnMockAdapterContainer;

        // Arrange
        fnMockAdapterContainer = sinon.spy(sap.ushell.adapters.mock, "AdapterContainer");
        window["sap-ushell-config"] = {
            "services": {
                "ShellNavigation" : {
                    "config" : {
                        "reload" : true
                    }
                }
            }
        };
        // Act
        this.oService.getContainer(sContainerName, { validity : 0 })
            .done(function (oContainer) {
                // Assert
                ok(fnMockAdapterContainer.called, "Mock adapter was called");
            });
    });

    asyncTest("2 containers with the same name, validity 0 & 1; reload = false", function () {
        // With Version 1.28+ the persistence within a window is always identical
        // persistencies.
        var sContainerName = "Container2075",
            sItemKey = "Item2078",
            oItemValue = {"test" : "test2079"},
            that = this;

        // Arrange
        window["sap-ushell-config"] = {
            "services": {
                "ShellNavigation" : {
                    "config" : {
                        "reload" : false
                    }
                }
            }
        };
        // Act
        this.oService.getContainer(sContainerName, { validity : 0 })
            .done(function (oVal0Container) {
                oVal0Container.setItemValue(sItemKey, oItemValue);
                oVal0Container.save()
                    .done(function () {
                        that.oService.getContainer(sContainerName, { validity : 1 })
                            .done(function (oVal1Container) {
                                var oReadItemValue,
                                    nValidity;
                                // Assert
                                start();
                                oReadItemValue = oVal1Container.getItemValue(sItemKey);
                                deepEqual(oReadItemValue, oItemValue, "Same container persistency for validity 0 & 1");
                                nValidity = oVal1Container._getItemValueInternal("ADMIN#", "sap-ushell-container-scope") &&
                                    oVal1Container._getItemValueInternal("ADMIN#", "sap-ushell-container-scope").validity;
                                equal(nValidity, undefined, "no artificial validity set");
                            });
                    });
            });
    });

    asyncTest("2 containers with the same name, validity 0 & 1; reload = true", function () {
        // The 2 containers will point to the same peristent storage.
        // This is tested by setting an item in the val 0 container saving and reading it by the val 1 container.
        // In addition it is checked that the validity is set to 1440min = 24h.
        var sContainerName = "Container2109",
            sItemKey = "Item2112",
            oItemValue = {"test" : "test2113"},
            that = this;

        // Arrange
        window["sap-ushell-config"] = {
            "services": {
                "ShellNavigation" : {
                    "config" : {
                        "reload" : true
                    }
                }
            }
        };
        // Act
        this.oService.getContainer(sContainerName, { validity : 0 })
            .done(function (oVal0Container) {
                oVal0Container.setItemValue(sItemKey, oItemValue);
                oVal0Container.save()
                    .done(function () {
                        that.oService.getContainer(sContainerName, { validity : 1 })
                            .done(function (oVal1Container) {
                                var oReadItemValue,
                                    nValidity;
                                // Assert
                                start();
                                oReadItemValue = oVal1Container.getItemValue(sItemKey);
                                deepEqual(oReadItemValue, oItemValue, "Same container persistency for validity 0 & 1");
                                nValidity = oVal1Container._getItemValueInternal("ADMIN#", "sap-ushell-container-scope") &&
                                    oVal1Container._getItemValueInternal("ADMIN#", "sap-ushell-container-scope").validity;
                                equal(nValidity, 1440, "Validity persisted was overwritten to 1440");
                            });
                    });
            });
    });

    //  ............................................................................
    //
    //               Container Version 2 - Deferred Sequentialization
    //
    //  ............................................................................

    [
        { validity: 0 },
        { validity: 30 },
        { validity: Infinity }
    ].forEach(function (oFixture) {
        module("sap.ushell.services.Personalization Container (" + oFixture.validity + "): Deferred Sequentialization", {
            setup : function () {
                this.oService = {};
                this.oAdapter = {};
                this.oContainer = {};
                var oSystem = {},
                    that = this;

                this.oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
                this.oService = new sap.ushell.services.Personalization(this.oAdapter);
                this.oService.getContainer(sCONTAINER, { validity : oFixture.validity})
                    .done(function (oContainer) {
                        //start();
                        that.oContainer = oContainer;
                    });
            },
            teardown : function () {
                this.oService.delContainer(sCONTAINER, { validity :  oFixture.validity});
                this.oService.delContainer(sCONTAINER + "2nd", { validity : oFixture.validity});
                delete this.oAdapter;
                delete this.oContainer;
                delete this.oService;
            }
        });

        asyncTest("AppContainer (" + oFixture.validity + "): saveDeferred, load, check", function () {
            var that = this;

            this.oContainer.setItemValue("key1", { v1 : "Value1" });
            this.oContainer.saveDeferred(10)
                 .done(function (sMsg) {
                    start();
                    ok(true, "Save done");
                    stop();
                    that.oService.getContainer(sCONTAINER, { validity : oFixture.validity})
                        .done(function (oReadContainer) {
                            start();
                            deepEqual(oReadContainer.getItemValue("key1"), { v1 : "Value1" }, "Correct save");
                        })
                         .fail(function () {
                            start();
                            ok(false, "getContainer failed");
                            stop();
                        });
                })
                .fail(function () {
                    start();
                    ok(false, "Save failed");
                    stop();
                });
        });

        asyncTest("AppContainer (" + oFixture.validity + "): saveDeferred, saveDeferred, load, check", function () {
            var that = this;

            this.oContainer.setItemValue("key1", { v1 : "Value1" });
            this.oContainer.saveDeferred(1000000)
                .done(function (sMsg) {
                    start();

                    ok(true, "Dropped save done");
                    equal(sMsg, sap.ushell.services.Personalization.prototype.SAVE_DEFERRED_DROPPED, "saveDeferred was dropped");
                    stop();
                    that.oService.getContainer(sCONTAINER, { validity : oFixture.validity})
                        .done(function (oReadContainer) {
                            start();
                            deepEqual(oReadContainer.getItemValue("key1"), { v1 : "Value1" }, "First saveDeferred - Correct save of key1");
                            deepEqual(oReadContainer.getItemValue("key2"), { v1 : "Value1" }, "First saveDeferred - Correct save of key2");
                        })
                        .fail(function () {
                            start();
                            ok(false, "getContainer failed");
                            stop();
                        });
                })
                 .fail(function () {
                    start();
                    ok(false, "Save failed");
                    stop();
                });
            this.oContainer.setItemValue("key2", { v1 : "Value1" });
            stop();
            this.oContainer.save() //Deferred(1)
                .done(function (sMsg) {
                    start();
                    ok(true, "Save done");
                    stop();
                    that.oService.getContainer(sCONTAINER, { validity : oFixture.validity})
                        .done(function (oReadContainer) {
                            start();
                            deepEqual(oReadContainer.getItemValue("key1"), { v1 : "Value1" }, "Second saveDeferred - Correct save of key1");
                            deepEqual(oReadContainer.getItemValue("key2"), { v1 : "Value1" }, "Second saveDeferred - Correct save of key2");
                        })
                        .fail(function () {
                            start();
                            ok(false, "getContainer failed");
                            stop();
                        });
                })
                .fail(function () {
                    start();
                    ok(false, "Save failed");
                    stop();
                });
        });


        asyncTest("AppContainer (" + oFixture.validity + "): saveDeferred, flush, load, check", function () {
            var that = this;

            this.oContainer.setItemValue("key1", { v1 : "Value1" });
            this.oContainer.saveDeferred(1000000)
                .done(function (sMsg) {
                    start();
                    ok(true, "Dropped save done");
                    //  equal(sMsg, sap.ushell.services.Personalization.prototype.SAVE_DEFERRED_DROPPED, "saveDeferred was dropped");
                    stop();
                    that.oService.getContainer(sCONTAINER, { validity : oFixture.validity})
                        .done(function (oReadContainer) {
                            start();
                            deepEqual(oReadContainer.getItemValue("key1"), { v1 : "Value1" }, "First saveDeferred - Correct save of key1");
                            deepEqual(oReadContainer.getItemValue("key2"), { v1 : "Value1" }, "First saveDeferred - Correct save of key2");
                        })
                        .fail(function () {
                            start();
                            ok(false, "getContainer failed");
                            stop();
                        });
                })
                .fail(function () {
                    start();
                    ok(false, "Save failed");
                    stop();
                });
            this.oContainer.setItemValue("key2", { v1 : "Value1" });
            stop();
            this.oContainer.flush() //Deferred(1)
                .done(function (sMsg) {
                    start();

                    ok(true, "Save done");
                    stop();
                    that.oService.getContainer(sCONTAINER, { validity : oFixture.validity})
                        .done(function (oReadContainer) {
                            start();
                            deepEqual(oReadContainer.getItemValue("key1"), { v1 : "Value1" }, "Second saveDeferred - Correct save of key1");
                            deepEqual(oReadContainer.getItemValue("key2"), { v1 : "Value1" }, "Second saveDeferred - Correct save of key2");
                        })
                        .fail(function () {
                            start();
                            ok(false, "getContainer failed");
                            stop();
                        });
                })
                .fail(function () {
                    start();
                    ok(false, "Save failed");
                    stop();
                });
        });
    });





    //  ............................................................................
    //
    //               Container Version 2 - Cross Validity
    //
    //                  cross validity tests
    //                  test interaction between several validitys!
    //
    //                  save 30,   get 0 -> new instance ?
    //                  save 0,  get 30 -> new instance
    //
    //                  sequence  validity (save) validity2 get, del(validity2)   get validity.
    //                  zombiepersistence true indicates save() data is retrieved albeit deletion
    //
    //  ............................................................................

    [
        {validity: 0, validity2 : 30,  zombiePersistence : false, distinctValues : false},
        {validity: 30, validity2 : 0,  zombiePersistence : true, distinctValues : false},
        {validity: 30, validity2 : Infinity, zombiePersistence : false, distinctValues : false},
        {validity: Infinity, validity2 : 30, zombiePersistence : false, distinctValues : false}
    ].forEach(function (oFixture) {
        module("sap.ushell.services.Personalization  Container (" + oFixture.validity + "/" + oFixture.validity2 + "): Cross Validity", {
            setup : function () {
                this.oService = {};
                var oSystem,
                    oAdapter;

                oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
                this.oService = new sap.ushell.services.Personalization(oAdapter);
            },
            teardown : function () {
                this.oService.delContainer(sCONTAINER, { validity :  oFixture.validity});
                delete this.oService;
            }
        });


        asyncTest("AppContainer  ( " + oFixture.validity + "/" + oFixture.validity2 + ") : get with different validity gets same data, new instance! get (new) +  get + delete", function () {
            var oPromiseCreator,
                oService = this.oService,
                that = this;

            oPromiseCreator = oService.getContainer(sCONTAINER, {validity : oFixture.validity});
            oPromiseCreator.done(function (oContainer) {
                var oPromiseGetter1 = {};
                that.oItemValue = { "v1": false };
                oContainer.setItemValue(sITEMKEY, that.oItemValue);
                // not serialized !!!!
                that.oItemValue.v2 = true;
                equal(oFixture.validity, oContainer.getValidity(), "first validity");
                start();
                ok(true, "Personalization data was set");
                stop();
                oContainer.save()
                     .done(function () {
                        start();
                        ok(true, "save ok");
                        stop();
                        // obtain the (existing) Container (again)
                        oPromiseGetter1 = oService.getContainer(sCONTAINER, { validity : oFixture.validity2});
                        oPromiseGetter1.done(function (oContainer) {
                            var oPromiseDel = {},
                                oReadValueExpected,
                                oReadValue;
                            start();
                            ok(true, "Personalization data was gotten");
                            oReadValue = oContainer.getItemValue(sITEMKEY);
                            oReadValueExpected = { v1 : false};
                            if (oFixture.distinctValues) {
                                oReadValueExpected = undefined;
                            }
                            deepEqual(oReadValueExpected, oReadValue, "Read value is the saved value!");
                            equal(oFixture.validity2, oContainer.getValidity(), "2nd validity");
                            stop();
                            oPromiseDel = oService.delContainer(sCONTAINER, { validity: oFixture.validity2});
                            oPromiseDel.done(function () {
                                var oPromiseGetter2 = {};
                                equal(oFixture.validity2, oContainer.getValidity(), "2nd validity of stale container");
                                oPromiseGetter2 = oService.getContainer(sCONTAINER, {validity : oFixture.validity});
                                oPromiseGetter2.done(function (oContainer) {
                                    start();
                                    oReadValue = oContainer.getItemValue(sITEMKEY);
                                    ok(true, "Personalization data deletion successful");
                                    equal(oFixture.validity, oContainer.getValidity(), "validity ok");
                                    if (oFixture.zombiePersistence) {
                                        deepEqual({ v1 : false }, oReadValue, " see first persistence !");
                                    } else {
                                        equal(oReadValue, undefined, "Personalization data was deleted - value is undefined");
                                    }
                                });


                                // -- failed operations
                                oPromiseGetter2.fail(function () {
                                    start();
                                    ok(false, "'Error' fail function of getter2 was triggered");
                                });
                            });
                            oPromiseDel.fail(function () {
                                start();
                                ok(false, "'Error' fail function of deleter was triggered");
                            });
                        });
                        oPromiseGetter1.fail(function () {
                            start();
                            ok(false, "'Error' fail function of getter1 was triggered");
                        });
                    })
                     .fail(function () {
                        start();
                        ok(false, "'Error' fail function of saver was triggered");
                    });
            });
            oPromiseCreator.fail(function () {
                start();
                ok(false, "'Error' fail function of setter was triggered");
            });
        });
    });




    [
        { validity: Infinity, effectiveValidity : Infinity, adapterCalled: true },
        { validity: 0, effectiveValidity : 0, adapterCalled : false },
        { validity: 30, effectiveValidity : 30, adapterCalled : true },
        { validity: undefined, effectiveValidity : Infinity, adapterCalled : true }
    ].forEach(function (oFixture) {
        module("sap.ushell.services.Personalization  ( " + oFixture.validity + "): test adapter called", {
            setup : function () {
                this.oService = {};
                var oSystem,
                    oAdapter;

                oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
                this.oSpyAdapterGet = sinon.spy(sap.ushell.adapters.mock.PersonalizationAdapter.prototype, "getAdapterContainer");
                this.oSpyAdapterDelete = sinon.spy(oAdapter, "delAdapterContainer");
                this.oSpyAdapterSave = sinon.spy(sap.ushell.adapters.mock.AdapterContainer.prototype, "save");
                this.oService = new sap.ushell.services.Personalization(oAdapter);
            },
            teardown : function () {
                this.oSpyAdapterGet.restore();
                this.oSpyAdapterDelete.restore();
                this.oSpyAdapterSave.restore();
                this.oService.delContainer(sCONTAINER, { validity : oFixture.validity});
                this.oService.delContainer(sCONTAINER + "2nd", { validity : oFixture.validity});
                delete this.oService;
            }
        });


        asyncTest("AppContainer  ( " + oFixture.validity + ") : test adapter called", function () {
            var oPromiseCreator,
                oService = this.oService,
                that = this;

            oPromiseCreator = oService.getContainer(sCONTAINER, { validity: oFixture.validity });
            oPromiseCreator.done(function (oContainer) {
                var oPromiseGetter1 = {};
                that.oItemValue = { "v1": "false" };
                oContainer.setItemValue(sITEMKEY, that.oItemValue);
                // not serialized !!!!
                that.oItemValue.v2 = "true";
                equal(oFixture.effectiveValidity, oContainer.getValidity(), "first validity");
                start();
                ok(true, "Personalization data was set");
                stop();
                oContainer.save()
                    .done(function () {
                        start();
                        ok(true, "save ok");
                        equal(oFixture.adapterCalled, that.oSpyAdapterGet.called, "adapter called");
                        equal(false, that.oSpyAdapterDelete.called, "Del not called ");
                        equal(oFixture.adapterCalled, that.oSpyAdapterSave.called, "Save called");
                        stop();
                        // obtain the (existing) Container (again)
                        oPromiseGetter1 = oService.getContainer(sCONTAINER, { validity : oFixture.validity });
                        oPromiseGetter1.done(function (oContainer) {
                            var oPromiseDel = {},
                                oReadValue;
                            start();
                            ok(true, "Personalization data was gotten");
                            equal(oFixture.adapterCalled, oFixture.adapterCalled && that.oSpyAdapterGet.callCount === 2, "adapter called (0 or two)");
                            equal(false, that.oSpyAdapterDelete.called, "Del not called ");
                            oReadValue = oContainer.getItemValue(sITEMKEY);
                            deepEqual(oReadValue, { v1 : "false"}, "Read value is the saved value");
                            equal(oFixture.effectiveValidity, oContainer.getValidity(), "validity");
                            oReadValue.v3 = false;
                            deepEqual(oContainer.getItemValue(sITEMKEY), { v1 : "false"}, "Read value is not a live read value");
                            ok(oReadValue !== that.oItemValue, "not same object");
                            stop();
                            oPromiseDel = oService.delContainer(sCONTAINER, { validity: oFixture.validity});
                            oPromiseDel.done(function () {
                                var oPromiseGetter2 = {};
                                start();
                                equal(oFixture.adapterCalled, that.oSpyAdapterGet.callCount === 3, "adapter called");
                                equal(oFixture.adapterCalled, that.oSpyAdapterDelete.called, "Del called");
                                equal(oFixture.effectiveValidity, oContainer.getValidity(), "2nd validity of stale container");
                                oPromiseGetter2 = oService.getContainer(sCONTAINER, {validity: oFixture.validity});
                                oPromiseGetter2.done(function (oContainer) {
                                    //start();
                                    oReadValue = oContainer.getItemValue(sITEMKEY);
                                    ok(true, "Personalization data deletion successful");
                                    equal(oFixture.effectiveValidity, oContainer.getValidity(), "validity ok");
                                    // new get!
                                    equal(oFixture.adapterCalled, that.oSpyAdapterGet.callCount === 4, "adapter called");
                                });


                                // -- failed operations
                                oPromiseGetter2.fail(function () {
                                    start();
                                    ok(false, "'Error' fail function of getter2 was triggered");
                                });
                            });
                            oPromiseDel.fail(function () {
                                start();
                                ok(false, "'Error' fail function of deleter was triggered");
                            });
                        });
                        oPromiseGetter1.fail(function () {
                            start();
                            ok(false, "'Error' fail function of getter1 was triggered");
                        });
                    })
                    .fail(function () {
                        start();
                        ok(false, "'Error' fail function of saver was triggered");
                    });
            });
            oPromiseCreator.fail(function () {
                start();
                ok(false, "'Error' fail function of setter was triggered");
            });
        });
    });




    //  ............................................................................
    //
    //             Variant Version 1
    //
    //  ............................................................................

    module("sap.ushell.services.Personalization: Variant V1", {
        setup : function () {
            this.oService = {};
            this.oAdapter = {};
            this.oContainer = {};
            var oSystem = {},
                that = this;

            this.oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
            this.oService = new sap.ushell.services.Personalization(this.oAdapter);
            this.oService.getPersonalizationContainer(sCONTAINER)
                .done(function (oContainer) {
                    //start();
                    that.oContainer = oContainer;
                });
        },
        teardown : function () {
            this.oService.delPersonalizationContainer(sCONTAINER);
            delete this.oAdapter;
            delete this.oContainer;
            delete this.oService;
        }
    });

    test("Variant: create variant and check variant key, name and data", function () {
        var sVARIANT_KEY = "VARIANTKEY_131",
            sVARIANT_NAME = "Variant number 131",
            oVariantData = {},
            oVariant = {},
            oItemMap = {};

        oVariantData = {
            Item1 : "Item 1",
            Item2 : "Item 2"
        };
        oItemMap = new sap.ushell.utils.Map();
        oItemMap.entries = oVariantData;

        oVariant = new sap.ushell.services.PersonalizationContainerVariant(sVARIANT_KEY, sVARIANT_NAME, oVariantData);
        // check variant key
        QUnit.assert.equal(sVARIANT_KEY, oVariant.getVariantKey(),
                "Variant key is correctly stored");
        // check variant name
        QUnit.assert.equal(sVARIANT_NAME, oVariant.getVariantName(),
                "Variant name is correctly stored");
        // check variant data
        QUnit.assert.equal(oVariantData.Item1, oVariant.getItemValue("Item1"),
                "Item1 value is correctly stored");
        QUnit.assert.equal(oVariantData.Item2, oVariant.getItemValue("Item2"),
                "Item2 value is correctly stored");
    });

    test("Variant: create variant add, change and delete item", function () {
        var sVARIANT_KEY = "VARIANTKEY_168",
            sVARIANT_NAME = "Variant number 168",
            oVariantData = {},
            aItemKeys = [],
            oVariant = {};
        oVariantData = {
            Item1 : "Item 1",
            Item2 : "Item 2"
        };
        oVariant = new sap.ushell.services.PersonalizationContainerVariant(sVARIANT_KEY, sVARIANT_NAME, oVariantData);
        // add
        oVariant.setItemValue("Item3", "Item 3");
        QUnit.assert.equal(oVariantData.Item3, oVariant.getItemValue("Item3"),
                "Item3 value is correctly stored");
        QUnit.assert.equal(true, oVariant.containsItem("Item3"), "containsItem works correctly");
        // change
        oVariant.setItemValue("Item1", "Item 42");
        QUnit.assert.equal("Item 42", oVariant.getItemValue("Item1"),
                "Item1 value is changed correctly");
        QUnit.assert.equal("Item 42", oVariantData.Item1,
                "Data object handed over to constructor is changed!");
        // get keys
        aItemKeys = oVariant.getItemKeys();
        deepEqual([ "Item1", "Item2", "Item3" ], aItemKeys,
                "The correct array of item keys is returned by getItemKeys");
        // deletem
        oVariant.delItem("Item2");
        QUnit.assert.equal(false, oVariant.containsItem("Item2"),
                "delItem works correctly");
        QUnit.assert.equal(undefined, oVariant.getItemValue("Item2"),
                "getItemValue for a non-existant item returns undefined");
    });

    test("Variant: create a variant with a non-string key", function () {
        var sVariantKey = "",
            sVariantName = "",
            unused;

        sVariantKey = ["0"];
        sVariantName = "VariantName";
        try {
            unused = new sap.ushell.services.PersonalizationContainerVariant(
                sVariantKey, sVariantName, {});
            unused = !unused; // eslint
            ok(false, "Error: Non-string key was not detected.");
        } catch (e) {
            ok(true, "Non-string key was was detected.");
        }
    });

    test("Variant: create a variant with a non-string name", function () {
        var sVariantKey = "",
            sVariantName = "",
            unused;

        sVariantKey = "0";
        sVariantName = ["ArrayVariantName"];
        try {
            unused = new sap.ushell.services.PersonalizationContainerVariant(
                sVariantKey, sVariantName, {});
            unused = !unused; // eslint
            ok(false, "Error: Non-string name was not detected.");
        } catch (e) {
            ok(true, "Non-string name was was detected.");
        }
    });

    test("Variant: create a variant with an exotic name", function () {
        var sVariantKey = "",
            sVariantName = "",
            unused;

        sVariantKey = "0";
        sVariantName = "未经";
        unused = new sap.ushell.services.PersonalizationContainerVariant(
            sVariantKey, sVariantName, {});
        unused = !unused; // eslint
        ok(true, "Variant name '" + sVariantName + "' was handled with no error during variant creation.");
    });

    test("Variant: delete a non-existent item", function () {
        var oVariant = {},
            sVariantKey = "",
            sVariantName = "";

        sVariantKey = "0";
        sVariantName = "VariantName";
        oVariant = new sap.ushell.services.PersonalizationContainerVariant(
            sVariantKey, sVariantName, {});
        oVariant.delItem("NonExistentItemKey...");
        ok(true, "Non-existent item was deleted without error.");
    });

    test("Variant: getItemValue for non-existent item", function () {
        var oVariant = {},
            sVariantKey = "",
            sVariantName = "",
            oItemValue = {};

        sVariantKey = "0";
        sVariantName = "VariantName";
        oVariant = new sap.ushell.services.PersonalizationContainerVariant(
            sVariantKey, sVariantName, {});
        oItemValue = oVariant.getItemValue("NonExistentItemKey...");
        QUnit.assert.equal(undefined, oItemValue, "Correct value undefined was returned.");
    });

    test("Variant: serialization", function () {
        var oVariant = {},
            sVariantKey = "",
            sVariantName = "",
            oVariantData = {},
            oItemValue = {},
            oSerializationResult = {},
            oSerializationExp = {};

        sVariantKey = "0";
        sVariantName = "VariantSerializationName";
        oVariant = new sap.ushell.services.PersonalizationContainerVariant(
            sVariantKey, sVariantName, {});
        oItemValue = {
            part1 : "Part 1",
            part2 : "Part 2"
        };
        oVariantData.item1 = oItemValue;
        oVariantData.item2 = oItemValue;
        oSerializationExp.name = sVariantName;
        oSerializationExp.variantData = oVariantData;
        oVariant.setItemValue("item1", oItemValue);
        oVariant.setItemValue("item2", oItemValue);
        oSerializationResult = oVariant._serialize();
        QUnit.assert.deepEqual(oSerializationResult, oSerializationExp,
                "Serialization of variant works correctly");
    });

    // ........... Variant Set Tests ...........

    test("Variant Set: add and delete variant", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_988",
            sVariantKey1 = "",
            sVariantKey2 = "",
            oVariantSet = {},
            oVariant1 = {},
            oVariant2 = {};

        QUnit.assert.equal(false, this.oContainer
                .containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        QUnit.assert.equal(true, this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was added");
        oVariant1 = oVariantSet.addVariant("Variant number one added");
        sVariantKey1 = oVariant1.getVariantKey();
        QUnit.assert.equal(true, oVariantSet.containsVariant(sVariantKey1),
                "Variant '" + sVariantKey1 + "' was added");
        // add variant 1
        oVariant2 = oVariantSet.addVariant("Variant number two");
        sVariantKey2 = oVariant2.getVariantKey();
        QUnit.assert.equal(true, oVariantSet.containsVariant(sVariantKey2),
                "Variant '" + sVariantKey2 + "' was added");
        // delete variant 0
        oVariantSet.delVariant(sVariantKey1);
        QUnit.assert.equal(false, oVariantSet.containsVariant(sVariantKey1),
                "Variant '" + sVariantKey1 + "' was deleted");
        // delete variant 1
        oVariantSet.delVariant(sVariantKey2);
        QUnit.assert.equal(false, oVariantSet.containsVariant(sVariantKey2),
                "Variant '" + sVariantKey2 + "' was deleted");
        // delete variant set
        this.oContainer.delVariantSet(sVARIANT_SET_KEY);
        QUnit.assert.equal(false, this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was deleted");
    });

    test("Variant Set: add existing variant set", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1025",
            sVARIANT_NAME = "VARIANT_1026",
            oVariantSet = {};

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!oVariantSet.getVariantKeyByName(sVARIANT_NAME),
                "Variant with name '" +  sVARIANT_NAME + "' does not exist");
        oVariantSet.addVariant(sVARIANT_NAME); // add it once
        try {
            oVariantSet.addVariant(sVARIANT_NAME); // add it twice
            ok(false, "Error: adding the same named variant twice was not detected");
        } catch (e) {
            ok(true, "Exception for adding the same variant twice is correct");
        }
    });

    test("Variant Set: set current variant and check", function () {
        this.aVariantExp = [];
        this.oVariantNameAndKeysExp = {};
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1027",
            oVariantSet = {},
            oVariant = {},
            sVariantKeyExp;

        if (this.oContainer.containsVariantSet(sVARIANT_SET_KEY)) {
            this.oContainer.delVariantSet(sVARIANT_SET_KEY);
        }

        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        oVariant = oVariantSet.addVariant("V1");
        oVariant.setItemValue("item", this.oItemValue);
        sVariantKeyExp = oVariant.getVariantKey();
        oVariantSet.setCurrentVariantKey(sVariantKeyExp);

        QUnit.assert.deepEqual(oVariantSet.getCurrentVariantKey(), sVariantKeyExp,
                "currentVariantKey was set correctly");
    });

    test("Variant Set: delete non-existent variant", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1050",
            sVARIANT_KEY = "1051",
            oVariantSet = {};

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!oVariantSet.containsVariant(sVARIANT_KEY),
                "Variant '" + sVARIANT_KEY + "' does not exist");
        try {
            oVariantSet.delVariant(sVARIANT_KEY);
            ok(true, "Non-existing variant was deleted without error/exception");
        } catch (e) {
            ok(false, "Error: Exception during deletion of a non-existing variant");
        }
    });

    test("Variant Set: get non-existent variant", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1070",
            sVARIANT_KEY = "1071",
            oVariantSet = {},
            oVariant = {};

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!oVariantSet.containsVariant(sVARIANT_KEY),
                "Variant '" + sVARIANT_KEY + "' does not exist");
        try {
            oVariant = oVariantSet.getVariant(sVARIANT_KEY);
            ok(oVariant === undefined, "getVariant returns undefined for a non-existing variant");
        } catch (e) {
            ok(false, "Error: Exception during getVariant for a non-existing variant");
        }
    });

    test("Variant Set: add variant with an exotic name", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1091",
            sVARIANT_NAME = "未经",
            oVariantSet = {},
            oVariant = {};

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!oVariantSet.getVariantKeyByName(sVARIANT_NAME),
                "Variant with name '" +  sVARIANT_NAME + "' does not exist");
        try {
            oVariant = oVariantSet.addVariant(sVARIANT_NAME);
            ok(oVariant instanceof sap.ushell.services.PersonalizationContainerVariant, "addVariant returns a variant object");
        } catch (e) {
            ok(false, "Error: Exception during addVariant");
        }
    });

    test("Variant Set: add variant to a big max key variant set", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1112",
            sVARIANT_NAME1 = "VARIANT_1113",
            sVARIANT_KEY1 = "999999",
            sVARIANT_NAME2 = "VARIANT_1115",
            oVariantSet = {},
            oVariant1 = {},
            oVariant2 = {};

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        ok(!oVariantSet.containsVariant(sVARIANT_KEY1),
                "Variant with key '" +  sVARIANT_KEY1 + "' does not exist");
        // add variant manually
        oVariant1 = new sap.ushell.services.PersonalizationContainerVariant(sVARIANT_KEY1, sVARIANT_NAME1);
        oVariantSet._oVariantMap.put(sVARIANT_KEY1, oVariant1);
        oVariantSet._oVariantNameMap.put(sVARIANT_NAME1, sVARIANT_KEY1);
        ok(oVariantSet.containsVariant(sVARIANT_KEY1),
                "Variant with key '" +  sVARIANT_KEY1 + "' and name '" + sVARIANT_NAME1 + "' was added");
        oVariant2 = oVariantSet.addVariant(sVARIANT_NAME2);
        ok(parseInt(oVariant2.getVariantKey(), 10) === parseInt(sVARIANT_KEY1, 10) + 1, "variant key was increased correctly");
    });

    test("Variant Set: getVariantKeyByName standard", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1138",
            sVARIANT_NAME = "VARIANT_1139",
            oVariantSet = {},
            oVariant = {};

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        oVariant = oVariantSet.addVariant(sVARIANT_NAME);
        QUnit.assert.equal(oVariantSet.getVariantKeyByName(sVARIANT_NAME), oVariant.getVariantKey(),
                "getVariantKey returns the correct key");
    });

    test("Variant Set: getVariantKeyByName with non-existing name", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1154",
            sVARIANT_NAME = "VARIANT_1155",
            oVariantSet = {};

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        QUnit.assert.equal(oVariantSet.getVariantKeyByName(sVARIANT_NAME), undefined,
                "getVariantKey returns undefined for a non-existing name");
    });

    test("Variant Set: getVariantKeyByName with non-string name", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1168",
            oVariantSet = {};

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        QUnit.assert.equal(oVariantSet.getVariantKeyByName(oVariantSet), undefined,
                "getVariantKey returns undefined for a non-string name");
    });

    test("Variant Set: getVariantNamesAndKeys", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1196",
            sVARIANT_NAME1 = "VARIANT_1",
            sVARIANT_NAME2 = "VARIANT_2",
            sVARIANT_NAME3 = "VARIANT_3",
            sVariantKey1 = "",
            sVariantKey2 = "",
            sVariantKey3 = "",
            oVariantSet = {},
            aVariantNamesAndKeys = [];

        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        ok(this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' was created");
        sVariantKey1 = oVariantSet.addVariant(sVARIANT_NAME1).getVariantKey();
        sVariantKey2 = oVariantSet.addVariant(sVARIANT_NAME2).getVariantKey();
        sVariantKey3 = oVariantSet.addVariant(sVARIANT_NAME3).getVariantKey();
        aVariantNamesAndKeys = oVariantSet.getVariantNamesAndKeys();
        QUnit.assert.equal(aVariantNamesAndKeys[sVARIANT_NAME1], sVariantKey1, "result for variant 1 is correct");
        QUnit.assert.equal(aVariantNamesAndKeys[sVARIANT_NAME2], sVariantKey2, "result for variant 2 is correct");
        QUnit.assert.equal(aVariantNamesAndKeys[sVARIANT_NAME3], sVariantKey3, "result for variant 3 is correct");
    });

    test("Variant Set: save and simulate browser reload 1", function () {
        this.aVariantExp = [];
        this.oVariantNameAndKeysExp = {};
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1052",
            oVariantSet = {},
            oVariant1 = {},
            oVariant2 = {},
            oItemMap = {},
            that = this;

        // add variant set
        if (this.oContainer.containsVariantSet(sVARIANT_SET_KEY)) {
            this.oContainer.delVariantSet(sVARIANT_SET_KEY);
        }
        ok(!this.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                "Variant set '" + sVARIANT_SET_KEY + "' does not exist");
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        oItemMap = new sap.ushell.utils.Map();

        oVariant1 = oVariantSet.addVariant("V1");
        oVariant1.setItemValue("I1", {
            Val1 : "value 1",
            Val2 : "value 2"
        });
        oVariant1.setItemValue("I2", {
            Filter1 : "24",
            Filter2 : "1000"
        });
        oItemMap.entries = oVariant1;
        this.aVariantExp.push(oVariant1);
        this.oVariantNameAndKeysExp.V1 = oVariant1.getVariantKey();
        // add variant V2
        oVariant2 = oVariantSet.addVariant("V2");
        oVariant2.setItemValue("I1", {
            Val1 : "value 11",
            Val2 : "value 12"
        });
        oVariant2.setItemValue("I2", {
            Filter1 : "48",
            Filter2 : "50000"
        });
        oItemMap.entries = oVariant2;
        this.aVariantExp.push(oVariant2);
        this.oVariantNameAndKeysExp.V2 = oVariant2.getVariantKey();
        // save
        this.oContainer.save().fail(function () {
            ok(false, "Save failed");
        });
        // simulate browser reload
        delete this.oContainer;
        this.oService._oContainerMap.remove(sCONTAINERPREFIX + sCONTAINER);
        stop();
        this.oService.getPersonalizationContainer(sCONTAINER)
            .done(function (oContainer) {
                var aVariantKeys = [],
                    aVariants = [],
                    oVariantNameAndKeys = {};

                start();
                ok(oContainer.containsVariantSet(sVARIANT_SET_KEY),
                        "Variant set '" + sVARIANT_SET_KEY + "' exists after save");
                oVariantSet = oContainer.getVariantSet(sVARIANT_SET_KEY);

                oVariantNameAndKeys = oVariantSet.getVariantNamesAndKeys();
                QUnit.assert.deepEqual(oVariantNameAndKeys, that.oVariantNameAndKeysExp,
                        "Variant names and keys are correct");
                QUnit.assert.deepEqual(oVariantSet.getVariantKeyByName("V1"), that.oVariantNameAndKeysExp.V1);
                QUnit.assert.deepEqual(oVariantSet.getVariantKeyByName("V2"), that.oVariantNameAndKeysExp.V2);
                aVariantKeys = oVariantSet.getVariantKeys();
                aVariantKeys.forEach(function (sVariantKey) {
                    aVariants[sVariantKey] = oVariantSet
                            .getVariant(sVariantKey);
                });
                QUnit.assert.deepEqual(aVariants, that.aVariantExp, "Entire variant is correct");
                oContainer.delVariantSet(sVARIANT_SET_KEY);
                ok(!oContainer.containsVariantSet(sVARIANT_SET_KEY),
                        "Variant set '" + sVARIANT_SET_KEY + "' was deleted");
            });
    });

    test("Variant Set: save and simulate browser reload 2", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_1137",
            oVariantSet = {},
            oVariant = {};

        // add variant set
        if (this.oContainer.containsVariantSet(sVARIANT_SET_KEY)) {
            this.oContainer.delVariantSet(sVARIANT_SET_KEY);
        }

        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        // add variant V1
        oVariant = oVariantSet.addVariant("V1");
        oVariant.setItemValue("I1", {
            Val1 : "value 1",
            Val2 : "value 2"
        });
        oVariant.setItemValue("I2", {
            Filter1 : "24",
            Filter2 : "1000"
        });
        // add variant V2
        oVariant = oVariantSet.addVariant("V2");
        oVariant.setItemValue("I1", {
            Val1 : "value 11",
            Val2 : "value 12"
        });
        oVariant.setItemValue("I2", {
            Filter1 : "48",
            Filter2 : "50000"
        });

        // save container
        this.oContainer.save().fail(function () {
            ok(false, "Save failed");
        });
        // tabula rasa
        delete this.oContainer;
        this.oService._oContainerMap.remove(sCONTAINER);
        // new container
        stop();
        this.oService.getPersonalizationContainer(sCONTAINER)
            .done(function (oContainer) {
                var aVariantKeys = [],
                    aVariants = [],
                    oVariant = {},
                    sVariantKey = "",
                    that = this;

                start();
                that.oContainer = oContainer;
                oVariantSet = that.oContainer
                        .getVariantSet(sVARIANT_SET_KEY);
                oVariant = oVariantSet.addVariant("V3");
                oVariant.setItemValue("I1", {
                    Val1 : "value 111",
                    Val2 : "value 123"
                });
                oVariant.setItemValue("I2", {
                    Filter1 : "489",
                    Filter2 : "90000"
                });
                sVariantKey = oVariantSet.getVariantKeyByName("V2");
                oVariantSet.delVariant(sVariantKey);
                sVariantKey = oVariantSet.getVariantKeyByName("V1");
                oVariantSet.delVariant(sVariantKey);
                oVariant = oVariantSet.addVariant("V1");
                oVariant.setItemValue("I3", {
                    Val1 : "value 01",
                    Val2 : "value 02"
                });
                oVariant.setItemValue("I4", {
                    Filter1 : "240",
                    Filter2 : "10009"
                });
                that.oContainer.save();
                aVariantKeys = oVariantSet.getVariantKeys();
                aVariantKeys.forEach(function (sVariantKey) {
                    aVariants.push(oVariantSet.getVariant(sVariantKey));
                });
                QUnit.assert.equal(2, aVariants.length, "Variant Set contains two items");
                QUnit.assert.equal("V3", aVariants[0].getVariantName(), "First variant in set is V3");
                QUnit.assert.deepEqual(aVariants[0].getItemValue("I1"), {
                    Val1 : "value 111",
                    Val2 : "value 123"
                }, "Item value I1 from V3 still exist");
                QUnit.assert.deepEqual(aVariants[0].getItemValue("I2"), {
                    Filter1 : "489",
                    Filter2 : "90000"
                }, "Item value I2 from V3 still exist");
                QUnit.assert.equal("V1", aVariants[1].getVariantName(), "Second variant in set is V1");
                QUnit.assert.deepEqual(aVariants[1].getItemValue("I3"), {
                    Val1 : "value 01",
                    Val2 : "value 02"
                }, "Item value I3 from V1 still exist");
                QUnit.assert.deepEqual(aVariants[1].getItemValue("I4"), {
                    Filter1 : "240",
                    Filter2 : "10009"
                }, "Item value I4 from V1  still exist");
                // delete variant set
                that.oContainer.delVariantSet(sVARIANT_SET_KEY);
            });
    });




    //  ............................................................................
    //
    //               Container Version 1
    //
    //  ............................................................................


    module("sap.ushell.services.Personalization: Container V1", {
        setup : function () {
            this.oService = {};
            this.oAdapter = {};
            this.oContainer = {};
            var oSystem = {},
                that = this;

            this.oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
            this.oService = new sap.ushell.services.Personalization(this.oAdapter);
            this.oService.getPersonalizationContainer(sCONTAINER)
                .done(function (oContainer) {
                    //start();
                    that.oContainer = oContainer;
                });
        },
        teardown : function () {
            this.oService.delPersonalizationContainer(sCONTAINER);
            delete this.oAdapter;
            delete this.oContainer;
            delete this.oService;
        }
    });


    // ........... Container Item Tests ...........

    test("Items: set, get and delete item", function () {
        var sITEM_KEY = "ITEM_501",
            oItemValueRead = {};

        QUnit.assert.equal(false, this.oContainer.containsItem(sITEM_KEY),
                "ITEM_0815 is not exisiting");
        this.oContainer.setItemValue(sITEM_KEY, this.oItemValue);
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEM_KEY),
                "ITEM_0815 exisits after setItemValue");
        oItemValueRead = this.oContainer.getItemValue(sITEM_KEY);
        deepEqual(this.oItemValue, oItemValueRead,
                "getItemValue returns the correct value for ITEM_0815");
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEM_KEY),
                "containsItem returned true correctly for ITEM_0815");
        this.oContainer.delItem(sITEM_KEY);
        QUnit.assert.equal(null, this.oContainer.getItemValue(sITEM_KEY),
                "Item was deleted, getItemValue returned null");
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEM_KEY),
                "containsItem returned false correctly");
    });

    test("Items: set, get and delete item, check difficult keynames", function () {
        var sITEM_KEY = "hasOwnProperty",
            oItemValueRead = {};

        this.oContainer.delItem(sITEM_KEY);
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEM_KEY),
                "hasOwnProperty is not exisiting");
        this.oContainer.setItemValue(sITEM_KEY, this.oItemValue);
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEM_KEY),
                "hasOwnProperty exisits after setItemValue");
        oItemValueRead = this.oContainer.getItemValue(sITEM_KEY);
        deepEqual(this.oItemValue, oItemValueRead,
                "getItemValue returns the correct value for hasOwnProperty");
        QUnit.assert.equal(true, this.oContainer.containsItem(sITEM_KEY),
                "containsItem returned true correctly for hasOwnProperty");
        this.oContainer.delItem(sITEM_KEY);
        QUnit.assert.equal(null, this.oContainer.getItemValue(sITEM_KEY),
                "Item was deleted, getItemValue returned null");
        QUnit.assert.equal(false, this.oContainer.containsItem(sITEM_KEY),
                "containsItem returned false correctly");
    });

    test("Items: add items with and with no prefix, read them", function () {
        var oItemValue = {},
            aActItemKeys = [],
            that = this;

        oItemValue = {
            part1 : "Part 1",
            part2 : "Part 2"
        };
        // check if the container is empty
        QUnit.assert.equal(this.oContainer.getItemKeys().length, 0, "Container is empty");
        // add item1 with no item prefix
        // dirty hack
        this.oContainer._oItemMap.put("item1", oItemValue);
        // add item2 with item prefix
        this.oContainer.setItemValue("item2", oItemValue);
        // add item 3 with item prefix
        this.oContainer.setItemValue("item3", oItemValue);
        aActItemKeys = this.oContainer.getItemKeys();
        QUnit.assert.equal(aActItemKeys.length, 3, "Container has 3 items: '" + aActItemKeys + "'");
        ok(true, "Internal item keys are: " + this.oContainer._oItemMap.keys() + "'");
        QUnit.assert.equal(false, this.oContainer.containsItem("item1"), "'item1' is not detected by containsItem due to automatic prefixing!");
        stop();
        this.oContainer.save()
            .fail(function () {
                start();
                ok(false, "Error during container save");
            })
            .done(function () {
                start();
                ok(true, "Successful container save");
                stop();
                that.oContainer.load()
                    .fail(function () {
                        start();
                        ok(false, "Error during container reload");
                    })
                    .done(function () {
                        start();
                        ok(true, "Successful container relaod");
                        // check if prefix was added to item1
                        QUnit.assert.equal(true, that.oContainer.containsItem("item1"), "Container contains 'item1'");
                        ok(true, "Internal item keys are: " + that.oContainer._oItemMap.keys() + "'");
                        QUnit.assert.equal(true, that.oContainer._oItemMap.containsKey("ITEM#item1"), "Item prefix was added while reload");
                        that.oContainer.delItem("item1");
                        that.oContainer.delItem("item2");
                        that.oContainer.delItem("item3");
                        QUnit.assert.equal(that.oContainer.getItemKeys().length, 0, "All items are deleted");
                    });
            });
    });

    test("Items: Delete non-existent item", function () {
        var sITEM_KEY = "nonExistingItem";

        ok(!this.oContainer.containsItem(sITEM_KEY), "Item is not existing");
        try {
            this.oContainer.delItem(sITEM_KEY);
            ok(true, "Non-existent item was deleted without error");
        } catch (e) {
            ok(false, "Error during deletion of non-existing item");
        }
    });

    test("Items: Get value of non-existent item", function () {
        var sITEM_KEY = "nonExistingItem",
            oItemValue = {};

        ok(!this.oContainer.containsItem(sITEM_KEY), "Item is not existing");
        try {
            oItemValue = this.oContainer.getItemValue(sITEM_KEY);
            ok(oItemValue === undefined, "Value of a non-existing item is undefined");
        } catch (e) {
            ok(false, "Error during getItemvalue of non-existing item");
        }
    });

    // ........... Variant Sets .............

    test("Variant Set: add and delete variant sets", function () {
        var aActVariantSetKeys = [],
            aExpVariantSetKeys = [],
            that = this;

        aExpVariantSetKeys = ["variantSet1", "variantSet2"];
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            that.oContainer.addVariantSet(sVariantSetKey, that.oItemValue);
        });
        // check variant sets
        aActVariantSetKeys = this.oContainer.getVariantSetKeys();
        aExpVariantSetKeys.forEach(function (sVariantSetKey, index) {
            deepEqual(aActVariantSetKeys[index], sVariantSetKey,
                "'" + sVariantSetKey + "' exists");
        });
        // delete
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            that.oContainer.delVariantSet(sVariantSetKey);
        });
        // check deletion
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            QUnit.assert.equal(false, that.oContainer.containsVariantSet(sVariantSetKey),
                "Container does not have variantSet '" + sVariantSetKey + "'");
        });
    });

    test("Variant Set: Delete non-existent variant set", function () {
        var sVARIANT_SET_KEY = "nonExistingVariantset";

        ok(!this.oContainer.containsItem(sVARIANT_SET_KEY), "Variant set is not existing");
        try {
            this.oContainer.delVariantSet(sVARIANT_SET_KEY);
            ok(true, "Non-existent variant set was deleted without error");
        } catch (e) {
            ok(false, "Error during deletion of non-existing variant set");
        }
    });

    test("Variant Set: Get non-existent variant set", function () {
        var sVARIANT_SET_KEY = "nonExistingVariantset",
            oVariantSet = {};

        ok(!this.oContainer.containsItem(sVARIANT_SET_KEY), "Variant set is not existing");
        try {
            oVariantSet = this.oContainer.getVariantSet(sVARIANT_SET_KEY);
            ok(oVariantSet === undefined, "Non-existent variant set object is undefined");
        } catch (e) {
            ok(false, "Error during getVariantSet for a non-existing variant set");
        }
    });

    test("Variant Set: Add variant set that exists", function () {
        var sVariantSetKey = "";

        sVariantSetKey = "variantSetKey_682";
        this.oContainer.addVariantSet(sVariantSetKey);
        ok(this.oContainer.containsVariantSet(sVariantSetKey), "Variant set '" + sVariantSetKey + "' was added");
        try {
            this.oContainer.addVariantSet(sVariantSetKey);
            ok(false, "Existence of variant set was not detected");
        } catch (e) {
            ok(true, "Existence of variant set was detected");
        }
    });

    // ........... Container Tests ...........

    test("Container: add items and variant sets, read them separately", function () {
        var oItemValue = {},
            aActItemKeys = [],
            aExpItemKeys = [],
            aActVariantSetKeys = [],
            aExpVariantSetKeys = [],
            bOk = true,
            that = this;

        oItemValue = {
            part1 : "Part 1",
            part2 : "Part 2"
        };
        aExpItemKeys = ["item1", "item2", "item3"];
        aExpVariantSetKeys = ["variantSet1", "variantSet2"];
        // add items
        aExpItemKeys.forEach(function (sItemKey) {
            that.oContainer.setItemValue(sItemKey, oItemValue);
        });
        // add variant sets
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            that.oContainer.addVariantSet(sVariantSetKey, oItemValue);
        });
        // check items
        aActItemKeys = this.oContainer.getItemKeys();
        bOk = true;
        aExpItemKeys.forEach(function (sItemKey) {
            if (aActItemKeys.indexOf(sItemKey) === -1) {
                ok(false, "Container does not contain item '" + sItemKey + "'");
                bOk = false;
            }
        });
        if (bOk) { ok(true, "Item keys are correct: " + aActItemKeys); }
        // check variant sets
        aActVariantSetKeys = this.oContainer.getVariantSetKeys();
        bOk = true;
        aExpVariantSetKeys.forEach(function (sVariantSetKey) {
            if (aActVariantSetKeys.indexOf(sVariantSetKey) === -1) {
                ok(false, "Container does not contain variant set '" + sVariantSetKey + "'");
            }
        });
        if (bOk) { ok(true, "Variant set keys are correct: " + aActVariantSetKeys); }
    });

    test("Container: add and delete variantSets/Items", function () {
        var sVARIANT_SET_KEY = "VARIANT_SET_KEY_738",
            oVariantSet = {},
            oVariant = {},
            that = this;

        this.oContainer.setItemValue("itemKey1", "item1");
        this.oContainer.setItemValue("itemKey2", "item2");

        // add variant set
        if (this.oContainer.containsVariantSet(sVARIANT_SET_KEY)) {
            this.oContainer.delVariantSet(sVARIANT_SET_KEY);
        }
        oVariantSet = this.oContainer.addVariantSet(sVARIANT_SET_KEY);
        // add variant V1
        oVariant = oVariantSet.addVariant("V1");
        oVariant.setItemValue("I1", {
            Val1 : "value 1",
            Val2 : "value 2"
        });
        oVariant.setItemValue("I2", {
            Filter1 : "24",
            Filter2 : "1000"
        });
        // add variant V2
        oVariant = oVariantSet.addVariant("V2");
        oVariant.setItemValue("I1", {
            Val1 : "value 11",
            Val2 : "value 12"
        });
        oVariant.setItemValue("I2", {
            Filter1 : "48",
            Filter2 : "50000"
        });
        // save container
        this.oContainer.save().fail(function () {
            ok(false, "Save failed");
        });
        stop();
        start();
        this.oContainer.delItem("itemKey2");
        this.oContainer.delVariantSet(sVARIANT_SET_KEY);
        this.oContainer.setItemValue("itemKey3", "item3");
        this.oContainer.save()
            .done(function () {
                ok(!that.oContainer.containsItem("itemKey2"), "itemKey2 was deleted");
                ok(!that.oContainer.containsVariantSet(sVARIANT_SET_KEY),
                        sVARIANT_SET_KEY + " was deleted");
                ok(that.oContainer.containsItem("itemKey3"),
                        "itemKey3 was added");
            })
            .fail(function () {
                ok(false, "Save failed");
            });
    });

    asyncTest("Container: Get container with non-string key", function () {
        try {
            this.oService.getPersonalizationContainer(this.oService)
                .done(function () {
                    start();
                    ok(false, "Error: Container with a non-string key was not prohibited");
                })
                .fail(function () {
                    start();
                    ok(false, "Error: Container with a non-string key was not prohibited");
                });
        } catch (e) {
            start();
            ok(true, "Non-string sContainerKey led to an exception");
        }
    });

    test("Container: Container constructor with empty key", function () {
        try {
            var oContainer = new sap.ushell.services.PersonalizationContainer({}, ""); // oAdapter, sContainerKey
            oContainer = oContainer;
            ok(false, "Error: Container with an empty key was not prohibited");
        } catch (e) {
            //start();
            ok(true, "Empty sContainerKey led to an exception");
        }
    });

    test("Container: Container constructor with non-string key", function () {
        try {
            var oContainer = new sap.ushell.services.PersonalizationContainer({}, {}); // oAdapter, sContainerKey
            oContainer = oContainer;
            ok(false, "Error: Container with a non-string key was not prohibited");
        } catch (e) {
            //start();
            ok(true, "Non-string sContainerKey led to an exception");
        }
    });

    asyncTest("Container: reload restores original data", function () {
        this.oService.getPersonalizationContainer(sCONTAINER)
            .done(function (oContainer) {
                start();
                oContainer.setItemValue("key1", "item1");
                QUnit.assert.equal(oContainer.getItemValue("key1"), "item1", "key1 added");
                stop();
                oContainer.save()
                    .done(function () {
                        start();
                        ok(true, "Data saved");
                        QUnit.assert.equal(oContainer.getItemValue("key1"), "item1", "key1 still there after save");
                        oContainer.setItemValue("key1", "item2");
                        QUnit.assert.equal(oContainer.getItemValue("key1"), "item2", "key1 changed to item2 (no save)");
                        stop();
                        oContainer.load()
                            .done(function () {
                                start();
                                equal(oContainer.getItemValue("key1"), "item1", "key1 loaded with correct value 'item1'");
                            })
                            .fail(function () {
                                start();
                                ok(false, "Load failed");
                            });
                    })
                    .fail(function () {
                        start();
                        ok(false, "Save failed");
                        stop();
                    });
            });
    });

    asyncTest("Container: Error during load inside constructor", function () {
        var sCONTAINER_KEY = "constructorErrorContainer",
            that = this;

        this.oAdapter.setErrorProvocation(sCONTAINER_KEY);
        this.oService.getPersonalizationContainer(sCONTAINER_KEY)
            .done(function (oContainer) {
                start();
                ok(false, "Error: Load of container should have failed");
            })
            .fail(function (oContainer) {
                start();
                ok(true, "Load of container failed");
                that.oAdapter.resetErrorProvocation(sCONTAINER_KEY);
                that.oService._oContainerMap.remove(sCONTAINERPREFIX + sCONTAINER_KEY);
                    // dirty hack to get a new deferred object during the deletion
                stop();
                that.oService.delPersonalizationContainer(sCONTAINER_KEY)
                    .done(function () {
                        start();
                        ok(true, "Deletion of container succeeded");
                    })
                    .fail(function () {
                        start();
                        ok(false, "Deletion of container failed");
                    });
            });

    });

    asyncTest("Container: Error during save", function () {
        var sCONTAINER_KEY = "saveErrorContainer",
            that = this;

        this.oService.getPersonalizationContainer(sCONTAINER_KEY)
            .done(function (oContainer) {
                start();
                ok(true, "Load of container succeeded");
                that.oAdapter.setErrorProvocation(sCONTAINER_KEY);
                stop();
                oContainer.save()
                    .done(function () {
                        start();
                        ok(false, "Error: Save of container succeeded");
                    })
                    .fail(function () {
                        start();
                        ok(true, "Save of container failed");
                    });
            })
            .fail(function (oContainer) {
                start();
                ok(false, "Error: Load of container failed");
            });
    });

    asyncTest("Container: Error during deletion", function () {
        var sCONTAINER_KEY = "deletionErrorContainer",
            that = this;

        this.oService.getPersonalizationContainer(sCONTAINER_KEY)
            .done(function (oContainer) {
                start();
                ok(true, "Load of container succeeded");
                that.oAdapter.setErrorProvocation(sCONTAINER_KEY);
                stop();
                that.oService.delPersonalizationContainer(sCONTAINER_KEY)
                    .done(function () {
                        start();
                        ok(false, "Error: Deletion of container succeeded");
                    })
                    .fail(function () {
                        start();
                        ok(true, "Deletion of container failed");
                    });
            })
            .fail(function (oContainer) {
                start();
                ok(false, "Error: Load of container failed");
            });
    });

    asyncTest("Container: check for container singleton", function () {
        var sCONTAINER_KEY = "singletonContainer",
            that = this;

        this.oService.getPersonalizationContainer(sCONTAINER_KEY)
            .done(function (oContainer1) {
                start();
                ok(true, "Load of container 1 succeeded");
                stop();
                that.oService.getPersonalizationContainer(sCONTAINER_KEY)
                    .done(function (oContainer2) {
                        start();
                        ok(true, "Load of container 2 succeeded");
                        ok(oContainer1 === oContainer2, "Container is a singleton");
                    })
                    .fail(function () {
                        start();
                        ok(false, "Error: Load of container 2  failed");
                    });
            })
            .fail(function (oContainer) {
                start();
                ok(false, "Error: Load of container 1 failed");
            });
    });

    test("Container: Mix of container and personalizer", function () {
        // Personalizer does reuse of the container
        var oITEM_KEY = "mixItem",
            oItemValue = {},
            oPersId = {},
            oPersonalizer = {},
            oContainer = {};

        oPersId = {
            container : sCONTAINER,
            item : oITEM_KEY
        };
        oPersonalizer = this.oService.getPersonalizer(oPersId);
        oItemValue = {
            part1 : "Part 1",
            part2 : "Part 2"
        };
        oPersonalizer.setPersData(oItemValue)
            .done(function (oReadItemValue) {
                oPersonalizer._getContainer(oPersId.container)
                    .done(function (oCntnr) {
                        //start();
                        oContainer = oCntnr;
                        ok(oContainer instanceof sap.ushell.services.Personalization.ContextContainer, "Context container is used");
                        oReadItemValue = oContainer.getItemValue(oITEM_KEY);
                        QUnit.assert.deepEqual(oReadItemValue, oItemValue, "Value read from container is the one written via personalizer");
                    })
                    .fail(function () {
                        start();
                        ok(false, "Error: Personalizer._getContainer failed");
                    });
            })
            .fail(function () {
                start();
                ok(false, "Error: setPersData failed");
            });
    });




    //  ............................................................................
    //
    //             unit tests for the sap.ushell.services.Personalization.WindowAdapterContainer
    //
    //  ............................................................................

    module("unit tests for the sap.ushell.services.Personalization: WindowAdapterContainer", {
        setup : function () {
            this.oITEMVALUE = {"v1": "false"};
            this.oTransientPersonalizer = new sap.ushell.services.Personalization(null).getTransientPersonalizer();
        },
        teardown : function () {
            delete this.oITEMVALUE;
            delete this.oTransientPersonalizer;
        }
    });

    function clone(oObject) {
        if (oObject === undefined) {
            return undefined;
        }
        try {
            return JSON.parse(JSON.stringify(oObject));
        } catch (e) {
            return undefined;
        }
    }


    asyncTest("load first scenario - found in window cache", function () {
        // Personalizer does reuse of the container
        var oCut,
            oCPreparation,
            oMockContainer;

        oCPreparation = new sap.ushell.services.Personalization.WindowAdapterContainer("ContainerKey", { validity : 10080 }, oMockContainer);
        //First test scenario
        //Data is found in the window object and needs to be copied to the backend container
        oCPreparation.setItemValue("itemKey1", "itemValue1");
        oCPreparation.setItemValue("itemKey2", "itemValue2");
        oCPreparation.setItemValue("itemKey3", "itemValue3");

        //Create temporary window functionality
        sap.ushell.services.Personalization.WindowAdapter.prototype.data = {};
        //Save oCPreparation in window object
        sap.ushell.services.Personalization.WindowAdapter.prototype.data["ContainerKey"] = clone(oCPreparation._oItemMap.entries);

        //Backend Container
        oMockContainer = new sap.ushell.adapters.mock.AdapterContainer("ContainerKey");
        sinon.spy(oMockContainer, "setItemValue");

        //Class under test
        oCut = new sap.ushell.services.Personalization.WindowAdapterContainer("ContainerKey", { validity : 10080 }, oMockContainer);
        equal(oCut.getItemValue("itemKey1"), undefined, "itemKey1 is not in container yet");
        equal(oMockContainer.getItemValue("itemKey1"), undefined, "itemKey1 is not in mockcontainer yet");

        //expected data is loaded from the window and copied to the mock adapter container
        oCut.load();
        start();
        ok(oMockContainer.setItemValue.calledThrice, "Items were found in the window object and successfully copied to the backend adapter");
        equal(oCut.getItemValue("itemKey1"), "itemValue1", "itemKey1 is in container");
        equal(oMockContainer.getItemValue("itemKey1"), "itemValue1", "itemKey1 is in mockcontainer");
    });

    asyncTest("load second scenario - not found in window cache", function () {
        var oCut,
            oMockContainer;
        //Backend Container
        oMockContainer = new sap.ushell.adapters.mock.AdapterContainer("ContainerKey");

        //Create temporary window functionality
        sap.ushell.services.Personalization.WindowAdapter.prototype.data = {};

        //WindowAdapterContainer
        oCut = new sap.ushell.services.Personalization.WindowAdapterContainer("ContainerKey", undefined, oMockContainer);

        //Second test scenario
        //Data is found in the backendContainer and not in the window object. Therefor, the data needs to be copied from the backendContainer to the window object
        oMockContainer.setItemValue("itemKey1", "itemValue1");
        oMockContainer.setItemValue("itemKey2", "itemValue2");
        oMockContainer.setItemValue("itemKey3", "itemValue3");

        sinon.spy(oCut, "setItemValue");

        oCut.load();
        start();
        ok(oCut.setItemValue.calledThrice, "Items were found in the backend container and successfully copied to the WindowAdapterContainer");
        ok(sap.ushell.services.Personalization.WindowAdapter.prototype.data["ContainerKey"], "Window cache contains items at the end");
        ok(sap.ushell.services.Personalization.WindowAdapter.prototype.data["ContainerKey"].hasOwnProperty("itemKey1"), "Window cache contains item for itemKey1");
        ok(sap.ushell.services.Personalization.WindowAdapter.prototype.data["ContainerKey"].hasOwnProperty("itemKey2"), "Window cache contains item for itemKey2");
        ok(sap.ushell.services.Personalization.WindowAdapter.prototype.data["ContainerKey"].hasOwnProperty("itemKey3"), "Window cache contains item for itemKey3");
    });

    asyncTest("save", function () {
        var oCut,
            oMockContainer;
        oMockContainer = new sap.ushell.adapters.mock.AdapterContainer("ContainerKey");
        oCut = new sap.ushell.services.Personalization.WindowAdapterContainer("ContainerKey", undefined, oMockContainer);
        sinon.spy(oMockContainer, "save");
        oCut.save();
        start();
        ok(oMockContainer.save.called, "save was called on the backend container");
    });

    test("setItemValue", function () {
        var oITEM_KEY = "mixItem",
            oCut,
            oMockContainer;
        oMockContainer = new sap.ushell.adapters.mock.AdapterContainer("ContainerKey");
        sinon.spy(oMockContainer, "setItemValue");
        oCut = new sap.ushell.services.Personalization.WindowAdapterContainer("ContainerKey", undefined, oMockContainer);
        oCut.setItemValue(oITEM_KEY, "v1");
        ok(oMockContainer.setItemValue.calledWith(oITEM_KEY, "v1"), " data set on mock too");
        equal(oCut.getItemValue(oITEM_KEY), "v1", "value can be read again");
    });

    test("delItem", function () {
        var oITEM_KEY = "mixItem",
            oCut,
            oMockContainer;
        //prepare
        oMockContainer = new sap.ushell.adapters.mock.AdapterContainer("ContainerKey");
        sinon.spy(oMockContainer, "delItem");
        oCut = new sap.ushell.services.Personalization.WindowAdapterContainer("ContainerKey", undefined, oMockContainer);
        oCut.setItemValue(oITEM_KEY, "v1");
        // method under test
        oCut.delItem(oITEM_KEY, "v1");
        // checks
        ok(oMockContainer.delItem.calledWith(oITEM_KEY), " data deleted on mock too");
        equal(oCut.getItemValue(oITEM_KEY), undefined, "value can be read again");
    });

    //  ............................................................................
    //
    //             unit tests for the sap.ushell.services.Personalization.getContainer()
    //             -> Client API
    //
    //  ............................................................................

    module("unit tests for the sap.ushell.services.Personalization: getContainer()", {
        setup : function () {
            this.oITEMVALUE = {"v1": "false"};
            this.oTransientPersonalizer = new sap.ushell.services.Personalization(null).getTransientPersonalizer();
        },
        teardown : function () {
            delete this.oITEMVALUE;
            delete this.oTransientPersonalizer;
        }
    });

    test("_adjustScope - correction of a wrong defined scope", function () {
        var oConstants,
            oActualScope,
            oExpectedScope;

        //retrieve constants from namespace 'constants' of personalization service
        oConstants = sap.ushell.services.Personalization.prototype.constants;
        //oActualScope should simulate wrong data
        oActualScope = {
            validity : "60", //wrong datatype-> has to be numeric
            keyCategory : oConstants.keyCategory.FIXED_KEY, //correct
            writeFrequency: oConstants.keyCategory.GENERATED_KEY, //wrong constant
            clientStorageAllowed: undefined //has to be filled with default value
        };
        oExpectedScope = {
            validity : Infinity,
            keyCategory : oConstants.keyCategory.FIXED_KEY,
            writeFrequency: oConstants.writeFrequency.HIGH,
            clientStorageAllowed: false
        };

        deepEqual(sap.ushell.services.Personalization.prototype._adjustScope(oActualScope), oExpectedScope, "Scope has been rectified correctly.");
    });

//  ............................................................................

    module("unit tests for the sap.ushell.services.Personalization: Key Generation Function", {
        setup : function () {
        },
        teardown : function () {
        }
    });
    test("getGeneratedKey", function () {
        var service = new sap.ushell.services.Personalization(undefined,  { randomKey : "AAA" }),
            first = service.getGeneratedKey(),
            second = service.getGeneratedKey();
        ok(typeof first === "string");
        equal(first.length, 40);
        ok(/^[A-Z0-9]{40}$/.test(first));
        equal(first.substring(0, 3), first.substring(0, 3)); // first three characters the same for all invocations
        ok(first !== second);
    });


    test("getGeneratedKey longseed", function () {
        var service = new sap.ushell.services.Personalization(undefined,  { randomKey : "AAA456789012345678901234567890" }),
            first = service.getGeneratedKey(),
            second = service.getGeneratedKey();
        ok(typeof first === "string", "returns string");
        equal(first.length, 40, "length of key is 40");
        ok(/^[A-Z0-9]{40}$/.test(first), "Key contains only A-Z and 0-9");
        equal(first.substring(0, 3), first.substring(0, 3), "first three characters the same for all invocations");
        ok(first !== second, "Every invocation returns new key");
    });

    test("getGeneratedKey nonalpha seed", function () {
        var service = new sap.ushell.services.Personalization(undefined,  { randomKey : "+g+Z+AAAAAAF6789012345678901234567890" }),
            first = service.getGeneratedKey(),
            second = service.getGeneratedKey();
        ok(typeof first === "string", "returns string");
        equal(first.length, 40, "length of key is 40");
        ok(/^[A-Z0-9]{40}$/.test(first), "Key contains only A-Z and 0-9");
        equal(first.substring(0, 3), first.substring(0, 3), "first three characters the same for all invocations");
        ok(first !== second, "Every invocation returns new key");
    });



    //  ............................................................................
    //
    //             Unmodifiable Container
    //
    //  ............................................................................

    module("unit tests for the sap.ushell.services.Personalization: Unmodifiable Container", {
    });
    test("all expected functions exist on unmodifiable container", function () {
        var oMockAdapter = {
                getAdapterContainer: function (sContainerKey) {
                    return {};
                }
            },
            oContainer = new sap.ushell.services.Personalization.ContextContainer(undefined,
                    oMockAdapter, "sap.ushell.personalization#mock_pers", { validity : Infinity }),
            oUnmodifiableContainer = oContainer.getUnmodifiableContainer();

        [ "containsItem", "getItemKeys", "getItemValue", "getUnmodifiableContainer",
            "getValidity", "clear", "delItem", "flush", "load", "save", "saveDeferred",
            "setItemValue" ]
            .forEach(function (sFunctionName) {
                ok(typeof oUnmodifiableContainer[sFunctionName] === "function",
                    "function " + sFunctionName + " exists on container");
            });

    });
    test("all allowed functions execute correctly", function () {
        var oMockAdapter = {
                getAdapterContainer: function (sContainerKey) {
                    return {};
                }
            },
            oContainer = new sap.ushell.services.Personalization.ContextContainer(undefined,
                    oMockAdapter, "sap.ushell.personalization#mock_pers", { validity : Infinity }),
            oUnmodifiableContainer = oContainer.getUnmodifiableContainer();

        // prepare data
        oContainer.setItemValue("foo", "bar");

        // test access to data
        deepEqual(oUnmodifiableContainer.getItemKeys(), ["foo"], "getItemKeys returns expected value");
        equal(oUnmodifiableContainer.containsItem("foo"), true, "containsItem returns expected value");
        equal(oUnmodifiableContainer.getItemValue("foo"), "bar", "getItemValue returns expected value");
        equal(oUnmodifiableContainer.getValidity(), Infinity, "getValidity returns expected value");
        deepEqual(oUnmodifiableContainer.getUnmodifiableContainer(), oUnmodifiableContainer, "getUnmodifiableContainer returns expected value");

        // modify data
        oContainer.setItemValue("foofoo", "barbar");

        // test access after modification and another getUnmodifiableContainer
        deepEqual(oUnmodifiableContainer.getItemKeys(), ["foo", "foofoo"], "getItemKeys returns expected value");

    });
    test("all blocked functions throw an error", function () {
        var oMockAdapter = {
                getAdapterContainer: function (sContainerKey) {
                    return {};
                }
            },
            oContainer = new sap.ushell.services.Personalization.ContextContainer(undefined,
                    oMockAdapter, "sap.ushell.personalization#mock_pers", { validity : Infinity }),
            oUnmodifiableContainer = oContainer.getUnmodifiableContainer();

        [ "clear",
            "delItem",
            "flush",
            "load",
            "save",
            "saveDeferred",
            "setItemValue" ]
            .forEach(function (sFunctionName) {
                throws(oUnmodifiableContainer[sFunctionName],
                    function (oError) {
                        return oError.message === "Function " + sFunctionName + " can't be called on unmodifiable container";
                    },
                    sFunctionName + " throws expected exception");
            });

    });

    //  ............................................................................
    //
    //             Service only tests
    //
    //  ............................................................................

    module("sap.ushell.services.Personalization (createEmptyContainer / getContainer): service only tests", {
        setup : function () {
            var oSystem,
                oAdapter;
            oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter(oSystem);
            this.oService = new sap.ushell.services.Personalization(oAdapter);
            this.oService.delContainer("ACONTAINER").done(function (oContainer) {
                //start();
            });
        },
        teardown : function () {
            delete this.oService;
        }
    });


    asyncTest("createEmptyContainer", function () {
        var oService,
            oAdapter,
            oFakeContainer,
            oAdapterGetSpy,
            oLoadSpy;
        sap.ushell.adapters.mock.PersonalizationAdapter.prototype.supportsGetWithoutSubsequentLoad = true;
        oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter();
        oFakeContainer = {
            clear : function () {},
            load : function () { return jQuery.Deferred().resolve().promise(); },
            getItemKeys : function () { return []; },
            delItem : function () {}
        };
        oAdapterGetSpy = sinon.stub(oAdapter, "getAdapterContainer", function () { return oFakeContainer; });
        oLoadSpy = sinon.spy(oFakeContainer, "load");
        sinon.spy(oFakeContainer, "clear");
        oService = new sap.ushell.services.Personalization(oAdapter);
        start();
        oService.createEmptyContainer("ACONTAINER").done(function () {
            equal(oAdapterGetSpy.calledOnce, true, "getAdapterContainer called once");
            equal(oLoadSpy.calledOnce, false, "load called once ");
        }).fail(function () {
            ok(false, "expected done");
        });
        ok(true, "got here");
    });

    asyncTest("createEmptyContainer supportsGetWithoutSubsequentLoad ", function () {
        var oService,
            oAdapter,
            oFakeContainer,
            oAdapterGetSpy,
            oLoadSpy;
        sap.ushell.adapters.mock.PersonalizationAdapter.prototype.supportsGetWithoutSubsequentLoad = false;
        oAdapter = new sap.ushell.adapters.mock.PersonalizationAdapter();
        oFakeContainer = {
            clear : function () {},
            load : function () { return jQuery.Deferred().resolve().promise(); },
            getItemKeys : function () { return []; },
            delItem : function () {}
        };
        oAdapterGetSpy = sinon.stub(oAdapter, "getAdapterContainer", function () { return oFakeContainer; });
        oLoadSpy = sinon.spy(oFakeContainer, "load");
        sinon.spy(oFakeContainer, "clear");
        oService = new sap.ushell.services.Personalization(oAdapter);
        start();
        oService.createEmptyContainer("ACONTAINER").done(function () {
            equal(oLoadSpy.calledOnce, true, "load called once ");
            equal(oAdapterGetSpy.calledOnce, true, "getAdapterContainer called once");
        }).fail(function () {
            ok(false, "expected done");
        });
        ok(true, "got here");
    });
//  ............................................................................
//
//
//
//
//
//                           M O C K   A D A P T E R
//
//
//
//
//
//  ............................................................................

    sap.ushell.adapters.mock.PersonalizationAdapter = function (oSystem) {
        this._sCONTAINER_PREFIX = "sap.ushell.personalization#";
        this._oContainerMap = new sap.ushell.utils.Map();
        this._oErrorMap = new sap.ushell.utils.Map(); // has to be outside the container
    };

    sap.ushell.adapters.mock.PersonalizationAdapter.prototype.setErrorProvocation = function (sContainerKey) {
        this._oErrorMap.put(this._sCONTAINER_PREFIX + sContainerKey, true);
    };

    sap.ushell.adapters.mock.PersonalizationAdapter.prototype.resetErrorProvocation = function (sContainerKey) {
        this._oErrorMap.put(this._sCONTAINER_PREFIX + sContainerKey, false);
    };



    // ---- Container ----
    sap.ushell.adapters.mock.PersonalizationAdapter.prototype.getAdapterContainer = function (sContainerKey) {
        var oContainer = {};

        if (this._oContainerMap.containsKey(sContainerKey)) {
            oContainer = this._oContainerMap.get(sContainerKey);
        } else {
            oContainer = new sap.ushell.adapters.mock.AdapterContainer(sContainerKey);
            oContainer._oErrorMap = this._oErrorMap; // dirty injection to keep the API of all adapters the same
            this._oContainerMap.put(sContainerKey, oContainer);
        }
        return oContainer;
    };

    sap.ushell.adapters.mock.PersonalizationAdapter.prototype.delAdapterContainer = function (sContainerKey) {
        var oDeferred = new jQuery.Deferred();

        this._oContainerMap.get(sContainerKey);
        if (this._oErrorMap.get(sContainerKey)) {
            oDeferred.reject();
        } else {
            oDeferred.resolve();
        }
        this._oContainerMap.remove(sContainerKey);
        return oDeferred.promise();
    };

    // --- Adapter Container ---
    sap.ushell.adapters.mock.AdapterContainer = function (sContainerKey) {
        this._sContainerKey = sContainerKey;
        this._oItemMap = new sap.ushell.utils.Map();
        this._oErrorMap = new sap.ushell.utils.Map();
    };

    sap.ushell.adapters.mock.AdapterContainer.prototype.load = function () {
        var oDeferred = new jQuery.Deferred();
        if (this._oErrorMap.get(this._sContainerKey)) {
            oDeferred.reject();
        } else {
            oDeferred.resolve();
        }
        return oDeferred.promise();
    };

    sap.ushell.adapters.mock.AdapterContainer.prototype.save = function () {
        var oDeferred = new jQuery.Deferred();
        if (this._oErrorMap.get(this._sContainerKey)) {
            oDeferred.reject();
        } else {
            oDeferred.resolve();
        }
        return oDeferred.promise();
    };

    sap.ushell.adapters.mock.AdapterContainer.prototype.getItemKeys = function () {
        return this._oItemMap.keys();
    };

    sap.ushell.adapters.mock.AdapterContainer.prototype.containsItem = function (sItemKey) {
        return this._oItemMap.containsKey(sItemKey);
    };

    sap.ushell.adapters.mock.AdapterContainer.prototype.getItemValue = function (sItemKey) {
        return this._oItemMap.get(sItemKey);
    };

    sap.ushell.adapters.mock.AdapterContainer.prototype.setItemValue = function (sItemKey, oItemValue) {
        this._oItemMap.put(sItemKey, oItemValue);
    };

    sap.ushell.adapters.mock.AdapterContainer.prototype.delItem = function (sItemKey) {
        this._oItemMap.remove(sItemKey);
    };

}());
