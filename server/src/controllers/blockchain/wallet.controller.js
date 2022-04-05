const Blockchain = require('../../types/blockchain');
const Wallet = require('../../types/wallet');
const Transaction = require('../../types/transaction');
const { getErrResponse } = require('../../helpers/error');
const miner = require('../../config').miner;

/**
 * Create a controller to operate on the DI-ed blockchain
 * @param {Blockchain} blockchain The blockchain to operate on
 */
const WalletController = (blockchain) => ({
  handleCreateWallet(req, res) {
    const newWallet = Wallet.createWallet();
    res.status(201).json({
      success: true,
      data: {
        address: newWallet.getAddress(),
        privateKey: newWallet.getPrivate(),
      },
      message: 'Create wallet successfully'
    });
  },

  handleGetAddress(req, res) {
    const { privateKey } = req.body
    const wallet = Wallet.getFromPrivate(privateKey);

    return res.status(200).json({
      success: true,
      data: {
        address: wallet.getAddress(),
      },
      message: 'Retrieve key successfully'
    });
  },

  handleCreateTransactionSecure(req, res) {
    const { signature, fromAddress, toAddress, amount } = req.body;
    const errRes = getErrResponse();
    if (!signature || !fromAddress || !toAddress || !amount) {
      errRes.message = 'Invalid or missing argument';
      return res.status(400).json(errRes);
    }

    try {
      const transaction = new Transaction(fromAddress, toAddress, amount);
      transaction.signature = signature;
      if (!transaction.isValid) {
        errRes.message = 'Invalid transaction signature';
        return res.status(400).json(errRes);
      }

      blockchain.addTransaction(transaction);

      res.status(201).json({
        success: true,
        data: {
          transaction: blockchain.getTransaction(transaction.id),
        },
        message: 'Create transaction successfully'
      })
    } catch (err) {
      errRes.message = err.message;
      return res.status(400).json(errRes);
    }
  },

  // Use for testing, without having something to sign
  handleCreateTransaction(req, res) {
    const { privateKey, fromAddress, toAddress, amount } = req.body;
    const errRes = getErrResponse();
    if (!privateKey || !fromAddress || !toAddress || !amount) {
      errRes.message = 'Invalid or missing argument';
      return res.status(400).json(errRes);
    }

    try {
      const wallet = Wallet.getFromPrivate(privateKey);
      const transaction = new Transaction(fromAddress, toAddress, amount);
      wallet.signTransaction(transaction);
      blockchain.addTransaction(transaction);

      res.status(201).json({
        success: true,
        data: {
          transaction: blockchain.getTransaction(transaction.id),
        },
        message: 'Create transaction successfully'
      })
    } catch (err) {
      errRes.message = err.message;
      return res.status(400).json(errRes);
    }
  },

  handleGetWalletInfo(req, res) {
    const address = req.params.address;
    const balance = blockchain.getWalletBalance(address);
    const transactions = blockchain.getWalletTransaction(address);
    res.status(200).json({
      success: true,
      data: {
        wallet: {
          address: address,
          balance: balance,
          transactions: transactions,
        },
      },
      message: 'Get wallet info successfully'
    })
  },
});

module.exports = WalletController;
