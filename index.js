import express from 'express';
import dotenv from 'dotenv'
import database from './db/conn.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import auth from './Router/auth.js'
const app = express();

//for encrypted file
dotenv.config({path:'./config.env'})

app.use(cookieParser());

 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'https://school-management-sinox.netlify.app');
   res.setHeader('Access-Control-Allow-Credentials',true);
   next();
 });

//for database
database();
app.use(cors({ origin: 'https://school-management-sinox.netlify.app',
credentials: true,
exposedHeaders: ["set-cookie"]}))
// ||
const PORT = process.env.PORT || 8000;
app.use(express.json());

//router
app.use(auth)

//listen
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
})