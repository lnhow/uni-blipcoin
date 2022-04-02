const ec = require('../config').ec;

class Wallet {
  /**
   * Generate a new key pair - wallet
   * @returns Wallet - keyPair
   */
  static genKeyPair = () => {
    const keyPair = ec.genKeyPair();
    return keyPair;
  }
}


module.exports = Wallet
