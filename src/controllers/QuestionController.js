const Database = require('../db/config')

module.exports = {
    async index(req, res){
        const db = await Database()

        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        //Por ser uma password, não deve ser passada pelo params(params passa dados pela url), mas pelo .body (por segurança)
        const password = req.body.password

        // Verificar senha //

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        // Quando trouxer um array da db pode-se selecionar os campos com .nomeDoCampo assim como está abaixo
        if(verifyRoom.pass == password){
            if(action == "delete"){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            } else if (action == "check"){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }

            res.redirect(`/room/${roomId}`)

        } else {

            res.render(`incorrectpassword`, { roomId, password, verifyRoom})
        }
        
    },
    
    async create(req,res){
        const db = await Database()

        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        ) VALUES (
            '${question}',
            ${roomId},
            0
        )`)
        
        res.redirect(`/room/${roomId}`)

    }
}