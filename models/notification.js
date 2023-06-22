import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  userAddress: String,
  selectedFor: {
    type: [String],
    default: [],
  },
  rentDates: {
    type: [Date],
    default: [],
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
