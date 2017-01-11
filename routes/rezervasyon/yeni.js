var express = require('express');
var router = express.Router();
var Rezervasyon = require('../../models/rezervasyon');
var bodyParser = require('body-parser');
var Musteri = require('../../models/musteri');

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/rezervasyon/yeni', function(req,res){
   res.render('yeni');
});

router.post('/rezervasyon/yeni', function(req,res){
    var yeniRezervasyon = new Rezervasyon({
        kort: req.body.kort,
        saat: req.body.saat,
        gun: req.body.gun,
        islemVakti: new Date().toJSON()
    });
    yeniRezervasyon.save(function(err){
        if(err){
            var err = 'Something bad happened!';
            if(err.code === 11000){
                error = 'Bu rezervasyon alındı.';
            }
            res.render('yeni.jade', {error : error});
        }else{
            res.redirect('/rezervasyon/listele');
        }
    });
});

module.exports = router;