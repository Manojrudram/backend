var express = require('express');
var mongoose = require('mongoose');
var config = require('../config/database');
var Admin = require('../app/models/admin');

var FCM = require('fcm-push');

var app = express();
var router = express.Router();

//Config FCM
var serverKey = 'AAAAfbJMAYw:APA91bHGAT03AbmeYZNUITHHBbV0jdveRjkxBgWVGwtnT4mQ15Gf8ojPFQysYvWwKzC46XZKJJbqcavPhC12wB_Wj0opDagNW1XL4nSBE54qckzx2zIj0LtAWqnb4X7OV9LhIJ-6rXa7';
var fcm = new FCM(serverKey);



mongoose.connect(config.database);
app.set('superSecret',config.secret);




/*FCM Push Notification */
router.post('/test', function(req, res, next) {

	    var message = {
        to: 'dFbkEIM1HMQ:APA91bFJsOu3TRieLMRUHBWrw053n9BcfvsoJj543fP7puJPZVl4l_WStfNjYwQxOZ9KWsJnBsZW-97Sj6d3WDmWKAe9Izow-xl92UBbUom3D1HcZd0b15jHOfV9KbfVfq0WfhipY5Np', // required fill with device token or topics
        //collapse_key: 'your_collapse_key', 
        data: {
        	   id: req.body.id,
            page: req.body.type
        },
        notification: {
            title: 'Kurnool Aachars Chintana',
            body: req.body.type
        
        }
    };


	  //promise style
    fcm.send(message)
        .then(function(response){
            console.log("Successfully sent with response: ", response);
            res.send({"message":"sucess"});

        })
        .catch(function(err){
            console.log("Something has gone wrong!");
            console.error(err);
            res.send({"message":"failure"});
        })

	});



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