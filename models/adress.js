const mongoose = require('mongoose');

const AdressSchema = mongoose.Schema({
    kullaniciId: {
        type: String,
        required: true,
    },
    il: String,
    ilce: String,
    mahalle: String,
    cadde: String,
    sokak: String,
    bina: String,
    kat: String,
    daire: String,
    acikTarif: String,
    adresBaslik: String,
    xKonum: String,
    yKonum: String,
    aktifMi: {
        type: Boolean,
        default: true
    }
})

exports.Adress = mongoose.model('adresses',AdressSchema);