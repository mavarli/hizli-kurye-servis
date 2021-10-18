const {Adress} = require('../models/adress');
const express = require('express');
const router = express.Router();

//Tum Adres Listesi
router.get(`/adress`, async (req,res) =>{
    const adresList = await Adress.find();
   
    if(!adresList){
        res.status(500).json({message: 'Adres Bulunamadi'});
    }
    res.status(200).send(adresList);
})

//Belirli Bir Adresi Sorgulama
router.get(`/adress/:id`, async (req,res) =>{
    const adress = await Adress.findById(req.params.id);
   
    if(!adress){
        res.status(500).json({message: 'Adres Bulunamadi'});
    }
    res.status(200).send(adress);
})

//Kullanciya Ait Adresleri Sorgulama
router.get(`/adress/kullaniciId/:id`, async (req,res) =>{

    const adresList = await Adress.find({
        kullaniciId: req.params.id,
    });
   
    if(!adresList){
        res.status(500).json({message: 'Adres Bulunamadi'});
    }
    res.status(200).send(adresList);
})

//Adres Kaydetme
router.post(`/adress`,(req,res) =>{
    const adress = new Adress ({
        kullaniciId: req.body.kullaniciId,
        il: req.body.il,
        ilce: req.body.ilce,
        mahalle: req.body.mahalle,
        cadde: req.body.cadde,
        sokak: req.body.sokak,
        bina: req.body.bina,
        kat: req.body.kat,
        daire: req.body.daire,
        acikTarif: req.body.acikTarif,
        adresBaslik: req.body.adresBaslik,
        xKonum: req.body.xKonum,
        yKonum: req.body.yKonum
    })

    adress.save().then((createdAdres =>{
        res.status(201).json(createdAdres)
    })).catch((err) =>{
        res.status(500).json({
            error : err,
            success: false
        })
    })
     
 })

module.exports = router;