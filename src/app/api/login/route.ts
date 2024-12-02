import { exceptionEnums, responseEnums } from "@/app/enums/responseEnums";
import { handleLoginIMPL } from "@/app/impl/loginImpl";
import connectDB from "@/app/mongodb/connectors/connectDB";
import { encodeEmailId } from "@/app/utils/auth/authHandlers";
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


    if(request?.otp && message === responseEnums?.SUCCESS){
      const response = NextResponse.next()
      response.cookies.set('authToken', encodeEmailId(request?.emailId))
    }




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
