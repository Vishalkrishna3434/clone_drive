const mongoose=require('mongoose');

const userModel=new mongoose.create({
  username:String,
  email:String,
  password:String
})

module.exports=userModel