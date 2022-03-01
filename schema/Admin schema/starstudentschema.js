import mongoose from "mongoose";

const startstudent = new mongoose.Schema({
    sid: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true
    },
    marksobtain: {
      type: Number,
      required: true
    },
    totalmarks: {
      type: Number,
      required: true
    },
    Class: {
      type: String,
      required: true
    },
    percent: {
      type: String,
      required:true
    },
    year: {
      type: String,
    }
})
      
const StarStudent = mongoose.model("STARSTUDENT", startstudent);
  export default StarStudent;
  