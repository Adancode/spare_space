var express = require('express');
//var router = express.Router();
var db = require('../models');

module.exports = function(app, passport) {

	app.get('/', function(req, res){
	    res.render('home');
	});

// router.post('/burgers/create', function(req, res) {
// 	db.burger.findOne({where: {burger_name: req.body.name}}).then(function(burger) {
// 		if(!burger) {
// 			var aBurger;
// 			db.burger.create({ burger_name: req.body.name, ingredient: { name: req.body.ing_name } }, { include: [db.ingredient]})
// 			.then(function(burger) {
// 				aBurger = burger;
// 			})
// 			.then(function() {
// 				req.flash('success', 'Your ' + req.body.name + ' with ' + req.body.ing_name + ' is ready to be devoured!');
// 				res.redirect('/burgers');
// 			});				
// 		} else {
// 			req.flash('failure', 'That burger has already been made');
// 			res.redirect('/burgers');
// 		}
// 	})
// });

	app.post('/spaces/create', isLoggedIn, function(req, res) {
		var user = req.user;
		//db.sequelize.sync({force:true}).then(function() {
			db.Space.create({address: req.body.address, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode, description: req.body.description, price: req.body.price, from: req.body.from, to: req.body.to, photo: req.body.photo})
			.then(function(space) {
				user.addSpace(space);
			}).then(function() {
				req.flash('success', 'Your space at ' + req.body.address + ' has been created');
				res.redirect('/spaces');
			})
		//})
	})

	app.get('/spaces', isLoggedIn, function(req, res){
		db.Space.findAll({

		}).then(function(data) {
			res.render('spaces', {spaces: data});
		});
		// db.Space.findAll({

		// }).then(function (data) {
		// 	res.render('spaces', {spaces: data, message: req.flash()});
		// });
	});

	app.get('/profile', isLoggedIn, function(req, res){
		//console.log(req.user);
		res.render('profile', {
			user: req.user
		});
	});

	app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/google',
    passport.authenticate('google', { scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]}
  ));
  app.get('/oauth2callback',
    passport.authenticate('google', { 
      successRedirect: '/profile',
      failureRedirect: '/' 
  }));

	// router.get('/sign-up', function(req, res){
	// 	res.render('sign-up');
	// });

	// router.post('/sign-up/create', function(req, res){
	// 	//send account information to database then redirect back to home
	// 	res.redirect('/');
	// });

	// router.post('/login', function(req, res){
	// 	res.redirect('/');
	// });

	app.use(function (req, res){
		res.redirect('/');
	});
}

function isLoggedIn(req, res, next) {
	console.log(req.isAuthenticated);
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}