'use client';

import { useState } from 'react';
import AddTransactionForm from '@/components/forms/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/charts/MonthlyExpensesChart';

export default function Home() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const triggerRefresh = () => {
    setRefreshFlag(!refreshFlag);
    setEditingTransaction(null); // Clear edit form after update
  };

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
  };

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Personal Finance Tracker</h1>

      {/* Add/Edit Transaction */}
      <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6">
        <AddTransactionForm
          refresh={triggerRefresh}
          editing={!!editingTransaction}
          initialData={editingTransaction || undefined}
        />
      </section>

      {/* Transactions */}
      <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6">
        <TransactionList refreshTrigger={refreshFlag} onEdit={handleEdit} />
      </section>
      
      {/* Monthly Chart */}
      <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-6">
        <MonthlyChart refreshTrigger={refreshFlag} />
      </section>

    </main>
  );
}
