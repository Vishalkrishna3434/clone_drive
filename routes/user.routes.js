const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

router.get("/login", (req, res) => {
  res.render('login');
})

router.post("/login",
  body('username').trim().isLength({ min: 3 }),
  body('password').trim().isLength({ min: 5 })
  , async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: "Invalid Data"
      })
    }
    const { username, password } = req.body;

    const user = await userModel.findOne({
      username: username
    })

    if (!user) {
      return res.status(400).json({
        message: "Username or password is incorrect"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Username or password is incorrect"
      })
    }

    /*jsonwebtoken*/
    const token = jwt.sign({
      userId: user._id,
      email: user.email,
      username: user.username
    }, process.env.JWT_SECRET)

    res.cookie('token',token);

    res.send('Logged In');

  })

module.exports = router;