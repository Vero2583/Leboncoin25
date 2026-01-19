import { db } from "../config/db.js"

export const annonceModel = {
    create: async (title, image, description, idusers, idcategories, create_at) => {
    const sql = `
    INSERT INTO annonces (title, image, description, idusers, idcategories, create_at)
    VALUES (?, ?, ?, ?, ?, ?)
    `
    return db.execute(sql, [title, image, description, idusers, idcategories, create_at])
},

    affiche: async () => {
        const [rows] = await db.execute(`SELECT * FROM annonces`)
        return rows
    }
}

