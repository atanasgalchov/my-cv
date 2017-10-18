const mongoose = require('mongoose')
let conectionString = "mongodb://localhost:27017/myweb";
module.exports = mongoose.connect(conectionString);

