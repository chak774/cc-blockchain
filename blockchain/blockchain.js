const Block = require('./block');

class Blockchain{

    constructor(){
        this.chain = [Block.genesis()]
    }

    addBlock(data){
        let newBlock = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(newBlock);
    }

    isValidChain(chain){
        //Check Genesis Block
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        //Check Against Last Hash & Hash
        for(let i = 1; i < this.chain; i++){
            if(this.chain[i].lastHash !== this.chain[i-1].hash || 
                this.chain[i].hash !== Block.blockHash(block)){
                return false;
            }
        }

        return true;
    }

}

module.exports = Blockchain;