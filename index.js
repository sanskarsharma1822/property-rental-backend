// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

//Routes
import propertyRoutes from "./routes/property.js";
import activePropertyRoutes from "./routes/activeproperties.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: false }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(cors());

app.use("/property", propertyRoutes);
app.use("/activeproperties", activePropertyRoutes);

// const CONNECTION_URL = process.env.CONNECTION_URL;
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server started at port : ${PORT}`))
  )
  .catch((error) => console.log(error));
