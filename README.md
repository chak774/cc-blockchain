# cc-blockchain

## Stack
- NodeJS 8.9.4
- Express ^4.16.2
- nodemon ^1.17.1 (For Development Hot Reload Feature)
- dotenv ^5.0.1 (For Loading External Configuration File)
- winston ^2.4.1 (For Logging)
- winston-daily-rotate-file ^1.7.2 (For Logging Daily Rotate)
- crypto-js ^3.1.9-1
- jest ^22.4.3

## How to Run?
- Start First Peer: npm run start-dev
- Start Second Peer: npm run start-dev-peer1
- Start Third Peer: npm run start-dev-peer2

## How to Use?
- HTTP Port: 3001=First Peer, 3002=Second Peer, 3003=Third Peer
- To get the chain: localhost:3001/blocks
- To mine: localhost:3001 POST {"data":"lalala"}

## P2P Synchronize Feature
Auto Synchronize Blockchain & Transaction Pool between peers

## Transaction Pool
 - contains an array of transactions

## Transaction
 - id
 - input (the original information of the sender)
 - outputs (the latest information of the sender after given out currency & the information of receivers)

## Signing

## Wallet
 - balance
 - keyPair
 - publicKey

## Reward & Mining

## 51% Attack & Proof of Work
- To replace the whole blockchain, need 51% compution power of the chain.
- hash = 0 * difficulty + hash
- nonce = how many time to try to fit the difficulty + hash
- auto adjust the difficulty to match the mine rate e.g. 3000ms , ( lastblock.timestamp + mine rate > current time stamp? )

## Blockchain Example
```json
[
    {
        "timestamp": "---",
        "data": "Genesis",
        "lastHash": "---",
        "hash": "a1aadd66386284c2dad2fab5b556b6eeffbc8a50e9353ccf532974205f0f8dda"
    },
    {
        "timestamp": 1529591757031,
        "data": "lalala",
        "lastHash": "a1aadd66386284c2dad2fab5b556b6eeffbc8a50e9353ccf532974205f0f8dda",
        "hash": "73f72b02bfd7b41ac6bfca23b3301702d99442efc4a357229d028008f7b98ffd"
    }
]
```
