const mongoose = require('mongoose');

function connectToDB() {
  new mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to DB');
  })
}

module.exports = connectToDB;