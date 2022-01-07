import express from "express";
import "../db/conn.js";
import User from "../schema/userschema.js";
import Bcrypt from "bcryptjs";
const router = express.Router();


router.post("/studentadd", async (req, res) => {
  const {fname,lname,sid,email,password,cpassword,gender,dob,Class,religion,admissiondate,phone,admissionnum,section,simg,fathername,fatheroccupation,fatherphone,fatheremail,mothername,motheroccupation,motherphone,motheremail,address,
  } = req.body;

  if (!fname || !lname ||!sid ||!email ||!password ||!cpassword ||!gender ||!dob ||!Class ||!religion ||!admissiondate ||!phone ||!admissionnum ||!section ||!simg ||!fathername ||!fatheroccupation ||!fatherphone ||!fatheremail ||!mothername ||!motheroccupation ||!motherphone ||!motheremail ||!address) {
    return res.status(422).json({ error: "fill the details" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(423).json({ message: "user exist" });
    } else if (password != cpassword) {
      return res.status(424).json({ message: "Password didn't matched " });
    } else {
      const user = new User({
        fname,
        lname,
        sid,
        email,
        password,
        cpassword,
        gender,
        dob,
        Class,
        religion,
        admissiondate,
        phone,
        admissionnum,
        section,
        simg,
        fathername,
        fatheroccupation,
        fatherphone,
        fatheremail,
        mothername,
        motheroccupation,
        motherphone,
        motheremail,
        address,
      });

      await user.save();

      return res.status(200).json({ message: "succefull registered" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(423).json({ alert: "please fill details" });
  }
  try {
    const exist = await User.findOne({ email: email });
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

router.get("/studentlist", async (req, res) => {
  try {
    const data = await User.find();

    res.send(data) ;
  } catch (err) {
    console.log(err);
  }
});

//admin dashboard 

router.get('/studentedit/:id',async(req,res)=>{
  try{
  const data = await User.findById(req.params.id);

  res.send(data);
  }catch(err){
    console.log(err)
  }
})

 router.put("/studentedit/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
    return res.status(200).json({message:"updated"})   
    } catch (err) {
      console.log(err);
 }
}
);

router.delete("/studentdelete",async (req,res)=>{
  try {
       const data =   await User.findOne(req.body.id);
       console.log(data);
        
        return res.status(200).json({message:"deleted"});    
    
  } catch (err) {
        console.log(err);    
  }
})


export default router;
