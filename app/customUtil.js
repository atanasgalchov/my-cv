var nodemailer = require('nodemailer');

let validateForm = function (name,email,subject,message) {

  let errMessage = [];
  let regex;
  let cirilicRegex;
  regex = new RegExp(/^[A-z][-a-zA-Z]+([\s]*[A-z][-a-zA-Z]*)*$/);
   cirilicRegex = new RegExp(/^[А-я][-а-яА-Я]+([\s]*[А-я][-а-яА-Я]*)*$/);
  if(!regex.exec(name) && !cirilicRegex.exec(name)){
    errMessage.push('Please enter valid name');
  }
  regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if(!regex.exec(email)){
    errMessage.push('Please enter valid email');
  }
  regex = new RegExp(/[A-z]+/)
  cirilicRegex = new RegExp(/[А-я]+/)
  if(!regex.exec(subject) && !cirilicRegex.exec(subject)){
    errMessage.push('Please enter valid subject');
  }
  if(!regex.exec(message) && !cirilicRegex.exec(message)){
    errMessage.push('Please enter valid message');
  }

  return errMessage;
}

let getAuth = function () {
  var auth = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'atanasgalchov@gmail.com', // Your email id
      pass: 'panshpa123' // Your password
    }
  });

return auth;
}

module.exports = {validateForm,getAuth}
