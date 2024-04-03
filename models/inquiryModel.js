import mongoose from "mongoose"

const inquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  durationOfStay: {
    type: String,
    required: true
  },
  numberOfPersons: {
    type: Number,
    required: true
  },
  numberOfKids:{
    type: Number,
    required: true
  },
  numberOfInfant:{
    type: Number,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
