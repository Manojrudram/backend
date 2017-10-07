var express = require('express');
var mongoose = require('mongoose');
var config = require('../config/database');
var Admin = require('../app/models/admin');


var app = express();
var router = express.Router();


mongoose.connect(config.database);
app.set('superSecret',config.secret);

router.post('/signup', function(req, res, next) {
	 console.log(JSON.stringify(req.body))
	 var userinfo = new Admin({
	 	email_id  : req.body.email_id,
	 	password  : req.body.password
	 });
	 userinfo.save(function (err,user) {
	 	if (err) return JSON.stringify(err);
	 	//saved
	 	if(user) {
			// var token = jwt.sign(user, app.get('superSecret'), {				
			// 	expiresIn: 86400 // expires in 24 hours //basically in seconds			
			// });
			// res.send({"token":token});
			res.send({"message":"success"});
		}	
	 })
	});

module.exports = router;