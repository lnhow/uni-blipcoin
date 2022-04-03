const Blockchain = require('../../types/blockchain');

/**
 * 
 * @param {Blockchain} blockchain 
 * @returns 
 */
const handleGetBlocks = (blockchain) => (req, res) => {
  res.json({
    success: true,
    data: {
      blockchain: blockchain.blockchain,
    },
    message: 'Get all block successfully'
  })
}

module.exports = (blockchain) => ({
  handleGetBlocks: handleGetBlocks(blockchain),
});
