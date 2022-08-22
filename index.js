require('dotenv').config();

const express = require('express');
var cors = require('cors');

const { dbConnect } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );


// Base de datos
dbConnect();

// console.log( process.env );


// Rutas
app.use( '/api/usuarios', require('./routes/usuarios.routes') );
app.use( '/api/login', require('./routes/auth.routes') );



app.listen( process.env.PORT, () => {
  console.log( 'Servidor en vivo Puerto ' + process.env.PORT );
});