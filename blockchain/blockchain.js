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
            console.debug("The incoming chain's genesis block is not valid.")
            return false;
        }
        //Check Against Last Hash & Hash
        for(let i = 1; i < chain.length; i++){
            if(chain[i].lastHash !== chain[i-1].hash){
                console.debug("The chain's blocks' hash & last hash are not sync.")
                return false;
            }
            if(chain[i].hash !== Block.blockHash(chain[i])){
                console.debug("The chain's blocks' hash are modified.")
                return false;
            }
        }

        return true;
    }

    replaceChain(chain){
        //Check is longer than self
        if(chain.length<=this.chain.length){
            console.debug("The incoming chain is not longer than original chain.")
            return false;
        }
        if(!Blockchain.isValidChain(chain)){
            console.debug("The incoming chain is not valid.")
            return false;
        }

        this.chain = chain;
        return this.chain;
    }

}

module.exports = Blockchain;