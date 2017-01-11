var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

//Login
router.get('/login', function(req, res){
    res.render('login', { layout: 'layout.jade' });
});

router.post('/login', function(req, res){
    
    User.findOne({username: req.body.username}, function(err, user){
       if(!user){
           res.render('login', {error: 'Kullanıcı adı veya şifre hatalı.'});
       }else{
           if(req.body.password === user.password){
               req.session.user = user;
               res.redirect('/');
           }else{
               res.render('login', {error: 'Kullanıcı adı veya şifre hatalı.'});
           }
       }
        
    });
   
});  
module.exports = router;