import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const { username, content, starRating, categorySpecificRatings } = body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        { message: "User is not accepting messages", success: false },
        { status: 403 }
      );
    }

    const newMessage = {
      content,
      starRating,
      categorySpecificRatings,
      createdAt: new Date(),
    };

    console.log("New Message:", newMessage);

    user.messages.push(newMessage as Message);
    await user.save();

    console.log("User after saving message:", user);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
