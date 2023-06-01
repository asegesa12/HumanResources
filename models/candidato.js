const { Schema, model } = require('mongoose');


const CandidatoSchema = Schema({

    cedula :{
        type: String,
        required: true            
    },

    nombre: {
        type: String,
        required: true,

    },

    idioma: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Idioma'
    },

    puesto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Puesto'
    },

    departamento: {
        type: String,
        required: true
    },

    salario: {
        type: Number,
        required: true
    },

    competencia: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Competencia'
    },

    capacitacion: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Capacitacion'
    },

    experiencia_Laboral: {
        type: Number,
        required: true
    },

    recomendadoPor: {
        type: String,
        required: true
    }

    
});

CandidatoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;
});

module.exports = model('Candidato', CandidatoSchema);