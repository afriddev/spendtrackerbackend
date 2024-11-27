/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  exceptionEnums,
  responseEnums,
  userEnums,
} from "../enums/responseEnums";
import connectDB from "../mongodb/connectors/connectDB";
import userModel from "../mongodb/models/userModel";
import { sendOtp } from "../services/apiServices";
import { userLoginPayloadType } from "../types/userType";
import { getOTP } from "../utils/appUtils";

export async function handleLoginIMPL(
  user: userLoginPayloadType
): Promise<{ status: number; message: any }> {
  try {
    await connectDB();

    const userData = await userModel.findOne({ emailId: user?.emailId });

    if (userData?.emailId) {
      if (user?.otp) {
        if (
          userData?.emailId === user?.emailId &&
          userData?.password === user?.password
        ) {
          if (userData?.otp === user.otp) {
            return { message: responseEnums?.SUCCESS, status: 200 };
          } else {
            return { message: userEnums?.INVALID_OTP, status: 200 };
          }
        } else {
          return { message: userEnums?.INVALID_PASSWORD, status: 200 };
        }
      } else {
        const otp = getOTP();

        try {
          const otpResponse = await sendOtp(user?.emailId, otp, "LOGIN");

          await userModel.updateOne(
            { emailId: user?.emailId },
            {
              $set: {
                otp,
              },
            }
          );
          if (otpResponse === responseEnums?.SUCCESS) {
            return { message: userEnums?.OTP_SUCCESS, status: 200 };
          } else {
            return { message: responseEnums?.ERROR, status: 200 };
          }
        } catch {
          return { message: exceptionEnums?.SERVER_ERROR, status: 500 };
        }
      }
    } else return { message: userEnums?.USER_NOT_FOUND, status: 200 };
  } catch {
    return { message: exceptionEnums?.SERVER_ERROR, status: 500 };
  }
}
