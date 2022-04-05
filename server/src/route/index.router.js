const express = require('express');
const BlockchainController = require('../controllers/blockchain');
const Blockchain = require('../types/blockchain');

/**
 * Get router to operate on a blockchain
 * @param {Blockchain} blockchain - The blockchain to operate on
 */
const IndexRouter = (blockchain) => {
  const chainController = BlockchainController(blockchain);
  const walletController = chainController.walletController;
  const router = express.Router();

  router.get(`/blocks`, chainController.handleGetAllBlocks);
  router.get(`/block/:block_index`, chainController.handleGetBlockByIndex);

  router.post(`/block/mine`, chainController.handleTriggerMine); // Trigger mine new block

  router.get(`/transactions`, chainController.handleGetAllTransactions);
  router.get(
    `/transaction/:transaction_id`,
    chainController.handleGetTransaction,
  );

  // Require passing in signature with signned data
  router.post(`/transaction`, walletController.handleCreateTransactionSecure);

  // Testing - Insecure, require passing in private key
  router.post(`/transaction-plain`, walletController.handleCreateTransaction);

  router.get(`/wallet/:address`, walletController.handleGetWalletInfo);
  router.post(`/wallet`, walletController.handleCreateWallet);
  router.post(`/wallet/address`, walletController.handleGetAddress);

  return router;
};

module.exports = IndexRouter;
