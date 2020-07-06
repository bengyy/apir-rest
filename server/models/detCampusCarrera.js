//implementación de mongoose
const mongoose = require('mongoose')
//creacion de un nuevo esquema
const Schema = mongoose.Schema;
//esquema
let detCampAreaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: { 
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    area: { 
        type: Schema.Types.ObjectId, 
        ref: 'SubCarrera', 
        required: true 
    },
    campus: { 
        type: Schema.Types.ObjectId, 
        ref: 'Campus', 
        required: true 
    }
});

//exportamos el modelo para utilizarlo en el contorlador
module.exports = mongoose.model('DetCampArea', detCampAreaSchema);