const jwt = require('jsonwebtoken');



const generarJWT = ( uid ) => {

  return new Promise( ( resolve, reject ) => {

    const payload = { 
      uid
    };

    jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '19h' }, 
    
      ( er, tk ) => {

      if (er) {
        console.log(er);
        reject('No se pudo generar el token');
      } else {
        resolve( tk );
      }
    });
  });
}



module.exports = { generarJWT }