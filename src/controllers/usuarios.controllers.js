const Usuarios = require("../models/usuarios");
var PHE = require("print-html-element");
var nodemailer = require('nodemailer');
var database = require('../config/db.config');

exports.getTodosUsuarios = (req, res) => {
    Usuarios.getTodosUsuarios((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    code: 404,
                    message: 'not found',
                });
            } else {
                res.status(500).send({
                    code: 500,
                    message: 'Error en la bd',
                });
            }
        } else {
            res.status(200).send(data);
        }
    });
}



exports.insertUsuario = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            code: 400,
            message: 'Empty body',
        });
        
    } else {
        Usuarios.insertUsuario(req.body, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        code: 404,
                        message: 'Usuario no encontrado',
                    });
                    return;
                }
                if (err.kind === "FULL") {
                    res.status(500).send({
                        code: 500,
                        message: 'El correo ya esta registrado',
                    });
                    return;
                }
          
         
            } else {
                var id=data.insertId;
                res.status(200).send({
                   id
                });
            }
        });
    }
}
exports.insertarCorreoVerificacion = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            code: 400,
            message: 'Empty body',
        });
    } if (req.body.correo==null) {
        res.status(400).send({
            code: 400,
            message: 'Falta correo',
        }); 
    }
    else {
        Usuarios.insertarCorreoVerificacion(req.body, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        code: 404,
                        message: 'not found',
                    });
                    return;
                }
                if (err.errno === 1062) {
                    res.status(500).send({
                        code: 1062,
                        err: err,
                        message: 'Error duplicate entry for this user',
                    });
                    return;
                }
                res.status(500).send({
                    code: 500,
                    err: err,
                    message: 'Error en la bd',
                });
            } else {
                res.status(200).send({
                    data: data,
                    message:"Se envio un correo para la validacion de cuenta",
                });
                enviarCorreo(req.body.id,"https://proyectoisc.alwaysdata.net",req.body.correo);
            }
        });
    }
}

function enviarCorreo(id,host,email){
    var transporter = nodemailer.createTransport({
        host: 'smtp-proyectoisc.alwaysdata.net',
        port:465,
        auth: {
          user: 'proyectoisc@alwaysdata.net',
          pass: 'pokemonDiamanteyPerla'
        }
      });
      var mensaje="Ingresa a este enlace para completar la validacion de correo "+host+"/usuarios/validacion?id="+id;
      var mailOptions = {
        from: 'proyectoisc@alwaysdata.net',
        to: email,
        subject: 'Verificacion de correo',
        text: mensaje
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
}
///Pretento obtener el Id de un usuario
exports.getIdUser = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            code: 400,
            message: 'Empty body',
        });
    } else {
        Usuarios.getIdUser(req.body, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        code: 404,
                        message: 'Usuario no encontrado',
                    });
                    return;
                }
                res.status(500).send({
                    code: 500,
                    err: err,
                    message: 'No es posible la conexion con el servidor',
                });
            } else {
                res.status(200).send(data);
            }
        });
    }
}
exports.enlaceVerificacion = (req, res) => {
    console.log(req.query.id);
    if (req.body.constructor === Object && Object.keys(req.query).length === 0) {
        res.status(400).send({
            code: 400,
            message: 'Empty body',
        });
    } else {
        Usuarios.enlaceVerificacion(req.query, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        code: 404,
                        message: 'not found',
                    });
                    return;
                }
                if (err.errno === 1062) {
                    res.status(500).send({
                        code: 1062,
                        err: err,
                        message: 'Error duplicate entry for this user',
                    });
                    return;
                }
                res.status(500).send({
                    code: 500,
                    err: err,
                    message: 'Error en la bd',
                });
            } else {

                res.status(200).send({
                    data: data,
                    message:"Verificacion exitosa",
                });

            }
        });
    }
}
exports.getUserById = (req, res) => {
  
    if (req.body.constructor === Object && Object.keys(req.params).length === 0) {
        res.status(400).send({
            code: 400,
            message: 'Empty body',
        });
    } else {
        Usuarios.getUserById(req.params, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        code: 404,
                        message: 'not found',
                    });
                    return;
                }
                if (err.errno === 1062) {
                    res.status(500).send({
                        code: 1062,
                        err: err,
                        message: 'Error duplicate entry for this user',
                    });
                    return;
                }
                res.status(500).send({
                    code: 500,
                    err: err,
                    message: 'Error en la bd',
                });
            } else {

                res.status(200).send({data
                });

            }
        });
    }
}

