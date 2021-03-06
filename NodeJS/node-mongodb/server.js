var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	console.log("Connected correctly to server");

	dboper.insertDocument(
		db, 
		{name: "Vadonut", description: "Test"},
		"dishes",
		function(result) {
			console.log(result.ops);
			dboper.findDocument(db, "dishes", function(docs) {
				console.log(docs);

				dboper.updateDocument(
					db, 
					{ name: "Vadonut" },
					{ description: "Updated Test" },
					"dishes",
					function(result) {
						console.log(result.result);

						dboper.findDocument(db, "dishes", function(docs) {
							console.log(docs);
							db.dropCollection("dishes", function(result) {
								console.log(result);
								db.close();
							});
						});
					}
				);
			});
		}
	);
});