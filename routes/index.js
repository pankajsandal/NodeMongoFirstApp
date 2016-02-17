var express = require('express');
var router = express.Router();
var mongo = require("mongodb").MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  mongo.connect('mongodb://AppUser:wipro@ds062438.mongolab.com:62438/wiproappdb',function(err,db) { 
 if(err)    { 
     //res.send("can not connect to db : "+err); 
     res.render('index', { title: ''+err });
 } 
 else 
 { 
    dbObj = {db:db, 
    employees : db.collection('Users')}; 
     //res.send("Connection with db successful"); 
     res.render('index', { title: 'Connection Successful' });
   } 
}); 
  
  res.render('index', { title: 'Express' });
});

module.exports = router;


/*
var mongo = require("mongodb").MongoClient; 
2 var dbObj; 
3 var express = require('express'); 
4 var employeeRouter = express.Router(); 
5 var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI; 
6 
 
7 mongo.connect(connectionString ,function(err,db) { 
8 if(err)    { 
9     res.send("can not connect to db : "+err); 
10     
11 } 
12 else 
13 { 
14     dbObj = {db:db, 
15     employees : db.collection('Users')}; 
16      res.send("Connection with db successful"); 
17     } 
18 }) 




*/
