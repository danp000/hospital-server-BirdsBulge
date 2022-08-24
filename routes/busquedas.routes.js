/* Ruta: /api/todo/ */

const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getUniversal, getSpecific } = require('../controllers/busquedas');

const router = Router();

router.get( '/:termino', validarJWT, getUniversal );

router.get( '/coleccion/:table/:termino', validarJWT, getSpecific );




module.exports = router;