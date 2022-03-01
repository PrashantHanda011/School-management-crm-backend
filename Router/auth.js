import express from "express";
import "../db/conn.js";
import Bcrypt from "bcryptjs";
import User from "../schema/Admin schema/studentschema.js";
import ClassSchema from "../schema/Admin schema/classschema.js";
import Exam from "../schema/Admin schema/examschema.js";
import Fee from "../schema/Admin schema/feeschema.js";
import Timetable from "../schema/Admin schema/Timetableschema.js";
import Assignment from "../schema/Admin schema/assignmentschema.js";
import Syllabus from "../schema/Admin schema/syllabusschema.js";
const router = express.Router();

//login route

router.post("/studentlogin", async (req, res) => {
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
          status: "success",
          tokendata: exist,
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

    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

//admin dashboard

router.put("/studentedit/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the
    return res.status(200).json({ message: "updated" });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/studentdelete/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    return res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/studentdashboard/subjectlist", async (req, res) => {
  const { Class, section } = req.body;
  try {
    const exist = await ClassSchema.findOne({
      classn: Class,
      section: section,
    });
    if (exist) {
      return res.status(200).json({ message: "found", data: exist });
    } else {
      return res.status(201).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/studentdashboard/examlist", async (req, res) => {
  const { Class, section } = req.body;
  try {
    const exist = await Exam.find({ classn: Class, section: section });
    if (exist) {
      return res.status(200).json({ message: "found", data: exist });
    } else {
      return res.status(201).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/studentdashboard/feelist", async (req, res) => {
  const { Class } = req.body;
  try {
    const exist = await Fee.find({ Class: Class });
    if (exist) {
      return res.status(200).json({ message: "found", exist });
    } else {
      return res.status(201).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/studentdashboard/feelist/student", async (req, res) => {
  const { sid } = req.body;
  try {
    const exist = await User.findOne({ sid: sid });
    if (exist) {
      return res.status(200).json({ message: "found", exist });
    } else {
      return res.status(201).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/studentdashboard/timetable", async (req, res) => {
  const { Class, section } = req.body;
  try {
    const exist = await Timetable.find({ Class: Class, section: section });
    if (exist) {
      return res.status(200).json({ message: "found", exist });
    } else {
      return res.status(201).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/studentdashboard/syllabus", async (req, res) => {
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

router.post("/teacherdashboard/assignment", async (req, res) => {
  const { Class, section } = req.body;
  try {
    const exist = await Assignment.find({ Class: Class, section: section });
    if (exist) {
      return res.status(200).json({ message: "found", exist });
    } else {
      return res.status(201).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/studentdashboard/changepassword/:id", async (req, res) => {
  const { oldpassword, password, cpassword } = req.body;

  if (!oldpassword) {
    return res.status(423).json({ alert: "please fill " });
  }
  try {
    const exist = await User.findById(req.params.id);
    if (exist) {
      const match = Bcrypt.compareSync(oldpassword, exist.password);
      if (match) {
        if (password != cpassword) {
          return res.status(425).json({ status: "password not match" });
        } else {
              const salt = Bcrypt.genSaltSync(12);
                const hash = Bcrypt.hashSync(password, salt);
            const respo = await User.findOneAndUpdate({_id:req.params.id},{ $set: {password:hash}},{new: true})
          
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



router.post("/studentdashboard/attendence", async (req, res) => {
  const { id,dateval  } = req.body;
  console.log(req.body);
  try {
      const exist = await User.findById({_id:id})
      if(exist){
        exist.attendencelist.map((ele)=>{
          if(ele.attendencedate === dateval){
            return res.status(200).json({message:"found",ele})
          }else{
            return res.status(417).json({message:"not found"})
          }  
        })
      }
    } catch (err) {
    console.log(err);
  }
});


export default router;
