//implementación de mongoose
const mongoose = require('mongoose')
//creacion de un nuevo esquema
const Schema = mongoose.Schema;
//esquema
let AreaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El tsu es necesario']
    },
    ing: {
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
    cautrimestre1: { 
        type: String,
        required: false
    },
    cautrimestre2: { 
        type: String,
        required: false
    },
    cautrimestre3 : { 
        type: String,
        required: false
    },
    cautrimestre4: { 
        type: String,
        required: false
    },
    cautrimestre5: { 
        type: String,
        required: false
    },
    cautrimestre6: { 
        type: String,
        required: false
    },
    cautrimestre7: { 
        type: String,
        required: false
    },
    cautrimestre8: { 
        type: String,
        required: false
    },
    cautrimestre9: { 
        type: String,
        required: false
    },
    cautrimestre10: { 
        type: String,
        required: false
    },
    cautrimestre11: { 
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    carrera: { 
        type: Schema.Types.ObjectId, 
        ref: 'Carrera', 
        required: true 
    },
    campus: { 
        type: String,
        required: true 
    }

});

//exportamos el modelo para utilizarlo en el contorlador
module.exports = mongoose.model('Area', AreaSchema);