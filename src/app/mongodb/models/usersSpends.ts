import mongoose, { models, Schema } from "mongoose";

const spendSchema = new Schema({
  createdAt: {
    type: String,
  },
  lastUpdatedAt: {
    type: String,
    required: false,
    default: null,
  },
  id: String,
  spendType: {
    type: String,
    required: false,
    default: null,
  },
  amount: {
    type: Number,
  },
  response: {
    type: String,
    required: false,
  },
},{
  versionKey: false,
});

const userSpendsSchema = new Schema({
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
  todaySpends: {
    type: [spendSchema],
    required: false,
    default: [],
  },
  dailySpends: {
    type: [spendSchema],
    required: false,
    default: [],
  },
  monthlySpends: {
    type: [spendSchema],
    required: false,
    default: [],
  },
},{
  versionKey: false,
});

const userSpendsModel =
  models.usersspends || mongoose.model("usersspends", userSpendsSchema);

export default userSpendsModel;
