import Presets from "./config"
import Worker from './iota.worker.js';
import WebworkerPromise from 'webworker-promise';

require("isomorphic-fetch")

export class Iota {

  static async initWorker() {
    this.worker = new WebworkerPromise(new Worker());
  }

  static async getBalance(seed) {
    return this.worker.postMessage({
      cmd: 'getInputs',
      seed: seed
    })
  }

  static async createAddresses(seed, amount, index) {
    if (index == undefined) {
      // start with 0
      index = 0
    }
    return this.worker.postMessage({
      cmd: 'getNewAddress',
      seed: seed,
      args: {
        'index': index, 
        'checksum': true, 
        'total': amount, 
        'security': Presets.SECURITY, 
        'returnAll': true
      }
    })
  }
  
  static async fundFromTestnet(address) {
    // Get your free seeeed
    var response = await fetch("https://seeds.tangle.works/")
    var wallet = await response.json()
    // var wallet = {
    //   seed:
    //     "FQLYDKWEBVIFC9UQKYWXNCDFVRNMAPADSTLXNHPQQFGTCSCJABEULUKBIZCGGRWYFSPTKMKIRBATVCMAZ"
    // }
    return this.worker.postMessage({
      cmd: 'sendTransfer',
      seed: wallet.seed,
      transfers: [{ address, value: 400 }]
    })
  }

}

// Get node info
export const getNodeInfo = async () => {
  return new Promise(function(resolve, reject) {
    iota.api.getNodeInfo(function(error, success) {
      if (error) {
        console.error(error)
        resolve(null)
      } else {
        console.log(success)
        resolve(success)
      }
    })
  })
}

export class Attach {
  static bundleToTrytes(bundle) {
    var bundleTrytes = []
    bundle.forEach(function(bundleTx) {
      bundleTx.obsoleteTag = bundleTx.tag
      bundleTrytes.push(iota.utils.transactionTrytes(bundleTx))
    })
    return bundleTrytes.reverse()
  }

  static async sendTrytes(trytes) {
    return new Promise(function(resolve, reject) {
      iota.api.sendTrytes(
        trytes,
        Presets.PROD ? 6 : 5,
        Presets.PROD ? 15 : 10,
        (e, r) => {
          console.log("sendTrytes", e, r)
          if (e !== null) {
            reject(e)
          } else {
            resolve(r)
          }
        }
      )
    })
  }

  static getBundles(bundles) {
    var ret = []
    for (var bundle of bundles) {
      if (bundle !== null || bundle.value !== 0) {
        ret.push(bundle)
      }
    }
    return ret
  }

  static async POWClosedBundle(bundles) {
    try {
      console.log("attachAndPOWClosedBundle", bundles)
      var trytesPerBundle = []
      for (var bundle of bundles) {
        var trytes = Attach.bundleToTrytes(bundle)
        trytesPerBundle.push(trytes)
      }
      console.log(bundles[0][0])      
      console.log(iota.utils.transactionTrytes(bundles[0][0]).length)
      console.log("closing room with trytes", trytesPerBundle)
      console.log("closing room with trytes", trytesPerBundle[0][0].length)
      
      var results = []
      for (var trytes of trytesPerBundle) {
        var result = await Attach.sendTrytes(trytes)
        results.push(result)
      }
      return results
    } catch (e) {
      return e
    }
  }
}
