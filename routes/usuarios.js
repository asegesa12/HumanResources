// Ruta: /api/usuarios

const { Router } = require('express');
const router = Router();
const { getUsuarios, createUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validat-jwt');

router.get('/', validarJWT, getUsuarios );
router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
], createUsuario)

router.put('/:id', validarJWT, [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsuario );

router.delete('/:id', validarJWT, borrarUsuario)

module.exports = router