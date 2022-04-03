const Blockchain = require('../../types/blockchain');

const BlockController = require('./block.controller');
const TransactionController = require('./transaction.controller');
const WalletController = require('./wallet.controller');

/**
 * Create a controller to operate on the DI-ed blockchain
 * @param {Blockchain} blockchain The blockchain to operate on
 */
const BlockchainController = (blockchain) => {
  const blockController = BlockController(blockchain);
  const transactionController = TransactionController(blockchain);
  const walletController = WalletController(blockchain);

  return {
    ...blockController,
    ...transactionController,
    walletController,
  }
}

module.exports = BlockchainController;
