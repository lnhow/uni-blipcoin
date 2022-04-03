const crypto = require('crypto');
const Transaction = require('./transaction');
const { performance } = require('perf_hooks');

class Block {
  constructor(transactions = [], prevHash = '', timestamp = Date.now()) {
    this.metadata = {
      difficulty: 0,
      miner: null,
      mineTime: 0,
    }
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.prevHash = prevHash; // Previous block's hash
    this.hash = this.computeHash(); // Compute this block's hash
    this.nonce = 0;
  }

  computeHash() {
    let strBlockInfoToHash =
      this.prevHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce;
    return crypto.createHash('sha256').update(strBlockInfoToHash).digest('hex');
  }

  mine(difficulty, mineAddress=null) {
    const startTime = performance.now();
    while(!Block.hashMatchDifficulty(this.hash, difficulty)) {
      this.nonce++;
      this.hash = this.computeHash();
    }
    const endTime = performance.now();
    this.metadata.difficulty = difficulty;
    this.metadata.mineTime = (endTime - startTime);
    this.metadata.miner = mineAddress;
  }

  hasValidTransaction() {
    for (const transaction of this.transactions) {
      if (!transaction.isValid()) {
        return false;
      }
    }
    return true;
  }

  static hashMatchDifficulty(hash = '', difficulty = 0) {
    const requiredPrefix = '0'.repeat(difficulty);
    return hash.startsWith(requiredPrefix);
  }
}

module.exports = Block;
