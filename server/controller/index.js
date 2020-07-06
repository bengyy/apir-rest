const express = require('express');

const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./noticia'));
app.use(require('./campus'));
app.use(require('./campus'));
app.use(require('./modeloEducativo'));
app.use(require('./carrera'));
app.use(require('./subcarrera'));
app.use(require('./nivel'));
app.use(require('./servicio'));
app.use(require('./upload'));
app.use(require('./imagenes'));
app.use(require('./materia'));
app.use(require('./detCampArea'));
app.use(require('./listaMateria'));
app.use(require('./area'));
app.use(require('./contacto'));

module.exports = app;

