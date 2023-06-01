const Competencia = require('../models/competencia');
const { response } = require('express');


const crearCompetencia = async (req, res = response) => {

    try {
        const competencia = new Competencia(req.body);

        await competencia.save();

        res.json({
            ok: true,
            competencia
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }
}

const getCompetencia = async(req, res= response) =>{

    const competencia = await Competencia.find();

    res.json({
        ok: true,
        competencia,
        uid: req.uid
    });
}

const borrarCompetencia= async( req, res= response) => {

    const uid = req.params.id;

        try {
            const competenciaDB = await Competencia.findById( uid );

            if( !competenciaDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe una competencia por ese Id'
                });
            }

            await Competencia.findByIdAndDelete( uid);

            res.json({
                ok: true,
                msg: 'Competencia eliminada'
            })
            
        } catch (err) {
            console.log(err)
            
        }
}

const actualizarCompetencia = async (req, res = response) =>{

    //TODO Validar token y comprobar
    // si el puesto es correcto

    const uid = req.params.id;


    try {

       const competenciaDB = await Competencia.findById( uid );

       if( !competenciaDB){
        return res.status(404).json({
            ok: false,
            msg: 'No existe una competencia por ese Id'
        });
       }
       const { ...campos} = req.body;

       // Actualizar
    
       const CompetenciaActualizado = await Competencia.findByIdAndUpdate( uid, campos, {new: true});


       res.json({
        ok: true,
        competencia: CompetenciaActualizado
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
    crearCompetencia,
    getCompetencia,
    borrarCompetencia,
    actualizarCompetencia
}