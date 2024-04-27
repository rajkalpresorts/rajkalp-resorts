import connectDB from "@/database/dbConfig";
import User from "@/database/models/user";
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
        if (decoded.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized access!" }, { status: 401 });
        }

        const users = await User
            .find({ role: 'user' })
            .select('-password')
            .sort({ createdAt: -1 });

        return NextResponse.json({ users }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();

        const token = req.cookies.get('token')?.value || null;
        if (!token) {
            return NextResponse.json({ error: "No access token!" }, { status: 300 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized access!" }, { status: 401 });
        }

        await User.updateMany({ role: 'user' }, { balance: 0 });

        return NextResponse.json({
            success: true,
            message: "All user balances have been reset."
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}