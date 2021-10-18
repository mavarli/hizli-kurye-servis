const {Order} = require('../models/order');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//SiparisId ile Siparis Sorgulama
router.post(`/order/:siparisId`, async (req,res) =>{
    const orderList = await Order.find({ _id: req.params.siparisId ,temp:true});

    if(orderList.length == 0){
        res.send({status:false,message:'Bulunamadı.'});
    }
    const email = await  User.find({_id:orderList[0].gondericiId}).select('email');
    res.send({status:true,data:orderList[0],email:email[0].email});
})


//Kuryeye Gore Siparis Durumunu Sorgulama. (TalepOlustu-TeslimEdildi)
// router.get(`/order/:siparisDurumu/:kuryeId`, async (req,res) =>{
//     const orderList = await Order.find({ siparisDurumu: req.params.siparisDurumu, kuryeId:req.params.kuryeId, temp:false });
   
//     if(orderList.length == 0){
//         res.send("Listelenecek Siparis Bulunamadi.");
//     }
//     res.send(orderList);
// })

//Kuryeye Gore Siparis Durumunu Sorgulama. (TalepOlustu-TeslimEdildi)
router.get(`/order/courier/:siparisDurumu/:kuryeId`, async (req,res) =>{
    const orderList = await Order.find({ siparisDurumu: req.params.siparisDurumu, kuryeId:req.params.kuryeId, temp:false });
   
    if(!orderList) {
        return res.status(400).send('Listelenecek Siparis Bulunamadi');
    }
    else if (orderList) {

        return res.status(200).send(orderList);
    }
    else{
        return res.status(404).send('Bilinmeyen Hata');
    }
})

//Kullaniciya Gore Siparis Durumunu Sorgulama. (TalepOlustu-TeslimEdildi)
router.get(`/order/user/:siparisDurumu/:gondericiId`, async (req,res) =>{
    console.log('çalıştı......');
    const orderList = await Order.find({ siparisDurumu: req.params.siparisDurumu, gondericiId:req.params.gondericiId, temp:false });
   
    if(!orderList) {
        return res.status(400).send('Listelenecek Siparis Bulunamadi');
    }
    else if (orderList) {

        return res.status(200).send(orderList);
    }
    else{
        return res.status(404).send('Bilinmeyen Hata');
    }
})


//Sipariş order Kaydetme
router.post(`/order`, async(req,res) =>{

   await Order.remove({gondericiId :req.body.gondericiId, temp:true });

   const order = await new Order ({
    siparisId: req.body.siparisId,
    kuryeId: req.body.kuryeId,
    siparisTipi: req.body.siparisTipi,
    siparisDurumu: req.body.siparisDurumu,
    siparisTarihi: req.body.siparisTarihi,
    teslimTarihi: req.body.teslimTarihi,
    uzaklik: req.body.uzaklik,
    fiyat: req.body.fiyat,

    gondericiId: req.body.gondericiId,
    gondericiAd: req.body.gondericiAd,
    gondericiSoyad: req.body.gondericiSoyad,
    gondericiTelefon: req.body.gondericiTelefon,
    gondericiIl: req.body.gondericiIl,
    gondericiIlce: req.body.gondericiIlce,
    gondericiMahalle: req.body.gondericiMahalle,
    gondericiSokak: req.body.gondericiSokak,
    gondericiBina: req.body.gondericiBina,
    gondericiDaire: req.body.gondericiDaire,

    aliciAd: req.body.aliciAd,
    aliciSoyad: req.body.aliciSoyad,
    aliciTelefon: req.body.aliciTelefon,
    aliciIl: req.body.aliciIl,
    alciIlce: req.body.alciIlce,
    aliciMahalle: req.body.aliciMahalle,
    aliciSokak: req.body.aliciSokak,
    aliciBina: req.body.aliciBina,
    aliciDaire: req.body.aliciDaire
   })

   order.save().then((createdOrder =>{
       res.status(201).json(createdOrder)
   })).catch((err) =>{
       res.status(500).json({
           error : err,
           success: false
       })
   })
})



module.exports = router;