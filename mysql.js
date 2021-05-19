const mysql = require('mysql')

const conn = mysql.createConnection({
    host: process.env.hostMysql,
    port: process.env.portMysql,
    user: process.env.userMysql,
    password: process.env.passMysql,
    database: process.env.databaseMysql
})

conn.connect(function(err){
    if(err) return console.error(err)
    createTable()
    console.log('Conectado ao MySQL.')
})

function createTable(){
    const sql = 'CREATE TABLE IF NOT EXISTS Usuarios(ID int NOT NULL AUTO_INCREMENT, nome varchar(150) NOT NULL, cpf char(11) NOT NULL, email varchar(150), PRIMARY KEY(ID))'
    conn.query(sql, function(err, results, fields) {
        if(err) return console.error(err)
    })
}

exports.conn = conn