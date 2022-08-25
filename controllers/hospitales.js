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

const editarHospital = async( req, res = response ) => {

  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(id);

    if ( !hospital ) {

      res.status(404).json({
        ok: false,
        msg: 'No se pudo encontrar un hospital con este id'
      });
    }

    const campoNombre = req.body;

    const hospitalEditado = await Hospital.findByIdAndUpdate(
                       id, { campoNombre, usuario: uid }, 
                                { new: true });

    res.json({
      ok: true,
      msg: 'Hospital editado',
      hospital: hospitalEditado
    });
    
  } catch (er) {
    console.log(er);
    res.status(500).json({
      ok: false,
      msg: 'Error técnico, el administrador puede ayudarles'
    }); 
  }
}

const borrarHospital = async( req, res = response ) => {

  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);

    if ( !hospital ) {

      res.status(404).json({
        ok: false,
        msg: 'No se pudo encontrar un hospital con este id'
      });
    }

    const hsopitalBorrado = await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'Hospital borrado',
      hospital: hsopitalBorrado
    });
    
  } catch (er) {
    console.log(er);
    res.status(500).json({
      ok: false,
      msg: 'Error técnico, el administrador puede ayudarles'
    }); 
  }
}




module.exports = { getHospitales, addHospital, editarHospital, borrarHospital }