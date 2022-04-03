# blipcoin

This includes:

- An API Express server that store that store a blockchain that lives in its memory
- A React SPA to access it

## Config server

Environment: `/server/.env`

- PORT: server's port
- SYSTEM_ADDRESS: system wallet address
- MINER_ADDRESS: miner wallet address to retrieve mine reward
- MINER_PRIVATE: miner wallet private key (can be use to test)
- TEST_TRANSACTION: set this to `true` to get some extra block & transaction when starting server

`/server/src/config/index.js`

- Default mine reward: `DEFAULT.SYSTEM.MINE_REWARD`
- Default difficulty: `DEFAULT.SYSTEM.MINE_REWARD`
- Min transaction per block: `DEFAULT.SYSTEM.MIN_TRANS_PER_BLOCK`
- API's directory: `DEFAULT.SYSTEM.ROOT`

By default, the system will give some starting currency(`MINE_REWARD`) to the `MINER_ADDRESS`, can be change in the static function `createGenesisBlock` which can be found in `/server/src/types/blockchain.js`
