const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {

    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    })

    it('check start with genesis block', ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    })

    it('check new block data', ()=>{
        let data = "test data";
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    })

})