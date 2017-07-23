import IOTA from "iota.lib.js";

// Create IOTA instance directly with provider
var iota = new IOTA({
  provider: "https://node.tangle.works"
});

export default class iotaLib {
  static info = () => {
    iota.api.getNodeInfo(function(error, success) {
      if (error) {
        console.error(error);
      } else {
        console.log(success);
      }
    });
  };
}
