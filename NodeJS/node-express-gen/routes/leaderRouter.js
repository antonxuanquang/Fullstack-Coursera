
var express = require('express');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
	.all(function(req, res, next) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		next();
	})

	.get(function(req, res, next) {
		res.end('Will send all the dishes to you!');
	})

	.post(function(req, res, next) {
		res.end('Will add the dish: ' + req.body.name + ' with details: '
			+ req.body.description);
	})

	.delete(function(req, res, next) {
		res.end('Deleting all dishes');
	});

leaderRouter.route('/:leaderID')
	.all(function(req, res, next) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		next()
	})

	.get(function(req, res, next) {
		res.end('Will send details of the dish: ' + req.params.leaderID
			+ ' to you!');
	})

	.put(function(req, res, next) {
		res.write('Updating the dish ' + req.params.leaderID + '\n');
		res.end('Will update the dish ' + req.body.name 
			+ ' with details: ' + req.body.description);
	})

	.delete(function(req, res, next) {
		res.end('Deleting dish: ' + req.params.leaderID);
	});

module.exports = leaderRouter;