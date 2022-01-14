const express = require('express')

const routes = require('./routes')

const path = require('path')

const server = express()

server.set('view engine', 'ejs')

server.use(express.static('public'))

server.set('views', path.join(__dirname, 'views'))

//Para que seja possível enviar dados pela rota (no caso, input do password), é necessário habilitar/configurar um middleware, um intermediário entre a rota e controller. No express é o método urlencoded({ extended: true }). Sendo assim, a rota pode decodificar a informacao e passar para o controller.
server.use(express.urlencoded({ extended : true }))

server.use(routes)

server.listen(3000, () => console.log('Rodando'))