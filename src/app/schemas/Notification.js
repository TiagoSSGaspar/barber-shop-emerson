import mogoose from "mongoose";

const NotificationSchema = new mogoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Number,
    required: true
  },
  read: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamp: true
});

export default mogoose.model("Notification", NotificationSchema);
