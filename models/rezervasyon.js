var mongoose = require('mongoose');
var Musteri = require('../models/musteri');
var ObjectId = require('mongodb').ObjectId;


var RezervasyonSchema = mongoose.Schema({
    kort : {
        type: String,
        index: true
    },
    saat: {
        type: String
    },
    gun: {
        type: String
    },
    musteri: {type: mongoose.Schema.ObjectId},
    islemVakti: {
        type: Date
    }
   
});

var Rezervasyon = mongoose.model('rezervasyon', RezervasyonSchema);

module.exports = Rezervasyon;