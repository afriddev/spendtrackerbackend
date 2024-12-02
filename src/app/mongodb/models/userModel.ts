import mongoose, { models, Schema } from "mongoose";


const userSchema = new Schema({
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

  authToken: {
    type: String,
  },

  otp: {
    type: Number,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
    default: null,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
  emailId: {
    type: String,
    immutable: false,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: false,
    default: null,
  },
  loggedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
  password: {
    type: String,
    required: false,
  },
  ca:{
    type:Boolean,
    required:false,
    default:true
  }
  
},{
  versionKey: false,
});

const userModel = models.users || mongoose.model("users", userSchema);

export default userModel;
