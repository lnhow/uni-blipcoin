const Block = require('./block');

class Blockchain {
  constructor() {
    this.blockchain = [Block.genesisBlock()]; // Initialize a new array of blocks, starting with a genesis block
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  // Add a new block
  addBlock(newBlock) {
    newBlock.prevHash = this.obtainLatestBlock().hash;
    // Recalculate its hash with this new prevHash value
    newBlock.hash = newBlock.computeHash();
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
}

module.exports = Blockchain;
