/* '/api/hospitales' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validCamps } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, addHospital, editarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();


router.get( '/', getHospitales );

router.post( '/', 
  [
    validarJWT,
    check('nombre', 'Hay que designar un nombre al hospital').not().isEmpty(),
    validCamps
    
  ], addHospital );

router.put( '/:id', editarHospital );

router.delete( '/:id', borrarHospital );




module.exports = router;