var mongoose = require('mongoose');
var assert = require('assert');

var Promos = require('./models/promoSchema');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	//we're connected
	console.log("Conected correctly to server");

	// create a new promotions
	Promos.create({
		name: 'Uthapizza',
		image: 'images/abcd.png',
		price: 4.99,
		description: 'Test'
	}, function(err, promotion) {
		if (err) throw err;
		console.log("promotion created!");
		console.log(promotion);

		var id = promotion._id;

		// get all the promotion
		setTimeout(function() {
			Promos.findByIdAndUpdate(
				id, 
				{$set: {description: 'Updated Test'}},
				{new: true}
			).exec(function(err, promotion) {
				if (err) throw err;
				console.log("updated promotion!");
				console.log(promotion);

				db.collection('promotion').drop(function() {
					db.close();
				});
			});
		}, 3000);
	});
});