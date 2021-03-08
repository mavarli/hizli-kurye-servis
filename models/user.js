const mongoose = require('mongoose');

const KullaniciSchema = mongoose.Schema({
    kullaniciTip: String,
    ad: String,
    soyad: String,
    tckimlikNo: Number,
    email: String,
    sifreHash: String,
    telefon: String,
    adminMi: {
        type: Boolean,
        default: false,
    }
})

 exports.User = mongoose.model('users',KullaniciSchema);