import IOTA from "iota.lib.js"
import API from "./api"
import shortid from "shortid"

import Flash from "iota.flash.js"
import multisig from "iota.flash.js/lib/multisig"
import IOTACrypto from "iota.crypto.js"

// Create IOTA instance directly with provider
var iota = new IOTA({
  provider: "https://node.tangle.works"
})

export default class Iota {
  static info = async () => {
    const info = await new Promise((resolve) => {
      iota.api.getNodeInfo(function(error, success) {
        if (error) {
          console.error(error)
          resolve(null)
        } else {
          console.log(success)
          resolve(success)
        }
      })
    });
    return info;
  }

  static initialise = () => {
    // Escape the function when server rendering
    if (!isWindow()) return
    // Grab seed from local
    var user = store.set("user")
    // No seed? Then go make one!
    if (user === null) {
      console.log("No User")
      user = Iota.setupState({
        'balance': 
      });
    }
    console.log(user)
  }

  setupState = async ({balance = 0, deposit = [0, 0], stakes = [1, 0], signersCount = 2}) => {
    
    const localState = store.get("user")
    if (localState) {
      return localState;
    }

    const userID = shortid.generate()
    const userSeed = seedGen(81)
    
    // Initialize state object
    const state = {
      'index': 0, 
      'security': 2
    };

    // Request Digest 0 or
    const digests = [multisig.getDigest(userSeed, 0, 2)];
    const otherDigests = await API.get('digests', {
      'uid': userID,
      'index': state.index
    })
    if (digests) {
      digests.concat(otherDigests);
    }
    
    // Get the mutlisig obj
    state.multisigs = [
      multisig.composeAddress(digests)
    ]

    this.flash = new Flash({
      index: 0,
      signersCount: signersCount,
      balance: balance,
      deposit: deposit,
      stakes: stakes,
      outputs: {},
      transfers: [],
      remainderAddress: multisigs[0].address,
      onStateChange: (flashState) => {
        const localState = store.get("user");        
        localState.flash = flashState;
        store.set("user", localState);
      }
    })

    store.set("user", state)
    
    return state;
  }

  // Initiate transaction from anywhere in the app.
  purchaseItem = async (item) => {
    
    const state = store.get("user", user)
    const flash = this.flash

    const bundles = flash.composeTransfer(multisigs, fromIndex, [{
      address: item.address,
      value: item.price
    }])
    
    const signedBundles = flash.signTransfer(state.seed, state.index, state.security, state.multisigs, 0, bundles)
    console.log("Transfer", bundles)

    const res = await API('/purchase', {
      'item': item.id,
      'bundles': bundles
    });

    // 
    // Render the response
    //

  }
}

////// HELPERS

// Get a new Address
const getAddress = async user => {
  // Create new digest
  var digest = iota.multisig.getDigest(user.seed, user.index + 1, 2)
  // Send digest to server
  const response = await API("new-address", {
    method: "POST",
    body: JSON.stringify({ object: "goes here" })
  })
  // Check to see if response is valid
  if (typeof response.address !== "string")
    return alert(":( something went wrong")
  // Save new address from the server
  user.addresses.push(response.address)
  // Add 1 to the index
  user.index = user.index++
  // Save user
  store.set("user", user)

  console.log(response)
  // respond with the address
  return response.address
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

class Store {
  constructor() {
    this.localStorage = isWindow() ? {} : localStorage;
  }
  get(item) {
    return JSON.parse(this.localStorage.getItem(item))
  }
  set(item, data) {
    localStorage.setItem(item, JSON.stringify(data))
  }
}

const store = new Store();

// Check if window is available
const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    global.localStorage = {}
    return false
  }
  return true
}
