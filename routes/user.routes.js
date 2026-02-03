const express=require('express');
const router=express.Router();

/* /user/test */

router.get("/test",(req,res)=>{
  res.send("User test route");
})

module.exports=router;