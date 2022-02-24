import express from "express";
import "../db/conn.js";
import Timetable from '../schema/Admin schema/Timetableschema.js'
import Teacher from "../schema/Admin schema/teacherschema.js";
import Syllabus from "../schema/Admin schema/syllabusschema.js";
import Assignment from "../schema/Admin schema/assignmentschema.js";
import User from "../schema/Admin schema/studentschema.js";
import multer from "multer";
import path from 'path'
const router = express.Router();

//timetable
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if(file.fieldname === "timetabledocs"){
            cb(null, './public/timetable/'); 
        }else if(file.fieldname === "syllabusdocs"){
            cb(null, './public/syllabus/'); 
          }else if(file.fieldname === "assignmentdocs"){
          cb(null, './public/assignment/'); 
        }else if(file.fieldname === "simg"){
          cb(null, './public/student/'); 
        }else if(file.fieldname === "timg"){
          cb(null, './public/teacher/'); 
          
        }
    },
    filename: function(req, file, cb) {   
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage });


//timetable

router.post("/admindashboard/timetableadd",upload.single('timetabledocs'), async (req, res) => {
    const {Class,section} = req.body;
    if (!Class || !section  ){
        return res.status(422).json({ error: "fill the details" });
    }
    const timetabledocs = req.file.filename;

    try {
      const timetableExist = await Timetable.findOne({ Class : Class,section:section });
      if (timetableExist) {
        return res.status(423).json({ message: " already exist" });
      } else {
        const timetable = new Timetable({
          Class,section,timetabledocs
         });
         
        await timetable.save();
        return res.status(200).json({ message: " Added successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/admindashboard/timetablelist", async (req, res) => {
    try {
      const data = await Timetable.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });
  
  router.get('/admindashboard/timetableedit/:id',async(req,res)=>{
    try{
    const data = await Timetable.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })
  
  router.put("/admindashboard/timetableedit/:id",upload.single('timetabledocs'), async (req, res) => {
    const {Class,section}=req.body;
    
    const updates = {Class,section};
   
    if (req.file) {
      const timetabledocs = req.file.filename;
      updates.timetabledocs = timetabledocs;
  }

    try {
      await Timetable.findByIdAndUpdate(req.params.id, {
        $set: updates
      }, {
        new: true
      })
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );
  router.delete("/admindashboard/timetableedit/:id",async (req,res)=>{
    try {
        await Timetable.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })



  //syllabus
  
router.post("/admindashboard/syllabusadd",upload.single('syllabusdocs'), async (req, res) => {
    const {Class,section} = req.body;
    if (!Class || !section  ){
        return res.status(422).json({ error: "fill the details" });
    }

    const syllabusdocs = req.file.filename;

    try {
      const syllabusExist = await Syllabus.findOne({ Class : Class,section:section });
      if (syllabusExist) {
        return res.status(423).json({ message: " already exist" });
      } else {
        const syllabus = new Syllabus({
          Class,section,syllabusdocs
         });
         
        await syllabus.save();
        return res.status(200).json({ message: " Added successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/admindashboard/syllabuslist", async (req, res) => {
    try {
      const data = await Syllabus.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/admindashboard/syllabusedit/:id',async(req,res)=>{
    try{
    const data = await Syllabus.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })
  
  router.put("/admindashboard/syllabusedit/:id",upload.single('syllabusdocs'), async (req, res) => {
    const {Class,section}=req.body;
    
    const updates = {Class,section};
   
    if (req.file) {
      const syllabusdocs = req.file.filename;
      updates.syllabusdocs = syllabusdocs;
  }

    try {
      await Syllabus.findByIdAndUpdate(req.params.id, {
        $set: updates
      }, {
        new: true
      })
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );

  router.delete("/admindashboard/syllabusedit/delete/:id",async (req,res)=>{
    try {
          await Syllabus.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })



// Teacher


router.post("/teacherdashboard/assignmentadd",upload.single('assignmentdocs'), async (req, res) => {
  const {Class,section,tname,subject} = req.body;
  if (!Class || !section  || !subject){
      return res.status(422).json({ error: "fill the details" });
  }

  const assignmentdocs = req.file.filename;

  try {
      const assignment = new Assignment({
        Class,section,assignmentdocs,tname,subject
       });
       
      await assignment.save();
      return res.status(200).json({ message: " Added successfully " });
    } catch (err) {
    console.log(err);
  }
});

router.get("/teacherdashboard/assignmentlist", async (req, res) => {
  try {
    const data = await Assignment.find();
    res.send(data) ;
  } catch (err) {
    console.log(err);
  }
});

router.get('/teacherdashboard/assignmentedit/:id',async(req,res)=>{
  try{
  const data = await Assignment.findById(req.params.id);

  res.send(data);
  }catch(err){
    console.log(err)
  }
})

router.put("/teacherdashboard/assignmentedit/:id",upload.single('assignmentdocs'), async (req, res) => {
  const {Class,section,tname,subject}=req.body;
  
  const updates = {Class,section,tname,subject};
 
  if (req.file) {
    const assignmentdocs = req.file.filename;
    updates.assignmentdocs = assignmentdocs;
}

  try {
    await Assignment.findByIdAndUpdate(req.params.id, {
      $set: updates
    }, {
      new: true
    })
    return res.status(200).json({message:"updated"})   
    } catch (err) {
      console.log(err);
 }
}
);

router.delete("/teacherdashboard/assignmentedit/:id",async (req,res)=>{
  try {
        await Assignment.findByIdAndRemove(req.params.id);
        return res.status(200).json({message:"deleted"});    
    
  } catch (err) {
        console.log(err);    
  }
})




//Students
router.post("/studentadd",upload.single('simg'), async (req, res) => {
  
  const {fname,lname,sid,email,password,cpassword,gender,dob,Class,religion,admissiondate,phone,admissionnum,section,fathername,fatheroccupation,fatherphone,fatheremail,mothername,motheroccupation,motherphone,motheremail,address,totalamount,submitamount,feedate,feestatus} = req.body;
  
  if (!fname || !lname ||!sid ||!email ||!password ||!cpassword || !gender || !dob || !religion || !fathername || !admissionnum || !Class || !section) {
    return res.status(422).json({ error: "fill the details" });
  }  
const studentadd = {fname,lname,sid,email,password,cpassword,gender,dob,Class,religion,admissiondate,phone,admissionnum,section,fathername,fatheroccupation,fatherphone,fatheremail,mothername,motheroccupation,motherphone,motheremail,address,totalamount,submitamount,feedate,feestatus}

  if (req.file) {
    const simg = req.file.filename;
    studentadd.simg = simg;
}

try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(423).json({ message: "user exist" });
    } else if (password != cpassword) {
      return res.status(424).json({ message: "Password didn't matched " });
    } else {
      const user = new User(studentadd);

    await user.save();   
      return res.status(200).json({ message: "succefull registered" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/admindashboard/studentedit/:id',async(req,res)=>{
  try{
  const data = await User.findById(req.params.id);

  res.send(data);
  }catch(err){
    console.log(err)
  }
})


router.put("/admindashboard/studentedit/:id",upload.single('simg'), async (req, res) => {

  const {fname,lname,sid,email,password,cpassword,gender,dob,Class,religion,admissiondate,admissionnum,section,fathername,fatheroccupation,fatheremail,mothername,motheroccupation,motheremail,address,phone,motherphone,fatherphone,} = req.body;


  const updates = {fname,lname,sid,email,password,cpassword,gender,dob,phone,motherphone,
    fatherphone,Class,religion,admissiondate,admissionnum,section,fathername,fatheroccupation,fatheremail,mothername,motheroccupation,motheremail,address};

  if (req.file) {
    const simg = req.file.filename;
    updates.simg = simg;
}

  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: updates
    }, {
      new: true
    })
    return res.status(200).json({message:"updated"})   
    } catch (err) {
      console.log(err);
 }
}
);


//Teacher


router.post("/admindashboard/teacheradd",upload.single('timg'), async (req, res) => {
  const { tid, tname,subject, gender, dob , mobile , joiningdate , qualification , experience , email , password , cpassword,Class ,section, address ,salary,salarydate , salarystatus } = req.body;

  if ( !email|| !tid || !password || !cpassword || !mobile || !joiningdate || !gender || !tname || !Class) {
    return res.status(422).json({ error: "fill the details" });
  }

  const teacheradd = { tid, tname,subject, gender, dob , mobile , joiningdate , qualification , experience , email , password , cpassword,Class ,section, address ,salary,salarydate , salarystatus }

  if (req.file) {
    const timg = req.file.filename;
    teacheradd.timg = timg;
  }

  try {
    const userExist = await Teacher.findOne({ email: email });
    if (userExist) {
      return res.status(423).json({ message: "user exist" });
    } else if (password != cpassword) {
      return res.status(424).json({ message: "Password didn't matched " });
    } else {
      const teacher = new Teacher(teacheradd);

      await teacher.save();
      return res.status(200).json({ message: "succefull registered" });
    }
  } catch (err) {
    console.log(err);
  }
});



router.get("/admindashboard/teacherslist", async (req, res) => {
  try {
    const data = await Teacher.find();
    res.send(data) ;
  } catch (err) {
    console.log(err);
  }
});

router.get('/admindashboard/teacheredit/:id',async(req,res)=>{
  try{
  const data = await Teacher.findById(req.params.id);

  res.send(data);
  }catch(err){
    console.log(err)
  }
})



router.put("/admindashboard/teacheredit/:id",upload.single('timg'), async (req, res) => {

  const { tid, tname,subject, gender, dob , mobile , joiningdate , qualification , experience , email , password , cpassword,Class ,section, address  } = req.body;

  console.log(req.body);
  const updates = { tid, tname,subject, gender, dob , mobile , joiningdate , qualification , experience , email , password , cpassword,Class ,section, address  }


  if (req.file) {
    const timg = req.file.filename;
    updates.timg = timg;

  }

  try {
    await Teacher.findByIdAndUpdate(req.params.id, { $set: req.body }, {
      new: true
    }); //$push $set use toupdate the 
    
    return res.status(200).json({message:"updated"})   
    } catch (err) {
      console.log(err);
 }
}
);




export default router;