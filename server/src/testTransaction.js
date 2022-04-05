const Blockchain = require('./types/blockchain');
const Transaction = require('./types/transaction');
const { miner } = require('./config');
const Wallet = require('./types/wallet');

/**
 * Run create & some transactions
 * @param {Blockchain} chain
 */
const createTestTransactions = (chain) => {
  const myWallet = Wallet.getFromPrivate(miner.private);
  const myWalletAddress = myWallet.getAddress();
  const toAddress = 'Test address';

  const transaction1 = new Transaction(myWalletAddress, toAddress, 20);
  myWallet.signTransaction(transaction1);
  chain.addTransaction(transaction1);

  console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`);
  chain.minePendingTransactions(myWalletAddress);

  const transaction2 = new Transaction(myWalletAddress, toAddress, 20);
  myWallet.signTransaction(transaction2);
  chain.addTransaction(transaction2);
  console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`);
  chain.minePendingTransactions(myWalletAddress);
  console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`);

  console.log(`Wallet Joe: ${chain.getWalletBalance(toAddress)}`);
  console.log(`Wallet Miner: ${chain.getWalletBalance(myWalletAddress)}`);

  console.log(chain.blockchain);
  console.log(`Validity: ${chain.isValid()}`);
};

module.exports = createTestTransactions;
