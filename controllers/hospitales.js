const { response } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async( req, res = response ) => {

  const hospitales = await Hospital.find().populate('usuario', 'nombre img');

  res.json({
    ok: true,
    hospitales
  });
}

const addHospital = async( req, res = response ) => {

  const uid = req.uid;
  const hospital = new Hospital( { usuario: uid, ...req.body } );

  try {

    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB
    });
  
    
  } catch (er) {
    console.log(er);
    res.status(500).json({
      ok: false,
      msg: 'Sucedió un error repentino en el servidor'
    }); 
  } 
}

const editarHospital = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'editHospitales'
  });
}

const borrarHospital = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'borrarHospitales'
  });
}




module.exports = { getHospitales, addHospital, editarHospital, borrarHospital }