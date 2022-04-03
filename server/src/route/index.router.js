const express = require('express');
const BlockchainController = require('../controllers/blockchain/');
const Blockchain = require('../types/blockchain');

/**
 * Get router to operate on a blockchain
 * @param {Blockchain} blockchain - The blockchain to operate on
 */
const IndexRouter = (blockchain) => {
  const chainController = BlockchainController(blockchain);
  const router = express.Router();

  router.get(`/blocks`, chainController.handleGetAllBlocks);
  router.get(`/block/:block_index`, chainController.handleGetBlockByIndex);

  return router;
}

module.exports = IndexRouter;
