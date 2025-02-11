import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const user = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const userData = {
      userId: user.username,
      username: user.username,
      email: user.email,
      productname: user.productname,
      productcategories: user.productcategories,
      productdetails: user.productdetails,
    };

    return Response.json({ success: true, userData });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return Response.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
