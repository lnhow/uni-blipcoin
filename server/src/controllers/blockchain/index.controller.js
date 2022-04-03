const Blockchain = require('../../types/blockchain');

const BlockController = require('./block.controller');
const TransactionController = require('./transaction.controller');

/**
 * Create a controller to operate on the DI-ed blockchain
 * @param {Blockchain} blockchain The blockchain to operate on
 */
const BlockchainController = (blockchain) => {
  const blockController = BlockController(blockchain);
  const transactionController = TransactionController(blockchain);

  return {
    ...blockController,
    ...transactionController,
  }
}

module.exports = BlockchainController;
