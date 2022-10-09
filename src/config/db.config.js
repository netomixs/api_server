const mysql = require("mysql");

var host="mysql-proyectoisc.alwaysdata.net";
 const connection = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: host,
    user: '282937',
    password: 'pokemonDiamanteyPerla',
    database: 'proyectoisc_diario',
    port: '3306',
}); 




module.exports = connection;