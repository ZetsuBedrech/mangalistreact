import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <header>
      <ul className="nav nav-pills nav-fill p-1 bg-primary">
        <li className="nav-item">
          <Link to="/" className="nav-link active rounded-5">MangaList</Link>
        </li>
        <li className="nav-item">
          <Link to="/anime" className="nav-link active rounded-5">AnimeList</Link>
        </li>
        <li className="nav-item">
          <Link to="/film" className="nav-link active rounded-5">FilmList</Link>
        </li>
        <li className="nav-item">
          <Link to="/serie" className="nav-link active rounded-5">SerieList</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;