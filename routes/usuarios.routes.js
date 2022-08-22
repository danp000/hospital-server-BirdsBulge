/* Ruta: /api/usuarios */

const { Router } = require('express');
const { check } = require('express-validator');
const { validCamps } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsuarios, crearUsuario, editarUsuario, borrarUsuario } = require('../controllers/usuarios');

const router = Router();


router.get( '/', validarJWT, getUsuarios );

router.post( '/', 
  [
    check('nombre', 'Hay que facilitar un nombre').not().isEmpty(),
    check('password', 'La contraseña tiene que ser mínimo 5 caracteres').isLength({ min: 4 }),
    check('email', 'El email no es correcto').isEmail(),
    validCamps

  ], crearUsuario );

router.put( '/:id', 
  [
    validarJWT,
    check('nombre', 'Hay que facilitar un nombre').not().isEmpty(),
    check('email', 'El email no es correcto').isEmail(),
    check('role', 'Hay que presentar un role').not().isEmpty(),
    validCamps
    
  ], editarUsuario );


  router.delete( '/:id', validarJWT, borrarUsuario );






module.exports = router;