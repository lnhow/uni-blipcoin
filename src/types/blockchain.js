const Block = require('./block');

class Blockchain {
  constructor() {
    // Array of blocks, starting with the genesis block
    this.blockchain = [Blockchain.createGenesisBlock()];
    this.difficulty = 2;
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  // Add a new block
  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    // Recalculate its hash with this new prevHash value
    newBlock.mine(this.difficulty);
    this.blockchain.push(newBlock);
  }

  isValidChain() {
    // Iterate through, starting after the genesis block
    for (let i = 1; i < this.blockchain.length; i++) {
      const block = this.blockchain[i];
      const prevBlock = this.blockchain[i - 1];

      if (block.hash !== block.computeHash()) {
        // Block's data was modified
        return false;
      }

      if (block.prevHash !== prevBlock.hash) {
        // Block's prevHash was modified
        return false;
      }
    }
    return true;
  }

  static createGenesisBlock() {
    return new Block({}, '', Date.now());
  }
}

module.exports = Blockchain;
