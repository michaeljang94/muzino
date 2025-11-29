import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Manager } from './pages/Manager';

export const App = () => {
  return (
    <Router basename='muzino'>
      <Routes>
        <Route path="admin" element={<Manager />}/>
      </Routes>
    </Router>
  );
}