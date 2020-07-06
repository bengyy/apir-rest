//implementación de mongoose
const mongoose = require('mongoose')
//creacion de un nuevo esquema
const Schema = mongoose.Schema;
//esquema
let noticiaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcionCorta: { 
        type: String,
        required: false
    },
    descripcion: { 
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    }
});

//exportamos el modelo para utilizarlo en el contorlador
module.exports = mongoose.model('Noticias', noticiaSchema);