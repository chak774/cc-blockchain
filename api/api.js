const logger = require('../util//logger/logger').get();

module.exports = (app, bc, p2pServer) => {

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
}