import mongoose, { models, Schema } from "mongoose";

const userAmountsSchema = new Schema({
  emailId: {
    type: String,
    required: true,
    immutable: true,
  },
  lastUpdatedAt: {
    type: String,
    required: false,
    default: null,
  },
  createdAt: {
    type: String,
    required: false,
    default: null,
  },
  monthlyLimitAmount: {
    type: Number,
    default: null,
    required: false,
  },
  spendAmount: {
    type: Number,
    default: null,
    required: false,
  },
  balance: {
    type: Number,
    required: false,
    default: null,
  }
},{
  versionKey: false, 
});


const userAmountsModel = models.usersamounts || mongoose.model("usersamounts",userAmountsSchema) 
export default userAmountsModel