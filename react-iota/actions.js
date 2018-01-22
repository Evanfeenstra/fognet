import IOTA from 'iota.lib.js'
import './curl.worker.min.js'
import './curl.min.js'

let iota = null

const actions = {

  init: ({provider, worker}) => {
    console.log("INIT NOW", worker)
    iota = new IOTA({provider})
    if(worker){
        iota.api.attachToTangle = workerAttachToTangle
    } else if(typeof window !== "undefined"){
        iota.api.attachToTangle = localAttachToTangle        
    }
    /*self.XMLHttpRequest.prototype.open = async () => {
      console.log("XMLHttpRequest HERE webworker")
      await timeout(1000)
      return true
    }*/
  },

  getInputs: async ({seed}) => {
    return new Promise(function (resolve, reject) {
      iota.api.getInputs(seed, function (error, success) {
        if (error) reject(error)
        else resolve(success)
      })
    })
  },

  getNewAddress: async ({seed, options}) => {
    return new Promise(function (resolve, reject) {
      iota.api.getNewAddress(seed, options, function (error, success) {
        if (error) reject(error)
        else resolve(success)
      })
    })
  },

  // wrapper around prepareTransfers and sendTrytes
  sendTransfer: async ({seed, transfers}) => {
    return new Promise(function (resolve, reject) {
      iota.api.sendTransfer(seed, 5, 9, transfers, (e, r) => {
        if (e !== null) reject(e)
        else resolve(r)
      })
    })
  },

  prepareTransfers: async ({seed, transfers}) => {
    return new Promise(function (resolve, reject) {
      iota.api.prepareTransfers(seed, transfers, (e, r) => {
        if (e !== null) reject(e)
        else resolve(r)
      })
    })
  },

  sendTrytes: async ({iota, transfers}) => {
    return new Promise(function (resolve, reject) {
      iota.api.sendTrytes(transfers, 5, 14, (e, r) => {
        if (e !== null) reject(e)
        else resolve(r)
      })
    })
  },

}

const MAX_TIMESTAMP_VALUE = (Math.pow(3,27) - 1) / 2 // from curl.min.js

const workerAttachToTangle = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {
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

export const localAttachToTangle = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {
    const ccurlHashing = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {
        const iotaObj = iota;
        const curl = window.curl
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


export {actions, iota}