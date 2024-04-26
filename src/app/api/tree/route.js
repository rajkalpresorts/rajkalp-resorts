import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/database/models/user";

const fetchReferrals = async (userId, depth) => {
	const user = await User.findById(userId).lean();

	if (!user) {
		return NextResponse.json(
			{
				error: "User not found!",
			},
			{ status: 404 }
		);
	}

	if (depth === 0 || !user.referrals.length) {
		return {
			name: user.firstName + " " + user.lastName,
			attributes: {
				email: user.email,
				referralId: user.referralId,
			},
			children: [],
		};
	}

	const referrals = await Promise.all(
		user.referrals.map((referralId) =>
			fetchReferrals(referralId, depth - 1)
		)
	);

	return {
		name: user.firstName + " " + user.lastName,
		attributes: {
			email: user.email,
			referralId: user.referralId,
		},
		children: referrals,
	};
};

export async function POST(req) {
	try {
		await connectDB();

		const token = req.cookies.get("token")?.value || null;

		if (!token) {
			return NextResponse.json(
				{
					error: "No access token!",
				},
				{ status: 300 }
			);
		}

		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

		if (decoded.role !== "admin" && decoded.role !== "user") {
			return NextResponse.json(
				{
					error: "Unauthorized access!",
				},
				{ status: 401 }
			);
		}

		const { userId } = await req.json();
		const tree = await fetchReferrals(userId, 4);
		return NextResponse.json(tree, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
