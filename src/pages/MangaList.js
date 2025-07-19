import React, { useState, useEffect } from 'react';

export default function MangaList() {
  const [mangas, setMangas] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tous');

  useEffect(() => {
    fetch("/mangalistreact/json/manga.json")
      .then(res => res.json())
      .then(data => setMangas(data))
      .catch(err => console.error(err));
  }, []);

  // Filtrage selon recherche + filtre
  const filteredMangas = mangas.filter(manga => {
    const matchesSearch = manga.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'Tous' || manga.priority === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="text-center">
      <input className="form-control w-25 shadow-sm m-2 mx-auto" type="text" placeholder="Rechercher un manga..." value={search} onChange={e => setSearch(e.target.value)}/>
    <div>
        {['Tous', 'Priorité', 'En cours', 'En pause', 'Arrêté', 'Fini'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              marginRight: 8,
              backgroundColor: filter === status ? '#007bff' : '#eee',
              color: filter === status ? '#fff' : '#000',
              border: 'none',
              borderRadius: 4,
              padding: '6px 12px',
              cursor: 'pointer'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div>
        {filteredMangas.length === 0 ? (
          <p className="text-center text-black fs-4">Aucun manga trouvé.</p>
        ) : (
          filteredMangas.map(manga => (
            <div className="bg-secondary-subtle w-75 mx-auto" key={manga.title} style={{border: '1px solid #ccc', padding: 10, margin: '10px 0', borderRadius: 4}}>
              <h2 className="text-center text-black fs-2 text-decoration-underline">{manga.title}</h2>
              <p className="text-center text-black fs-4">Nombre de tomes : {manga.numbers}</p>
              <p className="text-center text-black fs-4">{manga.priority}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
