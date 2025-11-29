import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Manager } from './pages/Manager';
import { Scoreboard } from './pages/Scoreboard';
import { Player } from './pages/Player';

export const App = () => {
  return (
    <HashRouter>
      <nav>
        <ul>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/scoreboard">Scoreboard</Link>
          </li>
          <li>
            <Link to="/player">Player</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/admin" element={<Manager />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </HashRouter>
  );
};
