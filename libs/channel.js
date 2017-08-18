import API from "./api"
import shortid from "shortid"

import Flash from "iota.flash.js"
import multisig from "iota.flash.js/lib/multisig"

export default class Channel {
  // Security level
  static SECURITY = 2

  // Number of parties taking signing part in the channel
  static SIGNERS_COUNT = 3

  // Flash tree depth
  static TREE_DEPTH = 4

  static flash = {}

  // Initiate the local state and store it localStorage
  static async initialize(
    userID = shortid.generate(),
    index = 0,
    singingIndex = 0,
    security = Channel.SECURITY,
    signersCount = Channel.SIGNERS_COUNT,
    treeDepth = Channel.TREE_DEPTH,
    fromIndex = 0,
    balance = 300,
    deposit = Array(Channel.SIGNERS_COUNT).fill(0),
    stakes = [1].concat(Array(Channel.SIGNERS_COUNT - 1).fill(0))
  ) {
    // Escape the function when server rendering
    if (!isWindow()) return false

    var userSeed = seedGen(81)

    // Stop if local state exists
    const localState = store.get("state")
    if (localState) {
      return localState
    }

    store.set("state", {
      userID: userID
    })

    // Get a new digest
    const digest = Channel.getNewDigest(userSeed, index, security)

    // Fetch a new multisig address
    const address = await Channel.getNewAddress(digest)

    // Add address to multisigs
    const multisigs = [address]
    console.log(multisigs)

    // Initialize state object
    const state = {
      userID: userID,
      userSeed: userSeed,
      digestIndex: 0, /// IS THIS CORRECT?
      signingIndex: signersCount, /// IS THIS MEANT TO BE SIGNERS COUNT?
      security: security,
      depth: treeDepth,
      fromIndex: fromIndex,
      multisigs: multisigs,
      bundles: []
    }
    state.flash = {
      digestIndex: 0,
      signersCount: signersCount,
      balance: balance,
      deposit: deposit,
      stakes: stakes,
      outputs: {},
      transfers: [],
      remainderAddress: multisigs[0].address
    }

    // Create a flash instance
    Channel.flash = new Flash({
      ...state.flash,
      onStateChange: flashState => {
        // Update local storage once flash state changes
        const stateCopy = store.get("state")
        stateCopy.flash = flashState
        store.set("state", stateCopy)
      }
    })

    console.log(state)
    console.log(Channel.flash)
    // Initiate the state entry in state
    store.set("state", state)

    return state
  }

  // Get a new digest and update index in state
  static getNewDigest(seed, digestIndex, security) {
    // Fetch state from localStorage
    const state = store.get("state")

    // Create new digest
    var digest = multisig.getDigest(
      state.seed || seed,
      state.digestIndex || digestIndex,
      state.security || security
    )

    // Increment digests key index
    state.digestIndex++

    // Update local state
    store.set("state", state)

    return digest
  }

  // Obtain address by sending digest, update multisigs in state
  static async getNewAddress(digest) {
    const state = await store.get("state")

    // Send digest to server and obtain new multisig address
    // const response = await API("address", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     uid: state.userID,
    //     digest: digest
    //   })
    // })

    /// FOR TESTIING USE Above^
    var digests = [
      digest,
      multisig.getDigest(
        `TRPSU9DSNROHLCPIXBXGDXPOLKPUOYZZBZJCEILRJNSIFZASLPKHCIDIDBRCJHASMENZMTICJMBZRANKM`,
        0,
        2
      )
    ]

    var response = multisig.composeAddress(digests)
    console.log(response)

    // Check to see if response is valid
    if (typeof response.address !== "string")
      return alert(":( something went wrong")

    return response
  }

  // Initiate transaction from anywhere in the app.
  static composeTransfer(value, settlementAddress, id) {
    /// Check if Flash state exists
    Channel.initFlash()
    // Get latest state from localstorage
    const state = store.get("state", state)
    var purchases = store.get("purchases")

    // Compose transfer
    const bundles = Channel.flash.composeTransfer(
      state.multisigs,
      state.fromIndex,
      [
        {
          address: settlementAddress,
          value: value
        }
      ]
    )

    // Sign transfer
    const signedBundles = Channel.flash.signTransfer(
      state.userSeed,
      state.signingIndex,
      state.security,
      state.multisigs,
      state.fromIndex,
      bundles
    )

    console.log("Bundles", signedBundles)

    // Increment signing index
    state.signingIndex++

    // Update bundles in local state
    state.bundles = signedBundles

    store.set("state", state)

    // Return signed bundles

    /* ////// Move this to higher level method, probably in the paywall widget
    
    // Get latest state from localstorage
    const state = store.get("state", state)
    
    const secret = getSecret(item.id);
    const params = {
      'uid': state.userID,
      'item': item.id,
      // TODO: replace with transfer diff
      'bundles': channel.composeTransfer(item.value, item.settlementAddress)
    })

    const res = await API('/purchase', params);
    
    if (res) {
      // render item, save secret
      // TODO: update bundles in local state
      channel.applyTransferDiff(res.diff);
    }*/

    // Emulate
    var res = { key: "djfksgfKHGgkss", id, value }

    // Check is purchases exists
    if (!purchases) var purchases = []
    // Push the purchase recipt to the browser
    purchases.push(res)
    // save purchases for reload
    store.set("purchases", purchases)
    // Return recipt to be used by the calling function
    return res
  }

  // Update bundles in local state by applying the diff
  static applyTransferDiff(diff) {
    // Get state
    const state = store.get("state")

    // Apply diff to bundles in state
    ///state.bundles = TODO: bundles with applied diff;

    store.set("state", state)
  }

  // Update bundles in local state by applying the diff
  static initFlash() {
    // Get state
    const state = store.get("state")

    if (!Channel.flash.onStateChange) {
      Channel.flash = new Flash({
        ...state.flash,
        onStateChange: flashState => {
          // Update local storage once flash state changes
          const stateCopy = store.get("state")
          stateCopy.flash = flashState
          store.set("state", stateCopy)
        }
      })
    }
  }
}

////// HELPERS
//
// Maybe move them outta channel ?

// Create IOTA instance directly with provider

import IOTA from "iota.lib.js"

var iota = new IOTA({
  provider: "https://node.tangle.works"
})

// Get node info
const getNodeInfo = async () => {
  const info = await new Promise(resolve => {
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
  return info
}

// Generate a random seed. Higher security needed
const seedGen = length => {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9"
  var i
  var result = ""
  if (window.crypto && window.crypto.getRandomValues) {
    var values = new Uint32Array(length)
    window.crypto.getRandomValues(values)
    for (i = 0; i < length; i++) {
      result += charset[values[i] % charset.length]
    }
    return result
  } else
    throw new Error(
      "Your browser is outdated and can't generate secure random numbers"
    )
}

// Store class utitlizing localStorage
class Store {
  static get(item) {
    return JSON.parse(localStorage.getItem(item))
  }
  static set(item, data) {
    localStorage.setItem(item, JSON.stringify(data))
  }
}

// Check if window is available
export const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    if (!("store" in global) || !(global.store instanceof Store)) {
      global.store = Store
    }
    return false
  }
  global.store = Store
  return true
}
