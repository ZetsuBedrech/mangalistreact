import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SerieDetails() {
  const { title } = useParams();
  const [serie, setSerie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/mangalistreact/json/serie.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(s => s.title === decodeURIComponent(title));
        setSerie(found || null);
      })
      .catch(err => console.error(err));
  }, [title]);

  if (!serie) {
    return <p className="text-center text-black fs-4">Série non trouvée.</p>;
  }

  return (
    <div className="text-white text-center mt-4">
      <h1>{serie.title}</h1>
      <p>Note : {serie.note} / 10</p>
      <p>Description : {serie.description}</p>
      {serie.img && <img src={`/mangalistreact/images/${serie.img}`} alt={serie.title} style={{ maxWidth: '100%', borderRadius: 8 }} />}
      <br />
      <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
}
