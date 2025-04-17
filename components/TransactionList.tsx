'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';

type Transaction = {
    _id: string;
    amount: number;
    description: string;
    date: string;
};

type Props = {
    refreshTrigger: boolean;
    onEdit: (t: Transaction) => void;
};

export default function TransactionList({ refreshTrigger, onEdit }: Props) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        fetch('/api/transactions')
            .then((res) => res.json())
            .then((data) => setTransactions(data));
    }, [refreshTrigger]);

    const deleteTransaction = async (id: string) => {
        const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setTransactions(transactions.filter((t) => t._id !== id));
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Transactions</h2>
            {transactions.length === 0 ? (
                <p className="text-muted-foreground">No transactions yet.</p>
            ) : (
                transactions.map((t) => (
                    <Card key={t._id} className="flex justify-between items-center p-6 hover:shadow-lg transition">
                        <div>
                            <div className="text-lg font-medium">{t.description || 'No Description'}</div>
                            <div className="text-sm text-muted-foreground">
                                {new Date(t.date).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-semibold">
                                ₹{t.amount}
                            </span>
                            <Button size="icon" variant="outline" onClick={() => onEdit(t)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="destructive" onClick={() => deleteTransaction(t._id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))
            )}
        </div>
    );
}
