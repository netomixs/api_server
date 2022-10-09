const usuarios = require("../models/usuarios");

module.exports = app => {
    const Usuarios = require("../controllers/usuarios.controllers");
    app.get("/usuarios/getAll", Usuarios.getTodosUsuarios);   
    app.post("/usuarios/getidUser", Usuarios.getIdUser);   
    app.post("/usuarios/insertUsuario", Usuarios.insertUsuario);
    app.post("/usuarios/EnviarcorreoVerificar", Usuarios.insertarCorreoVerificacion);
    app.get("/usuarios/validacion", Usuarios.enlaceVerificacion);
    app.get("/usuarios/getByIdUser/:id", Usuarios.getUserById); 
}