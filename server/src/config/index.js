const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

require('dotenv').config();

module.exports = {
  server: {
    root: '/api',
    port: process.env.PORT || 3001,
  },
  system: {
    address: 'SYSTEM',
  },
  miner: {
    private: '58c90c9b8599df6b2b46faf47267ed49c6191d61c979229923d3f98fdd772857'
  },
  ec: ec,
}
