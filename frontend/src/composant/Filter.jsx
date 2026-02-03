import { useState } from 'react';

export default function Filter({ annonces, onResultatsChange }) {
  const [recherche, setRecherche] = useState('');

  function handleChange(event) {
    const valeur = event.target.value;
    setRecherche(valeur);

    if (valeur === '') {
      onResultatsChange(annonces);
      return;
    }

    const resultats = annonces.filter(annonce => {
      const texteDansAnnonce = `
        ${annonce.titre || ''}
        ${annonce.description || ''}
        ${annonce.categorie || ''}
        ${annonce.sous_categorie || ''}
        ${annonce.ville || ''}
        ${annonce.pseudo_vendeur || ''}
        ${annonce.etat || ''}
        ${annonce.prix || ''}
      `.toLowerCase();

      return texteDansAnnonce.includes(valeur.toLowerCase());
    });

    onResultatsChange(resultats);
  }

  return (
    <div style={{ textAlign: 'center', color: '#999', padding: '40px', marginRight : '25px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Rechercher une annonce (titre, ville, catégorie...)"
          value={recherche}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 20px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '25px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      {recherche !== '' && (
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
          🔎 Recherche pour "{recherche}"
        </p>
      )}
    </div>
  );
}
