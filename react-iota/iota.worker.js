import IOTA from '../node_modules/iota.lib.js/lib/iota.js'
import Presets from './config'
import registerWebworker from 'webworker-promise/lib/register'
import curl from "./curl.min.js"

// changes to curl.js
// var canvas = new OffscreenCanvas(300, 150) instead of document.createElement('canvas')
// global.curl instead of window.curl
// added a "var" to states? (line 5830)

const iota = new IOTA({
  provider: Presets.IOTA
})

const actions = {

  getInputs: async ({seed}) => {
    return new Promise(function (resolve, reject) {
      iota.api.getInputs(seed, function (error, success) {
        if (error) reject(error)
        else resolve(success)
      })
    })
  },

  getNewAddress: async ({seed, args}) => {
    return new Promise(function (resolve, reject) {
      iota.api.getNewAddress(seed, args, function (error, success) {
        if (error) reject(error)
        else resolve(success)
      })
    })
  },

  sendTransfer: async ({seed, transfers}) => {
    return new Promise(function (resolve, reject) {
      iota.api.sendTransfer(seed, 5, 9, transfers, (e, r) => {
        if (e !== null) reject(e)
        else resolve(r)
      })
    })
  },

}

registerWebworker(async (m, emit) => actions[m.cmd](m))





const MAX_TIMESTAMP_VALUE = (Math.pow(3,27) - 1) / 2 // from curl.min.js

const localAttachToTangle = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {
    const ccurlHashing = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {
        const iotaObj = iota;
        const curl = global.curl
        curl.init()

        // inputValidator: Check if correct hash
        if (!iotaObj.valid.isHash(trunkTransaction)) {
            return callback(new Error("Invalid trunkTransaction"));
        }

        // inputValidator: Check if correct hash
        if (!iotaObj.valid.isHash(branchTransaction)) {
            return callback(new Error("Invalid branchTransaction"));
        }

        // inputValidator: Check if int
        if (!iotaObj.valid.isValue(minWeightMagnitude)) {
            return callback(new Error("Invalid minWeightMagnitude"));
        }

        var finalBundleTrytes = [];
        var previousTxHash;
        var i = 0;

        function loopTrytes() {
            getBundleTrytes(trytes[i], function(error) {
                if (error) {
                    return callback(error);
                } else {
                    i++;
                    if (i < trytes.length) {
                        loopTrytes();
                    } else {
                        // reverse the order so that it's ascending from currentIndex
                        return callback(null, finalBundleTrytes.reverse());
                    }
                }
            });
        }

        function getBundleTrytes(thisTrytes, callback) {
            // PROCESS LOGIC:
            // Start with last index transaction
            // Assign it the trunk / branch which the user has supplied
            // IF there is a bundle, chain  the bundle transactions via
            // trunkTransaction together

            var txObject = iotaObj.utils.transactionObject(thisTrytes);
            // console.log(thisTrytes.length)
            // console.log(txObject)
            txObject.tag = txObject.obsoleteTag;
            txObject.attachmentTimestamp = Date.now();
            txObject.attachmentTimestampLowerBound = 0;
            txObject.attachmentTimestampUpperBound = MAX_TIMESTAMP_VALUE;
            // If this is the first transaction, to be processed
            // Make sure that it's the last in the bundle and then
            // assign it the supplied trunk and branch transactions
            if (!previousTxHash) {
                // Check if last transaction in the bundle
                if (txObject.lastIndex !== txObject.currentIndex) {
                    return callback(new Error("Wrong bundle order. The bundle should be ordered in descending order from currentIndex"));
                }

                txObject.trunkTransaction = trunkTransaction;
                txObject.branchTransaction = branchTransaction;
            } else {
                // Chain the bundle together via the trunkTransaction (previous tx in the bundle)
                // Assign the supplied trunkTransaciton as branchTransaction
                txObject.trunkTransaction = previousTxHash;
                txObject.branchTransaction = trunkTransaction;
            }

            var newTrytes = iotaObj.utils.transactionTrytes(txObject);

            curl.pow({trytes: newTrytes, minWeight: minWeightMagnitude}).then(function(nonce) {
                var returnedTrytes = newTrytes.substr(0, 2673-81).concat(nonce);
                var newTxObject= iotaObj.utils.transactionObject(returnedTrytes);

                // Assign the previousTxHash to this tx
                var txHash = newTxObject.hash;
                previousTxHash = txHash;

                finalBundleTrytes.push(returnedTrytes);
                callback(null);
            }).catch(callback);
        }
        loopTrytes()
    }

    ccurlHashing(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
        if (callback) {
            return callback(error, success);
        } else {
            return success;
        }
    })
}

iota.api.attachToTangle = localAttachToTangle
