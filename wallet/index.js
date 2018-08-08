const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-util');

/*
    Wallets will store the balance of an individual, and approve transactions (exchanges of currency) by generating signatures.
    Every wallet instance will have three fields. 
    First is a balance, which is set to `INITIAL_BALANCE`. This will variable will be a value every wallet begins with. This helps get the economy flowing. 
    Second, it has a `keyPair` object. The keyPair object will contain methods that can return the private key for the wallet, as well as its public key. 
    Third and finally, it has a publicKey field. The public key also serves as the public address for the wallet, and is what other individuals in the network use to send currency to the wallet.
*/

class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }


    toString(){
        return `Wallet -
            publicKey: ${this.publicKey.toString()}
            balance: ${this.balance}
        `
    }

    /*
        To generate signatures, the elliptic module gives a convenient sign method within the keyPair object. 
        This takes any data in its hash form, and returns a signature based on the keyPair. 
        Later on, this generated signature and the matching public key can be used to verify the  authenticity of the signature.
    */
    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }

}

module.exports = Wallet;