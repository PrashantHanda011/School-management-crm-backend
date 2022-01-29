import mongoose from "mongoose";

const transportschema = new mongoose.Schema({
    driverid:{
        type:String,
        required:true
    },
    route: {
      type: String
    },
    vehiclenumber: {
      type: String,
      required: true,
    },
    drivername: {
      type: String,
      required:true
    },
    driverlicensenumber: {
      type: String,
      required:true
    },
    driverphonenumber: {
      type: String,
      required: true
    },
    driveraddress: {
      type: String,
    },
    })
      
  const Transport = mongoose.model("TRANSPORT", transportschema);
  export default Transport;
  
  