const express = require('express') // pega a biblioteca express para ser utilizada
const bodyParser = require('body-parser')

const userRoute = require('./routes/userRoute')

const app = express()
app.use(bodyParser.urlencoded({ extended:false }))

userRoute(app)

app.listen(3000, () => console.log("Servidor rodando"))