const logger = require('../util//logger/logger').get();
const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

/* Description:
*     1. Start Server 
*     2. Listening for peers connection & Connect peers based on env var 
*     3. This P2P Server's all peers need to send out its' chain to sync
*/

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  //Start server. Listen for connection, if have connection, connect its socket. Also, connect based on the environment peers
  listen() {
    logger.debug("P2P Server Listen.")
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));
    this.connectToPeers();
  }

  //Implement when server starts up. Create Sockets by Peers(The address - ws://xxxx). 
  connectToPeers() {
    logger.debug("P2P Server Connect To Peers.")
    peers.forEach(peer => {
      const socket = new Websocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  //Implement when socket connected. 
  connectSocket(socket) {
    this.sockets.push(socket);
    logger.debug('Socket connected. ');
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  //Listen to "Message" event. When received "Message", replace chain.
  messageHandler(socket) {
    logger.debug("P2P Server Message Handler.");
    socket.on('message', message => {
      const data = JSON.parse(message);
      //console.log('data', data);
      this.blockchain.replaceChain(data);
    });
  }

  //Send chain to other peers
  sendChain(socket) {
    logger.debug("P2P Server Send Chain.");
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  //Each peer need to send its chain out to sync
  syncChains() {
    logger.debug("P2P Server Sync Chain.");
    this.sockets.forEach(socket => {
      this.sockets.forEach(socket => this.sendChain(socket));
    });
  }

}

module.exports = P2pServer;