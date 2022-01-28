import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const adminschema = new mongoose.Schema({
    fname: {
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
    }})
    adminschema.pre('save', async function(next){

        if(this.isModified('password')){
          var salt = bcrypt.genSaltSync(12)
          this.password = bcrypt.hashSync(this.password,salt);
          this.cpassword = bcrypt.hashSync(this.cpassword,salt);
        }
        next();
      });
      
  const Admin = mongoose.model("ADMIN", adminschema);
  export default Admin;
  