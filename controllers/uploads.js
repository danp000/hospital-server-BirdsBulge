const path = require('path');
const fs = require('fs');

const Usuario = require('../models/usuario');
const Ornitol = require('../models/ornitologo');
const Hospital = require('../models/hospital');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImg } = require('../helpers/actualizar-img');


const subirArchivo = async( req, res = response ) => {

  const tipo = req.params.tipo;
  const id = req.params.id;

  try {

    const checkid = await Promise.all([
      Ornitol.findById(id),
      Hospital.findById(id),
      Usuario.findById(id)
    ]);

    // console.log(checkid);
    if ( checkid[0] === null && checkid[1] === null && checkid[2] === null ) {

      return res.status(404).json({
        ok: false,
        msg: 'ID erróneo o no se encontró'
      });
    }
  } catch (error) {

    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'El id no tiene el formato correcto'
    });
    
  }

 
  const tiposValidos = ['hospitales', 'ornitologos', 'usuarios'];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'Los tipos validos son ornitologo, usuario y hospital'
    });
  }

  // Validar si existe un archivo
  if ( !req.files || Object.keys(req.files).length === 0 ) {
    return res.status(400).json({ ok: false, msg: 'No hay archivo para subir' });
  }

  // Procesar la img...
  const arch = req.files.imagen;


  const nombreCortado = arch.name.split('.'); // wol.1.2.jpg
  const extensionArch = nombreCortado[ nombreCortado.length - 1 ];

  // Validar extension
  const extsVals = [ 'png', 'jpg', 'jpeg', 'gif' ];
  if ( !extsVals.includes( extensionArch ) ) {

    return res.status(400).json({ ok: false, msg: 'La extension del archivo no-valida' });

  }

  // Generar nombre archivo
  const nombreArch = `${ uuidv4() }.${ extensionArch }`;

  // Path guardar img
  const  path = `./uploads/${ tipo }/${ nombreArch }`;

   // Mover imagen
  arch.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'La imagen no se ha podido mover , error desonocido'
      });

    }

    // Actualizar base de datos
    actualizarImg( tipo, id, nombreArch );
    
     
    res.json({
      ok: true,
      msg: 'Archivo subido',
      nombreArch
    });
  });

}

const returnImg = ( req, res = response ) => {

  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

  // imagen por defecto
  if (fs.existsSync( pathImg )) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join( __dirname, `../uploads/no-bird.jpg` );
    res.sendFile(pathImg);
  }
  
}




module.exports = { subirArchivo, returnImg }


