const { response } = require('express');
const Ornitologo = require('../models/ornitologo');


const getOrnitologos = async( req, res = response ) => {

  const ornitologos = await Ornitologo.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img');

  res.json({
    ok: true,
    ornitologos
  });
}

const addOrnitologo = async( req, res = response ) => {

  const uid = req.uid;
  const ornitol = new Ornitologo({ usuario: uid,...req.body });

  try {

    const ornitolDB = await ornitol.save();

    res.json({
      ok: true,
      ornitol: ornitolDB,
      });
    
  } catch (er) {
    console.log(er);
    return res.status(500).json({
      ok: false,
      msg: 'Sucedió un error en el servidor, tratamos comprobar en un momento'
    });
  }
}

const editarOrnitologo = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'editOrni'
  });
}

const borrarOrnitologo = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'borrarOrnitologo'
  });
}




module.exports = { getOrnitologos, addOrnitologo, editarOrnitologo, borrarOrnitologo }