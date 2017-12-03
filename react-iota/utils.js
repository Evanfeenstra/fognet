import Presets from './config'

export const API = async (url, options) => {
  try {
    let response = await fetch(Presets.API + url, options)
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error(error)
  }
}

// Generate a random seed. Higher security needed
export const seedGen = length => {
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

export const reducer = amount => {
  if (amount < Math.pow(10, 3)) {
    var num = amount
    if (num % 1 != 0) return num.toFixed(2) + "i"
    return num + "i"
  } else if (amount < Math.pow(10, 6)) {
    var num = amount / Math.pow(10, 3)
    if (num % 1 != 0) return num.toFixed(2) + "Ki"
    return num + "Ki"
  } else if (amount < Math.pow(10, 9)) {
    var num = amount / Math.pow(10, 6)
    if (num % 1 != 0) return num.toFixed(2) + "Mi"
    return num + "Mi"
  } else if (amount < Math.pow(10, 12)) {
    var num = amount / Math.pow(10, 9)
    if (num % 1 != 0) return num.toFixed(2) + "Gi"
    return num + "Gi"
  } else if (amount < Math.pow(10, 15)) {
    var num = amount / Math.pow(10, 12)
    if (num % 1 != 0) return num.toFixed(2) + "Ti"
    return num + "Ti"
  }
}

export const validAmount = amount => amount.replace(/[^0-9]/g,'')

export const validSeed = seed => seed.replace(/[^9A-Z]/g,'')

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
