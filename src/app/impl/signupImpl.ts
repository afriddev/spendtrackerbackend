/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  responseEnums,
  userEnums,
} from "../enums/responseEnums";
import connectDB from "../mongodb/connectors/connectDB";
import tempUsersModel from "../mongodb/models/tempUsersModel";
import userAmountsModel from "../mongodb/models/userAmounts";
import userModel from "../mongodb/models/userModel";
import userSpendsModel from "../mongodb/models/usersSpends";
import { sendOtp } from "../services/apiServices";
import { userSignUpPayloadType } from "../types/userType";
import { getOTP, getTodayDate } from "../utils/appUtils";
import { encodeString } from "../utils/auth/authHandlers";

async function handleSignUpIMPL(
  user: userSignUpPayloadType
): Promise<{ status: number; message: any }> {
  await connectDB();
  const findedUserData = await userModel.findOne({ emailId: user?.emailId });
  if (findedUserData?.emailId) {
    return {
      status: 200,
      message: userEnums.USER_EXISTS,
    };
  }

  const defualtUserData = await tempUsersModel.findOne({
    emailId: user?.emailId,
  });

  if (!defualtUserData?.emailId) {
    const otp = getOTP();
    const otpResponse = await sendOtp(user.emailId, otp, "SIGNUP");
    if (otpResponse === responseEnums?.SUCCESS) {
      await tempUsersModel.create({
        emailId: user?.emailId,
        otp,
      });

      return { status: 200, message: responseEnums.SUCCESS };
    } else {
      return { status: 200, message: responseEnums.ERROR };
    }
  } else {
    if (user?.otp) {
      if (defualtUserData?.otp.toString() === user?.otp.toString()) {
        await connectDB();
        const userData = await userModel.create({
          emailId: user?.emailId,
          firstName: user?.firstName,
          lastName: user.lastName ?? "",
          loggedIn: false,
          phoneNumber: user.phoneNumber,
          authToken: user?.authToken,
          password: encodeString(user?.password),
          ca:true,
          createdAt:getTodayDate(),
          lastUpdatedAt:getTodayDate()

        });
        const userAmountData = await userAmountsModel.create({
          emailId: user?.emailId,
          createdAt:getTodayDate(),
          lastUpdatedAt:getTodayDate()
        });

        const userSpendsData = await userSpendsModel.create({
          emailId: user?.emailId,
          createdAt:getTodayDate(),
          lastUpdatedAt:getTodayDate()
        });

        if (
          userData?.emailId &&
          userSpendsData?.emailId &&
          userAmountData?.emailId
        ) {
          await tempUsersModel.deleteMany({
            emailId: user?.emailId,
          });
          return { status: 201, message: responseEnums?.SUCCESS };
        } else return { status: 200, message: responseEnums.ERROR };
      } else {
        return { status: 200, message: userEnums?.INVALID_OTP };
      }
    } else {
      const otp = getOTP();
      const otpResponse = await sendOtp(user.emailId, otp, "SIGNUP");
      if (otpResponse === responseEnums?.SUCCESS) {
        try {
          await tempUsersModel?.updateOne(
            { emailId: user?.emailId },
            {
              $set: {
                otp,
              },
            }
          );
        } catch {
          return { status: 200, message: userEnums?.OTP_SUCCESS };
        }

        return { status: 200, message: responseEnums.SUCCESS };
      } else {
        return { status: 200, message: responseEnums.ERROR };
      }
    }
  }
}

export default handleSignUpIMPL;
