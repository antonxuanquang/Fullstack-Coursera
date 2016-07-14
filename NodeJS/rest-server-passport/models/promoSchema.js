var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true
	},
	label: {
		type: String
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// Getter
promotionSchema.path('price').get(function(num) {
	return (num / 100).toFixed(2);
});

// Setter
promotionSchema.path('price').set(function(num) {
	return num * 100;
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;