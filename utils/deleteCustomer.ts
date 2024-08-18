import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function deleteCustomer(phone: string): Promise<void> {
    try {
        const customerRef = doc(db, 'customers', phone);
        await deleteDoc(customerRef);
        console.log(`Customer with phone number ${phone} permanently deleted.`);
    } catch (error: any) {
        console.error('Error deleting customer: ', error.message);
        throw new Error('Customer is not deleted!');
    }
}
