import connectDB from "@/database/dbConfig";
import User from "@/database/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		await connectDB();

		const reqBody = await req.json();
		const { firstName, lastName, email, contact, dob, gender } = reqBody;

		if (!firstName || !lastName || !email || !contact || !dob || !gender) {
			return NextResponse.json(
				{
					error: "All fields are required",
				},
				{
					status: 400,
				}
			);
		}

		const user = await User.findOne({ email });

		if (user && user.password) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		if (user && !user.password) {
			await User.deleteOne({ email });
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			contact,
			dob,
			gender,
		});

		await newUser.save();

		const resUser = await User.findOne({ email }).select("-password");

		return NextResponse.json(
			{
				message: "User created successfully",
				user: resUser,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PUT(req) {
	try {
		await connectDB();

		const reqBody = await req.json();
		const { password, confirmPassword, referral } = reqBody;

		const userId = req.nextUrl.searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "User id is required" },
				{ status: 400 }
			);
		}

		if (!password) {
			return NextResponse.json(
				{ error: "Password is required" },
				{ status: 400 }
			);
		}

		if (!confirmPassword) {
			return NextResponse.json(
				{ error: "Confirm Password is required" },
				{ status: 400 }
			);
		}

		if (password !== confirmPassword) {
			return NextResponse.json(
				{ error: "Password and Confirm Password should be same" },
				{ status: 400 }
			);
		}

		const user = await User.findById(userId);

		if (!user) {
			return NextResponse.json(
				{ error: "User does not exist" },
				{ status: 400 }
			);
		}

		if (user.password) {
			return NextResponse.json(
				{ error: "User already has a password" },
				{ status: 400 }
			);
		}

		if (referral) {
			const referredBy = await User.findOne({ referralId: referral });

			if (referredBy) {
				user.referredBy = referredBy._id;
				referredBy.referrals.push(user._id);
				referredBy.markModified("referrals");
				await referredBy.save();
			} else {
				return NextResponse.json(
					{ error: "Invalid referral code" },
					{ status: 400 }
				);
			}
		}

		user.password = password;

		await user.save();

		const resUser = await User.findById(userId).select("-password");

		return NextResponse.json(
			{
				message: "Password created successfully",
				user: resUser,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function GET(req) {
	try {
		await connectDB();

		const userId = req.nextUrl.searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "User id is required" },
				{ status: 400 }
			);
		}

		const user = await User.findById(userId);

		if (!user) {
			return NextResponse.json(
				{ error: "User does not exist" },
				{ status: 400 }
			);
		}

		const referrer = await User.findById(user.referredBy).select(
			"referralId"
		);

		return NextResponse.json(
			{
				user: {
					...user._doc,
					ref: referrer?.referralId,
				},
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
