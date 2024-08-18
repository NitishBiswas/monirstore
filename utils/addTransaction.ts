import moment from 'moment';
import { db } from '../firebaseConfig';
import { doc, collection, addDoc } from 'firebase/firestore';

export interface Transaction {
    id?: string;
    amount: number;
    type: 'purchase' | 'payment' | string;
    date: string;
    addedBy?: string;
    isDeleted?: string;
}

export async function addTransaction(
    phone: string,
    amount: number,
    type: 'purchase' | 'payment' | string,
    addedBy?: string,
    isDeleted?: string,
): Promise<void> {
    try {
        const transactionsRef = collection(doc(db, 'customers', phone), 'transactions');

        const transactionData: Transaction = {
            amount,
            type,
            date: moment(new Date()).format("LLL"),
            addedBy,
            isDeleted,
        };

        await addDoc(transactionsRef, transactionData);

        console.log('Transaction added successfully');
    } catch (e) {
        console.error('Error adding transaction: ', e);
    }
}
