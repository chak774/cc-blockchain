const logger = require('../util//logger/logger').get();

module.exports = (app, bc, p2pServer, tp, wallet, miner) => {

    logger.log('info', 'Registering GET /blocks API...');
    app.get('/blocks', (req, res) => {
        logger.log('info', "Got a GET request for /blocks");
        res.json(bc.chain);
    });

    logger.log('info', 'Registering POST /mine API...');
    app.post('/mine', (req, res) => {
        logger.log('info', "Got a POST request for /mine");
        logger.log('info', 'Request Body:'+ JSON.stringify(req.body));
        const block = bc.addBlock(req.body.data);
        logger.info('New block added:' , block);
        p2pServer.syncChains();
        res.redirect('/blocks');
    });

    app.get('/transactions', (req,res)=>{
        res.json(tp.transactions);
    });

    app.post('/transact', (req, res)=>{
        const {recipient, amount} = req.body;
        const transaction = wallet.createTransaction(recipient, amount, bc, tp);
        p2pServer.broadcastTransaction(transaction);
        res.redirect('/transactions');
    });

    app.get('/mine-transactions', (req, res)=>{
        const block = miner.mine();
        console.log(`New block added: ${block.toString()}`)
        res.redirect('/blocks');
    })

    app.get('/public-key', (req, res) => {
        res.json({publicKey: wallet.publicKey});
    })
}