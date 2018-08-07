const ChainUtil = requires('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block{
    constructor(timestamp, data, lastHash, hash, nonce, difficulty){
        this.timestamp=timestamp;
        this.data=data;
        this.lastHash=lastHash;
        this.hash=hash;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString(){
        return 
            `Block - 
            timestamp: ${timestamp}
            data: ${data}
            lastHash: ${lastHash}
            hash: ${hash}
            nonce: ${nonce}
            difficulty: ${difficulty}
            `;
    }

    static genesis(){
        const timestamp = '---';
        const lastHash = '---';
        const data = 'Genesis'
        const hash = Block.hash(timestamp, data, lastHash);
        return new Block(timestamp, data, lastHash, hash, 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data){
        const lastHash = lastBlock.hash;
        
        //proof of work
        let hash;
        let nonce = 0;
        let timestamp;
        let {difficulty} = lastBlock;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, data, lastHash, nonce, difficulty);
        }while (hash.substring(0, difficulty) !== '0'.repeat(difficulty) ){
            return new Block(timestamp, data, lastHash, hash, nonce, difficulty);
        }
    }

    static hash(timestamp, data, lastHash, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, data, lastHash, nonce, difficulty);
    }

    //proof of work
    static adjustDifficulty(lastBlock, currentTime){
        let {difficulty} = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;