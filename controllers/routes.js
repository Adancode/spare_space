var express = require('express');
//var router = express.Router();
var db = require('../models');

module.exports = function(app, passport) {

	app.get('/', function(req, res){
	    res.render('home');
	});

	app.get('/browse', function(req, res){
		res.render('browse');
	});

	app.get('/profile', isLoggedIn, function(req, res){
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