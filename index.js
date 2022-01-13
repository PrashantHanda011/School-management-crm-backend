import auth from './Router/auth.js'
import cors from 'cors'
import express from 'express';
import dotenv, { config } from 'dotenv'
import database from './db/conn.js'
import cookieParser from 'cookie-parser';
import admin from './Router/admin.js'
const app = express();

//for encrypted file
dotenv.config({path:'./config.env'})

app.use(cookieParser());


var allowedDomains = ['http://localhost:3000', 'https://school-management-sinox.netlify.app'];
app.use(cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);
 
    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },credentials: true
}));


app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', allowedDomains);
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