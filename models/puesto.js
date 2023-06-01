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
    },

    Estado: {
        type: Boolean
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

PuestoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;
});

module.exports = model('Puesto', PuestoSchema);