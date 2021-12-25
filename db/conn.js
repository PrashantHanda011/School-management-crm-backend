import mongoose from 'mongoose'

export default async function database(){

const db = process.env.MONGODB_URL;


await mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log('success')})
.catch((err)=>{
    console.log(err)
})
}