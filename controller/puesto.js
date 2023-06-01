const Puesto = require('../models/puesto');
const { response } = require('express');


const crearPuesto = async (req, res = response) => {

    try {
        const puesto = new Puesto(req.body);

        await puesto.save();

        res.json({
            ok: true,
            puesto
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }
}

const getPuesto = async(req, res= response) =>{

    const puesto = await Puesto.find();

    res.json({
        ok: true,
        puesto,
        uid: req.uid
    });
}

const borrarPuesto= async( req, res= response) => {

    const uid = req.params.id;

        try {
            const puestoDB = await Puesto.findById( uid );

            if( !puestoDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un puesto por ese Id'
                });
            }

            await Puesto.findByIdAndDelete( uid);

            res.json({
                ok: true,
                msg: 'Puesto eliminado'
            })
            
        } catch (err) {
            console.log(err)
            
        }
}

const actualizarPuesto = async (req, res = response) =>{

    //TODO Validar token y comprobar
    // si el puesto es correcto

    const uid = req.params.id;


    try {

       const puestoDB = await Puesto.findById( uid );

       if( !puestoDB){
        return res.status(404).json({
            ok: false,
            msg: 'No existe un puesto por ese Id'
        });
       }
       const { ...campos} = req.body;

       // Actualizar
    
       const PuestoActualizado = await Puesto.findByIdAndUpdate( uid, campos, {new: true});


       res.json({
        ok: true,
        puesto: PuestoActualizado
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
    crearPuesto,
    getPuesto,
    borrarPuesto,
    actualizarPuesto
}