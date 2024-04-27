import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";
import crypto from "crypto";
import Order from "@/database/models/order";

export async function POST(req) {
    try {
        await connectDB();

        const paymentInfo = await req.formData();

        const paymentStatus = paymentInfo.get("code");
        const phonepeAmount = paymentInfo.get("amount");
        const providerRefID = paymentInfo.get("providerReferenceId");
        const transactionId = paymentInfo.get("transactionId");
        const checksum = paymentInfo.get("checksum");

        const paymentTime = new Date();
        const confirmationId = crypto.randomBytes(16).toString("hex");

        const oldOrder = await Order.findOne({
            transactionId: transactionId,
        });

        if (!oldOrder) {
            return NextResponse.json(
                {
                    error: "Order not found!",
                },
                { status: 404 }
            );
        }

        oldOrder.paymentStatus = paymentStatus;
        oldOrder.phonepeAmount = phonepeAmount;
        oldOrder.providerRefID = providerRefID;
        oldOrder.paymentTime = paymentTime;
        oldOrder.confirmationId = confirmationId;
        oldOrder.checkSum = checksum;

        await oldOrder.save();
        const code = paymentStatus;

        switch (code) {
            case "PAYMENT_ERROR":
                return NextResponse.redirect(
                    `${process.env.DOMAIN}/user/payment/failure`,
                    {
                        status: 301,
                    }
                );
            case "PAYMENT_SUCCESS":
                return NextResponse.redirect(
                    `${process.env.DOMAIN}/user/payment/success?transactionId=${confirmationId}`,
                    {
                        status: 301,
                    }
                );
            default:
                return NextResponse.redirect(
                    `${process.env.DOMAIN}/user/payment`,
                    {
                        status: 301,
                    }
                );
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}
