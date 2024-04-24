import connectDB from "@/database/dbConfig";
import User from "@/database/models/user";
import { NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";

const generatePhonePePayload = (userId, amount, mobileNumber) => {
    const payload = {
        merchantId: process.env.MERCHANT_ID,
        merchantTransactionId: `RJRT${Date.now()}`,
        merchantUserId: userId,
        amount: amount,
        redirectUrl: `${process.env.DOMAIN}/api/payment/redirect-url`,
        redirectMode: "POST",
        callbackUrl: `${process.env.DOMAIN}/api/payment/redirect-url`,
        mobileNumber: mobileNumber,
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

    const saltedPayload = `${base64Payload}/pg/v1/pay${process.env.SALT_KEY}`;

    const xVerify = crypto
        .createHash("sha256")
        .update(saltedPayload)
        .digest("hex");

    const xVerifyFinal = `${xVerify}###1`;

    return { base64Payload, xVerifyFinal };
};

export async function POST(req) {
    try {
        await connectDB();

        const { userId, amount, plan } = await req.json();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({
                error: "User not found!"
            }, { status: 404 });
        }

        const phonePePayload = generatePhonePePayload(userId, amount, user.contact);

        const response = await axios.post(
            `${process.env.PHONEPE_API}`,
            {
                // "Content-Type": "application/json",
                request: phonePePayload.base64Payload,
                // "x-verify": phonePePayload.xVerifyFinal,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": phonePePayload.xVerifyFinal,
                    // request: phonePePayload.base64Payload,
                    accept: "application/json",
                },
            }
        );

        console.log(response);

        if (response?.data?.success && response?.data?.data?.instrumentResponse) {
            const redirectUrl = response?.data?.data?.instrumentResponse?.redirectInfo?.url;
            const phonePeRes = response?.data;

            return NextResponse.json({ redirectUrl });
        } else {
            return NextResponse.json({
                error: "Payment initiation failed!"
            }, { status: 400 });
        }

    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 });
    }

}