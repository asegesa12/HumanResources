const Capacitacion = require('../models/capacitacion');
const { response } = require('express');


const crearCapacitacion = async (req, res = response) => {

    try {
        const capacitacion = new Capacitacion(req.body);

        await capacitacion.save();

        res.json({
            ok: true,
            capacitacion
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }
}

const getCapacitacion = async(req, res= response) =>{

    const capacitacion = await Capacitacion.find();

    res.json({
        ok: true,
        capacitacion,
        uid: req.uid
    });
}

const borrarCapacitacion= async( req, res= response) => {

    const uid = req.params.id;

        try {
            const capacitacionDB = await Capacitacion.findById( uid );

            if( !capacitacionDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe una capacitacion por ese Id'
                });
            }

            await Capacitacion.findByIdAndDelete( uid);

            res.json({
                ok: true,
                msg: 'capacitacion eliminado'
            })
            
        } catch (err) {
            console.log(err)
            
        }
}

const actualizarCapacitacion = async (req, res = response) =>{

    //TODO Validar token y comprobar
    // si el usuario es correcto

    const uid = req.params.id;


    try {

       const capacitacionDB = await Capacitacion.findById( uid );

       if( !capacitacionDB){
        return res.status(404).json({
            ok: false,
            msg: 'No existe una capacitacion por ese Id'
        });
       }
       const { ...campos} = req.body;

       // Actualizar
    
       const capacitacionActualizado = await Capacitacion.findByIdAndUpdate( uid, campos, {new: true});


       res.json({
        ok: true,
        capacitacion: capacitacionActualizado
       })



        
    } catch (err) {
        console.log(err);

        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    crearCapacitacion,
    getCapacitacion,
    borrarCapacitacion,
    actualizarCapacitacion
}