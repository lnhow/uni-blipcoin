const Block = require('./types/block');
const Blockchain = require('./types/blockchain');

let a = new Block({ from: 'Joe', to: 'Jane' });
let b = new Block({ from: 'Jane', to: 'Joe' });

let chain = new Blockchain();

chain.addBlock(a);
chain.addBlock(b);
console.log(chain);

console.log('Validity: ' + chain.isValidChain());
