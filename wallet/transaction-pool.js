const Transaction = require('./transaction');

class TransactionPool{
    constructor(){
        this.transactions = [];
    }

    updateOrAddTransaction(transaction){
        //Check if the transaction is already existed
        let transactionWithId = this.transactions.find(t => t.id === transaction.id);

        //If existed, update it.
        if(transactionWithId){
            //update
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else {
            //create
            this.transactions.push(transaction);
        }

    }

    existingTransaction(address){
        return this.transactions.find(t => t.input.address === address);
    }

    validTransaction(){
        return this.transactions.filter(transaction => {
            //To calculate the total amount of the outputs of the transactions
            const outputTotal = transaction.outputs.reduce((total, output) => {
                return total + output.amount;
            }, 0);

            //input.amount = sender's original wallet balance
            //output total amount include the given out amount and the latest sender wallet balance
            //so, should be equal
            if(transaction.input.amount !== outputTotal){
                console.log(`Invalide transaction from ${transaction.input.address}`)
                return;
            }

            if(!Transaction.verifyTransaction(transaction)){
                console.log(`Invalid signature from ${transaction.input.address}`);
                return;
            }

            return transaction;//need to return??
        });
    }

    clear(){
        this.transactions = [];
    }

}

module.exports = TransactionPool;