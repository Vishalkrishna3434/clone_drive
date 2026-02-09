const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');

/* /user/register */

router.get("/register", (req, res) => {
  res.render('register');
})

router.post("/register",
  body('email').trim().isEmail(),
  body('password').trim().isLength({ min: 5 }),
  body('username').trim().isLength({ min: 3 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data"
      });
    }
    const { username, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedpassword
    })

    res.json(newUser);

  })

router.get("/login",(req,res)=>{
  res.render('login');
})

router.post("/login",(req,res)=>{
  res.render('login');
})

module.exports = router;