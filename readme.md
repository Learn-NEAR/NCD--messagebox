Ntoice: This project is modified to run on windows. To run on Linux/Mac restore the contract/compile.js file.

## Setup & Deploy

1. Login on testnet via near-cli (near login)
2. Fill your testaccount in src/config.js CONTRACT_NAME
3. Run yarn install
4. Run yarn deploy

## Run Tests

1. Run yarn test

## NEAR-CLI commands

- send message
  - near call -contractAccount- initFrames "{\"start\": 0, \"end\": 10}" --accountId -yourAccount- --gas 300000000000000
- retrieveMessages
  - near call -contractAccount- initFrames "{\"start\": 0, \"end\": 10}" --accountId -yourAccount- --gas 300000000000000
- changeFee
  - near call -contractAccount- initFrames "{\"start\": 0, \"end\": 10}" --accountId -yourAccount- --gas 300000000000000
- deleteMessages
  - near call -contractAccount- initFrames "{\"start\": 0, \"end\": 10}" --accountId -yourAccount- --gas 300000000000000
