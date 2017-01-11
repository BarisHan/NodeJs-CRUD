var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/adminpanel';
var objectId = require('mongodb').ObjectID;


router.get('/rezervasyon/guncelle/:id', function(req,res){
    var id = new objectId(req.params.id);
    mongodb.connect(url, function(err, db){
       var collection = db.collection('rezervasyons');
       collection.findOne({_id: id}, function(err, result){
           res.render('guncelle',{
               item: result
           });
       });
   });
});

router.post('/rezervasyon/guncelle/:id', function(req, res){
    var item = {
        kort: req.body.kort,
        saat: req.body.saat,
        gun: req.body.gun,
        islemVakti: new Date().toJSON()
    };
    var id = new objectId(req.params.id);
    mongodb.connect(url, function(err, db){
        db.collection('rezervasyons').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){
            console.log('Rezervasyon güncellendi');
            db.close();
            res.redirect('/rezervasyon/listele')
        });
    }); 
});

module.exports = router;