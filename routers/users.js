const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

//Tum Kullanici Listesi
router.get(`/user`, async (req,res) =>{
    const kullaniciList = await User.find().select('-sifreHash');
   
    if(kullaniciList.length == 0){
        res.send("Listelenecek Kullanici Bulunamadi.");
    }
    res.send(kullaniciList);
})

//KullaniciId Ile Kullanici Sorgulama (:id GET ile gönderilirse arar bulur getirir)
router.get(`/user/:id`, async (req,res) =>{
    
    const user = await User.findById(req.params.id).select('-sifreHash');
    
    if(!user){
        res.status(500).json({message: 'Kullanici Bulunamadi'});
    }                
    res.status(200).send(user);
})

router.get(`/userphone/:phone`, async (req,res) =>{
    
    const user = await User.find({ telefon: req.params.phone });
    
    if(!user){
        res.status(500).json({message: 'Kullanici Bulunamadi',
    success:false});
    }                
     res.status(200).json({
        success: true,
        message:'Kullanici var'
    });
})

router.post(`/user/phone/:phone`, async (req,res) =>{

    const user = await User.findOneAndUpdate(
        { telefon: req.body.phone },
        {   
            sifreHash: req.body.sifre
        });
    
    if(!user){
        res.status(500).json({message: 'Kullanici Bulunamadi'});
    }
    res.status(200).send(user);
})

//KullaniciId Ile Update İşlemi (:id POST ile gönderilirse update eder)
router.post(`/user/:id`, async (req,res) =>{

    const user = await User.findByIdAndUpdate(
        { _id: req.body.id },
        {   
            kullaniciTip: req.body.kullaniciTip,
            ad: req.body.ad,
            soyad: req.body.soyad,
            tcKimlikNo:  req.body.tcKimlikNo,
            telefon: req.body.telefon,
            email: req.body.email,
            restoranAdi: req.body.restoranAdi,
            vergiDairesi: req.body.vergiDairesi,
            vergiNo: req.body.vergiNo,
            ulke: req.body.ulke,
            il: req.body.il,
            ilce: req.body.ilce,
            mahalle: req.body.mahalle,
            sokak: req.body.sokak,
            bina: req.body.bina,
            daire: req.body.daire,
            adminMi: req.body.adminMi
        });
    
    if(!user){
        res.status(500).json({message: 'Kullanici Bulunamadi'});
    }
    res.status(200).send(user);
})

//Kullanici Kaydetme
router.post(`/user`, async(req,res) =>{
    
    const user = await new User ({
        kullaniciTip:  req.body.kullaniciTip,
        ad:  req.body.ad,
        soyad:  req.body.soyad,
        tcKimlikNo:  req.body.tcKimlikNo,
        tcKimlikResim: req.body.tcKimlikResim,
        ehliyetResim: req.body.ehliyetResim,
        telefon: req.body.telefon,
        email: req.body.email,
        restoranAdi: req.body.restoranAdi,
        kurumAdi: req.body.kurumAdi,
        vergiDairesi: req.body.vergiDairesi,
        vergiNo: req.body.vergiNo,
        sifreHash: bcrypt.hashSync(req.body.sifre,10)
    })

   user.save().then((createdKullanici =>{
       res.status(201).json(createdKullanici)
   })).catch((err) =>{
       res.status(500).json({
           error : err,
           success: false
       })
   })
})

//Kullanici Girisi
router.post('/loginUser', async(req,res) => {

    console.log("Login Metodu --> Giris kullaniciTip: ", req.body.kullaniciTip);
    console.log("Login Metodu --> Giris Telefon: ", req.body.telefon);
    console.log("Login Metodu --> Giris Sifre: ", req.body.sifre);
    

    //const user = await User.find({ telefon: req.body.telefon, kullaniciTip: req.body.kullaniciTip })
    const user = await User.findOne({ telefon: req.body.telefon, kullaniciTip: req.body.kullaniciTip })
    const secret = process.env.secret;
    if(!user) {
        return res.status(401).send('Kullanıcı Bulunamadı')
    }

    if(user && bcrypt.compareSync(req.body.sifre, user.sifreHash)){
        const token = jwt.sign(
            {
                userId: user.id
            },
            secret,
            {expiresIn: '1d'}
        )
        res.status(200).send({telefon: user.telefon, token: token, id: user.id, kullaniciTip: user.kullaniciTip})
    } else {
        res.status(400).send('Kullanıcı Şifresi Hatalı')
    }

});

//Tum Kurye Listesi
router.get(`/courier/:calismaDurumu`, async (req,res) =>{
    const kuryeList = await User.find({ calismaDurumu: req.params.calismaDurumu });
   
    console.log("----> kuryeList: ", kuryeList);

    if(!kuryeList) {
        return res.status(401).send('Kurye Bulunamadı')
    }
    else if(kuryeList){
        if(kuryeList.length!=0){
            return res.status(200).send(kuryeList)
        }
        else{
            return res.status(401).send('Kurye Bulunamadı')
        }
    } 
    else {
        return res.status(404).send('Bilinmeyen Hata')
    }
})


router.post(`/courier/update/:id/`, async (req,res) =>{

console.log("xKonum :", req.body.xKonum);
console.log("yKonum :", req.body.yKonum);

    const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        {   
            calismaDurumu: req.body.calismaDurumu,
            xKonum: req.body.xKonum,
            yKonum: req.body.yKonum
        });
    
    if(!user){
        res.status(500).json({message: 'Kullanici Bulunamadi'});
    }
    res.status(200).send(user);
})

module.exports = router;