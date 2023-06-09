const { Schema, model } = require('mongoose');


const IdiomaSchema = Schema({

    nombre :{
        type: String,
        required: true            
    },

    descripcion: {
        type: String,
        required: true,

    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

IdiomaSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;
})

module.exports = model('Idioma', IdiomaSchema);