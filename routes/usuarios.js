const express = require('express')
const mysql = require('../mysql')
const router = express.Router()
const conn = mysql.conn

router.get('/', (req, res, next) => {
    conn.query('SELECT * FROM Usuarios', function(error, results, fields) {
        if(error) return res.status(500).send({error: error})
        res.status(200).send(results)
    })
})

router.get('/:id', (req, res, next) => {
    conn.query('SELECT * FROM Usuarios WHERE ID=' + parseInt(req.params.id), function(error, results, fields) {
        if(error) return res.status(500).send({error: error})
        res.status(200).send(results)
    })
})

router.post('/', (req, res, next) => {
    conn.query('INSERT INTO Usuarios (nome, cpf, email) VALUES (?, ?, ?)', [req.body.nome, req.body.cpf, req.body.email], function(error, results, fields) {
        if(error) return res.status(500).send({error: error})
        res.status(201).send('Usuario cadastrado na database com sucesso.')
    })
})

router.put('/:id', (req, res, next) => {
    conn.query('UPDATE Usuarios SET nome = ?, cpf = ?, email = ? WHERE ID=' + parseInt(req.params.id), [req.body.nome, req.body.cpf, req.body.email], function(error, results, fields) {
        if(error) return res.status(500).send({error: error})
        if(results.affectedRows > 0){
            res.status(201).send('Usuario alterado na database com sucesso.')
        } else {
            res.status(500).send('Usuario não encontrado na database.')
        }
    })
})

router.delete('/:id', (req, res, next) => {
    conn.query('DELETE FROM Usuarios WHERE ID=' + parseInt(req.params.id), function(error, results, fields) {
        if(error) return res.status(500).send({error: error})
        if(results.affectedRows > 0){
            res.status(201).send('Usuario deletado da database com sucesso.')
        } else {
            res.status(500).send('Usuario não encontrado na database.')
        }
    })
})

module.exports = router