import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MangaList from './pages/MangaList';
import AnimeList from './pages/AnimeList';
import FilmList from './pages/FilmList';
import SerieList from './pages/SerieList';
import FilmDetails from './pages/FilmDetails';
import SerieDetails from './pages/SerieDetails';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MangaList />} />
        <Route path="/anime" element={<AnimeList />} />
        <Route path="/film" element={<FilmList />} />
        <Route path="/serie" element={<SerieList />} />
        <Route path="/film/:title" element={<FilmDetails />} />
        <Route path="/serie/:title" element={<SerieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
