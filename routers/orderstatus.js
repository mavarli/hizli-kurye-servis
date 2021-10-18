const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const notification = require('../helpers/notification');

//Tum Kurye Listesi

router.post(`/orderstatus`, async (req,res) =>{
	
	if(req.body.id == undefined){
		 res.send({status:false});
	}
	
	const update = await Order.findByIdAndUpdate(
	{ _id: req.body.id },
	{   
		temp:false
	});
	
	if(!update){
		
		 res.send({status:false});
	}else{ 
	console.log('işlem başarılı.');
		const response = await Order.find({_id:req.body.id}).select(['gondericiId','kuryeId']);
		
		
		if(response.length > 0){
			notification([response[0].kuryeId],'Yeni talebiniz var.');
			notification([response[0].gondericiId],'Ödemeniz alındı. Kurye ataması yapılıyor.');
			console.log('notification gönderildi.');
		}
		 res.send({status:true});
	}
	
   
})



 


module.exports = router;