
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const conexion = require('../conexion');
const helpers = require('./helpers');

passport.use('login-local', new LocalStrategy({
    usernameField: 'codigo', 
    passwordField: 'passwd', 
    passReqToCallback: true
   }, async (req, codigo, passwd, done) => {
    const usuarios = await conexion.query('SELECT * FROM usuarios WHERE usuario=?', [codigo]);
    if (usuarios.length > 0){
        const usuario = usuarios[0];
        if (usuario.pass == passwd){
            done(null, usuario);
        } else {
            done(null, false, req.flash('errorAuth', 'Contraseña incorrecta'));
        }  
    } else{
        done(null, false, req.flash('errorAuth', 'Usuario no encontrado'));
    }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.codigo);
});

passport.deserializeUser(async (req, codigo, done) =>{
    let usuario;
    const usuarios = await conexion.query('SELECT * FROM usuarios WHERE usuario=?', [codigo]);
    usuario = usuarios[0];
    done(null, usuario);
});