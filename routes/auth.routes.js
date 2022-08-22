/* Ruta: /api/login */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validCamps } = require('../middlewares/validar-campos');


const router = Router();

router.post( '/', [

  check('email', 'Su email falta o es incorrecto').isEmail(),
  check('password', 'Te has equivocado la contraseña o esta faltando').isLength({ min: 4 }),
  validCamps

], login);






module.exports = router;