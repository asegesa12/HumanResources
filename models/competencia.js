const { Schema, model } = require('mongoose');

const CompetenciaSchema = Schema({

    descripcion: {
        type: String,
        required: true
    }

})

module.exports = model('Competencia', CompetenciaSchema);