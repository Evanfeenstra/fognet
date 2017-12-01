//import IOTA from "iota.lib.js"
import Presets from "./config"
import Worker from './iota.worker.js';
import WebworkerPromise from 'webworker-promise';
/*
export var iota = new IOTA({
  provider: Presets.IOTA
})
iota.api.attachToTangle = localAttachToTangle*/

export var iota = {}



require("isomorphic-fetch")

export class Iota {

  static async initWorker() {
    console.log('init')
    this.worker = new WebworkerPromise(new Worker());
  }

  /*static message(m, callback) {
    const listen = (e) => {
      console.log(e.data.funcName, m.funcName)
      if (e.data.funcName === m.funcName){
        this.worker.removeEventListener("message", listen);
        callback(e.data);
      }
    }
    this.worker.addEventListener("message", listen)
    this.worker.postMessage(m);
  }*/

  static async fund(address) {
    // Get your free seeeed
    var response = await fetch("https://seeds.tangle.works/")
    var wallet = await response.json()
    // var wallet = {
    //   seed:
    //     "FQLYDKWEBVIFC9UQKYWXNCDFVRNMAPADSTLXNHPQQFGTCSCJABEULUKBIZCGGRWYFSPTKMKIRBATVCMAZ"
    // }

    var transfers = [{ address, value: 400 }]
    console.log(transfers)

    return new Promise(function(resolve, reject) {
      iota.api.sendTransfer(wallet.seed, 5, 9, transfers, (e, r) => {
        console.log(e, r)
        if (e !== null) {
          reject(e)
        } else {
          resolve(r)
        }
      })
    })
  }

  static async getBalance(seed) {
    return this.worker.postMessage({
      cmd: 'getInputs',
      args: {seed}
    })
  }

  static async createAddresses(seed, amount, index) {
    return new Promise(function (resolve, reject) {
      if (index == undefined) {
        // start with 0
        index = 0
      }
      iota.api.getNewAddress(seed, {'index': index, 'checksum': true, 'total': amount, 'security': Presets.SECURITY, 'returnAll': true},
        function (error, success) {
          if (error) {
            reject(error)
          }
          else {
            resolve(success)
          }
        }
      )
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

export const isClient =
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement

// Check if window is available
export const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return false
  }
  return true
}
