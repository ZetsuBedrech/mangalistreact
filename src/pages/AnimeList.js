import React, { useState, useEffect } from 'react';

export default function AnimeList() {
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tous');

  useEffect(() => {
    fetch('/json/anime.json')
      .then(res => res.json())
      .then(data => setAnimes(data))
      .catch(err => console.error('Erreur de chargement :', err));
  }, []);

  const filteredAnimes = animes.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'Tous' || anime.note.toString() === filter;
    return matchesSearch && matchesFilter;
  });

  const uniqueNotes = ['Tous', ...Array.from(new Set(animes.map(a => a.note.toString())))];

  return (
    <div className="text-center">
      <input
        className="form-control w-25 shadow-sm m-2 mx-auto"
        type="text"
        placeholder="Rechercher un anime..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="mb-3">
        {uniqueNotes.map(note => (
          <button
            key={note}
            onClick={() => setFilter(note)}
            style={{
              marginRight: 8,
              backgroundColor: filter === note ? '#007bff' : '#eee',
              color: filter === note ? '#fff' : '#000',
              border: 'none',
              borderRadius: 4,
              padding: '6px 12px',
              cursor: 'pointer'
            }}
          >
            {note}
          </button>
        ))}
      </div>

      <div>
        {filteredAnimes.length === 0 ? (
          <p className="text-center text-black fs-4">Aucun anime trouvé.</p>
        ) : (
          filteredAnimes.map(anime => (
            <div
              className="bg-secondary-subtle w-75 mx-auto"
              key={anime.title}
              style={{
                border: '1px solid #ccc',
                padding: 10,
                margin: '10px 0',
                borderRadius: 4
              }}
            >
              <h2 className="text-center text-black fs-2 text-decoration-underline">{anime.title}</h2>
              <p className="text-center text-black fs-4">Nombre d'épisodes : {anime.numbers}</p>
              <p className="text-center text-black fs-4">Tags : {anime.tags?.join(', ')}</p>
              <p className="text-center text-black fs-4">{anime.note} / 10</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
