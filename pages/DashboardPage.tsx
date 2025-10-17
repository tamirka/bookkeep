
import React, { useMemo } from 'react';
import { BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../contexts/AppContext';
import DashboardCard from '../components/DashboardCard';
import { Transaction, TransactionType } from '../types';

const DashboardPage: React.FC = () => {
  const { transactions, settings } = useAppContext();

  const { totalIncome, totalExpenses, netProfit } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    transactions.forEach(t => {
      if (t.type === TransactionType.INCOME) {
        income += t.amount;
      } else {
        expenses += t.amount;
      }
    });
    return {
      totalIncome: income,
      totalExpenses: expenses,
      netProfit: income - expenses,
    };
  }, [transactions]);

  const chartData = useMemo(() => {
    const dataByCategory: { [key: string]: { name: string, income: number, expenses: number } } = {};

    transactions.forEach((t: Transaction) => {
      if (!dataByCategory[t.category]) {
        dataByCategory[t.category] = { name: t.category, income: 0, expenses: 0 };
      }
      if (t.type === TransactionType.INCOME) {
        dataByCategory[t.category].income += t.amount;
      } else {
        dataByCategory[t.category].expenses += t.amount;
      }
    });

    return Object.values(dataByCategory);
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return `${settings.currencySymbol}${value.toFixed(2)}`;
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={<ArrowTrendingUpIcon className="h-8 w-8 text-green-800" />}
          color="bg-green-100"
        />
        <DashboardCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={<ArrowTrendingDownIcon className="h-8 w-8 text-red-800" />}
          color="bg-red-100"
        />
        <DashboardCard
          title="Net Profit"
          value={formatCurrency(netProfit)}
          icon={<ScaleIcon className="h-8 w-8 text-blue-800" />}
          color="bg-blue-100"
        />
         <DashboardCard
          title="Transactions"
          value={String(transactions.length)}
          icon={<BanknotesIcon className="h-8 w-8 text-yellow-800" />}
          color="bg-yellow-100"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-text-main mb-4">Income vs. Expenses by Category</h2>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="income" fill="#10B981" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
