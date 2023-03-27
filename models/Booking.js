import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
  },
});

export default mongoose.model("Booking", BookingSchema);
