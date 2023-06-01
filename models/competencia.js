const { Schema, model } = require('mongoose');

const CompetenciaSchema = Schema({

    descripcion: {
        type: String,
        required: true
    },
    
    Estado: {
        type: Boolean
    } 

})

CompetenciaSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;
});

module.exports = model('Competencia', CompetenciaSchema);