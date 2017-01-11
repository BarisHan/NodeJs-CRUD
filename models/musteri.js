var mongoose = require('mongoose');

var MusteriSchema = mongoose.Schema({
    isim : String,
    soyisim: String,
    telefon: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{4}-\d{3}-\d{2}-\d{2}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      }, 
    email: {type: String, unique: true}
});

var Musteri = mongoose.model('musteri', MusteriSchema);

module.exports = Musteri;