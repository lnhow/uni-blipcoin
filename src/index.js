const Block = require('./types/block');
const Blockchain = require('./types/blockchain');
const Transaction = require('./types/transaction');

let chain = new Blockchain();
chain.createTransaction(new Transaction('Jane', 'Joe', 10));
chain.createTransaction(new Transaction('Joe', 'Jane', 1));

console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`)
chain.minePendingTransactions('miner');
console.log(`Pending: ${JSON.stringify(chain.pendingTransactions)}`)

console.log(`Wallet Jane: ${chain.getWalletBalance('Jane')}`);
console.log(`Wallet Joe: ${chain.getWalletBalance('Joe')}`);
console.log(`Wallet Miner: ${chain.getWalletBalance('miner')}`);

console.log(`Validity: ${chain.isValidChain()}`)
console.log(chain.blockchain)
