import express from "express";
import "../db/conn.js";
import Admin from "../schema/adminschema.js";
import Bcrypt from 'bcryptjs'
import Subject from "../schema/subjectschema.js";
const router = express.Router();

//Admin Signup

router.post("/adminsignup", async (req, res) => {
  const { fname, email, password, cpassword } = req.body;
  if (!fname || !email || !password || !cpassword ) {
    return res.status(422).json({ error: "fill the details" });
  }
  try {
    const userExist = await Admin.findOne({ email: email });
    if (userExist) {
      return res.status(423).json({ message: "user exist" });
    } else if (password != cpassword) {
      return res.status(424).json({ message: "Password didn't matched " });
    } else {
      const admin = new Admin({
        fname,
        email,
        password,
        cpassword,
       });

      await admin.save();
      return res.status(200).json({ message: "succefull registered" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/adminlogin", async (req, res) => {
    console.log("admin login");
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(423).json({ alert: "please fill details" });
    }
    try {
      const exist = await Admin.findOne({ email: email });
      if (exist) {
        const match = Bcrypt.compareSync(password, exist.password);
        if (match) {
            return res.status(200).json({
                status: 'success',
                tokendata:exist
            });
        } else {
          return res.status(422).json({ message: "invalid credentials" });
        }
      } else {
        return res.status(422).json({ alert: "login error" });
      }
    } catch (err) {
      console.log(err);
    }
  });

  //subject add
  
  router.post("/subjectadd", async (req, res) => {
    const { subid, subname, Class } = req.body;
    if (!subid || !subname ) {
      return res.status(422).json({ error: "fill the details" });
    }
    try {
      const userExist = await Subject.findOne({ subid : subid });
      if (userExist) {
        return res.status(423).json({ message: "Subject exist" });
      } else {
        const subject = new Subject({
          subid,
          subname,
          
          Class
         });
  
        await subject.save();
        return res.status(200).json({ message: "Subject Added successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/subjectlist", async (req, res) => {
    try {
      const data = await Subject.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });
  router.get('/subjectedit/:id',async(req,res)=>{
    try{
    const data = await Subject.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })
  
  router.put("/subjectedit/:id", async (req, res) => {
    try {
      await Subject.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );
  

  export default router;