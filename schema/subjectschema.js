import mongoose from "mongoose";

const subjectschema = new mongoose.Schema({
    subid: {
      type: String,
      required: true,
    },
    subname: {
      type: String,
      required: true,
    },
    Class: {
      type: String,
    },
    })
      
  const Subject = mongoose.model("SUBJECT", subjectschema);
  export default Subject;
  