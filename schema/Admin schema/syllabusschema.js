import mongoose from "mongoose";

const syllabusschema = new mongoose.Schema({
    Class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true
    },
    syllabusdocs: {
      type: String
    }
})
      
const Syllabus = mongoose.model("SYLLABUS", syllabusschema)
export default Syllabus;
  