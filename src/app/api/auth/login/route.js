import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/database/dbConfig";
import User from "@/database/models/user";

export async function POST(req) {
	try {
		await connectDB();

		const reqBody = await req.json();
		const { email, password } = reqBody;

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ error: "No user found" },
				{ status: 400 }
			);
		}

		const isMatch = await user.matchPassword(password);

		if (!isMatch) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 400 }
			);
		}

		const tokenData = {
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
			expiresIn: "1d",
		});

		const response = NextResponse.json(
			{
				message: "Login successful",
				user: tokenData,
			},
			{ status: 200 }
		);

		response.cookies.set("token", token, {
			httpOnly: true,
		});

		return response;
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
