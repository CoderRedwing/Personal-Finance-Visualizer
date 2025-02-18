import { dbConnect } from "@/dbConfig/dbConfig";
import userTransaction from "@/models/userTransaction"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const transactions = await userTransaction.find().sort({ date: -1 });
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { amount, description, date } = await req.json();
        if (!amount || !description || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await dbConnect();
        const newTransaction = new userTransaction({ amount, description, date });
        await newTransaction.save();

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
    }
}