// '/api/candidato'

const  { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const {  crearCandidato, getCandidatos } = require('../controller/candidato');
//const { validarJWT } = require('../middleware/validat-jwt');


router.get('/',  getCandidatos  );
router.post('/', [
    check('cedula','Cedula es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('idioma', 'El idiomas no es un id valido').isMongoId(),
    check('puesto', 'El puesto no es un id valido').isMongoId(),
    check('departamento', 'El departamento es obligatorio').not().isEmpty(),
    check('salario', 'El salario es obligatorio').not().isEmpty(),
    check('competencia', 'La competencia no es un id valido').isMongoId(),
    check('capacitacion', 'La capacitacion no es un id valido').isMongoId(),
    check('experiencia_Laboral', 'La experiencia es obligatario').not().isEmpty(),
    check('recomendadoPor', 'La recomendacion es obligatario').not().isEmpty(),

    validarCampos,
], crearCandidato )


//router.delete('/:id', validarJWT, borrarPuesto )

module.exports = router;