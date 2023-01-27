const express = require("express");
const router = express.Router();
const passport = require('passport');
const {logueado, nologueado} = require('../lib/dentro');

//rutas
router.get('/', (req, res, next) =>{
    res.render('index');
});

router.get('/home', logueado, (req, res, next) =>{
    res.render('home');
});

router.get('/login', (req, res, next) =>{
    res.render('login');
});

router.post('/login', nologueado, passport.authenticate('login-local', {
    successRedirect: '/home',
    failedRedirect: '/login',
    passReqToCallBack: true
}));

module.exports = router;