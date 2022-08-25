const { response } = require('express');
const Ornitologo = require('../models/ornitologo');
const Hospital = require('../models/hospital');


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
      msg: 'Sucedió un error en el servidor, tratamos de comprobar en un momento'
    });
  }
}

const editarOrnitologo = async( req, res = response ) => {

  const id = req.params.id;
  const hid = req.body.hospital;
  const uid = req.uid;

  let ornitol = false;
  let hospital = false;

  try {

    [ ornitol, hospital ]  = await Promise.all([
      Ornitologo.findById(id),
      Hospital.findById(hid)
    ]);

    if( !ornitol ) {
      return res.status(400).json({
        ok: false,
        msg: 'Id del ornitologo no existe en la base de datos'
      });
    }
    if( !hospital ) {
      return res.status(400).json({
        ok: false,
        msg: 'Id del hospital no existe en la base de datos'
      });
    }
    
  } catch (er) {

    if ( !ornitol ) {
      return res.status(400).json({
        ok: false,
        msg: 'Id de ornitologo con formato incorrecto'
      });
    }
    console.log(er);
    return res.status(500).json({
      ok: false,
      msg: 'Sucedió un error en el servidor, tratamos de comprobar en un momento'
    });
  }
  try {

    const camposNuevos = { usuario: uid, ...req.body }; 

    const ornitolEditado = await Ornitologo.findByIdAndUpdate( id, camposNuevos, { new: true } ); 

    res.json({
      ok: true,
      msg: 'Ornitologo editado',
      ornitologo: ornitolEditado
    });
    
  } catch (er) {
    console.log(er);
    return res.status(500).json({
      ok: false,
      msg: 'Sucedió un error en el servidor, tratamos de comprobar en un momento'
    });
  }
}

const borrarOrnitologo = async( req, res = response ) => {

  const id = req.params.id;
  let ornitol = false;

  try {

  ornitol = await Ornitologo.findById(id);
  if( !ornitol ) {
    return res.status(400).json({
      ok: false,
      msg: 'Id del ornitologo no existe en la base de datos'
    });
  }

  await Ornitologo.findByIdAndDelete(id);
  res.json({
    ok: true,
    msg: 'Ornitologo borrado',
  });
    
  } catch (er) {

    if ( !ornitol ) {
      return res.status(400).json({
        ok: false,
        msg: 'Id de ornitologo con formato incorrecto'
      });
    }

    console.log(er);
    return res.status(500).json({
      ok: false,
      msg: 'Sucedió un error en el servidor, tratamos de comprobar en un momento'
    });
  }
}




module.exports = { getOrnitologos, addOrnitologo, editarOrnitologo, borrarOrnitologo }