import mongoose from "mongoose";

const assignmentschema = new mongoose.Schema({
    Class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true
    },
    tname: {
      type: String,
    },
    subject: {
      type: String,
      required:true
    },
    assignmentdocs: {
      type: String
    }
})
      
const Assignment = mongoose.model("Assignment", assignmentschema)
export default Assignment;
  