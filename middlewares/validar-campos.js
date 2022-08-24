
const { response } = require('express');
const { validationResult } = require('express-validator');

const validCamps = ( req, res = response, next ) => {

  const ers = validationResult( req );

  if ( !ers.isEmpty() ) {
    return res.status(400).json({
      ok: false,
      errors: ers.mapped()
    });
  }
  next();
}


module.exports = { validCamps };