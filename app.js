const express=require('express');
const app=express();

app.set("view engine",'ejs');

app.get("/",(req,res)=>{
  console.log("Hello world");
  res.render('index');
})

app.listen(3000,()=>{
  console.log("Server is running at port 3000");
})