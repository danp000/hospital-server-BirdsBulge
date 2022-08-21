require('dotenv').config();

const express = require('express');
var cors = require('cors');

const { dbConnect } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );


// Base de datos
dbConnect();

// console.log( process.env );


// Rutas
app.get( '/', ( req, res ) => {

  res.status(203).json({ ok: true, msg: 'Server running' });

});





app.listen( process.env.PORT, () => {
  console.log( 'Servidor en vivo Puerto ' + process.env.PORT );
});