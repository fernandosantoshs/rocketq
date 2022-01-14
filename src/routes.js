const express = require('express')
const route = express.Router()

const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

route.get('/', (req,res) => res.render("index", {page: 'enter-room'}))

route.get('/create-pass', (req,res) => res.render("index", {page: 'create-pass'}))

route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enterroom', RoomController.enter)


route.post('/question/create/:room', QuestionController.create)
// Usa-se o ':' na rota para criar uma 'variavel' no express, quando o valor vai depender da ação do user
// Neste caso, o /room refere-se ao room.ejs, o /:room o número da sala, o /:question seria o id da questao e o /:action a ação do usuário (Lida ou Excluir)
route.post('/question/:room/:question/:action', QuestionController.index)



module.exports = route