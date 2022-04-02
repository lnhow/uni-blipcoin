const crypto = require('crypto');

class Block {
  constructor(data, prevHash = '', timestamp = Date.now()) {
    this.timestamp = timestamp;
    this.data = data; // Store relevant data
    this.prevHash = prevHash; // Previous block's hash
    this.hash = this.computeHash(); // Compute this block's hash
    this.nonce = 0;
  }

  computeHash() {
    let strBlockInfoToHash =
      this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
    return crypto.createHash('sha256').update(strBlockInfoToHash).digest('hex');
  }

  mine(difficulty) {
    while(!Block.hashMatchDifficulty(this.hash, difficulty)) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }

  static hashMatchDifficulty(hash = '', difficulty = 0) {
    const requiredPrefix = '0'.repeat(difficulty);
    return hash.startsWith(requiredPrefix);
  }
}

module.exports = Block;
