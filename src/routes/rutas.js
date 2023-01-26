const express = require("express");
const router = express.Router();
const passport = require('passport');

//rutas
router.get('/', (req, res, next) =>{
    res.render('index');
});

router.get('/login', (req, res, next) =>{
    res.render('login');
});

router.post('/login', passport.authenticate('login-local', {
    successRedirect: '/',
    failedRedirect: '/login',
    passReqToCallBack: true
}));

module.exports = router;