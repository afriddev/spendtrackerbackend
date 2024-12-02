"use server";
import { exceptionEnums } from "@/app/enums/responseEnums";
import handleSignUpIMPL from "@/app/impl/signupImpl";
import connectDB from "@/app/mongodb/connectors/connectDB";
import { userSignUpPayloadType } from "@/app/types/userType";
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

  if (request?.emailId && request?.firstName && request?.password) {
    try {
      await connectDB();
    } catch {
      return NextResponse.json(
        {
          message: exceptionEnums.SERVER_ERROR,
        },
        {
          status: 200,
        }
      );
    }

    const { message, status } = await handleSignUpIMPL(request);

    return NextResponse.json(
      {
        message,
      },
      { status }
    );
  } else {
    return NextResponse.json(
      {
        message: exceptionEnums.BAD_REQUEST,
      },
      { status: 200 }
    );
  }
}
