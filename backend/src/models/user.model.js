import db from './config/db.js'

export const UserModel = {
    create: async (name, email, password, create_at) =>{
        const sql = `INSERT INTO users (name, email, password, create_at) VALUES (?, ?, ?, ?)`
        return db.execute(sql, [name, email, password, create_at])
    },

    findByEmail: async (email) => {
        const sql = `SELECT * FROM users WHERE email = ?`
        const [rows] = await db.execute(sql, [email])
        return rows [0]
    }

}