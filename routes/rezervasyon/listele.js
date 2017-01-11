var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/adminpanel';

router.get('/rezervasyon/listele', function(req,res){
    
   mongodb.connect(url, function(err, db){
       var collection = db.collection('rezervasyons');
       collection.find({}).toArray(function(err, results){
           res.render('listele',{
               items: results
           });
       });
   });
});

module.exports = router;