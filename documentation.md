Ntoice: This project is modified to run on windows. To run on Linux/Mac restore the contract/compile.js file.

## Setup & Deploy

1. Login on testnet via near-cli (near login)
2. Fill your testaccount in src/config.js CONTRACT_NAME
3. Run yarn install
4. Run yarn deploy

## Run Tests

1. Run yarn test

## NEAR-CLI commands

- initContract
  - near call messages.testnet initContract --accountId messages.testnet --gas 300000000000000
- send message
  - near call messages.testnet sendMessage "{\"target_account_id\": \"p400.testnet\", \"message\": \"Hallo\"}" --accountId messages.testnet --gas 300000000000000 --amount 0.001
- retrieveMessages
  - near call messages.testnet retrieveMessages --accountId messages.testnet --gas 300000000000000
- deleteAllMessages
  - near call messages.testnet deleteAllMessages --accountId messages.testnet --gas 300000000000000
- getCurrentFee
  - near call messages.testnet getCurrentFee --accountId messages.testnet --gas 300000000000000
- changeFee
  - near call messages.testnet changeFee "{\"message_fee\": 0.1}" --accountId messages.testnet --gas 300000000000000
