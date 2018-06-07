import Presets from "./config"
import Worker from './iota.worker.js';
import WebworkerPromise from 'webworker-promise';
import {actions} from './actions'

require("isomorphic-fetch")

export class Iota {

  static initWorker() {
    if(typeof OffscreenCanvas !== "undefined") {
      this.worker = new WebworkerPromise(new Worker())
      this.worker.postMessage({
        cmd: 'init',
        provider: Presets.IOTA,
        worker: true
      })
    } else  {
      this.worker = {postMessage: async (m) => actions[m.cmd](m)}
      this.worker.postMessage({
        cmd: 'init',
        provider: Presets.IOTA,
        worker: false
      })
    }
  }

  static getBalance(seed) {
    return this.worker.postMessage({
      cmd: 'getInputs',
      seed: seed
    })
  }

  static createAddresses(seed, amount, index) {
    if (index == undefined) {
      // start with 0
      index = 0
    }
    return this.worker.postMessage({
      cmd: 'getNewAddress',
      seed: seed,
      options: {
        'index': index, 
        'checksum': true, 
        'total': amount, 
        'security': Presets.SECURITY,
        'returnAll': true
      }
    })
  }
  
  static async fundFromTestnet(address, amount) {
    // Get your free seeeed
    var response = await fetch("https://seeds.tangle.works/")
    var wallet = await response.json()
    // var wallet = {
    //   seed:
    //     "FQLYDKWEBVIFC9UQKYWXNCDFVRNMAPADSTLXNHPQQFGTCSCJABEULUKBIZCGGRWYFSPTKMKIRBATVCMAZ"
    // }
    return this.sendTransfer(
      wallet.seed,
      [{ address, value: Math.min(amount, 2000) }]
    )
  }

  static async sendTransfer(seed, transfers) {
    return this.worker.postMessage({
      cmd: 'sendTransfer',
      seed: seed,
      transfers: transfers
    })
  }

  static async prepareTransfers(seed, transfers) {
    return this.worker.postMessage({
      cmd: 'prepareTransfers',
      seed: seed,
      transfers: transfers
    })
  }

  static async sendTrytes(transfers) {
    return this.worker.postMessage({
      cmd: 'sendTrytes',
      transfers: transfers
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
