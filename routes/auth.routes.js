/* Ruta: /api/login */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validCamps } = require('../middlewares/validar-campos');


const router = Router();

router.post( '/', [

  check('email', 'Su email falta o es incorrecto').isEmail(),
  check('password', 'Te has equivocado la contraseña o esta faltando').isLength({ min: 4 }),
  validCamps

], login);

router.post( '/google', [

  check('token', 'Token de google obligatorio').isJWT(),
  validCamps

], googleSignin);




module.exports = router;