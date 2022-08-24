const fs = require('fs');

const Usuario = require('../models/usuario');
const Ornitol = require('../models/ornitologo');
const Hospital = require('../models/hospital');


const borrarImg = ( path ) => {

  if (fs.existsSync( path )) {
    // borrar img anterior
    fs.unlinkSync( path );
  }
}

const actualizarImg = async( tipo, id, nombreArch ) => {

  switch( tipo ) {
    case 'ornitologos':
        { const ornitol = await Ornitol.findById(id);
        if ( !ornitol ) {
          console.log( 'No se encontró ornitol con este id' );
          return false;
        }

        const pathAnterior =`./uploads/ornitologos/${ ornitol.img }`;
        borrarImg( pathAnterior );

        ornitol.img = nombreArch;
        await ornitol.save();
        return true; }

    break;

    case 'usuarios':
        const usuario = await Usuario.findById(id);
        if ( !usuario ) {
          console.log( 'No se encontró usuario con este id' );
          return false;
        }

        const pathViejo =`./uploads/usuarios/${ usuario.img }`;
        borrarImg( pathViejo );

        usuario.img = nombreArch;
        await usuario.save();
        return true;
        
    break;

    case 'hospitales':
        const hospital = await Hospital.findById(id);
        if ( !hospital ) {
          console.log( 'No se encontró hospital con este id' );
          return false;
        }

        const pathAnterior =`./uploads/hospitales/${ hospital.img }`;
        borrarImg( pathAnterior );

        hospital.img = nombreArch;
        await hospital.save();
        return true;

    break;
  }
}





module.exports = { actualizarImg }