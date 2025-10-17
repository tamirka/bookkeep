
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '../contexts/AppContext';
import { Transaction, TransactionType } from '../types';
import AddTransactionModal from '../components/AddTransactionModal';

const TransactionsPage: React.FC = () => {
  const { transactions, settings } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return `${settings.currencySymbol}${value.toFixed(2)}`;
  };

  const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-6 text-sm text-text-main">{transaction.date}</td>
      <td className="py-4 px-6 text-sm text-text-main font-medium">{transaction.description}</td>
      <td className="py-4 px-6 text-sm text-text-secondary">{transaction.category}</td>
      <td className={`py-4 px-6 text-sm font-semibold ${transaction.type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'}`}>
        {transaction.type === TransactionType.INCOME ? '+' : '-'} {formatCurrency(transaction.amount)}
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-text-main">All Transactions</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Transaction
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Description</th>
                <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Category</th>
                <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map(t => <TransactionRow key={t.id} transaction={t} />)
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-text-secondary">No transactions yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default TransactionsPage;
