/* '/api/ornitologos' */

const { Router } = require('express');
const { check } = require('express-validator');
const { validCamps } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getOrnitologos, addOrnitologo, editarOrnitologo, borrarOrnitologo } = require('../controllers/ornitologos');

const router = Router();


router.get( '/', getOrnitologos );

router.post( '/', 
  [
    validarJWT,
    check('nombre', 'Tiene que especificar un nombre').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser válido').isMongoId(),
    validCamps,

  ], addOrnitologo );

router.put( '/:id', 
  [
    validarJWT,
    check('nombre', 'Especifica un nombre nuevo').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser válido').isMongoId(),
    validCamps,

  ], editarOrnitologo );


  router.delete( '/:id', validarJWT, borrarOrnitologo );






module.exports = router;