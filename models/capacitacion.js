const { Schema, model } = require('mongoose');

const CapacitacionSchema = Schema({

    descripcion: {
        type: String,
        required: true
    },

    NivelCapacitacion:{
        type: String,
        required: true
    },

    FechaDesde: {
        type: Date,
        required: true
    },

    fechaHasta: {
        type: Date,
        required: true
    },

    Institucion: {
        type: String,
        required: true
    }
})

CapacitacionSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;
});

module.exports = model('Capacitacion', CapacitacionSchema);