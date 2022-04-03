const Block = require('./block');
const Transaction = require('./transaction');
const system = require('../config').system;

class Blockchain {
  constructor() {
    // Array of blocks, starting with the genesis block
    this.blockchain = [Blockchain.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 2;
    this.mineReward = 50;
  }

  // Get ===============================================
  /**
   * Retrieve the lastest block
   * @returns {Block} The lastest block
   */
  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  /**
   * Retrieve block with the given index
   * @param {number} index Index of the block to retrieve
   * @returns {Block} Block with the given index
   * @throws Will throw if given index out of bound
   */
  getBlock(index = 0) {
    if (index < 0 || index > this.blockchain.length - 1) {
      throw new Error('Index out of bound');
    }
    return this.blockchain[index];
  }
  // Get ===============================================

  /**
   * Mine pending transactions
   * @param {string} mineRewardAddress Miner's address
   */
  minePendingTransactions(mineRewardAddress) {
    this.#addRewardTransaction(mineRewardAddress);
    const transactionsToStore = this.pendingTransactions;

    let block = new Block(transactionsToStore, this.getLatestBlock().hash, Date.now());
    block.mine(this.difficulty, mineRewardAddress);

    this.blockchain.push(block);
    console.log(`Block ${this.blockchain.length} mined (${block.hash})`);

    this.pendingTransactions = [];
  }

  /**
   * Reward miner for a block mined, USED INTERNALLY
   * @param {*} transaction Transaction to add
   */
  #addRewardTransaction(mineRewardAddress) {
    const rewardTransaction = new Transaction(system.address, mineRewardAddress, this.mineReward);
    this.#addTransaction(rewardTransaction);
  }

  /**
   * Add a valid transaction to pending
   * @param {Transaction} transaction Valid transaction
   * @returns 
   */
  addTransaction(transaction) {
    if (!transaction) {
      throw new Error('Invalid transaction');
    }
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction is missing sender and receiver address');
    }
    if (!transaction.isValid()) {
      throw new Error('Transaction is invalid');
    }

    this.#addTransaction(transaction);
  }

  /**
   * Add a transaction, USED INTERNALLY
   * @param {*} transaction Transaction to add
   */
  #addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  /**
   * Get balance of wallet with address
   * @param {string} address Wallet address
   * @returns Wallet balance
   */
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
      return false;
    }

    // Iterate through, starting after the genesis block
    for (let i = 1; i < this.blockchain.length; i++) {
      const block = this.blockchain[i];
      const prevBlock = this.blockchain[i - 1];

      if (!Blockchain.#isValidBlock(block, prevBlock)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check validity of a block
   * @param {Block} block 
   * @param {Block} prevBlock 
   * @returns Is the block valid
   */
  static #isValidBlock(block, prevBlock) {
    if (!block.hasValidTransaction()) {
      return false;
    }

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
