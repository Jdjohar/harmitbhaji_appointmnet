var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/about', function(req, res, next) {
  res.render('about', {page:'About Us', menuId:'about'});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});
router.get('/next', function(req, res, next) {
  res.render('next', {page:'Second ', menuId:'second'});
});
router.get('/service', function(req, res, next) {
  res.render('service', {page:'service ', menuId:'second'});
});

module.exports = router;
