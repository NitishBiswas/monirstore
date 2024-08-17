import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Customer } from './addCustomer';
import { calculateIndividualTotalDue, getCustomerTransactions } from './calculateTotalDue';

// Fetch all customers and calculate their total due
export async function getAllCustomers(): Promise<Customer[]> {
    try {
        const customersRef = collection(db, 'customers');
        const customerSnapshot = await getDocs(customersRef);

        const customers: Customer[] = await Promise.all(
            customerSnapshot.docs.map(async doc => {
                const customer = doc.data() as Customer;
                const transactions = await getCustomerTransactions(customer.phone);
                const totalDue = calculateIndividualTotalDue(transactions);
                return { ...customer, totalDue };
            })
        );

        return customers;
    } catch (e) {
        console.error('Error fetching customers with total due: ', e);
        return [];
    }
}

