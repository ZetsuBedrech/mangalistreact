import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FilmList() {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tous');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/json/film.json`)
      .then(res => res.json())
      .then(data => setFilms(data))
      .catch(err => console.error(err));
  }, []);

  const filteredFilms = films.filter(film => {
    const matchSearch = film.title.toLowerCase().includes(search.toLowerCase());
    let matchFilter = true;
    if (filter !== 'Tous') {
      // filtre par note >= filter
      matchFilter = film.note >= filter;
    }
    return matchSearch && matchFilter;
  });

  return (
    <div className="text-center">
      <input
        className="form-control w-25 shadow-sm m-2 mx-auto"
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="mb-3">
        {['Tous', 5, 7, 9].map(note => (
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
            {note === 'Tous' ? 'Tous' : `≥ ${note} / 10`}
          </button>
        ))}
      </div>

      {filteredFilms.length === 0 ? (
        <p className="text-center text-black fs-4">Aucun film trouvé.</p>
      ) : (
        filteredFilms.map(film => (
          <div
            className="bg-secondary-subtle w-75 mx-auto"
            key={film.title}
            onClick={() => navigate(`/film/${encodeURIComponent(film.title)}`)}
            style={{
              border: '1px solid #ccc',
              padding: 10,
              margin: '10px 0',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            <h2 className="text-center text-black fs-2 text-decoration-underline">{film.title}</h2>
            <p className="text-center text-black fs-4">{film.note} / 10</p>
          </div>
        ))
      )}
    </div>
  );
}
