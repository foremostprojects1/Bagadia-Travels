import mongoose from "mongoose";

const cabSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: [true, "Please provide source location"],
    },

    destination: {
      type: String,
      required: [true, "Please provide destination location"],
    },

    cars: [
      {
        carName: { type: String, required: [true, "Car details or type is required"] },
        price: { type: Number, required: [true, "Price is required"] },
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Cab", cabSchema);
