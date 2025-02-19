import { dbConnect } from "@/dbConfig/dbConfig";
import userTransaction from "@/models/userTransaction"
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;

    try {
        const transaction = await userTransaction.findById(id);
        if (!transaction) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const { amount, description, date } = await req.json();

    try {
        const updatedTransaction = await userTransaction.findByIdAndUpdate(id, { amount, description, date }, { new: true });
        if (!updatedTransaction) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error) {
        console.error("Error Failed to update transaction:", error);
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    await dbConnect();

    try {
        const deletedTransaction = await userTransaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error Failed to delete transaction:",error)
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
    }
}