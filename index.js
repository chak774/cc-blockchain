//Load External Configuration File First. Then load them by process.env.xxx
require('dotenv').config();
//Or if you want to use path
//require('dotenv').config({path: '/full/custom/path/to/your/env/vars'})

//Initilize a Logger
const logger = require('./util//logger/logger').init();

const server = require('./server/server');
const P2pServer = require('./server/p2p-server');
const Blockchain = require('./blockchain/blockchain');

const bc = new Blockchain();
const p2pServer = new P2pServer(bc);
p2pServer.listen();
server.start(bc, p2pServer);



/* const Block = require("./blockchain/block");
const Blockchain = require("./blockchain/blockchain"); */

/* let genesisBlock = Block.genesis();
console.log(genesisBlock);
let firstBlock = Block.mineBlock(genesisBlock, 'first block');
console.log(firstBlock);
let secBlock = Block.mineBlock(firstBlock, 'second block');
console.log(secBlock); */

/* let blockchain = new Blockchain();
blockchain.addBlock("I am a new block!")
console.log("Blockchain 1: ", blockchain.chain);
console.log("Is valid chain?: ",Blockchain.isValidChain(blockchain.chain));
console.log("---------------------------------------------");

let blockchain2 = new Blockchain();
//blockchain2.addBlock("I am a new block!")
//blockchain2.addBlock("I am a second new block!")
console.log("Blockchain 2: ", blockchain2.chain);
console.log("Is valid chain?: ",Blockchain.isValidChain(blockchain2.chain));
console.log("---------------------------------------------");

let blockchain3 = new Blockchain();
blockchain3.addBlock("I am a new block!")
blockchain3.addBlock("I am a second new block!")
console.log("Blockchain 3: ", blockchain3.chain);
console.log("Is valid chain?: ",Blockchain.isValidChain(blockchain3.chain));
console.log("---------------------------------------------");

console.log("Replacing Blockchain 1 with Blockchain 2. Result: ", blockchain.replaceChain(blockchain2.chain));
console.log("---------------------------------------------");
console.log("Replacing Blockchain 1 with Blockchain 3. Result: ", blockchain.replaceChain(blockchain3.chain));
 */