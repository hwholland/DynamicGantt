sap.ui.define(["sap/ui/base/Object", "sap/suite/ui/generic/template/lib/MessageUtils"], function(BaseObject, MessageUtils) {
	"use strict";

	// Class for busy handling
	function getMethods(oTemplateContract) {

		var mBusyReasons = {};
		var bIsBusy = false;
		var bBusyDirty = false;
		var iBusyPromiseCount = 0;
		var iBusyDelay = oTemplateContract.oNavContainer.getBusyIndicatorDelay();

		var fnApplyBusyImmediately;

		function fnApplyBusy(bImmediate) {
			bIsBusy = iBusyPromiseCount !== 0 || !jQuery.isEmptyObject(mBusyReasons);
			if (bIsBusy || bImmediate) {
				bBusyDirty = false;
				if (bIsBusy !== oTemplateContract.oNavContainer.getBusy()) {
					oTemplateContract.oNavContainer.setBusy(bIsBusy);
					if (!bIsBusy) {
						oTemplateContract.oNavContainer.setBusyIndicatorDelay(iBusyDelay);
						if (oTemplateContract.hasView()) {
							MessageUtils.handleTransientMessages(oTemplateContract.getDialogFragment);
						}
					}
				}
			} else { // postpone removal of busy indicator until navigation visualisation is finished
				oTemplateContract.oApplication.getCurrentDisplayObject().promise.then(fnApplyBusyImmediately);
			}
		}
		fnApplyBusyImmediately = fnApplyBusy.bind(null, true);

		function fnEnsureApplyBusy(bImmediate) {
			if (bImmediate) {
				oTemplateContract.oNavContainer.setBusyIndicatorDelay(0);
				fnApplyBusy();
			} else if (!bBusyDirty) {
				bBusyDirty = true;
				setTimeout(fnApplyBusy, 0);
			}
		}

		function fnBusyPromiseResolved() {
			iBusyPromiseCount--;
			if (!iBusyPromiseCount) {
				fnEnsureApplyBusy(false);
			}
		}

		function setBusyReason(sReason, bIsActive, bImmediate) {
			if (bIsActive) {
				bIsBusy = true;
				mBusyReasons[sReason] = true;
			} else {
				delete mBusyReasons[sReason];
			}
			fnEnsureApplyBusy(bImmediate);
		}

		function setBusy(oBusyEndedPromise, bImmediate) {
			iBusyPromiseCount++;
			bIsBusy = true;
			if (bImmediate) {
				oTemplateContract.oNavContainer.setBusyIndicatorDelay(0);
			}
			oBusyEndedPromise.then(fnBusyPromiseResolved, fnBusyPromiseResolved);
			fnEnsureApplyBusy(bImmediate);
		}

		return {
			setBusyReason: setBusyReason,
			setBusy: setBusy,
			isBusy: function() {
				return bIsBusy;
			}
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.lib.BusyHelper", {
		constructor: function(oTemplateContract) {
			jQuery.extend(this, getMethods(oTemplateContract));
		}
	});
});