const { response } = require('express');
const Usuario = require('../models/usuario');
const Candidato = require('../models/candidato');
const Idioma = require('../models/idioma');
const Puesto = require('../models/puesto');


//Busqueda silmutane o global

const getTodo = async(req, res = response) => {

    const busqueda = req.params.termino;
    const regex = new RegExp( busqueda, 'i');

    const [usuario, candidato] = await Promise.all([
         Usuario.find({ nombre: regex}),
         Candidato.find({ nombre: regex})
    ])

    res.json({
        ok: true,
        msg: 'getTodo',
        usuario,
        candidato
    });
}

const getDocumentCollection = async(req, res = response) => {

    const tabla = req.params.tabla
    const busqueda = req.params.termino;
    const regex = new RegExp( busqueda, 'i');

   let data = [];

   switch ( tabla) {
    case 'candidato':
        data = await Candidato.find({ nombre: regex})
        .populate('idioma','nombre')
        .populate('puesto','nombre NivelRiesgo SalarioMax')
        .populate('departamento','nombre')
        .populate('competencia','descripcion')
        .populate('capacitacion','descripcion')
                                    
        break;
    case 'idioma':
        data = await Idioma.find({ nombre: regex});
                            
        
        break;
    case 'puesto':
        data = await Puesto.find({ nombre: regex})
             .populate( 'nombre NivelRiesgo SalarioMax')
        break;
   
    default:
        return res.status(400).json({
            ok: false,
            msg: 'No existe ningun registro relacionado'
        })
    
   }

    res.json({
        ok: true,
        resultados: data
    });
}


module.exports = {
    getTodo,
    getDocumentCollection
}