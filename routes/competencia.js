// Ruta: /api/competencias

const { Router } = require('express');
const router = Router();
const { getCompetencia, crearCompetencia, actualizarCompetencia, borrarCompetencia } = require('../controller/competencia');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validat-jwt');

router.get('/', validarJWT, getCompetencia );
router.post('/', validarJWT, [
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    validarCampos,
], crearCompetencia)

router.put('/:id', validarJWT, [
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarCompetencia );

router.delete('/:id', validarJWT, borrarCompetencia)

module.exports = router