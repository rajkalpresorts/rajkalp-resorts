import { NextResponse } from "next/server";

export function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                user: null,
            }
        )

        response.cookies.set("token", "",
            {
                httpOnly: true,
                expires: new Date(0)
            });

        response.headers.set("Cache-Control", "no-store, max-age=0");

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
