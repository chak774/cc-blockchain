const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, data, lastHash, hash){
        this.timestamp=timestamp;
        this.data=data;
        this.lastHash=lastHash;
        this.hash=hash;
    }

    toString(){
        return 
            `Block - 
            timestamp: ${timestamp}
            data: ${data}
            lastHash: ${lastHash}
            hash: ${hash}
            `;
    }

    static genesis(){
        const timestamp = '---';
        const lastHash = '---';
        const data = 'Genesis'
        const hash = Block.hash(timestamp, data, lastHash);
        return new Block(timestamp, data, lastHash, hash);
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, data, lastHash);
        return new Block(timestamp, data, lastHash, hash);
    }

    static hash(timestamp, data, lastHash){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, data, lastHash);
    }
}

module.exports = Block;