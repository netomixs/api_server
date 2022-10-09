const mysql = require('../config/db.config');

let usuarios = {};



usuarios.getTodosUsuarios = (result) => {
    mysql.query("SELECT * FROM usuario", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);

    });
}
usuarios.getIdUser = (body,result) => {
    mysql.query("SELECT id FROM usuario WHERE correo=? AND clave=?",[body.correo,body.clave], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null)
    });
}
usuarios.insertUsuario = (body,result) => {
    mysql.query("SELECT id FROM usuario WHERE correo=?",[body.correo,body.clave], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        else if (res.length) {
            result({kind:"FULL"}, res);
            return;
        }
        else{
            mysql.query("INSERT INTO usuario (nombre, apellidoP, apellidoM, correo, clave) VALUES (?,?,?,?,?);", [body.nombre, body.apellidoP, body.apellidoM, body.correo, body.clave], (err, res) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                    return;
                }
                var IdUser=res.insertId;
            
                result(null, res);
            });
        }
        result({ kind: "Error" }, null);
    });
}
//Insertra Usuario
/*usuarios.insertUsuario = (body, result) => {
    mysql.query("INSERT INTO usuario (nombre, apellidoP, apellidoM, correo, clave) VALUES (?,?,?,?,?);", [body.nombre, body.apellidoP, body.apellidoM, body.correo, body.clave], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}*/
//Ingresa en la tabla verificacion el envio de un correo de verificacion de correo
usuarios.insertarCorreoVerificacion = (body, result) => {
    let date_ob = new Date();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();
// prints date & time in YYYY-MM-DD HH:MM:SS format
let fehca=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    mysql.query("INSERT INTO correoVerificado(usuario,verificado,fechaEnvio) values(?,?,?)", [body.id,false, fehca], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        result(null, res);
    });
}
//Cambia de no verificado a verificado
usuarios.enlaceVerificacion=(body, result) => {
    const idUser = body.id;
   console.log(body);
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    let fehca=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    mysql.query("UPDATE correoVerificado SET verificado=?, 	fechaVerificacion=? WHERE usuario=? ", [true, fehca,idUser], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(idUser);
        result(null, res);
    });

};
usuarios.getUserById = (body, result) => {
    mysql.query("SELECT * FROM usuario where id=?", [body.id], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}
module.exports = usuarios;