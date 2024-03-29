const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var multer  = require('multer');
var path = require('path')
var crypto = require('crypto');
const { Console } = require('console');

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})
  
var upload = multer({ storage: storage })

router.post('/uploadPicture', upload.single('fileData'), (req, res, next) => {
    //console.log("req.file: ", req.file);//this will be automatically set by multer
    //console.log("req.body: ", req.body);
    //below code will read the data from the upload folder. Multer will automatically upload the file in that folder with an  autogenerated name

    console.log("uploadFile.js - req: ", req);
    
    fs.readFile(req.file.path,(err, contents)=> {
     if (err) {
     console.log('Error: ', err);
    }else{
     console.log('File contents ',contents);
    }
   });
   console.log("req.file.filename----------: ", req.file.filename);
   
   res.send({
     status:true,
     ad:req.file.filename
    });
  });


module.exports = router;