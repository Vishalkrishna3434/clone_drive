const express=require('express');
const userRoute=require('./routes/user.routes')
const app=express();

app.set("view engine",'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  console.log("Hello world");
  res.render('index');
})

app.use('/user',userRoute);

app.listen(3000,()=>{
  console.log("Server is running at port 3000");
})