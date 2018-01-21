import { API } from "./utils"
import shortid from "shortid"
import { multisig, transfer } from "iota.flash.js"
import { actions, iota } from "./actions"
import Presets from "./config"

var initialising = false

export default class Channel {
  // Security level
  static SECURITY = 2

  // Number of parties taking signing part in the channel
  static SIGNERS_COUNT = 2

  // Flash tree depth
  static TREE_DEPTH = 4

  // Initiate the local state and store it localStorage
  static async initialize(userSeed, fundAmount) {    
    // Escape the function when server rendering
    if (!isWindow()) return false
    
    // Stop if local state exists
    const localState = await store.get("flash-state")
    if (localState) {
      return localState
    }
    //Block double call.
    if (initialising) return
    initialising = true

    console.log("Initialising Channel!!!")
    const userID = shortid.generate()
    // Initialize state object
    const state = {
      userID: userID,
      userSeed: userSeed,
      index: 0,
      security: Channel.SECURITY,
      depth: Channel.TREE_DEPTH,
      bundles: [],
      channel: {
        signersCount: Channel.SIGNERS_COUNT,
        balance: 0,
        deposit: Array(Channel.SIGNERS_COUNT).fill(0),
        outputs: {},
        transfers: []
      }
    }

    // Initiate the state in local storage
    await store.set("flash-state", state)

    // Get a new digest
    // Fetch new multisig addresses
    // consists of { root, remainder }
    const digests = []
    for (let i = 0; i < Channel.TREE_DEPTH + 1; i++) {
      const digest = await Channel.getNewDigest()
      digests.push(digest)
    }
    const addresses = await Channel.register(digests, userID, fundAmount)

    // Update root and remainder address
    state.channel.remainderAddress = addresses.remainder
    state.channel.root = addresses.root
    
    // Update root & remainder in state
    await store.set("flash-state", state)

    // Create a flash instance
    initialising = false

    return state
  }

