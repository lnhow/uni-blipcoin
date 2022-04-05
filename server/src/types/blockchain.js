const Block = require('./block');
const Transaction = require('./transaction');
const system = require('../config').system;
const miner = require('../config').miner;

class Blockchain {
  constructor() {
    // Array of blocks, starting with the genesis block
    this.blockchain = [Blockchain.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = system.difficulty;
    this.mineReward = system.mineReward;
    this.maxPendingTransactions = system.maxPendingTransactions;
    this.minTransPerBlock = system.minTransPerBlock; // Min transaction per block
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

  /**
   * Get all transactions in the current blockchain
   * @returns {Transaction[]} All transactions in the blockchain
   */
  getAllTransactions() {
    return [...this.getMinedTransaction(), ...this.getPendingTransaction()];
  }

  /**
   * Get all mined transactions in the current blockchain
   * @returns {Transaction[]} All mined transactions in the blockchain
   */
  getMinedTransaction() {
    let transactions = [];
    for (let i = 0; i < this.blockchain.length; i++) {
      const block = this.blockchain[i];
      let formattedTrans = block.transactions.map((trans) => {
        return {
          ...trans,
          valid: trans.isValid(),
          transactionStatus: 'Mined',
          blockIndex: i,
        };
      });
      transactions.push(...formattedTrans);
    }
    return transactions;
  }

  /**
   * Get all pending transactions in the current blockchain
   * @returns {Transaction[]} All pending transactions in the blockchain
   */
  getPendingTransaction() {
    let transactions = this.pendingTransactions.map((trans) => {
      return {
        ...trans,
        valid: trans.isValid(),
        transactionStatus: 'Pending',
        blockIndex: -1,
      };
    });
    return transactions;
  }

  /**
   * Get transaction by id
   * @param {string} id Id of the transaction
   * @returns {Transaction}
   */
  getTransaction(id = '') {
    const transactions = this.getAllTransactions();
    const transaction = transactions.find((trans) => trans.id === id);

    return transaction;
  }

  /**
   * Get all transaction of wallet with address
   * @param {string} address Wallet address
   * @returns Wallet balance
   */
  getWalletTransaction(address = '') {
    const transactions = this.getAllTransactions();
    const walletTrans = transactions.filter((trans) => {
      if (trans.fromAddress === address) {
        return true;
      }
      if (trans.toAddress === address) {
        return true;
      }
      return false;
    });
    return walletTrans;
  }

  /**
   * Get balance of wallet with address
   * @param {string} address Wallet address
   * @returns {number} Wallet balance
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
  // Get ===============================================

  /**
   * Mine pending transactions
   * @param {string} mineRewardAddress Miner's address
   * @throws If don't have enough required transaction
   */
  minePendingTransactions(mineRewardAddress) {
    if (this.pendingTransactions.length < this.minTransPerBlock) {
      throw new Error("Don't have enough pending transaction");
    }

    this.#addRewardTransaction(mineRewardAddress);
    const transactionsToStore = this.pendingTransactions;

    let block = new Block(
      transactionsToStore,
      this.getLatestBlock().hash,
      Date.now(),
    );
    block.mine(this.difficulty, mineRewardAddress);

    this.blockchain.push(block);
    console.log(`Block ${this.blockchain.length} mined (${block.hash})`);

    this.pendingTransactions = [];
  }

  static #createRewardTransaction(mineRewardAddress, mineReward = 50) {
    return new Transaction(system.address, mineRewardAddress, mineReward);
  }

  /**
   * Reward miner for a block mined, USED INTERNALLY
   * @param {*} transaction Transaction to add
   */
  #addRewardTransaction(mineRewardAddress) {
    const rewardTransaction = Blockchain.#createRewardTransaction(
      mineRewardAddress,
      this.mineReward,
    );
    this.#addTransaction(rewardTransaction);
  }

  /**
   * Validate if a wallet has enough balance to make a transaction
   * @param {string} address 
   * @param {number} amount
   */
  hasEnoughBalance(address, amount) {
    let walletBalance = this.getWalletBalance(address);
    
    let pendingBalance = 0; // Balance on hold, cannot do anthing with it
    for (const transaction of this.pendingTransactions) {
      if (transaction.fromAddress === address) {
        pendingBalance -= transaction.amount;
      }
    }

    walletBalance += pendingBalance;
    
    return walletBalance >= amount
  }

  /**
   * Add a valid transaction to pending
   * @param {Transaction} transaction Valid transaction
   * @throws If transaction is invalid
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

    if (!this.hasEnoughBalance(transaction.fromAddress, transaction.amount)) {
      throw new Error('Not enough active balance');
    }

    this.#addTransaction(transaction);
    this.#onAddTransaction();
  }

  /**
   * Add a transaction, USED INTERNALLY
   * @param {*} transaction Transaction to add
   */
  #addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  #onAddTransaction() {
    // Auto mine new block
    // if pendingTransactions.length reach maxPendingTransactions
    if (this.pendingTransactions.length >= this.maxPendingTransactions) {
      this.minePendingTransactions(miner.address);
    }
  }

  isValid() {
    // Check valid genesis block
    if (
      JSON.stringify(this.blockchain[0]) !==
      JSON.stringify(Blockchain.createGenesisBlock())
    ) {
      //console.log(JSON.stringify(this.blockchain[0]))
      //console.log(JSON.stringify(Blockchain.createGenesisBlock()))
      console.log('Invalid genesis');
      return false;
    }

    // Iterate through, starting after the genesis block
    for (let i = 1; i < this.blockchain.length; i++) {
      const block = this.blockchain[i];
      const prevBlock = this.blockchain[i - 1];

      if (!Blockchain.#isValidBlock(block, prevBlock)) {
        console.log('Invalid block ' + i);
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
    // Have to be a fixed data (especially timestamp, uuid, etc)
    // or else it would cause an invalide genesis when check later
    const trans = Blockchain.#createRewardTransaction(
      miner.address,
      system.mineReward,
    );
    trans.id = '0000';
    trans.timestamp = 1648885741758;

    return new Block([trans], '', 1648885741758);
  }
}

module.exports = Blockchain;
