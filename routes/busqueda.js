const { Router } = require('express');
const router = Router();

const { getTodo, getDocumentCollection } = require('../controller/busqueda');
const { validarJWT } = require('../middleware/validat-jwt');


router.get('/:termino', validarJWT,  getTodo  );
router.get('/coleccion/:tabla/:termino', validarJWT,  getDocumentCollection  );





module.exports = router;