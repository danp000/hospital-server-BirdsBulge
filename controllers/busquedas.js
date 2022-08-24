
const { response } = require('express');

const Usuario = require('../models/usuario');
const Ornitol = require('../models/ornitologo');
const Hospital = require('../models/hospital');


const getUniversal = async( req, res = response ) => {
 
  const termino = req.params.termino;
  const regex = new RegExp( termino, 'i' );

  const [usuarios, ornitols, hospits] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Ornitol.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios, ornitols, hospits
  });
}

const getSpecific = async( req, res = response ) => {
 
  const tabla = req.params.table;
  const busqueda = req.params.termino;
  const regex = new RegExp( busqueda, 'i' );

  let data = [];

  // if ( tabla === null ) {

  //   return res.status(204).json({
  //     ok: false,
  //     msg: 'No hay ningun término en la busqueda, por favor introduce algo'
  //   });

  // } 
  switch ( tabla ) {
    case 'ornitologos':
      data = await Ornitol.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
      
      break;
    case 'hospitales':
      data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
      
      break;
    case 'usuarios':
      data = await Usuario.find({ nombre: regex });
      
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: 'la tabla tiene que ser ornitologos/usuarios/hospitales'
      });
  }
  res.json({ ok: true, resultados: data});
}




module.exports = { getUniversal, getSpecific }
 
