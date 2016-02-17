var mongo = require("mongodb").MongoClient;
var dbObj;

mongo.connect('mongodb://localhost/MyFirstDB',function(err,db) {
if(err)    {
    console.log("can not connect to db : "+err);
}
else
{
    console.log("Connection with db successful");
    dbObj = {db:db,
    employees : db.collection('Employee')};
}
})

exports.list =  function(req,res)
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
})

}

exports.singleemployee = function(req,res)
{
    var datacome = req.param("name");
    
    dbObj.employees.find({"name":datacome}).toArray(function(err,data)
    {
    if(err)
    {
        console.log("cannot connect to single call : "+err);
    }
    else
    {
        data.forEach(function(element) {
            console.log(element);
        }, this);
    }
    
    });
}
