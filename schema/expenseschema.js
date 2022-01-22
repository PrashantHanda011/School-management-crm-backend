import mongoose from "mongoose";

const expenseschema = new mongoose.Schema({
    expenseid: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    itemname: {
      type: String,
      required: true
    },
    itemqty: {
      type: Number,
      required: true
    },
    expenseamt: {
      type: Number,
      required:true
    },
    source: {
      type: String,
      required:true
    },
    dateop: {
      type: Date
    }
})
      
const Expense = mongoose.model("EXPENSE", expenseschema);
  export default Expense;
  