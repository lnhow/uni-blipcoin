const Blockchain = require('./types/blockchain');
const Transaction = require('./types/transaction');
const { miner, ec } = require('./config');
const Wallet = require('./types/wallet');

const myWallet = Wallet.getFromPrivate(miner.private);
const myWalletAddress = myWallet.getAddress();
const toAddress = 'Someone address';

let chain = new Blockchain();

const transaction1 = new Transaction(myWalletAddress, toAddress, 20);
myWallet.signTransaction(transaction1);
chain.addTransaction(transaction1);

console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`)
chain.minePendingTransactions(myWalletAddress);
console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`)
chain.minePendingTransactions(myWalletAddress);
console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`)

console.log(`Wallet Joe: ${chain.getWalletBalance(toAddress)}`);
console.log(`Wallet Miner: ${chain.getWalletBalance(myWalletAddress)}`);

console.log(`Validity: ${chain.isValidChain()}`)
console.log(chain.blockchain)
