
import React, { useState, useEffect } from 'react';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Transaction, TransactionType } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { TRANSACTION_CATEGORIES } from '../constants';
import { categorizeTransaction } from '../services/geminiService';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction, settings } = useAppContext();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(TRANSACTION_CATEGORIES[0]);
  const [isCategorizing, setIsCategorizing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDescription('');
      setAmount('');
      setType(TransactionType.EXPENSE);
      setDate(new Date().toISOString().split('T')[0]);
      setCategory(TRANSACTION_CATEGORIES[0]);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const handleAutoCategorize = async () => {
    setIsCategorizing(true);
    try {
      const suggestedCategory = await categorizeTransaction(description);
      setCategory(suggestedCategory);
    } catch (error) {
      console.error("Failed to auto-categorize:", error);
      // Optionally show an error to the user
    } finally {
      setIsCategorizing(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount) {
      addTransaction({
        date,
        description,
        amount: parseFloat(amount),
        type,
        category,
      });
      onClose();
    }
  };

  const commonInputClasses = "w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 p-8 transform transition-all animate-fade-in-down">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-main">Add Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Description</label>
              <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className={commonInputClasses} required />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Amount ({settings.currencySymbol})</label>
              <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className={commonInputClasses} required min="0.01" step="0.01" />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-text-secondary">Date</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className={commonInputClasses} required />
            </div>
            <div className="col-span-2">
              <label htmlFor="type" className="block text-sm font-medium text-text-secondary">Type</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value as TransactionType)} className={commonInputClasses}>
                <option value={TransactionType.INCOME}>Income</option>
                <option value={TransactionType.EXPENSE}>Expense</option>
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="category" className="block text-sm font-medium text-text-secondary">Category</label>
              <div className="flex items-center space-x-2 mt-2">
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  {TRANSACTION_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <button type="button" onClick={handleAutoCategorize} disabled={isCategorizing || !description} className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors">
                  {isCategorizing ? 
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    : <SparklesIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-text-secondary hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
