import Inquiry from "../models/inquiryModel.js";
import sendEmail from "../sendEmail.js";

export const addInquiry = async (req, res) => {
  try {
    const {
      fullName,
      country,
      email,
      numberOfKids,
      numberOfInfant,
      startDate,
      durationOfStay,
      numberOfPersons,
      contactNumber,
      budget,
    } = req.body;

    const newInquiry = new Inquiry({
      fullName,
      country,
      email,
      numberOfKids,
      numberOfInfant,
      startDate,
      durationOfStay,
      numberOfPersons,
      contactNumber,
      budget,
    });

    await newInquiry.save();
    const message = `<p>Dear Admin,</p>

    <p>I hope this message finds you well. I am writing to inquire about booking a tour through your esteemed services. Below are the details for your reference:</p>
    
    <b>Full Name:</b> ${fullName}<br/>
    <b>Contact Number:</b> ${contactNumber}<br />
    <b>Email:</b> ${email}<br />
    <b>Place:</b> ${country}<br />
    <b>Start Date:</b> ${startDate.split('T')[0]}<br />
    <b>Duration of Stay:</b> ${durationOfStay} Days<br />
    <b>Number of Adults (Age 12+):</b> ${numberOfPersons}<br />
    <b>Number of Kids (Age 2-12):</b> ${numberOfKids}<br />
    <b>Number of Infants (Age Upto 2):</b> ${numberOfInfant}<br />
    <b>Budget:</b> Rs ${budget}<br />
    
    <p>I am keenly interested in exploring the options available and would greatly appreciate any information you could provide regarding the tour packages, availability, pricing, and any other relevant details.</p>
    
    <p>Thank you for your time and assistance. I look forward to your prompt response.</p>`;

    try {
      await sendEmail({
        email: "mymjindia@gmail.com",
        subject: `New Inquiry Submitted`,
        message,
      });
    } catch (error) {
      console.log(error);
    }

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiry: newInquiry,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const addSmallInquiry = async (req, res) => {
  try {
    const {
      tourTitle,
      fullName,
      contactNumber,
      
    } = req.body;

    
    const message = `<p>Dear Admin,</p>

    <p>I hope this message finds you well. I am writing to inquire about booking a tour through your esteemed services. Below are the details for your reference:</p>
    
    <b>Tour Name:</b> ${tourTitle}<br/>
    <b>Full Name:</b> ${fullName}<br/>
    <b>Contact Number:</b> ${contactNumber}<br />
    
    <p>I am keenly interested in exploring the options available and would greatly appreciate any information you could provide regarding the tour packages, availability, pricing, and any other relevant details.</p>
    
    <p>Thank you for your time and assistance. I look forward to your prompt response.</p>`;

    try {
      await sendEmail({
        email: "mymjindia@gmail.com",
        subject: `New Inquiry Submitted`,
        message,
      });
    } catch (error) {
      console.log(error);
    }

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
     
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    return res.status(200).json({
      success: true,
      inquiries: inquiries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const recentInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().limit(5);
    return res.status(200).json({
      success: true,
      inquiries: inquiries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
