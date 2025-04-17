'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Transaction = {
  amount: number;
  date: string;
};  

type Props = {
    refreshTrigger: boolean;
};


export default function MonthlyChart({ refreshTrigger }: Props) {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
  
        const monthlyTotals: { [month: string]: number } = {};
  
        (data ?? []).forEach((transaction: any) => {
          const date = new Date(transaction.date);
          const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2025-4"
          if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
          }
          monthlyTotals[month] += parseFloat(transaction.amount);
        });
  
        const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
          month,
          total,
        }));
  
        setData(chartData);
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };
  
    fetchData();
  }, [refreshTrigger]);
  

  return (
    <div className="w-full h-80">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      {data.length === 0 ? (
        <p className="text-muted-foreground">No data to show.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
