const Blockchain = require('../../types/blockchain');
const { getErrResponse } = require('../../helpers/error');

/**
 * Create a controller to operate on the DI-ed blockchain
 * @param {Blockchain} blockchain The blockchain to operate on
 */
const TransactionController = (blockchain) => ({
  handleGetAllTransactions(req, res) {
    let transType = req.query.type || '';
    let transactions = [];
    if (transType === 'mined') {
      transactions = blockchain.getMinedTransaction();
    } else if (transType === 'pending') {
      transactions = blockchain.getPendingTransaction();
    } else {
      transactions = blockchain.getAllTransactions();
    }

    res.status(200).json({
      success: true,
      data: {
        transactions,
      },
      message: 'Get all transactions successfully',
    });
  },

  handleGetTransaction(req, res) {
    const id = req.params.transaction_id;
    const transaction = blockchain.getTransaction(id);

    res.status(200).json({
      success: true,
      data: {
        transaction,
      },
      message: 'Get transactions successfully',
    });
  },
});

module.exports = TransactionController;
