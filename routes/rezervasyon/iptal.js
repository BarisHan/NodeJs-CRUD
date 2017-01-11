var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/adminpanel';
var objectId = require('mongodb').ObjectID;


router.get('/rezervasyon/iptal/:id', function(req,res){
    var id = new objectId(req.params.id);
    mongodb.connect(url, function(err, db){
       var collection = db.collection('rezervasyons');
       collection.findOne({_id: id}, function(err, result){
           res.render('iptal',{
               item: result
           });
       });
   });
});


router.post('/rezervasyon/iptal/:id', function(req, res){
    var id = new objectId(req.params.id);
    mongodb.connect(url, function(err, db){
        db.collection('rezervasyons').deleteOne({"_id": objectId(id)}, function(err, result){
            console.log('Rezervasyon silindi');
            db.close();
            res.redirect('/rezervasyon/listele')
        });
    }); 
});

module.exports = router;