var express = require('express');
var router = express.Router();
const usermodel = require('./users');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/contact', function (req, res) {
  res.send('contact no.');
});

//let enter the value into table
router.get('/creation',async function (req, res) {
    const createduser = await usermodel.create({
      username: "ankush",
      name: "ankushpal",
      age: 19
    });
    res.send(createduser);
  });

router.get('/find', async function(req,res){  
  let find = await usermodel.find();   //.find is basic provide the all the user data which created in db
  res.send(find);
});

router.get('/findone', async function(req,res){  
  let findone = await usermodel.findOne({username:"ankush"});   //.  find only one user details from many 
  console.log(findone);
  res.send(findone);
});

router.get('/delete', async function(req,res){  
  let deleteuser = await usermodel.findOneAndDelete({username:"ankush"});   //.findOneAndDelete is use for delete only one user
  res.send(deleteuser);
})

module.exports = router;
