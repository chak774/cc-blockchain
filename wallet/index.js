const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');

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

    createTransaction(recipient, amount, blockchain, transactionPool){
        this.balance = this.calculateBalance(blockchain);

        if(amount>this.balance){
            console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
            return;
        }

        //Get existing transaction in the transaction pool
        let transaction = transactionPool.existingTransaction(this.publicKey);

        if(transaction){
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

    calculateBalance(blockchain){
        let balance = this.balance;
        let transactions = [];

        //Add all transactions to an array
        //loop blocks
        blockchain.chain.forEach(block => 
            //loop block's transaction
            block.data.forEach(transaction => {
                transactions.push(transaction);
            })
        );

        //Filter only this wallet's related transactions
        const walletInputTs = transactions
            .filter(transaction => transaction.input.address === this.publicKey);
        
        let startTime =0;

        if(walletInputTs.length > 0){
            //To get the most recent input transaction
            const recentInputT = walletInputTs.reduce(
                (prev, current) => prev.input.timestamp ? prev : current
            );

            //To get the output amount from the input transaction
            balance = recentInputT.outputs.find(output => 
                output.address === this.publicKey
            ).amount;

            startTime = recentInputT.input.timestamp;
        }

        //Check whether someone give this wallet some amount, and sum up
        transactions.forEach(transaction => {
            if(transaction.input.timestamp > startTime){
                transaction.outputs.find(output => {
                    if(output.address === this.publicKey){
                        balance += output.amount;
                    }
                })
            }
        });

        return balance;

    }

    static blockchainWallet(){
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }

}

module.exports = Wallet;