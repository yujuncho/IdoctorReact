import { connect } from "mongoose";
import Users from "../models/UserModel";

connect("mongodb://localhost/user", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

let userSeed = [
  {
    email: "test@domain.com",
    password: "1234567"
  },
  {
    email: "test2@domain.com",
    password: "1234567"
  }
];

Users.deleteMany({})
  .then(() => Users.insertMany(userSeed))
  .then(data => {
    console.log(data + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
