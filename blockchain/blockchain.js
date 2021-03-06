const logger = require('../util/logger/logger').get();
const Block = require('./block');

class Blockchain{

    constructor(){
        this.chain = [Block.genesis()]
    }

    addBlock(data){
        const newBlock = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(newBlock);
        return newBlock;
    }

    static isValidChain(chain){
        //Check Genesis Blocks
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            console.log("The incoming chain's genesis block is not valid.")
            return false;
        }
        //Check Against Last Hash & Hash
        for(let i = 1; i < chain.length; i++){
            if(chain[i].lastHash !== chain[i-1].hash){
                console.log("The chain's blocks' hash & last hash are not sync.")
                return false;
            }
            if(chain[i].hash !== Block.blockHash(chain[i])){
                console.log("The chain's blocks' hash are modified.")
                return false;
            }
        }

        return true;
    }

    replaceChain(chain){
        //Check is longer than self
        if(chain.length<=this.chain.length){
            console.log("The incoming chain is not longer than original chain.")
            return false;
        }
        if(!Blockchain.isValidChain(chain)){
            console.log("The incoming chain is not valid.")
            return false;
        }

        this.chain = chain;
        console.log("Replaced chain")
        return this.chain;
    }

}

module.exports = Blockchain;