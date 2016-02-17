var mongo = require("mongodb").MongoClient;
var dbObj;
var express = require('express');
var employeeRouter = express.Router();


mongo.connect('mongodb://AppUser:wipro@ds062438.mongolab.com:62438/wiproappdb',function(err,db) {
if(err)    {
    console.log("can not connect to db : "+err);
}
else
{
    console.log("Connection with db successful");
    dbObj = {db:db,
    employees : db.collection('Users')};
}
})

employeeRouter.get('/',function(req,res)
{
    
   dbObj.employees.find().toArray(function (err,data) {
    if(err)    {
    console.log('Can not connect to table Employee : '+err);
    }
    else
    {
    data.forEach(function(element) {
      console.log(element);  
    }, this);    
    }
});

});



employeeRouter.get('/:name',function(req,res)
{
   var datacome = req.param("name");
    
    dbObj.employees.findOne({"name":datacome},function(err,data)
    {
      if(err)
    {
        console.log("cannot connect to single call : "+err);
    }
    else
    {
        console.log(data.Dept);
    }  
        
    });     
    
});

employeeRouter.post('/Insert/:name/:Dept/:Role',function(req,err)
{
    var name = req.param("name");
    var Dept = req.param("Dept");
    var role = req.param("Role");
    
    dbObj.employees.insert({"name":name,"Dept":Dept,"Role":role},function(err,result)
    {
        if(err)
        {
           console.log("error while inserting : "+err);
        }
        else
        {
            console.log("insert successful : "+result);            
        }        
    });
});

employeeRouter.put('/Update/:name/:Dept?/:Role?', function(req,res) {
    var name = req.param("name");
    var Dept = req.param("Dept");
    var role = req.param("Role");
     dbObj.employees.update({"name":name},{$set: {"Dept":Dept,"Role":role}},function(err,result)
     {
        if(err)
        {
            console.log("error while updating : "+err);
        } 
         else
         {
             console.log("update successful : "+result);
         }
     });
}); 

exports.default = employeeRouter;

