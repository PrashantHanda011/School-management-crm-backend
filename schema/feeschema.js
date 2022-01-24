import mongoose from "mongoose";

const feeschema = new mongoose.Schema({
    feeid: {
      type: String,
      required: true,
    },
    feetype: {
      type: String,
      required: true,
    },
    Class: {
      type: String,
      required: true
    },
    feeamt: {
      type: Number,
      required: true
    },
    feesdate: {
      type: Date,
      required:true
    },
    feeedate: {
      type: Date,
    }
})
      
const Fee = mongoose.model("FEE", feeschema);
  export default Fee;
  