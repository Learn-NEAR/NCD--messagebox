Start clean
near call messages.testnet uninitContract --accountId messages.testnet --gas 300000000000000

Init Contract
near call messages.testnet initContract --accountId messages.testnet --gas 300000000000000

Get my messages: empty
near call messages.testnet retrieveMessages --accountId messages.testnet --gas 300000000000000

Send message and attach near for fee
near call messages.testnet sendMessage "{\"target_account_id\": \"p400.testnet\", \"message\": \"Hello2, ...\"}" --accountId messages.testnet --gas 300000000000000 --amount 0.001

Get my messages of other account: Should have the "Hello, ..." message
near call messages.testnet retrieveMessages --accountId p400.testnet --gas 300000000000000

Send another message
near call messages.testnet sendMessage "{\"target_account_id\": \"p400.testnet\", \"message\": \"Thanks for your reply...\"}" --accountId messages.testnet --gas 300000000000000 --amount 0.001

User should have two messages now
near call messages.testnet retrieveMessages --accountId p400.testnet --gas 300000000000000

deleteMessages
near call messages.testnet deleteAllMessages --accountId p400.testnet --gas 300000000000000

check messages is null
near call messages.testnet retrieveMessages --accountId p400.testnet --gas 300000000000000
