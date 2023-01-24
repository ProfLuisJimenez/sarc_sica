
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const conexion = require('../conexion');
const helpers = require('./helpers');

passport.use('local-signup', new LocalStrategy({
    usernameField: 'codigo', 
    passwordField: 'passwd', 
    passReqToCallback: true
   }, async (req, codigo, passwd, done) => {
    const usuarios = await.conexion.query('SELECT * FROM usuarios WHERE usuario=? AND pass=?', [codigo,passwd]);
    if (usuarios.length > 0){
        const usuario = usuarios[0];
        done(null, usuario);
    } else{
        done(null, false, req.flash('errorAuth', 'Error de Autenticación'));
    }
    }
));