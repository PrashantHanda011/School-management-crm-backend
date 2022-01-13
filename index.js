import auth from './Router/auth.js'
import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv'
import database from './db/conn.js'
import cookieParser from 'cookie-parser';
import admin from './Router/admin.js'
const app = express();

//for encrypted file
dotenv.config({path:'./config.env'})

app.use(cookieParser());


const origins = {
  domain:[ "http://localhost:3000","https://school-management-sinox.netlify.app"]
}

app.use(cors({origin: origins,
  credentials: true}))

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', origins);
   res.setHeader('Access-Control-Allow-Credentials',true);
   next();
  });

  //for database
database();
// ||
const PORT = process.env.PORT || 8000;
app.use(express.json());

//router

app.use(admin)
app.use(auth)

//listen
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
})