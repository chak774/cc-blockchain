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
        return new Block('---', 'I am a Genesis Block.', '---', 'a82ef39f40c9ddae4ff5f7d4e74ca049ebfa31cd9dbd563ec34c64e6a7302c48');
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
        return Block.hash(timestamp, lastHash, data);
    }
}

module.exports = Block;