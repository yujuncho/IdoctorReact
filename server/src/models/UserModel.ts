import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: true
  }
});

const Users = model<User>("User", userSchema);

export default Users;
