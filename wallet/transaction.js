const ChainUtil = require('../chain-util');

/*
    Transactions objects represent exchanges in the cryptocurrency. 
    They will consist of three primary components: 
    1) an input field which provides information about the sender of the transaction. 
    2) output fields which detail how much currency the sender is giving to other wallets, and 
    3) a unique `id` to identify the transaction object. To generate an id for transactions, use a module called uuid which stands for universally unique identifier
*/
class Transaction {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    update(senderWallet, recipient, amount){
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);
        
        //Check hv enough balance first
        if(amount > senderOutput.amount) {
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        //Update the sender output's amount first
        senderOutput.amount = senderOutput.amount - amount;
        //Add a new output for the new recipient
        this.outputs.push({amount, address:recipient});
        //Resign the transaction
        Transaction.signTransaction(this, senderWallet);

        return this;
    }

    static newTransaction(senderWallet, recipient, amount){

        //If sender does not have enough balance, return to end it.
        if(amount > senderWallet.balance){
            console.log(`Amount: ${amount} exceeds balance`);
            return;
        }
        const transaction = new this();
        // ... is an ES6 function to split an array to elements
        transaction.outputs.push(...[
            {amount: senderWallet.balance - amount, address: senderWallet.publicKey},
            {amount, address: recipient}
        ])
        this.signTransaction(transaction, senderWallet)

        return transaction;
    }


    /*
        Input object which provides information about the sender in the transaction. 
        This information includes the sender’s original balance, his or her public key, 
        and most important, his or her signature for the transaction. 
    */
    //This method is to generate the input object for a transaction
    static signTransaction(transaction, senderWallet){
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
            /*
                To generate signatures, the elliptic module gives a convenient sign method within the keyPair object. 
                This takes any data in its hash form, and returns a signature based on the keyPair. 
                Later on, this generated signature and the matching public key can be used to verify the  authenticity of the signature.
            */
        }
    }

    static verifyTransaction(transaction){
        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        );
    }

}

module.exports = Transaction;