//constantes

const express = require("express");
const morgan = require("morgan");
const {exphbs, engine} = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const conexion = require("./conexion");

//Inicializar
const app = express();
require('./conexion');

//middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

//Rutas

app.use('/', require('./routes/rutas'));

//servidor

app.listen(app.get('port'), ()=>{
    console.log('Servidor en el puerto', app.get('port'));
});