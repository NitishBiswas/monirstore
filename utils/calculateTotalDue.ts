import { db } from '../firebaseConfig'; // Adjust import path
import { collection, getDocs, doc } from 'firebase/firestore';
import { Customer } from '@/utils/addCustomer'; // Adjust import path
import { Transaction } from './addTransaction';

// Fetch transactions for a single customer
export async function getCustomerTransactions(phone: string): Promise<Transaction[]> {
    try {
        const transactionsRef = collection(db, 'customers', phone, 'transactions');
        const transactionSnapshot = await getDocs(transactionsRef);

        return transactionSnapshot.docs.map(doc => doc.data() as Transaction);
    } catch (e) {
        console.error('Error fetching customer transactions: ', e);
        return [];
    }
}

// Calculate total due for a customer based on transactions
export function calculateIndividualTotalDue(transactions: Transaction[]): number {
    let totalDue = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'purchase' && transaction?.isDeleted === "") {
            totalDue += transaction.amount;
        } else if (transaction.type === 'payment' && transaction?.isDeleted === "") {
            totalDue -= transaction.amount;
        }
    });

    return totalDue;
}


// Calculate total due for all customers
export async function calculateTotalDue(customers: Customer[]): Promise<number> {
    let totalDue = 0;

    for (const customer of customers) {
        const transactions = await getCustomerTransactions(customer.phone);

        transactions.forEach(transaction => {
            if (transaction.type === 'purchase' && transaction?.isDeleted === "") {
                totalDue += transaction.amount;
            } else if (transaction.type === 'payment' && transaction?.isDeleted === "") {
                totalDue -= transaction.amount;
            }
        });
    }

    return totalDue;
}
