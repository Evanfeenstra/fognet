import IOTA from "iota.lib.js";

// Create IOTA instance directly with provider
var iota = new IOTA({
  provider: "https://node.tangle.works"
});

export default class Iota {
  static info = () => {
    iota.api.getNodeInfo(function(error, success) {
      if (error) {
        console.error(error);
      } else {
        console.log(success);
      }
    });
  };

  static initialise = () => {
    // Escape the function when server rendering
    if (!isWindow()) return;
    // Grab seed from local
    var user = get("user");
    // No seed? Then go make one!
    if (user === null) {
      console.log("No User");
      user = Iota.setupUser();
    }
    // Now get an address
  };

  static setupUser = async () => {
    var user = { seed: seedGen(81), index: 1, addresses: [], purchases: [] };
    user.push(await getAddress(user.seed, user.index));
    set("user", user);
    console.log(user);
    return user;
  };

  static getBalance = () => {
    iota.api.getNodeInfo(function(error, success) {
      if (error) {
        console.error(error);
      } else {
        console.log(success);
      }
    });
  };
  static purchaseItem = () => {
    iota.api.getNodeInfo(function(error, success) {
      if (error) {
        console.error(error);
      } else {
        console.log(success);
      }
    });
  };
}

////// HELPERS

// Get a new Address
const getAddress = async (seed, index) => {
  var digest = iota.multisig.getDigest(seed, index, 2);
  console.log(digest);
  // try {
  //   let response = await fetch("", { body: { digest, index } });
  //   let responseJson = await response.json();
  //   return responseJson.address;
  // } catch (error) {
  //   console.error(error);
  // }
};

// Generate a random seed. Higher security needed
const seedGen = length => {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var i;
  var result = "";
  if (window.crypto && window.crypto.getRandomValues) {
    var values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (i = 0; i < length; i++) {
      result += charset[values[i] % charset.length];
    }
    return result;
  } else
    throw new Error(
      "Your browser sucks and can't generate secure random numbers"
    );
};

// GET from localStorage
const get = item => {
  return JSON.parse(localStorage.getItem(item));
};

// SET item to localStorage
const set = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data));
};

// Check if window is available
const isWindow = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    global.localStorage = {};
    return false;
  }
  return true;
};
