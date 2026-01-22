// File: backend/src/server.js
import 'dotenv/config'
import app from './app.js'
import pool from './config/db.js' // ← Import du pool configuré

const PORT = process.env.PORT || 3000

// Middleware CSP
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' http://localhost:3000 https://clients2.google.com; script-src 'self' 'unsafe-inline'"
  )
  next()
})

// Route racine
app.get('/', (req, res) => {
  res.type('html').send('<p>server ok !</p><script>console.log("server ok !")</script>')
})

// Route GET /annonces
app.get('/annonces', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id, titre, description, prix, categorie, sous_categorie,
        type_annonce, etat, pseudo_vendeur, ville, code_postal,
        departement, date_creation, statut, nb_vues, nb_favoris,
        livraison_possible, prix_negociable, urgent
      FROM annonces
      WHERE statut = 'en_ligne'
      ORDER BY date_creation DESC
    `)
    res.json(rows)
  } catch (error) {
    console.error('Erreur DB:', error)
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
})

// Route GET /annonces/:id
app.get('/annonces/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM annonces WHERE id = ?',
      [req.params.id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Annonce non trouvée' })
    }

    const [photos] = await pool.query(
      'SELECT * FROM photos_annonces WHERE annonce_id = ? ORDER BY ordre',
      [req.params.id]
    )

    res.json({ ...rows[0], photos })
  } catch (error) {
    console.error('Erreur DB:', error)
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
})

// Route POST /annonces
app.post('/annonces', async (req, res) => {
  const {
    titre, description, prix, categorie, sous_categorie, etat,
    pseudo_vendeur, email_vendeur, telephone_vendeur,
    code_postal, ville, departement
  } = req.body

  try {
    const [result] = await pool.query(
      `INSERT INTO annonces
       (titre, description, prix, categorie, sous_categorie, etat,
        pseudo_vendeur, email_vendeur, telephone_vendeur,
        code_postal, ville, departement)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [titre, description, prix, categorie, sous_categorie, etat,
       pseudo_vendeur, email_vendeur, telephone_vendeur,
       code_postal, ville, departement]
    )
    res.status(201).json({ id: result.insertId, message: 'Annonce créée' })
  } catch (error) {
    console.error('Erreur DB:', error)
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
})
