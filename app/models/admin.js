var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Admin', new Schema({
	
	email:{
         type: String
	},
	password:{
		type: String
	}
}));