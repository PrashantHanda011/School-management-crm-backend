import mongoose from "mongoose";
const childsubschema = new mongoose.Schema({
  subjectid: {
    type: String
  },
  subjectname: {
    type: String
  }
})





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
    },
    subjects:[childsubschema]
    
})
//this.subjects = this.subjects.concat({subject:newsubject})  



  const Class = mongoose.model("CLASS", classschema);
  export default Class;
  