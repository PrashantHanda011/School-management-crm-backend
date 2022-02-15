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
    assignmentdocs: {
      type: String
    }
})
      
const Assignment = mongoose.model("Assignment", assignmentschema)
export default Assignment;
  