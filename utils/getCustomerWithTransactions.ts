import { db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Customer } from './addCustomer';
import { Transaction } from './addTransaction';
import { calculateIndividualTotalDue } from './calculateTotalDue';

export interface CustomerWithTransactions extends Customer {
    transactions: Transaction[];
}

export async function getCustomerWithTransactions(phone: string): Promise<CustomerWithTransactions | null> {
    try {
        const customerRef = doc(db, 'customers', phone);
        const customerDoc = await getDoc(customerRef);

        if (!customerDoc.exists()) {
            console.error('Customer not found');
            return null;
        }

        const customerData = customerDoc.data() as Customer;

        const transactionsRef = collection(customerRef, 'transactions');
        const transactionsSnapshot = await getDocs(transactionsRef);

        const transactions: Transaction[] = transactionsSnapshot.docs.map(transactionDoc => {
            const data = transactionDoc.data() as Transaction;
            return { ...data, id: transactionDoc.id };  // Add the document ID to the transaction
        });

        customerData.totalDue = calculateIndividualTotalDue(transactions);

        return {
            ...customerData,
            transactions,
        };
    } catch (e) {
        console.error('Error fetching customer with transactions: ', e);
        return null;
    }
}
