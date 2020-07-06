//implementación de mongoose
const mongoose = require('mongoose')
//creacion de un nuevo esquema
const Schema = mongoose.Schema;
//esquema
let contactoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    puesto: { 
        type: String,
        required: false
    },
    correo: {
        type: String,
        required: false
    },    
    telefono: {
        type: String,
        required: false
    },
    extencion: {
        type: String,
        required: false
    },
    telefonoDirecto: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    }
});

//exportamos el modelo para utilizarlo en el contorlador
module.exports = mongoose.model('Contacto', contactoSchema);