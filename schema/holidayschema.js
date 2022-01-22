import mongoose from "mongoose";

const holidayschema = new mongoose.Schema({
    holidayid: {
      type: String,
      required: true,
    },
    holidayname: {
      type: String,
      required: true
    },
    holidaytype: {
      type: String,
    },
    sdate: {
      type: Date,
      required: true
    },
    edate: {
      type: Date,
    }
})
      
const Holiday = mongoose.model("HOLIDAY", holidayschema)
export default Holiday;
  