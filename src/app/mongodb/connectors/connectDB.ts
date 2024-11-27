'use server'

import * as mongoose from "mongoose";
import mongoURI from "./credentials";

export default async function connectDB() {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Coneceted ...");
    })
    .catch((e) => {
      console.log("Error : ", e);
    });
}
