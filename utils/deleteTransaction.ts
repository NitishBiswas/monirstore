import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function deleteTransaction(phone: string, transactionId: string): Promise<void> {
    try {
        const transactionRef = doc(db, 'customers', phone, 'transactions', transactionId);
        await deleteDoc(transactionRef);
        console.log(`Transaction ${transactionId} permanently deleted.`);
    } catch (error: any) {
        console.error('Error deleting transaction: ', error.message);
    }
}
