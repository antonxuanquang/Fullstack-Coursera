
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Dishes = require('../models/dishSchema');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')

	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Dishes.find({}, function(err, dish) {
			if (err) throw err;
			res.json(dish);
		});
	})

	.post(Verify.verifyAdminUser, function(req, res, next) {
		Dishes.create(req.body, function(err, dish) {
			if (err) throw err;

			console.log('Dish created!');
			var id = dish._id;
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Added the dish with id: ' + id);
		});
	})

	.delete(Verify.verifyAdminUser, function(req, res, next) {
		Dishes.remove({}, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

dishRouter.route('/:dishID')

	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Dishes.findById(req.params.dishID, function(err, dish) {
			if (err) throw err;
			res.json(dish);
		});
	})

	.put(Verify.verifyAdminUser, function(req, res, next) {
		Dishes.findByIdAndUpdate(req.params.dishID, {
			$set: req.body
		}, {
			new: true
		}, function(err, dish) {
			if (err) throw err;
			res.json(dish);
		});
	})

	.delete(Verify.verifyAdminUser, function(req, res, next) {
		Dishes.findByIdAndUpdate(req.params.dishID, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

dishRouter.route('/:dishID/comments')
	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Dishes.findById(req.params.dishID, function(err, dish) {
			if (err) throw err;
			res.json(dish.comments);
		});
	})

	.post(Verify.verifyAdminUser, function(req, res, next) {
		Dishes.findById(req.params.dishID, function(err, dish) {
			if (err) throw err;
			dish.comments.push(req.body);
			dish.save(function(err, dish) {
				if (err) throw err;
				console.log('Updated Comments!');
				res.json(dish);
			});
		});
	})

	.delete(Verify.verifyAdminUser, function(req, res, next) {
		Dishes.findById(req.params.dishID, function(err, dish) {
			if (err) throw err;
			for (var i = (dish.comments.length - 1); i >= 0; i--) {
				dish.comments.id(dish.comments[i]._id).remove();
			}
			dish.save(function (err, result) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('Deleted all comments');
			});
		});
	});

dishRouter.route('/:dishID/comments/:commentID')
	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Dishes.findById(req.params.dishID, function(err, dish) {
			if (err) throw err;
			res.json(dish.comments.id(req.params.commentID));
		});
	})

	.put(Verify.verifyAdminUser, function(req, res, next) {
		// we delete the existing comment and insert the updated
		// comment as a new comment
		Dishes.findById(req.params.dishID, function(err, dish) {
			if (err) throw err;
			dish.comments.id(req.params.commentID).remove();
			dish.comments.push(req.body);
			dish.save(function(err, dish) {
				if (err) throw err;
				console.log('Updated Comments');
				res.json(dish);
			});
		});
	})

	.delete(Verify.verifyAdminUser, function(req, res, next) {
		Dishes.findById(req.params.dishID, function(err, dish) {
			if (err) throw err;
			dish.comments.id(req.params.commentID).remove();
			dish.save(function(err, resp) {
				if (err) throw err;
				res.json(resp);
			});
		});
	});

module.exports = dishRouter;