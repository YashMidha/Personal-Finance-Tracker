import mongoose, { Schema, models, model } from 'mongoose';

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
}, { timestamps: true });

export const Transaction = models.Transaction || model('Transaction', TransactionSchema);
