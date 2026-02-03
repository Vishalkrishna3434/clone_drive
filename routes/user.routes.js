const express=require('express');
const router=express.Router();

/* /user/test */

router.get("/test",(req,res)=>{
  res.render('register');
})

module.exports=router;