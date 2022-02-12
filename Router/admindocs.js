import express from "express";
import "../db/conn.js";
import Timetable from '../schema/Admin schema/Timetableschema.js'
import Syllabus from "../schema/Admin schema/syllabusschema.js";
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

  router.delete("/admindashboard/syllabusedit/:id",async (req,res)=>{
    try {
          await Syllabus.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })



export default router;``