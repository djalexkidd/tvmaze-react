import React, { useState, useEffect } from 'react';
import "./App.css";

const App = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Récupérer les 10 premières émissions
    fetch('https://api.tvmaze.com/shows?page=0&pageSize=10')
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
  }, []);

  return (
    <div className="show-list">
      <h1>Liste des émissions</h1>
      <div className="show-grid">
        {shows.map(show => (
          <div key={show.id} className="show-item">
            <img src={show.image && show.image.medium} alt={show.name} />
            <div className="show-details">
              <h3>{show.name}</h3>
              <p>Année : {show.premiered && show.premiered.substring(0, 4)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
