import mongoose from "mongoose";

const examschema = new mongoose.Schema({
    examid: {
      type: String,
      required: true,
    },
    examtype: {
      type: String,
      required: true,
    },
    Class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    stime: {
      type: String,
      required:true
    },
    etime: {
      type: String,
      required:true,
    },
    examdate: {
      type: Date,
      required:true
    }
})
      
const Exam = mongoose.model("EXAM", examschema);
  export default Exam;
  