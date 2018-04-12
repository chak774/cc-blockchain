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
            hast: ${hash}
            `;
    }

    static genesis(){
        return new Block(Date.now(), 'I am a Genesis Block.', '---', '---');
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
}

module.exports = Block;