// '/api/capacitacion'

const  { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { getCapacitacion, crearCapacitacion, borrarCapacitacion, actualizarCapacitacion } = require('../controller/capacitacion');
const { validarJWT } = require('../middleware/validat-jwt');


router.get('/', validarJWT, getCapacitacion  );
router.post('/', validarJWT, [
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    check('NivelCapacitacion', 'El nivel es obligatorio').not().isEmpty(),
    check('FechaDesde', 'La fecha de inicio es obligatorio').not().isDate(),
    check('fechaHasta', 'La fecha de finalizacion es obligatorio').not().isDate(),
    check('Institucion', 'La institucion es obligatorio').not().isEmpty(),
    validarCampos,
], crearCapacitacion )

router.put('/:id', validarJWT, [
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    check('NivelCapacitacion', 'El nivel es obligatorio').not().isEmpty(),
    check('FechaDesde', 'La fecha de inicio es obligatorio').not().isDate(),
    check('fechaHasta', 'La fecha de finalizacion es obligatorio').not().isDate(),
    check('Institucion', 'La institucion es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarCapacitacion );

router.delete('/:id', validarJWT, borrarCapacitacion )

module.exports = router;