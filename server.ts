import express from "express";
import path from "path";
import mongoose from "mongoose";

import userRoutes from "./routes/user-routes";
import patientRoutes from "./routes/patient-routes";
import patientImageRoutes from "./routes/patient-image-routes";
import visitsRoutes from "./routes/visits-routes";
import reportsRoutes from "./routes/reports-routes";

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/patient", patientImageRoutes);
app.use("/api/visits", visitsRoutes);
app.use("/api/reports", reportsRoutes);

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "/uploads/images"))
);

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
