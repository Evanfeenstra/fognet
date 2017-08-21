import IOTA from "iota.lib.js"
import Presets from "./presets"

var iota = new IOTA({
  //   provider: "http://node.tangle.works:14265"
  provider: Presets.IOTA
})

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

// // Get node info
// export const getTips = async () => {
//     return new Promise(function(resolve, reject) {
//       iota.api.getTransactionsToApprove(6, (e, r) => {
//         if(e) {
//             reject(e)
//         } else {
//             resolve(r)
//         }
//       })
//     })
//   }

// export const attachToTangle = (trunk, branch, depth, array) => {
//     return new Promise(function(resolve, reject) {
//         iota.api.attachToTangle(trunk, branch, depth, array, (e, r) => {
//             console.log('sendTrytes', e, r);
//             if(e) {
//                 reject(e)
//             }
//             else {
//                 resolve(r)
//             }
//         })
//     });
// }

export class Attach {
  static bundleToTrytes(bundle) {
    var bundleTrytes = []
    bundle.forEach(function(bundleTx) {
      bundleTrytes.push(iota.utils.transactionTrytes(bundleTx))
    })
    return bundleTrytes.reverse()
  }

  static async sendTrytes(trytes) {
    return new Promise(function(resolve, reject) {
      iota.api.sendTrytes(trytes, 6, 15, (e, r) => {
        console.log("sendTrytes", e, r)
        if (e !== null) {
          reject(e)
        } else {
          resolve(r)
        }
      })
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
    console.log("attachAndPOWClosedBundle", bundles)
    bundles = Attach.getBundles(bundles)
    var trytesPerBundle = []
    for (var bundle of bundles) {
      var trytes = Attach.bundleToTrytes(bundle)
      trytesPerBundle.push(trytes)
    }
    console.log("closing room with trytes", trytesPerBundle)
    var results = []
    for (var trytes of trytesPerBundle) {
      console.log(trytes)
      //   var tips = await getTips()
      //   console.log(tips)
      //   var pow = await attachToTangle(tips.trunkTransaction, tips.branchTransaction, 15, trytes)
      //   console.log(pow)

      var result = await Attach.sendTrytes(trytes)
      results.push(result)
    }
    return results
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
  global.store = Store
  return true
}
