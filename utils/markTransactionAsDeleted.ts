import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function markTransactionAsDeleted(phone: string, transactionId: string, deletedBy: string): Promise<void> {
    try {
        const transactionRef = doc(db, 'customers', phone, 'transactions', transactionId);
        await updateDoc(transactionRef, { isDeleted: deletedBy });
        console.log(`Transaction ${transactionId} marked as deleted.`);
    } catch (error: any) {
        console.error('Error updating transaction: ', error.message);
        throw new Error('পাওয়া যাচ্ছে না!');
    }
}
