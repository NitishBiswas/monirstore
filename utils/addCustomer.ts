import moment from 'moment';
import { db } from '../firebaseConfig';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

export interface Customer {
    name: string;
    phone: string;
    createdAt: string;
    totalDue?: number;
}

export async function addCustomer(name: string, phone: string): Promise<void> {
    try {
        const customerRef = doc(db, 'customers', phone);

        const customerData: Customer = {
            name,
            phone,
            createdAt: moment(new Date()).format("LLL"),
        };

        await setDoc(customerRef, customerData);

        console.log('Customer added successfully');
    } catch (e) {
        console.error('Error adding customer: ', e);
    }
}
