import { dbConnect } from "@/dbConfig/dbConfig";
import userTransaction from "@/models/userTransaction"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const url = new URL(req.url);

        const month = url.searchParams.get("month"); 
        const year = url.searchParams.get("year"); 
        const startDateQuery = url.searchParams.get("startDate"); 
        const endDateQuery = url.searchParams.get("endDate"); 

        const filter: Partial<Record<string, unknown>> = {};

        if (month && year) {
            const monthMap: Record<string, number> = {
                "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
                "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
            };

            const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
            if (!(formattedMonth in monthMap)) {
                return NextResponse.json({ error: "Invalid month provided" }, { status: 400 });
            }

            const startDate = new Date(Number(year), monthMap[formattedMonth], 1);
            const endDate = new Date(Number(year), monthMap[formattedMonth] + 1, 1);

            filter.date = { $gte: startDate, $lt: endDate };
        }

        if (startDateQuery && endDateQuery) {
            const startDate = new Date(startDateQuery);
            const endDate = new Date(endDateQuery);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
            }

            filter.date = { $gte: startDate, $lt: endDate };
        }

        const transactions = await userTransaction.find(filter).sort({ date: -1 });

        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        console.error("Error fetching transactions:", error);
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
        console.error("Error Failed to add transaction:",error)
        return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
    }
}

