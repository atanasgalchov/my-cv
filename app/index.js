let express = require('express');
let port = 5000;
let bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
let util = require('./customUtil');
require('./config/db');
let app = express();
let isSend = false;
let errMessage = [];
app.engine('handlebars',exphbs());

app.use('/public',express.static('public'));

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','handlebars');
app.set('views','views')


app.get('/home',(req,res)=>{
  res.status(200);
  res.render('index.handlebars');

})
app.post('/sendmessage',(req,res)=>{

    errMessage = util.validateForm(req.body.name,req.body.email,req.body.subject,req.body.message);
    if(errMessage.length === 0){

      let auth = util.getAuth();
      var mailOptions = {
        from: `${req.body.email}`, // sender address
        to: 'atanasgalchov@gmail.com', // list of receivers
        subject: `${req.body.subject}`, // Subject line
        text: `${req.body.message}` //, // plaintext body
      };
      auth.sendMail(mailOptions,(err,info)=>{
        if(err){
          console.log(err)
        }
      })
      isSend = true;
      res.redirect('/')
      return;
    }else{
      res.redirect('/')
    }



})

app.get('/',(req,res)=>{
  res.status(200);
  if(isSend){
    res.render('index.handlebars',{isSend:true})
    isSend = false;
    return;
  }
 if(errMessage.length > 0){
   res.render('index.handlebars',{messages:errMessage})
   errMessage = [];
   return;
 }

  else{
   res.render('index.handlebars');

 }

})

app.get('*',(req,res)=>{


  res.render('404.handlebars');

})

app.listen(port,()=> console.log(`Server listening on ${port}`))
