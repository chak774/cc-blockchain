const EC = require('elliptic').ec;
/*
    sec stands for standards of efficient cryptography. 
    The p stands for prime, 
    and 256 for 256 bit. 
    In the elliptic-based algorithm itself, a key component is a prime number to generate the curve, and this prime number will be 256 bits, or 32 bytes/characters. 
    K stands for Koblitz which is the name of a notable mathematician in the field of cryptography. 
    And 1 stands for this being the first implementation of the curve algorithm in this standard.
*/
const ec = new EC('secp256k1');

const uuidV1 = require('uuid/v1');

const SHA256 = require('crypto-js/sha256');

class ChainUtil {
    /*
        To create the keyPair and publicKey objects  objects, use a module called ‘elliptic’. 
        Elliptic is a module in node that contains classes and methods that enable elliptic-curve based cryptography. 
        Elliptic cryptography is an advanced mathematical subject, 
        but essentially, it centers around the idea in that it is computationally infeasible and impossibly expensive to guess the answer to a randomly generated elliptic curve. 
    */
    static genKeyPair(){
        return ec.genKeyPair();
    }

    //To generate an id for transactions, use a module called uuid which stands for universally unique identifier:
    static id(){
        return uuidV1();
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }
}

module.exports = ChainUtil;