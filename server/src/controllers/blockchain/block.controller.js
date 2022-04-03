const Blockchain = require('../../types/blockchain');
const { getErrResponse } = require('../../helpers/error');
const miner = require('../../config').miner;

/**
 * Create a controller to operate on the DI-ed blockchain
 * @param {Blockchain} blockchain The blockchain to operate on
 */
const BlockController = (blockchain) => ({
  handleGetAllBlocks(req, res) {
    res.status(200).json({
      success: true,
      data: {
        blockchain: blockchain.blockchain,
        difficulty: blockchain.difficulty,
        valid: blockchain.isValid(),
      },
      message: 'Get all blocks successfully'
    });
  },

  handleGetBlockByIndex(req, res) {
    const index = parseInt(req.params.block_index);
    const errRes = getErrResponse();

    if (isNaN(index)) {
      errRes.message = 'Invalid given index';
      return res.status(400).json(errRes);
    }
    try {
      const block = blockchain.getBlock(index);
      return res.json({
        success: true,
        data: {
          index: index,
          block: block,
        },
        message: 'Get block successfully'
      });
    } catch (error) {
      errRes.message = 'Invalid given index';
      return res.status(400).json(errRes);
    }
  },

  handleTriggerMine(req, res) {
    try {
      blockchain.minePendingTransactions(miner.address);
      res.status(201).json({
        success: true,
        data: {
          index: blockchain.blockchain.length - 1,
          block: blockchain.getLatestBlock(),
        },
        message: 'Trigger successfully',
      })
    } catch(err) {
      res.status(400).json(getErrResponse(err.message));
    }    
  }
});

module.exports = BlockController;
