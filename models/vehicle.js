const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
    aracTip: {
        type: String,
        required: true,
    },
    plaka: String,
    aracSahibi: String,
    aktifMi: {
        type: Boolean,
        default: true
    }  
})

 exports.Vehicle = mongoose.model('vehicles',VehicleSchema);