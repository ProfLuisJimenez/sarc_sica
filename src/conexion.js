const mysql = require('mysql');
const path = require('path');
const { promisify } = require('util');
require ('dotenv').config();

const conexion = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

conexion.getConnection((err, connection) => {
    if (err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión de la BD se cerró');
        }
        if (err.code == 'ER_CON_COUNT_ERROR') {
            console.error('La BD tiene demasiadas conexiones');
        }
        if (err.code == 'ECONNREFUSED') {
            console.error('La conexión a la BD fue rechazada');
        }
    }

    if(connection) connection.release();
        console.log('La BD está conectada');
        
    return;
});

conexion.query = promisify(conexion.query);

module.exports = conexion;