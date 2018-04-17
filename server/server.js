const express = require('express');
const bodyParser = require('body-parser');
const api = require('../api/api')
const logger = require('../util//logger/logger').get();

const start = (bc, p2pServer) => {
    logger.info("Starting up server...");
    const app = express();

    //Use bodyParser to read POST body
    logger.log('info', 'Use body-parser middleware for handling JSON');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //CORS Handler
    logger.log('info', 'Registering CORS handler...');
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
        res.header("Access-Control-Allow-Headers", process.env.CORS_HEADERS);
        res.header("Access-Control-Allow-Methods", process.env.CORS_METHODS);
        next();
    });

    api(app, bc, p2pServer);

    const server = app.listen(process.env.HTTP_PORT, () => {
        logger.info(`Server started successfully. Listening on port ${process.env.HTTP_PORT}`)
    });

}

module.exports = Object.assign({}, {start});