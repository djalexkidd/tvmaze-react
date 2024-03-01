import React, { useState, useEffect } from 'react';
import "./App.css";

const App = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const apiUrl = searchTerm
      ? `https://api.tvmaze.com/search/shows?q=${searchTerm}`
      : 'https://api.tvmaze.com/shows?page=0&pageSize=10';

    // Récupérer les 10 premières émissions
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau - Impossible de récupérer les données');
        }
        return response.json();
      })
      .then(data => {
        setShows(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des émissions:', error);
      });
  }, [searchTerm]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="show-list">
      <h1>Liste des émissions</h1>
      <input
        type="text"
        placeholder="Rechercher des émissions"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="show-grid">
        {shows.map(show => (
          <div key={show.id} className="show-item">
            {show.show && show.show.image && (
              <img src={show.show.image.medium} alt={show.show.name} />
            ) || show.image && <img src={show.image.medium} alt={show.name} />}
            <div className="show-details">
              <h3>{(show.show && show.show.name) || show.name}</h3>
              <p>Année : {(show.show && show.show.premiered && show.show.premiered.substring(0, 4)) || (show.premiered && show.premiered.substring(0, 4))}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
