const Idioma = require('../models/idioma');
const { response } = require('express');


const crearIdioma = async (req, res = response) => {

    try {
        const idioma = new Idioma(req.body);

        await idioma.save();

        res.json({
            ok: true,
            idioma
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }
}

const getIdiomas = async(req, res= response) =>{

    const desde = Number(req.query.desde) || 0;

    const [idioma, total] = await Promise.all([
        Idioma.find({}, 'nombre')
        .skip(desde)
        .limit(4),

        Idioma.countDocuments()
    ]);

    res.json({
        ok: true,
        idioma,
        uid: req.uid,
        total: total
    });
}

const borrarIdioma= async( req, res= response) => {

    const uid = req.params.id;

        try {
            const idiomaDB = await Idioma.findById( uid );

            if( !idiomaDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un idioma por ese Id'
                });
            }

            await Idioma.findByIdAndDelete( uid);

            res.json({
                ok: true,
                msg: 'Idioma eliminado'
            })
            
        } catch (err) {
            console.log(err)
            
        }
}

const actualizarIdioma = async (req, res = response) =>{

    //TODO Validar token y comprobar
    // si el usuario es correcto

    const uid = req.params.id;


    try {

       const idiomaDB = await Idioma.findById( uid );

       if( !idiomaDB){
        return res.status(404).json({
            ok: false,
            msg: 'No existe un idioma por ese Id'
        });
       }
       const { ...campos} = req.body;

       // Actualizar
    
       const idiomaActualizado = await Idioma.findByIdAndUpdate( uid, campos, {new: true});


       res.json({
        ok: true,
        idioma: idiomaActualizado
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
    crearIdioma,
    getIdiomas,
    borrarIdioma,
    actualizarIdioma
}