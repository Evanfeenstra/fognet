import API from "./api"
import shortid from "shortid"

import Flash from "iota.flash.js"
import multisig from "iota.flash.js/lib/multisig"
import transfer from "iota.flash.js/lib/transfer"

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
    security = Channel.SECURITY,
    signersCount = Channel.SIGNERS_COUNT,
    treeDepth = Channel.TREE_DEPTH,
    balance = 300,
    deposit = Array(Channel.SIGNERS_COUNT).fill(100),
    stakes = [1].concat(Array(Channel.SIGNERS_COUNT - 1).fill(0))
  ) {
    // Escape the function when server rendering
    if (!isWindow()) return false

    var userSeed = seedGen(81)

    // Stop if local state exists
    const localState = await store.get("state")
    if (localState) {
       console.log(localState)
       return localState
    }

    // Initialize state object
    const state = {
      userID: userID,
      userSeed: userSeed,
      index: index,
      security: security,
      depth: treeDepth,
      bundles: [],
      flash: {
        signersCount: signersCount,
        balance: balance,
        deposit: deposit,
        stakes: stakes,
        outputs: {},
        transfers: []
      }
    }

    // Initiate the state in local storage
    await store.set("state", state);

    // Get a new digest
    // Fetch new multisig addresses
    // consists of { root, remainder }
    const digests = [];
    for (let i = 0; i < treeDepth + 1; i++) {
      const digest = await Channel.getNewDigest();
      digests.push(digest);
    }
    const addresses = await Channel.register(digests, userID);

    // Update root and remainder address
    state.flash.remainderAddress = addresses.remainder;
    state.flash.root = addresses.root;

    // Update root & remainder in state
    await store.set("state", state)

    // Create a flash instance
    Channel.flash = new Flash({
      ...state.flash
    })

    return state
  }

  static async register(digests, userID) {
    console.log('regists: Digets', digests)

    const opts = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        id: userID,
        digests: digests
      })
    }
    console.log(opts)
    // Send digests to server and obtain new multisig addresses
    const response = await API("register", opts)

    console.log('RESPONSE', response)
    const serverDigests = response.digests;
    let multisigs = digests.map((digest, index) => {      
      let addy = multisig.composeAddress([digest, serverDigests[index]]);
      addy.index = digest.index;
      addy.securitySum = digest.security + serverDigests[index].security;
      addy.security = digest.security;
      return addy;
    });
    
    const remainderAddress = multisigs.shift();

    for(let i = 0; i < multisigs.length; i++) {
      if(i>0) {
        multisigs[i-1].children.push(multisigs[i]);
      }
    }
    console.log(multisigs[0]);
    return {
      remainder: remainderAddress,
      root: multisigs.shift()
    };
  }

  static async getNewBranch(userID, address, digests) {
    console.log('branchists: Digets', digests)

    const opts = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        id: userID,
        address: address.address,
        digests: digests
      })
    }
    console.log(opts)
    // Send digests to server and obtain new multisig addresses
    const response = await API("branch", opts)

    console.log('RESPONSE', response)
    const serverDigests = response.digests;
    let multisigs = digests.map((digest, index) => {      
      let addy = multisig.composeAddress([digest, serverDigests[index]]);
      addy.index = digest.index;
      addy.securitySum = digest.security + serverDigests[index].security;
      addy.security = digest.security;
      return addy;
    });
    
    multisigs.unshift(address);
    for(let i = 1; i < multisigs.length; i++) {
        multisigs[i-1].children.push(multisigs[i]);
    }
    console.log(multisigs[0]);
    return address;
  }

  // Get a new digest and update index in state
  static async getNewDigest() {
    // Fetch state from localStorage
    const state = store.get("state");

    // Create new digest
    const digest = multisig.getDigest(
      state.userSeed,
      state.index,
      state.security
    );

    // Increment digests key index
    state.index++;

    // Update local state
    await store.set("state", state)

    return digest
  }

  // Obtain address by sending digest, update multisigs in state
  static async getNewAddress(digest) {
    
    const state = await store.get("state")

    if (!digest) {
      digest = getNewDigest()
    }

    // Send digest to server and obtain new multisig address
    const response = await API("address", {
      method: "POST",
      body: JSON.stringify({
        id: state.userID,
        digest: digest
      })
    })
    
    var addresses = multisig.composeAddress(digests)
    console.log(response)

    // Check to see if response is valid
    if (typeof addresses.address !== "string")
      return alert(":( something went wrong")

    return addresses
  }

  // Initiate transaction from anywhere in the app.
  static async composeTransfer(value, settlementAddress, id) {
    /// Check if Flash state exists
    await Channel.initFlash()
    // Get latest state from localstorage
    const state = await store.get("state")
    var purchases = await store.get("purchases")
    console.log(state)
    // TODO: check/generate tree
    let toUse = multisig.updateLeafToRoot(state.flash.root);
    if(toUse.generate != 0) {
      // Tell the server to generate new addresses, attach to the multisig you give
      const digests = await Promise.all(Array(toUse.generate).fill().map(() => Channel.getNewDigest()));
      await Channel.getNewBranch(
        state.userID,
        toUse.multisig, 
        digests);
    }
    // Compose transfer
    const flash = state.flash;
    const bundles = transfer.compose(
      flash.balance, 
      flash.deposit, 
      flash.outputs, 
      flash.stakes, 
      toUse.multisig, 
      flash.remainderAddress, 
      flash.transfers, 
      [{
      address: settlementAddress,
      value: value
    }]);
    console.log("Unsigned", bundles)
    // Sign transfer
    const signedBundles = transfer.sign(
      state.flash.root,
      state.userSeed,
      bundles
    )

    console.log("Bundles", signedBundles)
    
    // Update bundles in local state
    state.bundles = signedBundles

    // store.set("state", state)

    // Return signed bundles

    const opts = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        id: state.userID,
        bundles: signedBundles,
        item: id
      })
    }
    console.log(opts)

    const res = await API('purchase', opts);
    
    if (res) {
      // render item, save secret
      // TODO: update bundles in local state
      transfer.applyTransfers(
        state.flash.root, 
        state.flash.deposit, 
        state.flash.stakes, 
        state.flash.outputs, 
        state.flash.remainderAddress, 
        state.flash.transfers, 
        res.bundles);
      await store.set("state", state)
      console.log(res)
      // channel.applyTransferDiff(res.diff);
    }
    // Check is purchases exists
    if (!purchases) var purchases = []
    // Push the purchase recipt to the browser
    purchases.push({...res, value})
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
  static async initFlash() {
    // Get state
    const state = await store.get("state")

    Channel.flash = new Flash({...state.flash})
    return
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
