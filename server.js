require('dotenv').config()
const express = require('express')

const usersRoute = require('./routes/usuarios')

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow_Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method == 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
        return res.status(200).send({})
    }
    next()
})

app.use('/usuarios', usersRoute)

app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404
    next(err)
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).send(error.message)
})

app.listen(process.env.PORT || 3000)