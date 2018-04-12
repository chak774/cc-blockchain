const Block = require('./block');

describe('Block', () => {

    let data, lastBlock, block;

    beforeEach(()=>{
        data = "testdata";
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    })

    it('check data', () => {
        expect(block.data).toEqual(data);
    });

    it('check lastHash', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

})