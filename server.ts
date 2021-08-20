import express from "express";
import path from "path";
import mongoose from "mongoose";

import userRoutes from "./routes/user-routes";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api/user", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
const DB_LINK = process.env.DB_LINK || "mongodb://localhost/user";
mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("Server listening on port", port);
    });
  })
  .catch(err => {
    console.log(err);
  });
