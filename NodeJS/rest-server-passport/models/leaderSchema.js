// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// the scheme is useless so far
// we need to create a model using it
var Leadership = mongoose.model('Leadership', leaderSchema);

// make this available to our Node applications
module.exports = Leadership;