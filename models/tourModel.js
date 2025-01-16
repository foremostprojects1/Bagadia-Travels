import mongoose from "mongoose";

const tourModel = new mongoose.Schema({
  title: { type: String, required: [true, "Please provide title"] },
  price: { type: Number, required: true },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  places: [
    {
      type: String,
      required: true,
    },
  ],
  paxData:{},
  country: {
    type: String,
    required: [true, "Please provide country for tour"],
  },
  maxPeople: {
    type: Number,
    required: [true, "Please provide max people for tour"],
  },
  days: {
    type: Number,
    required: [true, "Please provide number of days for tour"],
  },
  nights: {
    type: Number,
    required: [true, "Please provide number of nights for tour"],
  },
  tourDescription: {
    type: String,
    required: [true, "Please provide tour description"],
  },
  included: {
    type: String,
    required: [true, "Please provide included facilities in tour"],
  },

  excluded: {
    type: String,
    required: [true, "Please provide excluded facilities in tour"],
  },

  tourType: {
    type: String,
  },
  tourDepartureDate: {
    type: Date,
    default: null,
  },
  daysDescription: [
    {
      type: String,
    },
  ],
  daysTitles: [
    {
      type: String,
    },
  ],
  transportMode: {
    type: String,
    required: [true, "Please provide mode of transportation"],
  },
  hotelDetails: [
    {
      cityName: {
        type: String,
      },
      hotelName: {
        type: String,
      },
      roomType: {
        type: String,
      },
      checkIn: {
        type: String,
      },
      checkOut: {
        type: String,
      },
    },
  ],
  modeDetails: [
    {
      name: {
        type: String,
      },
      number: {
        type: String,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
      departureTime: {
        type: String,
      },
      arrivalTime: {
        type: String,
      },
    },
  ],
  returnModeDetails: [
    {
      name: {
        type: String,
      },
      number: {
        type: String,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
      departureTime: {
        type: String,
      },
      arrivalTime: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Tour", tourModel);
