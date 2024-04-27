import connectDB from "@/database/dbConfig";
import Plan from "@/database/models/plan";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
        if (decoded.role !== 'admin') {
            return NextResponse.json({
                error: "Unauthorized access!"
            }, { status: 401 });
        }

        const { name, description, amount } = await req.json();
        if (!name || !amount) {
            return NextResponse.json({
                error: "Missing required fields!"
            }, { status: 400 });
        }

        const newPlan = new Plan({
            name,
            description,
            amount,
        });
        await newPlan.save();
        return NextResponse.json({
            message: "Plan created successfully",
            plan: newPlan,
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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
        if (decoded.role !== 'admin' && decoded.role !== 'user') {
            return NextResponse.json({
                error: "Unauthorized access!"
            }, { status: 401 });
        }

        const plans = await Plan.find();
        return NextResponse.json({ plans }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
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

        const { id, name, description, amount } = await req.json();

        const plan = await Plan.findById(id);

        if (!plan) {
            return NextResponse.json({
                error: "Plan not found!"
            }, { status: 404 });
        }

        const updatedPlan = await Plan.findByIdAndUpdate(id, {
            name: name || plan.name,
            description: description || plan.description,
            amount: amount || plan.amount,
        }, { new: true });

        return NextResponse.json({
            message: "Plan updated successfully",
            plan: updatedPlan,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
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

        const { id } = await req.json();

        const plan = await Plan.findById(id);

        if (!plan) {
            return NextResponse.json({
                error: "Plan not found!"
            }, { status: 404 });
        }

        await Plan.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Plan deleted successfully",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}