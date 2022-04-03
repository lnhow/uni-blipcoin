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

`/server/src/config/index.js`

- Default mine reward: `DEFAULT.SYSTEM.MINE_REWARD`
- Default difficulty: `DEFAULT.SYSTEM.MINE_REWARD`
- Min transaction per block: `DEFAULT.SYSTEM.MIN_TRANS_PER_BLOCK`
- API's directory: `DEFAULT.SYSTEM.ROOT`
