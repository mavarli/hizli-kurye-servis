const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    siparisId: String,
    kuryeId: String,
    siparisTipi: String,
    siparisTarihi: String,
    teslimTarihi: String,
    uzaklik: String,
    fiyat: String,
    siparisDurumu: String, //TalepOlustu-IptalEdildi-MusteriyeGidiyor-AliciyaGidiyor-TeslimEdildi

    gondericiId: String,
    gondericiAd: String,
    gondericiSoyad: String,
    gondericiTelefon: String,
    gondericiIl: String,
    gondericiIlce: String,
    gondericiMahalle: String,
    gondericiSokak: String,
    gondericiBina: String,
    gondericiDaire: String,
    gondericiKat:String,
 
    aliciAd: String,
    aliciSoyad: String,
    aliciTelefon: String,
    aliciIl: String,
    alciIlce: String,
    aliciMahalle: String,
    aliciSokak: String,
    aliciBina: String,
    aliciDaire: String,
    aliciKat:String,
    sure: String,
    temp: {
        type: Boolean,
        default: true
    }

    
})

 exports.Order = mongoose.model('orders',OrderSchema);