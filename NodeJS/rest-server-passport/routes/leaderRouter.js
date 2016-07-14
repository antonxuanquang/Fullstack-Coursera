
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Leaders = require('../models/leaderSchema');


var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Leaders.find({}, function(err, leader) {
			if (err) throw err;
			res.json(leader);
		});
	})

	.post(Verify.verifyAdminUser, function(req, res, next) {
		Leaders.create(req.body, function(err, leader) {
			if (err) throw err;

			console.log('leader created!');
			var id = leader._id;
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Added the leader with id: ' + id);
		});
	})

	.delete(Verify.verifyAdminUser, function(req, res, next) {
		Leaders.remove({}, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

leaderRouter.route('/:leaderID')

	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Leaders.findById(req.params.leaderID, function(err, leader) {
			if (err) throw err;
			res.json(leader);
		});
	})

	.put(Verify.verifyAdminUser, function(req, res, next) {
		Leaders.findByIdAndUpdate(req.params.leaderID, {
			$set: req.body
		}, {
			new: true
		}, function(err, leader) {
			if (err) throw err;
			res.json(leader);
		});
	})

	.delete(Verify.verifyAdminUser, function(req, res, next) {
		Leaders.findByIdAndUpdate(req.params.leaderID, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

module.exports = leaderRouter;