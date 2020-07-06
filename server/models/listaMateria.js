//implementación de mongoose
const mongoose = require('mongoose')
//creacion de un nuevo esquema
const Schema = mongoose.Schema;
//esquema
let lisMateriasSchema = new Schema({
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
    materia1: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia2: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia3: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia4: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia5: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia6: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia7: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia8: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia9: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    },
    materia10: { 
        type: Schema.Types.ObjectId, 
        ref: 'Materia', 
        required: true 
    }
});

//exportamos el modelo para utilizarlo en el contorlador
module.exports = mongoose.model('ListaMateria', lisMateriasSchema);