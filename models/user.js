const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    kullaniciTip: {
        type: String,
        required: true,
    },
    ad: String,
    soyad: String,
    tcKimlikNo: String,
    tcKimlikResim: String,
    ehliyetResim: String,
    restoranAdi: String,
    kurumAdi: String,
    vergiDairesi: String,
    vergiNo: String,
    email: String,
    telefon: String, 
    dogumTarihi: String,
    bankaAdi: String,
    bankaIban: String,
    bankaKullaniciAd: String,
    bankaKullaniciSoyad: String,
    sifreHash: String,
    xKonum: String,
    yKonum: String,
    calismaDurumu: { //Offline - Online - Calisiyor
        type: String,
        default: 'Offline'
    },
    adminMi: {
        type: Boolean,
        default: false
    },
    aktifMi: {
        type: Boolean,
        default: false
    }  
})

exports.User = mongoose.model('users',UserSchema);