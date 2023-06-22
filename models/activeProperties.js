import mongoose from "mongoose";

const activePropertySchema = mongoose.Schema({
  ownerAddress: String,
  tenantAddress: String,
  dataURI: String,
  startDate: Date,
  endDate: Date,
  dueDates: [Date],
  duration: Number,
  contractAddress: String,
  rent: Number,
  security: Number,
});

const ActiveProperties = mongoose.model(
  "ActiveProperties",
  activePropertySchema
);

export default ActiveProperties;
