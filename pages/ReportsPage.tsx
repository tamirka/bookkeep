
import React, { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Transaction, TransactionType } from '../types';

const ReportsPage: React.FC = () => {
  const { transactions, settings } = useAppContext();

  const { incomeTransactions, expenseTransactions, totalIncome, totalExpenses, netProfit } = useMemo(() => {
    const income: Transaction[] = [];
    const expenses: Transaction[] = [];
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(t => {
      if (t.type === TransactionType.INCOME) {
        income.push(t);
        incomeTotal += t.amount;
      } else {
        expenses.push(t);
        expenseTotal += t.amount;
      }
    });

    return {
      incomeTransactions: income,
      expenseTransactions: expenses,
      totalIncome: incomeTotal,
      totalExpenses: expenseTotal,
      netProfit: incomeTotal - expenseTotal,
    };
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return `${settings.currencySymbol}${value.toFixed(2)}`;
  };

  const ReportSection: React.FC<{ title: string; transactions: Transaction[]; total: number }> = ({ title, transactions, total }) => (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold border-b-2 pb-2 mb-4 text-text-main">{title}</h3>
      <table className="min-w-full">
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className="border-b">
              <td className="py-2 pr-4 text-text-secondary">{t.date}</td>
              <td className="py-2 pr-4 text-text-main">{t.description}</td>
              <td className="py-2 pl-4 text-right font-medium">{formatCurrency(t.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2">
            <td colSpan={2} className="py-3 text-right font-bold text-lg text-text-main">Total {title}</td>
            <td className="py-3 pl-4 text-right font-bold text-lg text-text-main">{formatCurrency(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-2 text-text-main">Profit & Loss Statement</h2>
      <p className="text-center text-text-secondary mb-10">For the period of all transactions</p>

      <ReportSection title="Income" transactions={incomeTransactions} total={totalIncome} />
      <ReportSection title="Expenses" transactions={expenseTransactions} total={totalExpenses} />

      <div className="mt-12 pt-6 border-t-4 border-double">
        <div className="flex justify-between items-center text-2xl font-bold">
          <span className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>Net Profit</span>
          <span className={netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(netProfit)}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
