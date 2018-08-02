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

    it('generates a hash that matches the difficulty', () =>{
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
        console.log(block);
    });

    it('lowers the difficulty for slowy mined blocks', ()=>{
        expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty-1);
    });

    it('raises the difficulty for slowy mined blocks', ()=>{
        expect(Block.adjustDifficulty(block, block.timestamp-360000)).toEqual(block.difficulty+1);
    });

})