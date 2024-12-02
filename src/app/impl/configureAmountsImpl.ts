import { responseEnums, userEnums } from "../enums/responseEnums";
import connectDB from "../mongodb/connectors/connectDB";
import userAmountsModel from "../mongodb/models/userAmounts";
import userModel from "../mongodb/models/userModel";
import { configureAmountsPayloadType } from "../types/userType";
import { getTodayDate } from "../utils/appUtils";

async function configureAmountsImpl(
  user: configureAmountsPayloadType
): Promise<{ message: string; status: number }> {
  try {
    await connectDB();


    const userData = await userModel.findOne({ emailId: user?.emailId });

    if(userData?.loggedIn){
        await userAmountsModel.updateOne(
            { emailId: user?.emailId },
            {
              $set: {
                monthlyLimitAmount: parseInt(
                  user?.monthlyAmount as unknown as string
                ),
                spendAmount: 0,
                balance: parseInt(user?.monthlyAmount as unknown as string),
                lastUpdatedAt: getTodayDate(),
              },
            }
          );
          await userModel.updateOne({
              emailId:user?.emailId
          },{
              $set:{
                  lastUpdatedAt: getTodayDate(),
                  ca:false
      
              }
          })
      
          return { message: responseEnums?.SUCCESS, status: 200 };

    }
    else{
        return {message:userEnums?.INVALID_USER,status:401}
    }



    
  } catch {
    return { message: responseEnums?.ERROR, status: 500 };
  }
}

export default configureAmountsImpl;
