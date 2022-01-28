import mongoose from "mongoose";

const libraryschema = new mongoose.Schema({
    bookid: {
      type: String,
      required: true,
    },
    bookname: {
      type: String,
      required: true,
    },
    booktype: {
      type: String,
    },
    booklang: {
      type: String,
      required: true,
    },
    author : {
      type: String,
    },
    Class : {
      type: String,
      required: true
    },
    stock: {
      type: String,
      required:true
    }
})
      
const Library = mongoose.model("LIBRARY", libraryschema);
export default Library;
  