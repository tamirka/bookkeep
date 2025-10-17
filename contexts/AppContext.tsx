
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Transaction, Settings, TransactionType } from '../types';

interface AppContextType {
  transactions: Transaction[];
  settings: Settings;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateSettings: (newSettings: Settings) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialTransactions: Transaction[] = [
    { id: '1', date: '2023-10-01', description: 'Client Payment - Project Alpha', amount: 5000, type: TransactionType.INCOME, category: 'Freelance' },
    { id: '2', date: '2023-10-02', description: 'Monthly SaaS Subscriptions', amount: 150, type: TransactionType.EXPENSE, category: 'Software/SaaS' },
    { id: '3', date: '2023-10-05', description: 'Office Supplies from Amazon', amount: 85.50, type: TransactionType.EXPENSE, category: 'Office Supplies' },
    { id: '4', date: '2023-10-10', description: 'Consulting Gig - Web Design', amount: 2500, type: TransactionType.INCOME, category: 'Freelance' },
    { id: '5', date: '2023-10-15', description: 'WeWork Office Rent', amount: 400, type: TransactionType.EXPENSE, category: 'Rent/Mortgage' },
];


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });
  
  const [settings, setSettings] = useState<Settings>(() => {
      const savedSettings = localStorage.getItem('settings');
      return savedSettings ? JSON.parse(savedSettings) : { companyName: 'My Business', currencySymbol: '$' };
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().toISOString() + Math.random(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };
  
  return (
    <AppContext.Provider value={{ transactions, settings, addTransaction, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
