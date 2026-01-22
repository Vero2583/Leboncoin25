// File: backend/src/config/db.js
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // ← Utilise le .env
  database: process.env.DB_NAME || 'leboncoin_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Test de connexion
pool.getConnection()
  .then(connection => {
    console.log('✅ Connexion MySQL réussie')
    connection.release()
  })
  .catch(err => {
    console.error('❌ Erreur lors de la connexion à la base de données', err.message)
  })

export default pool
