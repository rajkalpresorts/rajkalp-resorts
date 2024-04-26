import connectDB from "@/database/dbConfig";
import User from "@/database/models/user";

export async function GET(req) {
    try {
        await connectDB();

        const userId = req.nextUrl.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({
                error: "No user ID!"
            }, { status: 400 });
        }

        const token = req.cookies.get('token')?.value || null;

        if (!token) {
            return NextResponse.json({
                error: "No access token!"
            }, { status: 300 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        if (decoded.role !== 'admin' && decoded.id !== userId) {
            return NextResponse.json({
                error: "Unauthorized access!"
            }, { status: 401 });
        }

        const user = await User
            .findById(userId)
            .select('-password');

        if (!user) {
            return NextResponse.json({
                error: "User not found!"
            }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}