import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function GET(request) {
	try {
		const token = request.cookies.get("token")?.value || "";

		if (!token) {
			return NextResponse.json(
				{
					error: "No access token!",
				},
				{ status: 300 }
			);
		}

		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

		const user = {
			id: decoded.id,
			email: decoded.email,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			role: decoded.role,
		};

		return NextResponse.json(
			{
				message: "Token verified",
				user: user,
			},
			{
				status: 200,
				headers: {
					"Cache-Control": "no-store",
				},
			}
		);
	} catch (error) {
		const response = NextResponse.json(
			{ error: error.message },
			{ status: 400 }
		);
		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		return response;
	}
}
