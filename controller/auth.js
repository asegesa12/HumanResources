const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) =>{

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:'email no encontrado'
            })
        }

        //Verificar Password

        const validPassword = bcrypt.compareSync( password, usuarioDB.password);

        if( !validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        const token = await generateJWT( usuarioDB.id)

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
}

module.exports = {
    login
}