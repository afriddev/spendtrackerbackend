import { exceptionEnums, responseEnums, userEnums } from "@/app/enums/responseEnums";
import configureAmountsImpl from "@/app/impl/configureAmountsImpl";
import { decodeString } from "@/app/utils/auth/authHandlers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  
  try{
    var request = await req?.json();

  }
  catch{
    return NextResponse.json({
        message:exceptionEnums?.BAD_REQUEST
    },{
        status:400
    })

  }



  const emailId = decodeString(
    (await cookies()).get("authToken")?.value as never
  );


  if(!emailId || (!parseInt(request?.monthlyAmount) && parseInt(request?.monthlyAmount) !== 0  ) ){
    return NextResponse.json({
        message:emailId?responseEnums?.ERROR:userEnums?.INVALID_USER
    },{
        status:emailId?400:401
    })

  }
  else if(parseInt(request?.monthlyAmount) < 1000){
    return NextResponse.json(
        {
            message:userEnums?.INVALID_AMOUNT
        },{
            status:422
        }
    )
  }
  else{
    const { message, status } = await configureAmountsImpl({
        ...request,
        emailId,
      });
    
      return NextResponse.json({
        message
      },{
        status
      });

  }

  

 
}
