// Path: '/api/login'

const  { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validarCampos } = require('../middleware/validar-campos');

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)


module.exports = router;