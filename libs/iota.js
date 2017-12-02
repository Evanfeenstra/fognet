import IOTA from "iota.lib.js"
import Presets from "./presets"
import {localAttachToTangle} from './localAttachToTangle'
export var iota = new IOTA({
  provider: Presets.IOTA
})
iota.api.attachToTangle = localAttachToTangle

require("isomorphic-fetch")

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

export const fund = async address => {
  // Get your free seeeed
  var response = await fetch("https://seeds.tangle.works/")
  var wallet = await response.json()
  // var wallet = {
  //   seed:
  //     "FQLYDKWEBVIFC9UQKYWXNCDFVRNMAPADSTLXNHPQQFGTCSCJABEULUKBIZCGGRWYFSPTKMKIRBATVCMAZ"
  // }
  console.log("FUND FROM TESTNET WALLET NOW", wallet)
  var transfers = [{ address, value: 400 }]
  console.log(transfers)

  return new Promise(function(resolve, reject) {
    iota.api.sendTransfer(wallet.seed, 5, 9, transfers, (e, r) => {
      if (e !== null) {
        reject(e)
      } else {
        resolve(r)
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
