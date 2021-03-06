//implementación de mongoose
const mongoose = require('mongoose')
//creacion de un nuevo esquema
const Schema = mongoose.Schema;
//esquema
let nivelMSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: { 
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },    
    url: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    subcarrera: { 
        type: Schema.Types.ObjectId, 
        ref: 'Subcarrera', 
        required: true 
    }
});

//exportamos el modelo para utilizarlo en el contorlador
module.exports = mongoose.model('Nivel', nivelMSchema);