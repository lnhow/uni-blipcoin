const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {
  constructor() {
    // Array of blocks, starting with the genesis block
    this.blockchain = [Blockchain.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 2;
    this.mineReward = 50;
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  minePendingTransactions(mineRewardAddress) {
    let block = new Block(this.pendingTransactions, this.getLatestBlock().hash, Date.now());
    block.mine(this.difficulty);

    this.blockchain.push(block);
    console.log(`Block ${this.blockchain.length} mined (${block.hash})`);

    this.pendingTransactions = [];
    const rewardTransaction = new Transaction(null, mineRewardAddress, this.mineReward);
    this.createTransaction(rewardTransaction);
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getWalletBalance(address) {
    let balance = 0;
    for (const block of this.blockchain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }
        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  }

  isValidChain() {
    // Check valid genesis block
    if (JSON.stringify(this.blockchain[0]) !== JSON.stringify(Blockchain.createGenesisBlock())) {
      console.log('genesis invalid')
      return false;
    }

    // Iterate through, starting after the genesis block
    for (let i = 1; i < this.blockchain.length; i++) {
      const block = this.blockchain[i];
      const prevBlock = this.blockchain[i - 1];

      if (!Blockchain.isValidBlock(block, prevBlock)) {
        return false;
      }
    }
    return true;
  }

  static isValidBlock(block, prevBlock) {
    if (block.hash !== block.computeHash()) {
      // Block's data was modified
      return false;
    }

    if (block.prevHash !== prevBlock.hash) {
      // Block's prevHash was modified
      return false;
    }

    return true;
  }

  static createGenesisBlock() {
    // Have to be a fixed data
    return new Block(
      [], 
      '', 
      1648885741758
    );
  }
}

module.exports = Blockchain;
