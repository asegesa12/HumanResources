const Usuario = require('../models/usuario');
const { response } = require('express');
const bdcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) =>{

    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

const createUsuario = async(req, res = response) =>{

    const { email, password } = req.body;

    try {
        
    const existeEmail = await Usuario.findOne({ email });

    if( existeEmail){
        return res.status(400).json({
            ok: false,
            msg: 'Email already exist'
        });
    }

    const usuario = new Usuario(req.body);

    //Encriptar Password

    const salt = bdcrypt.genSaltSync();
    usuario.password = bdcrypt.hashSync( password, salt );


    await usuario.save();

    const token = await generateJWT( usuario.id);

    res.json({
        ok: true,
        usuario,
        token
    });
        
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });
    }

}

const actualizarUsuario = async (req, res = response) =>{

    //TODO Validar token y comprobar
    // si el usuario es correcto

    const uid = req.params.id;


    try {

       const usuarioDB = await Usuario.findById( uid );

       if( !usuarioDB){
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese Id'
        });
       }

       // Actualizar
       const { password, google, email, ...campos} = req.body;

       if( usuarioDB.email !== email){

            const existEmail = await Usuario.findOne({ email});
            if(existEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                });
            }
       }

       campos.email = email;

       const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true});


       res.json({
        ok: true,
        usuario: usuarioActualizado
       })



        
    } catch (err) {
        console.log(err);

        resizeTo.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

const borrarUsuario = async( req, res= response) => {

    const uid = req.params.id;

        try {
            const usuarioDB = await Usuario.findById( uid );

            if( !usuarioDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un usuario por ese Id'
                });
            }

            await Usuario.findByIdAndDelete( uid);

            res.json({
                ok: true,
                msg: 'Usuario eliminado'
            })
            
        } catch (err) {
            console.log(err)
            
        }
}

module.exports = {
    getUsuarios,
    createUsuario,
    actualizarUsuario,
    borrarUsuario
}