import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/transactionModel';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  await connectDB();
  const updated = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params; 
    await connectDB();
    await Transaction.findByIdAndDelete(id);
    return Response.json({ message: 'Deleted' });
}
