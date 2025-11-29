import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Scoreboard } from './pages/Scoreboard';
import { PlayerProfilePage } from './pages/PlayerProfilePage';

export const App = () => {
  return (
    <HashRouter>
      <nav>
        <ul>
          <li>
            <Link to="/player">Player</Link>
          </li>
          <li>
            <Link to="/scoreboard">Scoreboard</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/player" element={<PlayerProfilePage />} />
      </Routes>
    </HashRouter>
  );
};
