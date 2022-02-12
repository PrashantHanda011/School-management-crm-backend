import mongoose from "mongoose";

const timetableschema = new mongoose.Schema({
    Class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true
    },
    timetabledocs: {
      type: String
    }
})
      
const Timetable = mongoose.model("Timetable", timetableschema)
export default Timetable;
  