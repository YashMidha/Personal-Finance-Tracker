'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

type Props = {
    refresh: () => void;
    editing?: boolean;
    initialData?: {
        _id?: string;
        amount: number;
        description: string;
        date: string;
    };
};

export default function TransactionForm({ refresh, editing = false, initialData }: Props) {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (editing && initialData) {
            setAmount(initialData.amount);
            setDescription(initialData.description);
            setDate(initialData.date.slice(0, 10));
        }
    }, [editing, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const transaction = { amount, description, date };

        const url = editing
            ? `/api/transactions/${initialData?._id}`
            : '/api/transactions';

        const method = editing ? 'PATCH' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction),
        });

        if (res.ok) {
            setAmount(0);
            setDescription('');
            setDate('');
            refresh();
        }
    };

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label>Amount</Label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Date</Label>
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full md:w-auto">
                    {editing ? 'Update Transaction' : 'Add Transaction'}
                </Button>
            </form>
        </Card>
    );
}
