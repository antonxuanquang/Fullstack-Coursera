var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {
	// get the documents collection
	var coll = db.collection(collection);
	coll.insert(document, function(err, result) {
		assert.equal(err, null);
		console.log('Inserted: ' + result.result.n + ' documents into the collection'
			+ collection);
		callback(result);
	});
};

exports.findDocument = function(db, collection, callback) {
	// Get the documents collection
	var coll = db.collection(collection);

	// Find some documents
	coll.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		callback(docs);
	});
};

exports.removeDocument = function(db, document, collection, callback) {
	// get the documents collection
	var coll = db.collection(collection);

	// delete the document
	coll.deleteOne(document, function(err, result) {
		assert.equal(err, null);
		console.log("Removed the document " + document);
		callback(result);
	});
};

exports.updateDocument = function(db, document, update, collection, callback) {
	// get the documents collection
	var coll = db.collection(collection);

	// update document
	coll.updateOne(
		document,
		{$set: update},
		null,
		function(err, result) {
			assert.equal(err, null);
			console.log("Updated the document with " + update);
			callback(result);
		}
	);
};
