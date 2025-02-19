import { dbConnect } from "@/dbConfig/dbConfig";
import userTransaction from "@/models/userTransaction";
import { NextResponse, NextRequest } from "next/server";



export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();

        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }

        const transaction = await userTransaction.findById(id);

        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const { amount, description, date } = await req.json();

        const updatedTransaction = await userTransaction.findByIdAndUpdate(
            id,
            { amount, description, date },
            { new: true }
        );

        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error) {
        console.error("Error updating transaction:", error);
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }

        const deletedTransaction = await userTransaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
    }
}
