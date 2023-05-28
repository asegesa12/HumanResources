const { Schema, model } = require('mongoose');

const PuestoSchema = Schema({

    nombre :{
        type: String,
        required: true            
    },

    NivelRiesgo: {
        type: String,
        required: true,

    },

    SalarioMin:{
        type: Number,
        required: true,
    },

    SalarioMax:{
        type: Number,
        required: true,
    }
})

module.exports = model('Puesto', PuestoSchema);