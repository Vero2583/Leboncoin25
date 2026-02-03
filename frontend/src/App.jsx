import { useEffect, useState } from 'react'
import Filter from './composant/Filter.jsx'


const BACKEND_URL = 'http://localhost:3000/annonces'

export default function App() {
  const [annonces, setAnnonces] = useState([])
  const [annoncesFiltrees, setAnnoncesFiltrees] = useState([]) // Nouvelles annonces filtrées
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(BACKEND_URL)
      .then(res => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`)
        return res.json()
      })
      .then(data => {
        setAnnonces(data)
        setAnnoncesFiltrees(data) // Au départ, on affiche toutes les annonces
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Fonction pour mettre à jour les annonces filtrées
  function handleResultatsChange(resultats) {
    setAnnoncesFiltrees(resultats)
  }

  if (loading) return <div style={{ padding: 20 }}>Chargement...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Erreur: {error}</div>

  return (
    <>
      <Filter annonces={annonces} onResultatsChange={handleResultatsChange} />
      
      <div style={{ textAlign: 'center', maxWidth: 1000, margin: '0 auto', padding: 24}}>
        <h1>Annonces ({annoncesFiltrees.length})</h1>
        
        {annoncesFiltrees.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
            Aucune annonce trouvée 😕
          </p>
        ) : (
          annoncesFiltrees.map(a => (
            <div key={a.id} style={{ border: '1px solid #ddd', padding: 16, marginBottom: 16, borderRadius: '8px' }}>
              <h2>{a.titre}</h2>
              <p>{a.description}</p>
              <p><strong>Catégorie</strong> - {a.categorie} / {a.sous_categorie}</p>
              <p><strong>État</strong> - {a.etat}</p>
              <p><strong>{a.prix}€</strong> - {a.ville}</p>
              <p><strong>Vendu par</strong> - {a.pseudo_vendeur}</p>
            </div>
          ))
        )}
      </div>
    </>
  )
}
