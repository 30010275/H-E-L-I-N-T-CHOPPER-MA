import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';

import Dashboard from './pages/Dashboard';
import AircraftList from './pages/AircraftList';
import MaintenanceLogs from './pages/MaintenanceLogs';
import AddEditAircraft from './pages/AddEditAircraft';
import AddEditMaintenance from './pages/AddEditMaintenance';
import Login from './pages/Login';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(o => !o);
  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="brand">
            <div className="logo-group">
              <img src={reactLogo} className="logo" alt="React logo" />
              <h1 className="title">Helicopter Fleet Dashboard</h1>
            </div>
            <button
              className="menu-toggle"
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <span className="hamburger" />
            </button>
          </div>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <NavLink to="/" end className={linkClass} onClick={closeMenu}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/aircraft" className={linkClass} onClick={closeMenu}>
                  Aircraft List
                </NavLink>
              </li>
              <li>
                <NavLink to="/maintenance" className={linkClass} onClick={closeMenu}>
                  Maintenance Logs
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-aircraft" className={linkClass} onClick={closeMenu}>
                  Add Aircraft
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-maintenance" className={linkClass} onClick={closeMenu}>
                  Add Maintenance
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={linkClass} onClick={closeMenu}>
                  Login
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <main className="main-content" onClick={closeMenu}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/aircraft" element={<AircraftList />} />
            <Route path="/maintenance" element={<MaintenanceLogs />} />
            <Route path="/add-aircraft" element={<AddEditAircraft />} />
            <Route path="/add-maintenance" element={<AddEditMaintenance />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
