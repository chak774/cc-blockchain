//Load External Configuration File First. Then load them by process.env.xxx
require('dotenv').config();
//Or if you want to use path
//require('dotenv').config({path: '/full/custom/path/to/your/env/vars'})

//Initilize a Logger
const logger = require('./util//logger/logger').init();
const server = require('./server/server');
const P2pServer = require('./server/p2p-server');
const Blockchain = require('./blockchain/blockchain');
const Wallet = require('./wallet/index');
const TransactionPool = require('./wallet/transaction-pool');
const Miner = require('./miner');

const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();

const p2pServer = new P2pServer(bc, tp);

const miner = new Miner(bc, tp, wallet, p2pServer);

p2pServer.listen();
server.start(bc, p2pServer, tp, wallet, miner);


