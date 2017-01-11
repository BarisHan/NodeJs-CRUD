var express = require('express');
var router = express.Router();
var User = require('../models/user');


//Get Homepage
router.get('/', function(req, res){
    if(req.session && req.session.user){
        User.findOne({username: req.session.user.username}, function(err, user){
            if(!user){
                req.session.reset();
                res.redirect('/login');
            }else{
                res.locals.user = user;
                res.render('index');
            }
        });
    }else{
        res.redirect('/login');
    }    
});

module.exports = router;