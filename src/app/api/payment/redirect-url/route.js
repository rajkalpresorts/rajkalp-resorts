import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req, res) {

    try {
        await connectDB();

        const paymentInfo = await req.formData();
        const paymentStatus = paymentInfo.get('code');
        const phonepeAmount = paymentInfo.get('amount');
        const providerRefID = paymentInfo.get('providerReferenceId');
        const transactionId = paymentInfo.get('transactionId');
        const paymentTime = new Date();

        const confirmationId = crypto.randomBytes(16).toString("hex");

        const code = paymentStatus;

        switch (code) {
            case "PAYMENT_ERROR":
                return NextResponse.redirect(
                    `${process.env.DOMAIN}/test`, { status: 301 }
                );
            case "PAYMENT_SUCCESS":
                return NextResponse.redirect(
                    `${process.env.DOMAIN}`, { status: 301 }
                );
            default:
                return NextResponse.redirect(
                    `${process.env.DOMAIN}/test`, { status: 301 }
                );
        }
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}