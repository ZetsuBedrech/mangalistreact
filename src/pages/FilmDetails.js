import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function FilmDetails() {
  const { title } = useParams();
  const [film, setFilm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/json/film.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(f => f.title === title);
        setFilm(found);
      })
      .catch(err => console.error(err));
  }, [title]);

  if (!film) return <p className="text-white text-center mt-5">Chargement...</p>;

  return (
    <div className="text-white text-center mt-4">
      <h1>{film.title}</h1>
      <p>Note : {film.note} / 10</p>
      <p>Description : {film.description}</p>
      <img src={`${process.env.PUBLIC_URL}/images/${film.img}`} alt={film.title} style={{ maxWidth: '300px', borderRadius: '10px' }} />
      <br />
      <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
}
