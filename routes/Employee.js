var mongo = require("mongodb").MongoClient;
var dbObj;
var express = require('express');
var employeeRouter = express.Router();


mongo.connect('mongodb://AppUser:wipro@ds062438.mongolab.com:62438/wiproappdb',function(err,db) {
if(err)    {
    res.send("can not connect to db : "+err);
    return ;
}
else
{
   
    dbObj = {db:db,
    employees : db.collection('Users')};
     res.send("Connection with db successful");
     return;
}
})

employeeRouter.get('/',function(req,res)
{
    
   dbObj.employees.find().toArray(function (err,data) {
    if(err)    {
    res.send('Can not connect to table Employee : '+err);
    return;
    }
    else
    {
    data.forEach(function(element) {
      res.send(element);  
    }, this);  
    return;
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
        res.send("cannot connect to single call : "+err);
        return;
    }
    else
    {
       res.send(data);
       return;
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
          res.send("error while inserting : "+err);
          return;
        }
        else
        {
            res.send("insert successful : "+result);   
            return;
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
            res.send("error while updating : "+err);
            return;
        } 
         else
         {
             res.send("update successful : "+result);
             return;
         }
     });
}); 

exports.default = employeeRouter;

