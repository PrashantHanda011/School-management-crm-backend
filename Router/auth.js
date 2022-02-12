import express from "express";
import "../db/conn.js";
import Bcrypt from "bcryptjs";
import User from '../schema/Admin schema/studentschema.js'
import ClassSchema from "../schema/Admin schema/classschema.js";
import Exam from "../schema/Admin schema/examschema.js";
import Fee from "../schema/Admin schema/feeschema.js";
import Timetable from "../schema/Admin schema/Timetableschema.js";
const router = express.Router();

router.post("/studentadd", async (req, res) => {
  const {fname,lname,sid,email,password,cpassword,gender,dob,Class,religion,admissiondate,phone,admissionnum,section,simg,fathername,fatheroccupation,fatherphone,fatheremail,mothername,motheroccupation,motherphone,motheremail,address,totalamount,submitamount,feedate,feestatus} = req.body;
  if (!fname || !lname ||!sid ||!email ||!password ||!cpassword ||!gender ||!dob ||!Class ||!admissiondate ||!phone ||!admissionnum ||!section ||!fathername ) {
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
        totalamount,
        submitamount,
        feedate,
        feestatus
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

router.delete("/studentdelete/:id",async (req,res)=>{
  try {
      await User.findByIdAndRemove(req.params.id);
        return res.status(200).json({message:"deleted"});    
  } catch (err) {
        console.log(err);    
  }
})




router.post("/studentdashboard/subjectlist",async (req,res)=>{
  const { Class,section}=req.body;
  try{
    const exist = await ClassSchema.findOne({classn:Class,section:section});
    if(exist){
      return res.status(200).json({message:"found",data:exist})
    }else{
      return res.status(201).json({message:"not found"})
    }
  }catch(err){
    console.log(err);
  }
}
)


router.post("/studentdashboard/examlist",async (req,res)=>{
  const { Class,section}=req.body;
  try{
    const exist = await Exam.find({classn:Class,section:section});
    if(exist){
      return res.status(200).json({message:"found",data:exist})
    }else{
      return res.status(201).json({message:"not found"})
    }
  }catch(err){
    console.log(err);
  }
}
)

router.post("/studentdashboard/feelist",async (req,res)=>{
  const { Class}=req.body;
  try{
    const exist = await Fee.find({Class:Class});
    if(exist){
  
      return res.status(200).json({message:"found",exist})
    }else{
      return res.status(201).json({message:"not found"})
    }
  }catch(err){
    console.log(err);
  }
}
)

router.post("/studentdashboard/feelist/student",async (req,res)=>{
  const { sid}=req.body;
  try{
    const exist = await User.findOne({sid:sid});
    if(exist){
  

      return res.status(200).json({message:"found",exist})
    }else{
      return res.status(201).json({message:"not found"})
    }
  }catch(err){
    console.log(err);
  }
}
)


router.post("/studentdashboard/timetable",async (req,res)=>{
  const { Class,section}=req.body;
  try{
    const exist = await Timetable.find({Class:Class,section:section});
    if(exist){
      return res.status(200).json({message:"found",exist})
    }else{
      return res.status(201).json({message:"not found"})
    }
  }catch(err){
    console.log(err);
  }
}
)

export default router;
