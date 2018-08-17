const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'foo';
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    bc2.addBlock('foo');

    expect(Blockchain.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'Bad data';

    expect(Blockchain.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'Not foo';

    expect(Blockchain.isValidChain(bc2.chain)).toBe(false);
  });

  it('replaces the chain with a valid chain', () => {
    bc2.addBlock('goo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it('does not replace the chain with one of less than or equal to length', () => {
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  })
});

/*const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {

    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();

        modifiedChain = new Blockchain();
        modifiedChain.addBlock("first block");
        modifiedChain.addBlock("second block");

        toBeReplaceChain = new Blockchain();
        toBeReplaceChain.addBlock("first block");
        toBeReplaceChain.addBlock("second block");

        longestChain = new Blockchain();
        longestChain.addBlock("first block");
        longestChain.addBlock("second block");
        longestChain.addBlock("third block");

        sameLengthChain = new Blockchain();
        sameLengthChain.addBlock("first block");
        sameLengthChain.addBlock("second block...");

        shorterChain = new Blockchain();
        shorterChain.addBlock("first block");

    })

    it('check start with genesis block', ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    })

    it('check new block data', ()=>{
        let data = "test data";
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    })

    it('check validation logic(valid genesis block)', ()=>{
        expect(Blockchain.isValidChain(blockchain.chain)).toEqual(true);
    })

    it('check validation logic(modified genesis block)', ()=>{
        blockchain.chain[0].data = 'modified';
        expect(Blockchain.isValidChain(blockchain.chain)).toEqual(false);
    })

    it('check validation logic(valid hash & last hash)', ()=>{
        expect(Blockchain.isValidChain(blockchain.chain)).toEqual(true);
    })

    it('check validation logic(modified hash & last hash)', ()=>{
        modifiedChain.chain[2].lastHash = 'modified';
        expect(Blockchain.isValidChain(modifiedChain.chain)).toEqual(false);
    })

    it('check replace logic(longer incoming chain)', ()=>{
        toBeReplaceChain.replaceChain(longestChain.chain);
        expect(toBeReplaceChain).toEqual(longestChain);
    })

    it('check replace logic(same length incoming chain)', ()=>{
        toBeReplaceChain.replaceChain(sameLengthChain.chain);
        expect(toBeReplaceChain).not.toEqual(sameLengthChain);
    })

    it('check replace logic(less length incoming chain)', ()=>{
        toBeReplaceChain.replaceChain(shorterChain.chain);
        expect(toBeReplaceChain).not.toEqual(shorterChain);
    })

})*/