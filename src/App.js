import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MangaList from './pages/MangaList';
import AnimeList from './pages/AnimeList';
import FilmList from './pages/FilmList';
import SerieList from './pages/SerieList';
import FilmDetails from './pages/FilmDetails';
import SerieDetails from './pages/SerieDetails';
import { useEffect } from 'react';
// import AdminSeries from './pages/AdminSeries';


function TitleManager() {
  const location = useLocation();
  const filmMatch = location.pathname.match(/^\/film\/(.+)/);
  const serieMatch = location.pathname.match(/^\/serie\/(.+)/);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/manga') {
      document.title = 'Mangas - MangaList';
    } else if (location.pathname === '/anime') {
      document.title = 'Animes - MangaList';
    } else if (location.pathname === '/film') {
      document.title = 'Films - MangaList';
    } else if (location.pathname === '/serie') {
      document.title = 'Séries - MangaList';
    } else if (filmMatch) {
      const title = decodeURIComponent(filmMatch[1]);
      document.title = `${title} - Film`;
    } else if (serieMatch) {
      const title = decodeURIComponent(serieMatch[1]);
      document.title = `${title} - Série`;
    } else {
      document.title = 'Mangas - MangaList';
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <Header />
      <TitleManager />
      <Routes>
        <Route path="/" element={<MangaList />} />
        <Route path="/anime" element={<AnimeList />} />
        <Route path="/film" element={<FilmList />} />
        <Route path="/serie" element={<SerieList />} />
        <Route path="/film/:title" element={<FilmDetails />} />
        <Route path="/serie/:title" element={<SerieDetails />} />
        <Route path="*" element={<MangaList />} />
      </Routes>
    </Router>
  );
}

export default App;
