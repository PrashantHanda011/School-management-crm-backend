import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const childsubschema = new mongoose.Schema({
  subjectid: {
    type: String
  },
  subjectname: {
    type: String
  }
})

const teacherschema = new mongoose.Schema({
    tid:{
        type:String,
        required:true
    },
    timg:{
        type:String,
    },
    tname: {
      type: String,
      required: true,
    },
    subjects:[childsubschema]
    ,
    section:{
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
      type: String,
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
    salary: {
      type: Number
    },
    salarydate:{
      type:String
    },
    salarystatus: {
      type: Boolean
    },

    })
  
    teacherschema.pre('save', async function(next){

      if(this.isModified('password')){
        var salt = bcrypt.genSaltSync(12)
        this.password = bcrypt.hashSync(this.password,salt);
        this.cpassword = bcrypt.hashSync(this.cpassword,salt);
      }
      next();
    });


  const Teacher = mongoose.model("TEACHER", teacherschema);
  export default Teacher;
  