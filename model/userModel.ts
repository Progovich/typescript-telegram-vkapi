import { Schema, model } from "mongoose";

interface User {
  first_name: string,
  id: Number,
  is_bot: string,
  language_code: string,
  last_name: string,
  username: string,
  lastTarget: string,
}

const userScheme = new Schema<User>(
  {
    first_name: String,
    id: Number,
    is_bot: String,
    language_code: String,
    last_name: String,
    username: String,
    lastTarget: { default: '', type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model<User>("User", userScheme);

export default User;
