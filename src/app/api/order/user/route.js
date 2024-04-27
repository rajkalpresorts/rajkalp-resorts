import connectDB from "@/database/dbConfig";
import Order from "@/database/models/order";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        await connectDB();

        const token = req.cookies.get('token')?.value || null;
        if (!token) {
            return NextResponse.json({ error: "No access token!" }, { status: 300 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = req.nextUrl.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "No user ID!" }, { status: 400 });
        }

        if (decoded.role !== 'admin' && decoded.id !== userId) {
            return NextResponse.json({ error: "Unauthorized access!" }, { status: 401 });
        }

        const orders = await Order
            .find({
                user: userId,
                paymentStatus: "PAYMENT_SUCCESS"
            })
            .select("-checksum -transactionId -merchantId -providerRefID -confirmationId")
            .populate('user', 'firstName lastName email contact referralId')
            .populate('plan', 'name amount')
            .sort({ createdAt: -1 });

        return NextResponse.json({ orders }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}