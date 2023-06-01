// '/api/puestos'

const  { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { getPuesto, crearPuesto, borrarPuesto, actualizarPuesto } = require('../controller/puesto');
const { validarJWT } = require('../middleware/validat-jwt');


router.get('/', validarJWT, getPuesto  );
router.post('/', validarJWT, [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('NivelRiesgo', 'El nivel es obligatorio').not().isEmpty(),
    check('SalarioMin', 'El salaio minimo es obligatorio').not().isEmpty(),
    check('SalarioMax', 'El salario maximo es obligatorio').not().isEmpty(),
    validarCampos,
], crearPuesto )

router.put('/:id', validarJWT, [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('NivelRiesgo', 'El nivel es obligatorio').not().isEmpty(),
    check('SalarioMin', 'El salaio minimo es obligatorio').not().isEmpty(),
    check('SalarioMax', 'El salario maximo es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarPuesto );

router.delete('/:id', validarJWT, borrarPuesto )

module.exports = router;