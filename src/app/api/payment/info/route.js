import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Order from "@/database/models/order";

export async function POST(req) {
    try {
        await connectDB();

        const token = req.cookies.get('token')?.value || null;

        if (!token) {
            return NextResponse.json({
                error: "No access token!"
            }, { status: 300 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        if (decoded.role !== 'admin' && decoded.role !== 'user') {
            return NextResponse.json({
                error: "Unauthorized access!"
            }, { status: 401 });
        }

        const { transactionId } = await req.json();

        const order = await Order
            .findOne({
                confirmationId: transactionId
            })
            .populate('user', 'firstName lastName email contact');

        if (!order) {
            return NextResponse.json({
                error: "Order not found!"
            }, { status: 404 });
        }

        if (decoded.role === 'user' && order.user._id !== decoded.id) {
            return NextResponse.json({
                error: "Unauthorized access!"
            }, { status: 401 });
        }

        return NextResponse.json(order, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}