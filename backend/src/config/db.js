import mysql from 'mysql2/promise'
import 'dotenv/config'



let db;
let env = process.env

try {
    
    db = await mysql.createPool({
        host: env.DB_HOST,
        user: env.DB_USER,
        database : env.DB_NAME

    })

    await db.getConnection(
        console.log(`connexion à la base de données ${process.env.DB_NAME} est réussie`)
    )

} catch (error) {
    console.error(`erreur lors de la connexion à la base de données `, error.message )
    process.exit(1)
    
}

export default db
