
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

  // Leer token
  const token = req.header('q-token');

  if ( !token ) {
    return res.status(401).json({
      ok: false,
      msg: 'No se encontro ningùn token en la petición'
    });
  }

  try {

    const { uid } = jwt.verify( token, process.env.JWT_SECRET );
    req.uid = uid;

    next();
    
  } catch (er) {
    return res.status(401).json({
      ok: false,
      msg: 'Token inválido'
    })
  }

  

}



module.exports = { validarJWT };