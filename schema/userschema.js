import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import  Jwt  from "jsonwebtoken";
const postschema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  sid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  admissiondate: {
    type: Date,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  admissionnum: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  simg: {
    type: String,
  },
  fathername: {
    type: String,
    required: true,
  },
  fatheroccupation: {
    type: String,
    
  },
  fatherphone: {
    type: Number,
    
  },
  fatheremail: {
    type: String,

  },
  mothername: {
    type: String,
    required: true,
  },
  motheroccupation: {
    type: String,
    
  },
  motherphone: {
    type: Number,
   
  },
  motheremail: {
    type: String,
    
  },
  address:{
    type:String,
    required:true
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
});

//pasword hash
postschema.pre('save', async function(next){

  if(this.isModified('password')){
    var salt = bcrypt.genSaltSync(12)
    this.password = bcrypt.hashSync(this.password,salt);
    this.cpassword = bcrypt.hashSync(this.cpassword,salt);
  }
  next();
});

//jwt token

postschema.methods.generateAuthToken = async function(){
    try {
      let tokenverify = Jwt.sign({_id:this._id},process.env.SECRET_KEY)
      this.tokens = this.tokens.concat({token:tokenverify});
      await this.save();
      return tokenverify;
    } catch (err) {
      console.log(err)
    }
}

const User = mongoose.model("USER", postschema);
export default User;
