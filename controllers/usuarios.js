const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [ usuarios, total ] = await Promise.all([

    Usuario.find({}, "nombre email role google img").skip(desde)
           .limit(5),
           
    Usuario.countDocuments()
  ]);

  res.json({ ok: true, usuarios, total });
};

const crearUsuario = async (req, res = response) => {

  const { password, email } = req.body;

  try {
    const emailUsado = await Usuario.findOne({ email });

    if (emailUsado) {
      return res.status(400).json({
        ok: false,
        msg: "Se ha encontrado una cuenta con este email",
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Generar token
    const token = await generarJWT(usuario.id);

    await usuario.save();

    res.json({ ok: true, usuario, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor. De momento no se puede hacer nada..",
    });
  }
};

const editarUsuario = async (req, res = response) => {
  // TODO: Validar token y comprobar si es el usuario correcto

  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no se ha encontrado",
      });
    }

    // Edits
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const emailUsado = await Usuario.findOne({ email });

      if (emailUsado) {
        return res.status(400).json({
          ok: false,
          msg: "El email esta vinculado a otra cuenta",
        });
      }
    }

    campos.email = email;

    const usuarioEditado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioEditado,
    });
    
  } catch (er) {
    console.log(er);
    res.status(500).json({
      ok: false,
      msg: "Algo salió mal en el servidor",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  console.log(uid);

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no se ha encontrado",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    return res.status(200).json({
      ok: true,
      msg: "Usuario removido correctamente",
    });
  } catch (er) {
    console.log(er);
    res.status(500).json({
      ok: false,
      msg: "Ocurrió un error inesperado en el servidor",
    });
  }
};

module.exports = { getUsuarios, crearUsuario, editarUsuario, borrarUsuario };
