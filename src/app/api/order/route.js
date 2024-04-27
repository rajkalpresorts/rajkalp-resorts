import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Order from "@/database/models/order";

export async function GET(req) {
    try {
        await connectDB();

        const token = req.cookies.get('token')?.value || null;
        if (!token) {
            return NextResponse.json({
                error: "No access token!"
            }, { status: 300 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role !== 'admin') {
            return NextResponse.json({
                error: "Unauthorized access!"
            }, { status: 401 });
        }

        const orders = await Order
            .find()
            .populate("user", "firstName lastName email contact referredBy")
            .populate("plan", "name amount bonus")
            .sort({ createdAt: -1 });

        return NextResponse.json({ orders }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}