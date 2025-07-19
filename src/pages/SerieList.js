import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SerieList() {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tous');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/json/serie.json')
      .then(res => res.json())
      .then(data => setSeries(data))
      .catch(err => console.error(err));
  }, []);

  const filteredSeries = series.filter(serie => {
    const matchSearch = serie.title.toLowerCase().includes(search.toLowerCase());
    let matchFilter = true;
    if (filter !== 'Tous') {
      matchFilter = serie.note >= filter;
    }
    return matchSearch && matchFilter;
  });

  return (
    <div className="text-center">
      <input
        className="form-control w-25 shadow-sm m-2 mx-auto"
        type="text"
        placeholder="Rechercher une série..."
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

      {filteredSeries.length === 0 ? (
        <p className="text-center text-black fs-4">Aucune série trouvée.</p>
      ) : (
        filteredSeries.map(serie => (
          <div
            key={serie.title}
            onClick={() => navigate(`/serie/${encodeURIComponent(serie.title)}`)}
            className="bg-secondary-subtle w-75 mx-auto"
            style={{
              border: '1px solid #ccc',
              padding: 10,
              margin: '10px 0',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            <h2 className="text-center text-black fs-2 text-decoration-underline">{serie.title}</h2>
            <p className="text-center text-black fs-4">{serie.note} / 10</p>
            <p className="text-center text-black fs-5">Nombre d'épisodes : {serie.numbers}</p>
          </div>
        ))
      )}
    </div>
  );
}
