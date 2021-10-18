const mongoose = require('mongoose');

const CourierSchema = mongoose.Schema({
    kuryeTip: {
        type: String,
        required: true,
    },
    ad: String,
    soyad: String,
    tcKimlikNo: String,
    tcKimlikResim: String,
    email: String,
    telefon: String,
    dogumTarihi: Date,
    calismaDurumu: String,
    sistemeBagliMi: String,
    bankaAdi: String,
    bankaIban: String,
    bankaKullaniciAd: String,
    bankaKullaniciSoyad: String,
    xKonum: String,
    yKonum: String,
    sifreHash: String,
    adminMi: {
        type: Boolean,
        default: false
    },
    aktifMi: {
        type: Boolean,
        default: false
    }  
})

 exports.Courier = mongoose.model('couriers',CourierSchema);