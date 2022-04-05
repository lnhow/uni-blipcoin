# blipcoin

This is a simple proof-of-work blockchain app

**Le Nguyen Hao - 18120355**

This includes:

- An API Express server that store that store a simple PoW blockchain that lives in its memory
- A React SPA to access it

## Setup

### Server `/server`

Install dependency: `cd server` and `npm install`

Run: `cd server` and `npm run start`

### Client `/client`

Install dependency: `cd slient` and `npm install`

Run: `cd client` and `npm run start`

Build: `cd client` and `npm run build`

## Config

### Server

Environment: `/server/.env`

- `PORT`: server's port
- `SYSTEM_ADDRESS`: system wallet address
- `MINER_ADDRESS`: miner wallet address to retrieve mine reward
- `MINER_PRIVATE`: miner wallet private key (can be use to test)
- `TEST_TRANSACTION`: set this to `true` to get some extra block & transaction when starting server

`/server/src/config/index.js`

- Default mine reward: `DEFAULT.SYSTEM.MINE_REWARD`
- Default difficulty: `DEFAULT.SYSTEM.DIFFICULTY`
- Min transaction per block: `DEFAULT.SYSTEM.MIN_TRANS_PER_BLOCK`
- Max pending transaction: `DEFAULT.SYSTEM.MAX_PENDING_TRANSACTIONS` - If reached, trigger mine new block, this do not count mine reward transactions
- API's directory: `DEFAULT.SYSTEM.ROOT`

By default, the system will give some starting currency(`MINE_REWARD`) to the `MINER_ADDRESS`. This can be change in the static function `createGenesisBlock` which can be found in `/server/src/types/blockchain.js`

### Client

Environment: `/server/.env`

- `REACT_APP_API`: URL to server
