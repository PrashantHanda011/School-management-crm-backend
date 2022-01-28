import mongoose from "mongoose";

const classschema = new mongoose.Schema({
    classid: {
      type: String,
      required: true,
    },
    classn: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true
    },
    classteacher: {
      type: String,
    },
    noofstudent: {
      type: Number
    }
})
      
  const Class = mongoose.model("CLASS", classschema);
  export default Class;
  