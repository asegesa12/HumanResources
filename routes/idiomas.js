// '/api/idiomas'

const  { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { getIdiomas, crearIdioma, borrarIdioma, actualizarIdioma } = require('../controller/idiomas');
const { validarJWT } = require('../middleware/validat-jwt');


router.get('/', validarJWT, getIdiomas  );
router.post('/', validarJWT, [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos,
], crearIdioma )

router.put('/:id', validarJWT, [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarIdioma );

router.delete('/:id', validarJWT, borrarIdioma )

module.exports = router;