const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

require('dotenv').config();

const DEFAULT = {
  SYSTEM: { 
    ROOT: '/api',
    ADDRESS: 'SYSTEM',
    MINE_REWARD: 50,
    DIFFICULTY: 2,
    MIN_TRANS_PER_BLOCK: 1, // Min transaction per block
    TEST_TRANSACTIONS: true,// Enable test data transactions when start
  },
  MINER: {
    ADDRESS: '042e7f335d066fb5b3364139d8303f3e592d79be3cc4e2235af45a36ee4805a2a7e1ad716a538177f4b7272172333ab1586f5bcc03bdcb2429a5c142c4c42f8251',
    PRIVATE: '58c90c9b8599df6b2b46faf47267ed49c6191d61c979229923d3f98fdd772857'
  }
}

module.exports = {
  server: {
    root: DEFAULT.SYSTEM.ROOT,
    port: process.env.PORT || 3001,
  },
  system: {
    address: process.env.SYSTEM_ADDRESS || DEFAULT.SYSTEM.ADDRESS,
    difficulty: DEFAULT.SYSTEM.DIFFICULTY,
    minTransPerBlock: DEFAULT.SYSTEM.MIN_TRANS_PER_BLOCK,
    mineReward: DEFAULT.SYSTEM.MINE_REWARD,
    testTransaction: DEFAULT.SYSTEM.TEST_TRANSACTIONS,
  },
  miner: {
    address: process.env.MINER_ADDRESS || DEFAULT.MINER.ADDRESS,
    private: process.env.MINER_PRIVATE || DEFAULT.MINER.PRIVATE,
  },
  ec: ec,
}
