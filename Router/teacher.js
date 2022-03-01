import express from "express";
import "../db/conn.js";
import Class from "../schema/Admin schema/classschema.js";
import Syllabus from "../schema/Admin schema/syllabusschema.js";
import Teacher from "../schema/Admin schema/teacherschema.js";
import Timetable from "../schema/Admin schema/Timetableschema.js";
import Bcrypt from "bcryptjs";
import User from '../schema/Admin schema/studentschema.js'

const router = express.Router();


router.post("/teacherlogin", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(423).json({ alert: "please fill details" });
    }
    try {
      const exist = await Teacher.findOne({ email: email });
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


  // for studentlist
  
  router.post("/teacherdashboard/classlist/studentlist/:id",async (req,res)=>{
    
    try{
      const exist = await Class.findById(req.params.id);
      const Classn = exist.classn;
      const section = exist.section
      const student  = await User.find({Class:Classn,section:section})
      if(student){
        return res.status(200).json({message:"found",student})
      }else{
        return res.status(201).json({message:"not found"})
      }
    }catch(err){
      console.log(err);
    }
  }
  )

  router.post("/teacherdashboard/timetable",async (req,res)=>{
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




  // subject add
  
  router.post("/admindashboard/teacherslist/subjectadd/:id", async (req, res) => {
    try {
      const data = await Teacher.findByIdAndUpdate(req.params.id,{$addToSet: {subjects:req.body } });
      console.log(data)
      return res.status(200).json({message:"updated"});
      } catch (err) {
        console.log(err);
   }
  });

  
  router.get('/admindashboard/teacherslist/subjectlist/:id',async(req,res)=>{
    try{
    const data = await Teacher.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })



  router.delete("/admindashboard/teacherslist/subjectdelete/:id1/:id2", async (req, res) => {
    try {
     await Teacher.findByIdAndUpdate(req.params.id1,{$pull: {"subjects": {"_id" : req.params.id2} } });      
    return res.status(200).json({message:"updated"});
      } catch (err) {
        console.log(err);
   }
  });




  // Attendence


  router.post('/teacherdashboard/attendence/studentlist',async(req,res)=>{
    const { Class,section} = req.body;
    try{
      const exist = await User.find({Class:Class,section:section});
      if(exist){
        return res.status(200).json({message:"found",exist})
      }else{
        return res.status(201).json({message:"not found"})
      }
    }catch(err){
      console.log(err)
    }
  })

  router.post("/teacherdashboard/changepassword/:id", async (req, res) => {
    const { oldpassword, password, cpassword } = req.body;
  
    if (!oldpassword) {
      return res.status(423).json({ alert: "please fill " });
    }
    try {
      const exist = await Teacher.findById(req.params.id);
      if (exist) {
        const match = Bcrypt.compareSync(oldpassword, exist.password);
        if (match) {
          if (password != cpassword) {
            return res.status(425).json({ status: "password not match" });
          } else {
                const salt = Bcrypt.genSaltSync(12);
                  const hash = Bcrypt.hashSync(password, salt);
                   await Teacher.findOneAndUpdate({_id:req.params.id},{ $set: {password:hash}},{new: true})
            
              return res.status(200).json({ status: "success" });
          } 
        }
        
        else {
          return res.status(422).json({ message: "invalid credentials" });
        }
      } else {
        return res.status(422).json({ alert: "login error" });
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.post('/teacherdashboard/studentlist',async(req,res)=>{
    const { Class,section} = req.body;
    try{
      const exist = await User.find({Class:Class,section:section});
      if(exist){
        return res.status(200).json({message:"found",exist})
      }else{
        return res.status(201).json({message:"not found"})
      }
    }catch(err){
      console.log(err)
    }
  })

  
router.post("/teacherdashboard/syllabus", async (req, res) => {
  const { Class, section } = req.body;
  try {
    const exist = await Syllabus.find({ Class: Class, section: section });
    if (exist) {
      return res.status(200).json({ message: "found", exist });
    } else {
      return res.status(201).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});





// attendence

router.post("/teacherdashboard/attendence", async (req, res) => {
let arr = req.body;
  try {
     arr.map(async(element)=>{     
          const updates={attendencestatus:element.attends.attendencestatus,attendencedate:element.attends.attendencedate}
          const exist = await User.findOne({sid:element.attends.sid })
          console.log(exist);
          if( exist){
           exist.attendencelist.map((ele)=>{
             if(ele.attendencedate === updates.attendencedate){
                ele.attendencestatus = updates.attendencestatus
                exist.save();
                return res.status(425).json({message:"exist"})
            }})
          
            exist.attendencelist.push(updates)
            exist.save(); 
          }

     })
    
   return res.status(200).json({message:"updated"})   
    } catch (err) {
      console.log(err);
 }
}
);


export default router;
