const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/user`, async (req,res) =>{
    const kullaniciList = await User.find().select('-sifreHash');
   
    if(kullaniciList.length == 0){
        res.send("hata");
       // res.status(500).json({success: false})
    }
    res.send(kullaniciList);
  //res.send("deneme");
})

router.get(`/user/:id`, async (req,res) =>{
    const user = await User.findById(req.params.id).select('-sifreHash');
   
    if(!user){
        res.status(500).json({message: 'ID Bulunamadı'});
       // res.status(500).json({success: false})
    }
    res.status(200).send(user);
})

router.post(`/user`,(req,res) =>{
   const user = new User ({
    kullaniciTip:  req.body.kullaniciTip,
    ad:  req.body.ad,
    soyad:  req.body.soyad,
    tckimlikNo:  req.body.tckimlikNo,
    email: req.body.email,
    sifreHash: bcrypt.hashSync(req.body.sifre,10),
    telefon: req.body.telefon
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

router.post('/login', async(req,res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.secret;

    if(!user) {
        return res.status(400).send('Kullanıcı Bulunamadı')
    }

    if(user && bcrypt.compareSync(req.body.sifre, user.sifreHash)){
        
        const token = jwt.sign(
            {
                userId: user.id
            },
            secret,
            {expiresIn: '1d'}
        )
        
        
        
        res.status(200).send({user: user.email, token: token})
    } else {
        res.status(400).send('Kullanıcı Şifresi Hatalı')
    }

    return res.status(200).send(user);
});



module.exports = router;