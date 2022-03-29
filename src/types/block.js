const crypto = require('crypto');

class Block {
  constructor(data, prevHash = '') {
    this.timestamp = Date.now();
    this.data = data; // Store relevant data
    this.prevHash = prevHash; // Previous block's hash
    this.hash = this.computeHash(); // Compute this block's hash
  }

  computeHash() {
    let strBlockInfoToHash =
      this.prevHash + this.timestamp + JSON.stringify(this.data);
    return crypto.createHash('sha256').update(strBlockInfoToHash).digest('hex');
  }

  static genesisBlock() {
    return new Block();
  }
}

module.exports = Block;