  static async register(digests, userID, fundAmount) {
    console.log("Address Digests: ", digests)

    const opts = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: userID,
        digests: digests,
        amount: fundAmount
      })
    }
    // Send digests to server and obtain new multisig addresses
    const response = await API("register", opts)

    console.log("Server Digests: ", response)
    const serverDigests = response.digests
    let multisigs = digests.map((digest, index) => {
      let addy = multisig.composeAddress([digest, serverDigests[index]])
      addy.index = digest.index
      addy.signingIndex = 0 * digest.security
      addy.securitySum = digest.security + serverDigests[index].security
      addy.security = digest.security
      return addy
    })

    const remainderAddress = multisigs.shift()

    for (let i = 1; i < multisigs.length; i++) {
      multisigs[i - 1].children.push(multisigs[i])
    }
    //console.log(multisigs[0])
    //console.log(iota.utils.addChecksum(multisigs[0].address))

    return {
      remainder: remainderAddress,
      root: multisigs.shift()
    }
  }

  static async getNewBranch(userID, address, digests) {
    console.log("Branch Event", "Digests: ", digests)

    const opts = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: userID,
        address: address.address,
        digests: digests
      })
    }
    console.log("Sending: ", opts.body)
    // Send digests to server and obtain new multisig addresses
    const response = await API("branch", opts)

    console.log("Server Digests: ", response)
    const serverDigests = response.digests
    let multisigs = digests.map((digest, index) => {
      let addy = multisig.composeAddress([digest, serverDigests[index]])
      addy.index = digest.index
      addy.signingIndex = 0 * digest.security            
      addy.securitySum = digest.security + serverDigests[index].security
      addy.security = digest.security
      return addy
    })

    multisigs.unshift(address)
    for (let i = 1; i < multisigs.length; i++) {
      multisigs[i - 1].children.push(multisigs[i])
    }
    return address
  }

  // Get a new digest and update index in state
  static async getNewDigest() {
    // Fetch state from localStorage
    const state = store.get("flash-state")

    // Create new digest
    const digest = multisig.getDigest(
      state.userSeed,
      state.index,
      state.security
    )

    // Increment digests key index
    state.index++
    state.init = true

    // Update local state
    await store.set("flash-state", state)

    return digest
  }

  // Obtain address by sending digest, update multisigs in state
  static async getNewAddress(digest) {
    const state = await store.get("flash-state")

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
  static async composeTransfer(value, settlementAddress) {
    // Get latest state from localstorage
    const state = await store.get("flash-state")
    var purchases = await store.get("flash-purchases")
    // TODO: check/generate tree
    if (!(state && state.channel && state.channel.root)) {
      alert("Insufficient funds")
      return
    }
    let toUse = multisig.updateLeafToRoot(state.channel.root)
    if (toUse.generate != 0) {
      // Tell the server to generate new addresses, attach to the multisig you give
      const digests = await Promise.all(
        Array(toUse.generate)
          .fill()
          .map(() => Channel.getNewDigest())
      )
      await Channel.getNewBranch(state.userID, toUse.multisig, digests)
      // state was modified
      let modifiedState = await store.get("flash-state")
      state.index = modifiedState.index
    }
    // Compose transfer
    const channel = state.channel
    let bundles
    try {
      // No settlement addresses and Index is 0 as we are alsways sending from the client
      let newTansfers = transfer.prepare(
        [Presets.ADDRESS, null],
        channel.deposit,
        0,
        [
          {
            address: settlementAddress,
            value: value
          }
        ]
      )
      bundles = transfer.compose(
        channel.balance,
        channel.deposit,
        channel.outputs,
        toUse.multisig,
        channel.remainderAddress,
        channel.transfers,
        newTansfers
      )
    } catch (e) {
      console.log("Error: ", e)
      switch (e.message) {
        case "2":
          alert("Not enough funds")
          break
        default:
          alert("An error occured. Please reset channel")
      }
      return false
    }
    bundles = bundles.filter(b=>b)
    state.bundles = bundles
    // Sign transfer
    const signatures = transfer.sign(toUse.multisig, state.userSeed, bundles)
    console.log("Signatures", signatures)

    // Update bundles in local state
    let partiallySigned = transfer.appliedSignatures(bundles, signatures)
    // Return signed bundles
    const opts = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: state.userID,
        bundles: partiallySigned,
      })
    }
    const res = await API("purchase", opts)
    if (res.bundles) {
      transfer.applyTransfers(
        state.channel.root,
        state.channel.deposit,
        state.channel.outputs,
        state.channel.remainderAddress,
        state.channel.transfers,
        res.bundles
      )
      // Save updated state
      await store.set("flash-state", state)

      // Check is purchases exists
      if (!purchases) var purchases = []
      // Push the purchase recipt to the browser
      purchases.push({ ...res, value })
      // save purchases for reload
      store.set("flash-purchases", purchases)
    } else {
      console.error(res)
    }

    // Return recipt to be used by the calling function
    return res
  }

  // Update bundles in local state by applying the diff
  static applyTransferDiff(diff) {
    // Get state
    const state = store.get("flash-state")

    // Apply diff to bundles in state
    ///state.bundles = TODO: bundles with applied diff;

    store.set("flash-state", state)
  }

  static setLocalState(state) {
    store.set("flash-state", state)
  }

  static async close() {
    console.log("CLOSING CHANNEL")
    // Get latest state from localstorage
    const state = await store.get("flash-state")

    // TODO: check/generate tree
    let toUse = multisig.updateLeafToRoot(state.channel.root)
    if (toUse.generate != 0) {
      // Tell the server to generate new addresses, attach to the multisig you give
      const digests = await Promise.all(
        Array(toUse.generate)
          .fill()
          .map(() => Channel.getNewDigest())
      )
      await Channel.getNewBranch(state.userID, toUse.multisig, digests)
      // state was modified
      let modifiedState = await store.get("flash-state")
      state.index = modifiedState.index
    }
    // Compose transfer
    const channel = state.channel
    let bundles
    try {
      // No settlement addresses and Index is 0 as we are alsways sending from the client
      let newTansfers = transfer.close([Presets.ADDRESS, Presets.ADDRESS], channel.deposit)
      console.log({
        balance: channel.balance,
        deposit: channel.deposit,
        outputs: channel.outputs,
        multisig: toUse.multisig,
        remainderadress: channel.remainderAddress,
        transfers: channel.transfers,
        newtransfers: newTansfers})
      bundles = transfer.compose(
        channel.balance,
        channel.deposit,
        channel.outputs,
        toUse.multisig,
        channel.remainderAddress,
        channel.transfers,
        newTansfers,
        true // close
      )
      
    } catch (e) {
      console.log("Error: ", e)
      switch (e.message) {
        case "2":
          alert("Not enough funds")
          break
        default:
          alert("An error occured. Please reset channel")
      }
      return false
    }
    console.log("Unsigned", bundles)
    // Update bundles in local state
    state.bundles = bundles
    // Sign transfer
    const signatures = transfer.sign(toUse.multisig, state.userSeed, bundles)
    console.log("Signatures", signatures)
   
    // Update bundles in local state
    let partiallySigned = transfer.appliedSignatures(bundles, signatures)
    console.log(partiallySigned)

    // Return signed bundles
    const opts = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: state.userID,
        bundles: partiallySigned,
        item: null
      })
    }
    console.log(opts)
    const res = await API("close", opts)

    if (res.bundles) {
      transfer.applyTransfers(
        state.channel.root,
        state.channel.deposit,
        state.channel.outputs,
        state.channel.remainderAddress,
        state.channel.transfers,
        res.bundles
      )
      // Save updated state
      await store.set("flash-state", state)
    } else {
      return console.error(e)
    }

    console.log(res)
    if (!res.error) {
      var result = await Attach.POWClosedBundle(res.bundles)
      console.log(result)
      return result
    }
  }
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
    // if (!("store" in global) || !(global.store instanceof Store)) {
    //   global.store = Store
    // }
    return false
  }
  global.store = Store
  return true
}
