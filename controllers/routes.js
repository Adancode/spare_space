var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('home');
});

router.get('/browse', function(req, res){
	res.render('browse');
});

router.get('/profile', function(req, res){
	res.send('under construction');
});

router.get('/sign-up', function(req, res){
	res.render('sign-up');
});

router.post('/sign-up/create', function(req, res){
	res.redirect('/profile');
});

module.exports = router;