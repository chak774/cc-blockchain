const Block = require("./blockchain/block");

let genesisBlock = Block.genesis();
console.log(genesisBlock);
let firstBlock = Block.mineBlock(genesisBlock, 'first block');
console.log(firstBlock);
let secBlock = Block.mineBlock(firstBlock, 'second block');
console.log(secBlock);
