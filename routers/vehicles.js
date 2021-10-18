const {Vehicle} = require('../models/vehicle');
const express = require('express');
const router = express.Router();

//Tum Arac Listesi
router.get(`/vehicle`, async (req,res) =>{
    const aracList = await Vehicle.find();
   
    if(aracList.length == 0){
        res.send("Listelenecek Arac Bulunamadi.");
    }
    res.send(aracList);
})

//AracId Ile Arac Sorgulama
router.get(`/vehicle/:id`, async (req,res) =>{
    console.log("GIRDIIII");
    console.log(req);
    const vehicle = await Vehicle.findById(req.params.id);
    console.log("burayada GIRDIIII");
    if(!vehicle){
        res.status(500).json({message: 'Arac Bulunamadi'});
    }
    res.status(200).send(vehicle);
})

//Arac Kaydetme
router.post(`/vehicle`,(req,res) =>{
   const vehicle = new Vehicle ({
    aracTip:  req.body.aracTip,
    plaka: req.body.plaka,
    aracSahibi: req.body.aracSahibi
   })

   vehicle.save().then((createdArac =>{
       res.status(201).json(createdArac)
   })).catch((err) =>{
       res.status(500).json({
           error : err,
           success: false
       })
   })
    
   
})

module.exports = router;