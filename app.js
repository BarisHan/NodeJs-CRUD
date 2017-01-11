var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var sessions = require('client-sessions');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/adminpanel');
var db = mongoose.connection;

var routes = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var yeni = require('./routes/rezervasyon/yeni');
var listele = require('./routes/rezervasyon/listele');
var guncelle = require('./routes/rezervasyon/guncelle');
var iptal = require('./routes/rezervasyon/iptal');
//Init App
var app = express();

//View Engine
app.set('views', './views');

//app.engine('jade', jade({defaultLayout: 'layout'}));
app.set('view engine', 'jade');

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(sessions({
    cookieName: 'session',
    secret: 'ashdasd8asd8ayd7asdayshdsha8d',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

//Set Static Folder

app.use(express.static(__dirname, + '/public'));


//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while(namespace.length){
            formparam += '['+ namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//Connect Flash
app.use(flash());

//Global Vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', routes);
app.use('/', login);
app.use('/', logout);
app.use('/', yeni);
app.use('/', listele);
app.use('/', guncelle);
app.use('/', iptal);

//Set Port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'),function(){
    console.log('Server started on port' + app.get('port'));
});