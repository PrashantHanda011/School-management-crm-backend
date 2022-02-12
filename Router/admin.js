import express from "express";
import "../db/conn.js";
import Admin from "../schema/Admin schema/adminschema.js";
import Bcrypt from 'bcryptjs'
import User from '../schema/Admin schema/studentschema.js'
import Subject from "../schema/Admin schema/subjectschema.js";
import Teacher from "../schema/Admin schema/teacherschema.js";
import Class from "../schema/Admin schema/classschema.js";
import Expense from "../schema/Admin schema/expenseschema.js";
import Holiday from "../schema/Admin schema/holidayschema.js";
import Fee from "../schema/Admin schema/feeschema.js";
import Library from "../schema/Admin schema/libraryschema.js";
import Exam from "../schema/Admin schema/examschema.js";
import Transport from "../schema/Admin schema/transportschema.js"
import Timetable from "../schema/Admin schema/Timetableschema.js";
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



  router.get("/adminlist", async (req, res) => {
    try {
      const data = await Admin.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });


  //subject add
  
  router.post("/subjectadd", async (req, res) => {
    const { subid, subname, Class,section } = req.body;
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
          Class,
          section
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
  
  router.delete("/subjectdelete/:id",async (req,res)=>{
    try {
           await Subject.findByIdAndRemove(req.params.id);
         console.log("deleted");
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })
  


//Teacher 


router.post("/admindashboard/teacheradd", async (req, res) => {
    const { tid, tname,subject, gender, dob , mobile , joiningdate , qualification , experience , email , password , cpassword,Class , address ,salary,salarydate , salarystatus } = req.body;

    if ( !email|| !tid || !password || !cpassword || !mobile || !tname) {
      return res.status(422).json({ error: "fill the details" });
    }
    try {
      const userExist = await Teacher.findOne({ email: email });
      if (userExist) {
        return res.status(423).json({ message: "user exist" });
      } else if (password != cpassword) {
        return res.status(424).json({ message: "Password didn't matched " });
      } else {
        const teacher = new Teacher({
          tid, tname,subject, gender, dob , mobile , joiningdate , qualification , experience , email , password , cpassword , address , Class,salary ,salarydate, salarystatus
         });
  
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

  router.put("/admindashboard/teacheredit/:id", async (req, res) => {
    try {
      await Teacher.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );

  router.delete("/admindashboard/teacherdelete/:id",async (req,res)=>{
    try {
        await Teacher.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })

  router.put("/admindashboard/account/addfees", async (req, res) => {
    try {
      const {sid}=req.body;
      const match= await User.findOneAndUpdate({sid:sid},{ $set: req.body })
      if(!match){
        return res.status(201).json({message:"student doesn't exist"})    
      }
      return res.status(200).json({message:"updated"})    

      } catch (err) {
        console.log(err);
   }
  }
  );

  router.put("/admindashboard/account/addsalary", async (req, res) => {
    try {
      const {tid}=req.body;
      const match= await Teacher.findOneAndUpdate({tid:tid},{ $set: req.body })
      if(!match){
        return res.status(201).json({message:"Teacher doesn't exist"})    
      }
      return res.status(200).json({message:"updated"})    

      } catch (err) {
        console.log(err);
   }
  }
  );




  // Expense

router.post("/admindashboard/account/addexpense", async (req, res) => {
  const {expenseid, department,itemname , itemqty , expenseamt , source,dateop } = req.body;
  
  if (!expenseid || !department  || !itemname || !itemqty || !expenseamt || !source || !dateop) {
    return res.status(422).json({ error: "fill the details" });
  }
  try {
    const userExist = await Expense.findOne({ expenseid : expenseid });
    if (userExist) {
      return res.status(423).json({ message: "Expense exist" });
    } else {
      const expense = new Expense({
        expenseid, department,itemname , itemqty , expenseamt , source,dateop 
       });

      await expense.save();
      return res.status(200).json({ message: "Expense Added successfully " });
    }
  } catch (err) {
    console.log(err);
  }
});


router.get("/admindashboard/account/expensecollection", async (req, res) => {
  try {
    const data = await Expense.find();
    res.send(data) ;
  } catch (err) {
    console.log(err);
  }
});

  // Class

  router.post("/admindashboard/classes/classadd", async (req, res) => {
    const {classid, classn,section , classteacher , noofstudent } = req.body;
    
    if (!classid || !classn  || !section) {
      return res.status(422).json({ error: "fill the details" });
    }
    try {
      const userExist = await Class.findOne({ classid : classid });
      if (userExist) {
        return res.status(423).json({ message: "Class exist" });
      } else {
        const nclass = new Class({
          classid, classn,section, classteacher , noofstudent
         });
  
        await nclass.save();
        return res.status(200).json({ message: "Class Added successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  });

  
  router.post("/admindashboard/class/subjectadd/:id", async (req, res) => {
    try {
      const data = await Class.findByIdAndUpdate(req.params.id,{$addToSet: {subjects:req.body } });

      return res.status(200).json({message:"updated"});
      } catch (err) {
        console.log(err);
   }
  });

  router.delete("/admindashboard/class/subjectdelete/:id1/:id2", async (req, res) => {
    try {
     await Class.findByIdAndUpdate(req.params.id1,{$pull: {"subjects": {"_id" : req.params.id2} } });      
    return res.status(200).json({message:"updated"});
      } catch (err) {
        console.log(err);
   }
  });



  router.get("/admindashboard/classes", async (req, res) => {
    try {
      const data = await Class.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });

  router.delete("/admindashboard/classes/classdelete/:id",async (req,res)=>{
    try {
        await Class.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })


  router.get('/admindashboard/classes/classedit/:id',async(req,res)=>{
    try{
    const data = await Class.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })
  
  router.get('/admindashboard/class/subjectlist/:id',async(req,res)=>{
    try{
    const data = await Class.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })

  router.put("/admindashboard/classes/classedit/:id", async (req, res) => {
    try {
      await Class.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );



  // Holiday

  router.post("/admindashboard/holidayadd", async (req, res) => {
    const {holidayid, holidayname,holidaytype , sdate ,  edate } = req.body;
    
    if (!holidayid || !holidayname || !sdate) {
      return res.status(422).json({ error: "fill the details" });
    }
    try {
      const userExist = await Holiday.findOne({ holidayid : holidayid });
      if (userExist) {
        return res.status(423).json({ message: "Class exist" });
      } else {
        const holiday = new Holiday({
          holidayid, holidayname,holidaytype , sdate ,  edate
         });
  
        await holiday.save();
        return res.status(200).json({ message: "Class Added successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/admindashboard/holidaylist", async (req, res) => {
    try {
      const data = await Holiday.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/admindashboard/holidayedit/:id',async(req,res)=>{
    try{
    const data = await Holiday.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })

  router.put("/admindashboard/holidayedit/:id", async (req, res) => {
    try {
      await Holiday.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );
  
  
  router.delete("/admindashboard/holidaydelete/:id",async (req,res)=>{
    try {
        await Holiday.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })


  // fee

  router.post("/admindashboard/feeadd", async (req, res) => {
    const {feeid, feetype,Class , feeamt ,feesdate,  feeedate } = req.body;
    
    if (!feeid || !feetype || !feeamt || !feesdate) {
      return res.status(422).json({ error: "fill the details" });
    }
    try {
      const feeExist = await Fee.findOne({ feeid : feeid });
      if (feeExist) {
        return res.status(423).json({ message: "Fee already exist" });
      } else {
        const fee = new Fee({
          feeid, feetype, Class , feeamt ,  feesdate,feeedate
         });
  
        await fee.save();
        return res.status(200).json({ message: "Fee Added successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/admindashboard/feelist", async (req, res) => {
    try {
      const data = await Fee.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/admindashboard/feeedit/:id',async(req,res)=>{
    try{
    const data = await Fee.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })

  router.put("/admindashboard/feeedit/:id", async (req, res) => {
    try {
      await Fee.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );
  
  
  router.delete("/admindashboard/feedelete/:id",async (req,res)=>{
    try {
        await Fee.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })



  // Library

  router.post("/admindashboard/bookadd", async (req, res) => {
    const {bookid,bookname, booktype,booklang,author,Class ,stock } = req.body;
    
    if (!bookid  || !booklang || !Class || !stock ){
      return res.status(422).json({ error: "fill the details" });
    }
    try {
      const bookExist = await Library.findOne({ bookid : bookid });
      if (bookExist) {
        return res.status(423).json({ message: "book already exist" });
      } else {
        const book = new Library({
          bookid,bookname, booktype,booklang,author,Class,stock
         });
  
        await book.save();
        return res.status(200).json({ message: "book Added successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  });

  
  router.get("/admindashboard/booklist", async (req, res) => {
    try {
      const data = await Library.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });

  router.delete("/admindashboard/bookdelete/:id",async (req,res)=>{
    try {
        await Library.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })

  router.get('/admindashboard/bookedit/:id',async(req,res)=>{
    try{
    const data = await Library.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })

  router.put("/admindashboard/bookedit/:id", async (req, res) => {
    try {
      await Library.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );


  // Exam

  router.post("/admindashboard/examadd", async (req, res) => {
    const {examid,examtype,Class, section,subject,stime,etime ,examdate} = req.body;
    
    if (!examid || !examtype  || !Class || !section || !subject || !stime || !etime || !examdate ){
      return res.status(422).json({ error: "fill the details" });
    }
    try {
      const examExist = await Exam.findOne({ examid : examid });
      if (examExist) {
        return res.status(423).json({ message: "Exam already exist" });
      } else {
        const exam = new Exam({
          examid,examtype,Class, section,subject,stime,etime ,examdate
         });
  
        await exam.save();
        return res.status(200).json({ message: "exam Added successfully " });
      }
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/admindashboard/examlist", async (req, res) => {
    try {
      const data = await Exam.find();
      res.send(data) ;
    } catch (err) {
      console.log(err);
    }
  });


  router.get('/admindashboard/examedit/:id',async(req,res)=>{
    try{
    const data = await Exam.findById(req.params.id);
  
    res.send(data);
    }catch(err){
      console.log(err)
    }
  })

  router.put("/admindashboard/examedit/:id", async (req, res) => {
    try {
      await Exam.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
      return res.status(200).json({message:"updated"})   
      } catch (err) {
        console.log(err);
   }
  }
  );

  
  router.delete("/admindashboard/examdelete/:id",async (req,res)=>{
    try {
        await Exam.findByIdAndRemove(req.params.id);
          return res.status(200).json({message:"deleted"});    
      
    } catch (err) {
          console.log(err);    
    }
  })



// Transport

router.post("/admindashboard/transportadd", async (req, res) => {
  const {driverid,route,vehiclenumber, drivername,driverlicensenumber,driverphonenumber, driveraddress} = req.body;
  
  if (!driverid || !vehiclenumber || !driverlicensenumber|| !driverphonenumber ){
    return res.status(422).json({ error: "fill the details" });
  }
  try {
    const transportExist = await Transport.findOne({ driverid : driverid });
    if (transportExist) {
      return res.status(423).json({ message: "Person already exist" });
    } else {
      const transport = new Transport({
        driverid,route,vehiclenumber, drivername,driverlicensenumber,driverphonenumber, driveraddress
       });

      await transport.save();
      return res.status(200).json({ message: "transport Added successfully " });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/admindashboard/transportlist", async (req, res) => {
  try {
    const data = await Transport.find();
    res.send(data) ;
  } catch (err) {
    console.log(err);
  }
});


router.get('/admindashboard/transportedit/:id',async(req,res)=>{
  try{
  const data = await Transport.findById(req.params.id);
  res.send(data);
  }catch(err){
    console.log(err)
  }
})

router.put("/admindashboard/transportedit/:id", async (req, res) => {
  try {
    await Transport.findByIdAndUpdate(req.params.id, { $set: req.body }); //$push $set use toupdate the 
    return res.status(200).json({message:"updated"})   
    } catch (err) {
      console.log(err);
 }
}
);


router.delete("/admindashboard/transportdelete/:id",async (req,res)=>{
  try {
      await Transport.findByIdAndRemove(req.params.id);
        return res.status(200).json({message:"deleted"});    
    
  } catch (err) {
        console.log(err);    
  }
})



  export default router;