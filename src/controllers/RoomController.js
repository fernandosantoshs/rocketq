const Database = require("../db/config");

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password

    let roomId
    let isRoom = true

    while (isRoom) {
      for (let i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString())
      }

      // o '.all' roda uma query e traz todos os resultados da db, guardando-os em um array na variável roomExistIds
      const roomExistIds = await db.all(`SELECT id FROM rooms`)

      // o método .some()
      isRoom = roomExistIds.some((roomExistId) => roomExistIds === roomId)

      // Se o numero da sala que foi criado no 'for' não existir, insere-se na tabela
      if (!isRoom) {
        await db.run(`INSERT INTO rooms (
                id, pass
                ) VALUES (
                    ${parseInt(roomId)}, '${pass}'
                )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room
    
    const questions = await db.all(`
    SELECT 
    id, title, read, room
    FROM questions WHERE room = ${roomId} and
    read = 0`)

    const questionsRead = await db.all(`
    SELECT 
    id, title, read, room
    FROM questions WHERE room = ${roomId} and
    read = 1`)

    let haveQuestions = questions.length == 0 && questionsRead.length == 0 ? false : true

    await db.close()
    // res.render("room", { roomId: roomId, questions: questions }) Se o nome da propriedade for igual a constante passada, basta passar o nome uma vez apenas
    res.render("room", { roomId, questions, questionsRead, haveQuestions })
  },

  enter(req,res){
    const roomId = req.body.roomId


    res.redirect(`/room/${roomId}`)
  }
};
