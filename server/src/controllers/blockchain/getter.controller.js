const Blockchain = require('../../types/blockchain');
const { getErrResponse } = require('../../helpers/error');

/**
 * Create a controller to operate on the DI-ed blockchain
 * @param {Blockchain} blockchain The blockchain to operate on
 */
const GetController = (blockchain) => ({
  handleGetAllBlocks(req, res) {
    res.status(200).json({
      success: true,
      data: {
        blockchain: blockchain.blockchain,
      },
      message: 'Get all blocks successfully'
    });
  },

  handleGetBlockByIndex(req, res) {
    const index = parseInt(req.params.block_index);
    const errRes = getErrResponse();

    if (index === NaN) {
      errRes.message = 'Invalid given index';
      return res.status(400).json(errRes);
    }
    try {
      const block = blockchain.getBlock(index);
      return res.json({
        success: true,
        data: {
          index: index,
          type: typeof(index),
          block: block,
          //blockchain: blockchain.blockchain,
        },
        message: 'Get block successfully'
      });
    } catch (error) {
      errRes.message = 'Invalid given index';
      return res.status(400).json(errRes);
    }
  }
});

module.exports = GetController;
