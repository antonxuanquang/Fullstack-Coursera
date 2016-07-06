var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
	.all(function(req, res, next) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		next();
	})

	.get(function(req, res, next) {
		res.end('Will send all the promotions to you');
	})

	.post(function(req, res, next) {
		res.end('Will add the dish: ' + req.body.name 
			+ ' with details ' + req.body.description);
	})

	.delete(function(req, res, next) {
		res.end('Deleting all promotions');
	});

promoRouter.route('/:promoID')
	.all(function(req, res, next) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		next();
	})

	.get(function(req, res, next) {
		res.end('Will send details of the dish ' + req.params.promoID
			+ ' to you');
	})

	.put(function(req, res, next) {
		res.write('Updating the dish ' + req.params.promoID + '\n');
		res.end('Will update the dish ' + req.body.name 
			+ ' with details: ' + req.body.description);
	})

	.delete(function(req, res, next) {
		res.end('Deleting dish: ' + req.params.promoID);
	});

module.exports = promoRouter;