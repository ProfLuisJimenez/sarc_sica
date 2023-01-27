//constantes

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const {exphbs, engine} = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const mySQLStore = require('express-mysql-session')(session);
const conexion = require("./conexion");
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require ('dotenv').config();

//Inicializar

const app = express();
require('./lib/autenticar');

//middlewares

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser('secretoenlamontaña'));
app.use(session({
    secret: 'secretoenlamontaña',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    store: new mySQLStore(conexion),
    cookie: {
        secure: false,
        maxAge: 1200000,
        httpOnly: true
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//configuración

app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'));
app.engine(
    ".hbs",
    engine({
    defaultLayout: "basico",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
    })
);
app.set("view engine", ".hbs");
app.use((req, res, next) => {
    app.locals.errorAuth = req.flash("errorAuth");
    //app.locals.user = req.user;//variables de sesión del usuario logeado
    next();
  });

//Rutas

app.use('/', require('./routes/rutas'));

//servidor

app.listen(app.get('port'), ()=>{
    console.log('Servidor en el puerto', app.get('port'));
});

// Errores 400 - 504
app.use(function (req, res, next) {
    res.status(400).render("error", { user: req.session.user });
  });
  
  app.use(function (req, res, next) {
    res.status(401).render("error", { user: req.session.user });
  });
  
  app.use(function (req, res, next) {
    res.status(403).render("error", { user: req.session.user });
  });
  
  app.use(function (req, res, next) {
    res.status(404).render("error", { user: req.session.user });
  });
  
  app.use(function (req, res, next) {
    res.status(500).render("error", { user: req.session.user });
  });
  
  app.use(function (req, res, next) {
    res.status(503).render("error", { user: req.session.user });
  });
  
  app.use(function (req, res, next) {
    res.status(504).render("error", { user: req.session.user });
  });