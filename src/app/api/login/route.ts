import { exceptionEnums } from "@/app/enums/responseEnums";
import { handleLoginIMPL } from "@/app/impl/loginImpl";
import connectDB from "@/app/mongodb/connectors/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = await req.json();
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

    

    return response
  } else {
    return NextResponse.json(
      {
        message: exceptionEnums?.BAD_REQUEST,
      },
      { status: 400 }
    );
  }
}
