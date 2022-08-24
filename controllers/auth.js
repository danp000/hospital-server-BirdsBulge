const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {

  const { email, password } = req.body;

  try {

    const usuarioDB = await Usuario.findOne( { email } );

    if ( !usuarioDB ) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no se ha encontrado o no existe, verifique el email'
      });
    }

    // Verificar contraseña
    const valPas = bcrypt.compareSync( password, usuarioDB.password );

    if ( !valPas ) {
      return res.status(400).json({
        ok: false,
        msg: 'Habéis introducido una contraseña inexacta'
      });
    }

    // Generar el TOKEN - JWT
    const token = await generarJWT( usuarioDB.id );

    res.json({
      ok: true,
      token
    });
    
  } catch (er) {

    console.log(er);
    res.status(500).json({
      ok: false,
      msg: 'Error repentino, disculpen el inconveniente'
    });
  }
}



module.exports =  { login }; 