var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Promos = require('../models/promoSchema');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Promos.find({}, function(err, promo) {
			if (err) throw err;
			res.json(promo);
		});
	})

	.post(Verify.verifyAdminUser, function(req, res, next) {
		Promos.create(req.body, function(err, promo) {
			if (err) throw err;

			console.log('promo created!');
			var id = promo._id;
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Added the promo with id: ' + id);
		});
	})

	.delete(Verify.verifyAdminUser, function(req, res, next) {
		Promos.remove({}, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

promoRouter.route('/:promoID')

	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Promos.findById(req.params.promoID, function(err, promo) {
			if (err) throw err;
			res.json(promo);
		});
	})

	.put(Verify.verifyAdminUser, function(req, res, next) {
		Promos.findByIdAndUpdate(req.params.promoID, {
			$set: req.body
		}, {
			new: true
		}, function(err, promo) {
			if (err) throw err;
			res.json(promo);
		});
	})

	.delete(Verify.verifyAdminUser, function(req, res, next) {
		Promos.findByIdAndUpdate(req.params.promoID, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

module.exports = promoRouter;