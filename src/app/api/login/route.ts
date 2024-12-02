import { exceptionEnums, responseEnums } from "@/app/enums/responseEnums";
import { handleLoginIMPL } from "@/app/impl/loginImpl";
import connectDB from "@/app/mongodb/connectors/connectDB";
import userModel from "@/app/mongodb/models/userModel";
import { encodeString } from "@/app/utils/auth/authHandlers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    var request = await req?.json();
  } catch {
    return NextResponse.json(
      {
        message: exceptionEnums?.BAD_REQUEST,
      },
      {
        status: 400,
      }
    );
  }
  if (request?.emailId && request?.password) {
    try {
      await connectDB();
    } catch {
      return NextResponse.json({
        message: exceptionEnums?.SERVER_ERROR,
      });
    }

    const { message, status } = await handleLoginIMPL(request);
    const response = NextResponse.json(
      {
        message,
      },
      { status }
    );

    if (request?.otp && message === responseEnums?.SUCCESS) {
      const userData = await userModel.findOne({ emailId: request?.emailId });
      response.cookies.set("authToken", encodeString(request?.emailId));
      response.cookies.set("ca", userData?.ca);
    }
    //response.cookies.set("ca", "", { expires: new Date(0) });

    return response;
  } else {
    return NextResponse.json(
      {
        message: exceptionEnums?.BAD_REQUEST,
      },
      { status: 400 }
    );
  }
}
