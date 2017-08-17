import IOTA from "iota.lib.js"
import Api from "./api"
import shortid from "shortid"

import Flash from "iota.flash.js"
import multisig from "iota.flash.js/lib/multisig"
import IOTACrypto from "iota.crypto.js"

// Create IOTA instance directly with provider
var iota = new IOTA({
  provider: "https://node.tangle.works"
})

export default class Iota {
  static info = () => {
    iota.api.getNodeInfo(function(error, success) {
      if (error) {
        console.error(error)
      } else {
        console.log(success)
      }
    })
  }

  static initialise = () => {
    // Escape the function when server rendering
    if (!isWindow()) return
    // Grab seed from local
    var user = get("user")
    // No seed? Then go make one!
    if (user === null) {
      console.log("No User")
      user = Iota.setupUser()
    }
    console.log(user)
  }

  static setupUser = async () => {
    const userID = shortid.generate()
    const userSeed = seedGen(81)
    const otherSeed =
      "GBANYOVNVX99RLMPEONK9GIKLJURDIWIYVCHN9EHLGWQIDOPJNVPMCWEAEQUKBVWJMXSYRYXIRRSALBQW"

    // Request Digest 0 or
    // var digest = API.get({uid: userID, cmd: 'initalDigests', index: 1})
    var digest = multisig.getDigest(otherSeed, 0, 2)

    // Get the mutlisig obj
    let multisigs = [
      multisig.composeAddress([multisig.getDigest(userSeed, 0, 2), digest])
    ]

    const flash = new Flash({
      index: 0,
      signersCount: 2,
      balance: 1000,
      deposit: [1000, 0],
      stakes: [1, 0],
      outputs: {},
      transfers: [],
      remainderAddress: multisigs[0].address
    })

    // Make a user zero state
    var user = {
      uid: userID,
      seed: userSeed,
      flash: flash
    }

    // Save the new user obj
    set("user", user)
    console.log(user)
    return user
  }

  // Initiate transaction from anywhere in the app.
  static purchaseItem = async item => {
    var user = get("user", user)

    const flash = new Flash(user.flash.state)
    const seed = user.seed
    const otherSeed =
      "GBANYOVNVX99RLMPEONK9GIKLJURDIWIYVCHN9EHLGWQIDOPJNVPMCWEAEQUKBVWJMXSYRYXIRRSALBQW"

    var digests = [
      multisig.getDigest(seed, 1, 2),
      multisig.getDigest(otherSeed, 1, 2)
    ]

    let multisigs = [multisig.composeAddress(digests)]

    let bundles = flash.composeTransfer(multisigs, 0, [
      {
        address:
          "ZGHXPZYDKXPEOSQTAQOIXEEI9K9YKFKCWKYYTYAUWXK9QZAVMJXWAIZABOXHHNNBJIEBEUQRTBWGLYMTX",
        value: 50
      }
    ])

    console.log("Transfer", bundles)

    let diff = flash.getTransferDiff(multisigs, bundles)

    let signedBundles = flash.signTransfer(seed, 1, 2, multisigs, 0, bundles)
    signedBundles = flash.signTransfer(
      otherSeed,
      1,
      2,
      multisigs,
      0,
      signedBundles
    )

    signedBundles.forEach((bundle, i) => {
      console.log(
        "Sigs matching:",
        IOTACrypto.utils.validateSignatures(bundle, multisigs[i].address)
      )
    })

    diff = flash.getTransferDiff(multisigs, bundles)

    console.log("Diff:", diff)
  }
}

////// HELPERS

// Get a new Address
const getAddress = async user => {
  // Create new digest
  var digest = iota.multisig.getDigest(user.seed, user.index + 1, 2)
  // Send digest to server
  const response = await Api("https://server.com/new-address", {
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
  set("user", user)

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
      "Your browser sucks and can't generate secure random numbers"
    )
}

// GET from localStorage
const get = item => {
  return JSON.parse(localStorage.getItem(item))
}

// SET item to localStorage
const set = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data))
}

// Check if window is available
const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    global.localStorage = {}
    return false
  }
  return true
}
