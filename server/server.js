//llamamos el archivo de configuracion
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
//implementacion del cors
const cors= require('cors');
//llamar a bodyParser
const bodyParser = require('body-parser');


// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//implementacion del cors
app.use(cors({origin:true,credentials:true }));

// Configuración global de rutas
app.use(require('./controller/index'));

//conexion a la BD
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err, res) => {

  if (err) throw err;

  console.log('Base de datos ONLINE');

});

 

 
app.listen(3000,()=>{
    console.log('escuchando en el puerto: ',process.env.PORT);
});