const mongoose = require('mongoose');

function connectToDB() {
  const userModel = new mongoose.connect(process.env.MONGO_URL)
}

module.exports = userModel