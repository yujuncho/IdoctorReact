import express from "express";
import path from "path";
import mongoose from "mongoose";

const app = express();

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

const port = process.env.PORT || 5000;
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@idoctor.kfnfc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("Connected to app");
    });
  })
  .catch(err => {
    console.log(err);
  });
