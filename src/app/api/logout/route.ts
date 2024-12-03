import { exceptionEnums, responseEnums } from "@/app/enums/responseEnums";
import connectDB from "@/app/mongodb/connectors/connectDB";
import userModel from "@/app/mongodb/models/userModel";
import { getTodayDate } from "@/app/utils/appUtils";
import { decodeString } from "@/app/utils/auth/authHandlers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const emailId = decodeString(
    (await cookies()).get("authToken")?.value as never
  );

  if (!emailId) {
    var request = await req.json();
  }

  if (!emailId && !request?.emailId) {
    return NextResponse.json(
      {
        message: exceptionEnums?.BAD_REQUEST,
      },
      {
        status: 401,
      }
    );
  }

  try {
    await connectDB();

    await userModel.updateOne(
      { emailId: emailId ?? request?.emailId },
      {
        $set: {
          lastUpdatedAt: getTodayDate(),
          loggedIn: false,
        },
      }
    );

    return NextResponse?.json({
        message:responseEnums?.SUCCESS
    },{
        status:200
    })
  } catch {
    return NextResponse.json(
      {
        message: exceptionEnums?.SERVER_ERROR,
      },
      {
        status: 500,
      }
    );
  }
}
