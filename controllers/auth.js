const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignin = async( req, res = response ) => {

  try {

    const { email, name, picture } = await googleVerify( req.body.token );

    const userdb = await Usuario.findOne({ email });
    let usuario;

    if ( !userdb ) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@##',
        img: picture,
        google: true
      });
    } else {
      usuario = userdb;
      usuario.google = true;
    }

    // Guardar usuario
    await usuario.save();

    // Generar el TOKEN - JWT
    const token = await generarJWT( usuario.id );

    res.json({
      ok: true,
      msg: 'Login with google completado',
      email, name, picture, token
    });
    
  } catch (er) {
    console.log(er);
    res.status(400).json({
      
      ok: false,
      msg: 'Token google incorrecto'
    });
  }
}

const renovarToken = async( req, res = response ) => { 

  const uid = req.uid;

  // Generar el TOKEN - JWT
  const token = await generarJWT( uid );

  res.json({
    ok: true,
    token
  });
}



module.exports =  { login, googleSignin, renovarToken }; 