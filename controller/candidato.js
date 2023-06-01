const Candidato = require('../models/candidato');
const { response } = require('express');


const crearCandidato = async (req, res = response) => {

    

    const candidato = new Candidato({
        ...req.body
    });

    try {
        

        const candidatoDB = await candidato.save();

        res.json({
            ok: true,
            candidato: candidatoDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }
}

const getCandidatos = async(req, res= response) =>{

    const candidato = await Candidato.find()
    .populate('idioma','nombre')
    .populate('puesto', 'nombre')
    .populate('competencia', 'descripcion')
    .populate('capacitacion', 'descripcion');
                                        

    res.json({
        ok: true,
        candidato,
        uid: req.uid
    });
}

/*const borrarPuesto= async( req, res= response) => {

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
*/
module.exports = {
    crearCandidato,
    getCandidatos
    
}