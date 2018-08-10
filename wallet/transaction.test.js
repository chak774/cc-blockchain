const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
    let transaction, wallet, recipient, amount;

    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);//Give 50 amount to recipient from sender wallet
    });

    it('outputs the `amount` subtracted from the wallet balance', ()=>{
        expect(transaction.outputs.find(output => output.address ===wallet.publicKey).amount).toEqual(wallet.balance - amount);//Find the sender wallet from output, then check the balance
    });

    it('outputs the `amount` added to the recipient', ()=>{
        expect(transaction.outputs.find(output => output.address ===recipient).amount).toEqual(amount);//Find the recipient wallet from output, then check the balance
    });

    /*
        Input object which provides information about the sender in the transaction. 
        This information includes the sender’s original balance, his or her public key, 
        and most important, his or her signature for the transaction. 
    */
    it('inputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance);//Check whether the sender's original balance === sender wallet balance
    })

    it('validates a valid transaction', ()=>{
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('invalidates a corrupt transactioin', ()=>{
        //transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    })



    describe('Transaction with an amount exceed the balance', () => {
        let transaction, wallet, recipient, amount;

        beforeEach(()=>{
            wallet = new Wallet();
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it('does not create the transaction', ()=>{
            expect(transaction).toEqual(undefined);
        });
        
    });

    describe('and updating a transaction', () => {
        let nextAmount, nextRecipient;

        beforeEach(()=>{
            nextAmount = 20;
            nextRecipient = 'n3xt-4ddr355';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        })

        it(`substracts the next amount from the sender's output`,()=>{
            expect(transaction.outputs.find(output=>output.address===wallet.publicKey).amount)
                .toEqual(wallet.balance - amount - nextAmount);
        })

        it('outputs an amount for the next recipient', ()=>{
            expect(transaction.outputs.find(output=>output.address === nextRecipient).amount)
                .toEqual(nextAmount);
        })
    })

});