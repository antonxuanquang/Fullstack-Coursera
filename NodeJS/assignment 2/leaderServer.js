var mongoose = require('mongoose');
var assert = require('assert');

var Leaders = require('./models/leaderSchema');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	//we're connected
	console.log("Conected correctly to server");

	// create a new leaders
	Leaders.create({
		name: 'Uthapizza',
		image: 'images/abcd.png',
		designation: 'Chief Epicurious Officer',
		abbr: 'CEO',
		description: 'Test'
	}, function(err, leader) {
		if (err) throw err;
		console.log("leader created!");
		console.log(leader);

		var id = leader._id;

		// get all the leader
		setTimeout(function() {
			Leaders.findByIdAndUpdate(
				id, 
				{$set: {description: 'Updated Test'}},
				{new: true}
			).exec(function(err, leader) {
				if (err) throw err;
				console.log("updated leader!");
				console.log(leader);

				db.collection('leader').drop(function() {
					db.close();
				});
			});
		}, 3000);
	});
});