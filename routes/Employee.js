var mongo = require("mongodb").MongoClient;
var dbObj;
var express = require('express');
var employeeRouter = express.Router();
//var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;

mongo.connect('mongodb://WiproCampus:Ou3a9mhRfwM06Hj1YY1j2FRjIpEokTCU5UP_wO6hnbY-@ds058548.mongolab.com:58548/WiproCampus',function(err,db) {
if(err)    {
    res.send("can not connect to db : "+err);
   
}
else
{
    dbObj = {db:db,
    employees : db.collection('Users')};
     res.send("Connection with db successful");
    }
})

exports.GetData = function(req,res)
{
    
   dbObj.employees.find().toArray(function (err,data) {
    if(err)    {
    res.send('Can not connect to table Employee : '+err);
    return;
    }
    else
    {
    res.send(data); 
    
    }
});

};



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

