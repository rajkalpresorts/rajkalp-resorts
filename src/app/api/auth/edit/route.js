import connectDB from "@/database/dbConfig";
import User from "@/database/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value || null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const {
      firstName,
      lastName,
      email,
      address,
      contact,
      city,
      state,
      password,
    } = await req.json();

    const user = await User.findById(decoded?.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (firstName && firstName.length > 0) user.firstName = firstName;
    if (lastName && lastName.length > 0) user.lastName = lastName;
    if (email && email.length > 0) user.email = email;
    if (password && password.length > 0) user.password = password;
    if (contact && contact.length > 0) user.contact = contact;
    if (city && city.length > 0) user.city = city;
    if (state && state.length > 0) user.state = state;
    if (address && address.length > 0) user.address = address;

    await user.save();

    const updatedUser = await User.findById(decoded?.id).select("-password");

    return NextResponse.json(
      { user: updatedUser, message: "User update successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
