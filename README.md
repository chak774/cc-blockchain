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

## P2P Feature
Auto Synchronize Blockchain between peers

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
