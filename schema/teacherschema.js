import mongoose from "mongoose";

const teacherschema = new mongoose.Schema({
    tid:{
        type:String,
        required:true
    },
    tname: {
      type: String,
      required: true,
    },
    subject:{
        type:String
    },
    Class:{
        type:String
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    joiningdate: {
      type: String,
    },
    qualification: {
      type: String,
    },
    experience: {
      type: String,
    },
    email: {
      type: String,
      required:true
    },
    password: {
      type: String,
      required:true
    },
    cpassword: {
      type: String,
      required:true
    },
    address: {
      type: String
    },

    })
      
  const Teacher = mongoose.model("TEACHER", teacherschema);
  export default Teacher;
  