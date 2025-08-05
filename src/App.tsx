import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/Dashboard';
import AircraftList from './pages/AircraftList';
import MaintenanceLogs from './pages/MaintenanceLogs';
import AddEditAircraft from './pages/AddEditAircraft';
import AddEditMaintenance from './pages/AddEditMaintenance';
import Login from './pages/Login';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role")
  });
  const isAuthenticated = authState.token && authState.role === "admin";

  useEffect(() => {
    const onStorage = () => {
      setAuthState({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role")
      });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleMenu = () => setMenuOpen(o => !o);
  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link active' : 'nav-link';

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? (
          <>
            <header className="app-header">
              <div className="brand">
                <div className="logo-group">
                  <img src="data:image/png;base64,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" className="logo" alt="Helint logo" />
                  <h1 className="title"></h1>
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
                    <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
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
                    <button className="nav-link logout" onClick={handleLogout} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </header>
            <main className="main-content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/aircraft" element={<AircraftList />} />
                <Route path="/maintenance" element={<MaintenanceLogs />} />
                <Route path="/add-aircraft" element={<AddEditAircraft />} />
                <Route path="/add-maintenance" element={<AddEditMaintenance />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </>
        ) : (
          <main className="main-content">
            <Routes>
              <Route path="/*" element={<Login />} />
            </Routes>
          </main>
        )}
      </div>
    </Router>
  );
}

export default App;
