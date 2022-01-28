import express from "express";
import "../db/conn.js";
import Teacher from "../schema/Admin schema/teacherschema.js";
import Bcrypt from "bcryptjs";
import User from '../schema/Admin schema/studentschema.js'

const router = express.Router();


router.post("/teacherdashboard/login", async (req, res) => {
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



export default router;
