import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from ".././../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Connect MongoDB
    const client = await clientPromise;
    const db = client.db("party");
    const adminCollection = db.collection("Admin");

    // 3️⃣ Find admin
    const admin = await adminCollection.findOne({ email });
    console.log("Found admin:", admin);
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4️⃣ Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
     console.log("isMatch:", isMatch);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 5️⃣ Success
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          email: admin.email,
          role: admin.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
