const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/flipkart");  //HERE database is create named as amazon and node js is connected with mongodb by useing mongoose

const userschema = mongoose.Schema({  //here basic structure is create of the user table 
  username: String,
  name: String,
  age: Number
});

module.exports = mongoose.model("user",userschema);  // user is the table or khand name and userschema is schema of the user table

