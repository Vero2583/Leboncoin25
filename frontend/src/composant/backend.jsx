export default function Annonces() {
  const [annonces, setAnnonces] = useState([])
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
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div style={{ padding: 20 }}>Chargement...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Erreur: {error}</div>

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <h1>Annonces</h1>
      {annonces.map(a => (
        <div key={a.id} style={{ border: '1px solid #ddd', padding: 16, marginBottom: 16 }}>
          <h2>{a.titre}</h2>
          <p>{a.description}</p>
          <p>{a.categorie}</p>
            <p><strong>{a.prix}€</strong> - {a.ville}</p>
        </div>
      ))}
    </div>
  )
}
