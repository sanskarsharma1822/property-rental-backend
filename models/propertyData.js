import mongoose from "mongoose";

const propertyScehema = mongoose.Schema({
  ownerAddress: String,
  contractAddress: String,
  dataURI: String,
  onRent: {
    type: Boolean,
    default: false,
  },
  interestedUsers: {
    type: [String],
    default: [],
  },
  tenantHistory: {
    type: [String],
    default: [],
  },
  rent: Number,
  security: Number,
  images: [String],
  completeLocation: String,
  state: String,
  description: String,
  highlights: String,
  terms: String,
  duration: Number,
});

const PropertyData = mongoose.model("PropertyData", propertyScehema);

export default PropertyData;
