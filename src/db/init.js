const Database = require('./config')

const initDb = {
    async init(){
        const db = await Database()

        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pass TEXT
        )`)

        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INTEGER,
            room INTEGER
        )`)

        await db.close() // Fecha conexão com banco de dados
    }
}

initDb.init()