const Block = require("./blockchain/block");
const Blockchain = require("./blockchain/blockchain");

/* let genesisBlock = Block.genesis();
console.log(genesisBlock);
let firstBlock = Block.mineBlock(genesisBlock, 'first block');
console.log(firstBlock);
let secBlock = Block.mineBlock(firstBlock, 'second block');
console.log(secBlock); */

let blockchain = new Blockchain();
blockchain.addBlock("I am a new block!")
console.log(blockchain.chain);
console.log("Is valid chain?: ",blockchain.isValidChain(blockchain.chain));
