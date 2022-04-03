const Blockchain = require('../../types/blockchain');

const GetController = require('./getter.controller');

/**
 * Create a controller to operate on the DI-ed blockchain
 * @param {Blockchain} blockchain The blockchain to operate on
 */
const BlockchainController = (blockchain) => {
  const getController = GetController(blockchain);

  return {
    ...getController,
  }
}

module.exports = BlockchainController;
