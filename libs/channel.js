import API from "./api"
import shortid from "shortid"

import Flash from "iota.flash.js"
import multisig from "iota.flash.js/lib/multisig"

export default class Channel {

  // Security level
  static SECURITY = 2;
  
  // Number of parties taking signing part in the channel
  static SIGNERS_COUNT = 3;

  // Flash tree depth
  static TREE_DEPTH = 4;

  // Initiate the local state and store it localStorage
  async initialize({
    userID = shortid.generate(),
    useSeed = seedGen(81),
    index = 0,
    singingIndex = 0,
    security = SECURITY,
    signersCount = SIGNERS_COUNT,
    treeDepth = TREE_DEPTH,
    fromIndex = 0,
    balance = 0,
    deposit = Array(SIGNERS_COUNT).fill(0), 
    stakes = [1].concat(Array(SIGNERS_COUNT-1).fill(0))
  }) {

    // Escape the function when server rendering
    if (!isWindow()) return false;

    // Stop if local state exists
    const localState = store.get("state")
    if (localState) {
      return localState;
    }

    store.set("state", {
      'userID': userID
    })
    
    // Get a new digest
    const digest = this.getNewDigest(userSeed, index, security);

    // Fetch a new multisig address
    const address = await this.getNewAddress(digest);
    
    // Add address to multisigs
    const multisigs = [address];

    // Create a flash instance
    this.flash = new Flash({
      digestIndex: 0,
      signersCount: signersCount,
      balance: balance,
      deposit: deposit,
      stakes: stakes,
      outputs: {},
      transfers: [],
      remainderAddress: multisigs[0].address, 
      onStateChange: (flashState) => { 
        // Update local storage once flash state changes
        const stateCopy = store.get("state");        
        stateCopy.flash = flashState;
        store.set("state", stateCopy);
      }
    })

    // Initialize state object
    const state = {
      'userID': userID,
      'userSeed': userSeed,
      'digestIndex': digestIndex, 
      'signingIndex': signingIndex,
      'security': security,
      'depth': treeDepth,
      'fromIndex': fromIndex,
      'multisigs': multisigs,
      'bundles': []
    };

    // Initiate the state entry in state
    store.set("state", state)
    
    return state;
  }

  // Get a new digest and update index in state 
  getNewDigest() {

    // Fetch state from localStorage
    const state = store.get("state");

    // Create new digest
    var digest = multisig.getDigest(state.seed, state.digestIndex, state.security)
    
    // Increment digests key index
    state.digestIndex++;
    
    // Update local state
    store.set("state", state)

    return digest;
  }


  // Obtain address by sending digest, update multisigs in state
  async getNewAddress(digest) {
   
    const state = get("state");

    // Send digest to server and obtain new multisig address
    const response = await API("address", {
      method: "POST",
      body: JSON.stringify({
        'uid': state.userID,
        'digest': digest
      })
    })

    console.log(response);

    // Check to see if response is valid
    if (typeof response.address !== "string")
      return alert(":( something went wrong")

    const address = response.address;

    return address;
  }

  // Initiate transaction from anywhere in the app.
  composeTransfer(value, settlementAddress) {
   
    // Get latest state from localstorage
    const state = store.get("state", state)

    // Compose transfer
    const bundles = this.flash.composeTransfer(state.multisigs, state.fromIndex, [{
      address: settlementAddress,
      value: value
    }]);
    
    // Sign transfer 
    const signedBundles = this.flash.signTransfer(state.seed, state.signingIndex, state.security, state.multisigs, state.fromIndex, state.bundles);
    
    console.log("Bundles", signedBundles)

    // Increment signing index
    state.signingIndex++;

    // Update bundles in local state
    state.bundles = signedBundles;

    store.set("state", state);

    // Return signed bundles
    return signedBundles;

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

  }

  // Update bundles in local state by applying the diff
  applyTransferDiff(diff) {
    
    // Get state
    const state = store.get('state');

    // Apply diff to bundles in state
    ///state.bundles = TODO: bundles with applied diff;

    store.set('state', state);
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
  constructor() {
    this.localStorage = isWindow() ? {} : localStorage;
  }
  get(item) {
    return JSON.parse(this.localStorage.getItem(item))
  }
  set(item, data) {
    this.localStorage.setItem(item, JSON.stringify(data))
  }
}

// Check if window is available
const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    if (!('store' in global) || !(global.store instanceof Store)) {
      global.store = Store();
    }
    return false
  }
  return true
}
