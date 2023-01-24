const express = require("express");
const router = express.Router();

//rutas
router.get('/', (req, res, next) =>{
    res.render('index');
});

router.get('/login', (req, res, next) =>{
    res.render('login');
});

router.post('/login', (req, res, next) =>{
    console.log(req.body);
    res.send('recibido');
});

module.exports = router;