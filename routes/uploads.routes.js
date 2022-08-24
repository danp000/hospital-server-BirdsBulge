/* Ruta: /api/subir/ */

const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const { subirArchivo, returnImg } = require('../controllers/uploads');

const router = Router();


router.use( fileUpload() );

router.put( '/:tipo/:id', validarJWT, subirArchivo );

router.get( '/:tipo/:foto', returnImg );




module.exports = router;