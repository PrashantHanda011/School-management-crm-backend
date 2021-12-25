import express from 'express';
import dotenv from 'dotenv'
import database from './db/conn.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import auth from './Router/auth.js'
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//for encrypted file
dotenv.config({path:'./config.env'})


//for database
database();
app.use(cors())
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use(cookieParser());
//router
app.use(auth)

//listen
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
})