const express = require('express');
const cors = require('cors');
const config = require('./config');
const ErrorHelper = require('./helpers/error');
const ErrorController = require('./controllers/error/error.controller');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(ErrorHelper.handleBadJSONParseError);


const Blockchain = require('./types/blockchain');
const chain = new Blockchain();

const IndexRouter = require('./route')(chain);
app.use(`${config.server.root}`, IndexRouter);

app.use(ErrorController.handleNotFoundError);



// Random testing stuff=============================================
const Transaction = require('./types/transaction');
const { miner } = require('./config');
const Wallet = require('./types/wallet');

const myWallet = Wallet.getFromPrivate(miner.private);
const myWalletAddress = myWallet.getAddress();
const toAddress = 'Test address';

const transaction1 = new Transaction(myWalletAddress, toAddress, 20);
myWallet.signTransaction(transaction1);
chain.addTransaction(transaction1);

console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`)
chain.minePendingTransactions(myWalletAddress);

chain.addTransaction(transaction1);
console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`)
chain.minePendingTransactions(myWalletAddress);
console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`)

console.log(`Wallet Joe: ${chain.getWalletBalance(toAddress)}`);
console.log(`Wallet Miner: ${chain.getWalletBalance(myWalletAddress)}`);

console.log(`Validity: ${chain.isValid()}`)
console.log(chain.blockchain)
// Random testing stuff=============================================

module.exports = app;
