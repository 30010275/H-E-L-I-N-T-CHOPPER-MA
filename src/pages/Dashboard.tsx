// File: src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaPlus, FaFileExport, FaSun, FaMoon } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

const activityLogs = [
  "Technician Joseph updated Engine Log - Heli #4 - 5 mins ago",
  "Flight hours exceeded for Heli-X9 - 1 hour ago",
  "Heli-B12 marked for maintenance - 2 days ago"
];

const chartData = [
  { name: "Heli-X1", hours: 180 },
  { name: "Heli-X2", hours: 150 },
  { name: "Heli-X3", hours: 200 },
  { name: "Heli-X4", hours: 90 }
];

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // Fleet data state
  const [fleet, setFleet] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/fleet")
      .then((res: { data: any[] }) => {
        setFleet(res.data);
        setLoading(false);
      })
      .catch((_err: unknown) => {
        setError("Failed to load fleet data");
        setLoading(false);
      });
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      <header className="dashboard-hero">
        <div className="hero-text">
          <h1>HELINT Aircraft Dashboard</h1>
          <p>Monitor and manage your helicopter fleet with precision and ease.</p>
        </div>
        <img
          src="https://cdn.avbuyer.com/live/uploads/cms/112501_112600/112551_954d80b47ae6d1ad_969X727.jpg"
          alt="Helicopter Hero"
          className="hero-image"
        />
        <div className="top-actions">
          <FiSearch className="icon" />
          <FaBell className="icon" onClick={() => setNotificationsOpen(!notificationsOpen)} />
          {darkMode ? <FaSun className="icon" onClick={toggleDarkMode} /> : <FaMoon className="icon" onClick={toggleDarkMode} />}
        </div>
        {notificationsOpen && (
          <div className="notifications-panel">
            <h4>Alerts</h4>
            <ul>
              <li>Maintenance due for Heli-X9 in 2 days</li>
              <li>Flight hours exceeded threshold</li>
            </ul>
          </div>
        )}
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Aircraft</h3>
          <p>7</p>
        </div>
        <div className="stat-card yellow">
          <h3>Scheduled Maintenance</h3>
          <p>3</p>
        </div>
        <div className="stat-card green">
          <h3>Active Aircraft</h3>
          <p>4</p>
        </div>
        <div className="stat-card red">
          <h3>Grounded</h3>
          <p>1</p>
        </div>
      </section>

      <section className="quick-actions">
        <button><FaPlus /> Add Maintenance Log</button>
        <button><FaFileExport /> Export CSV</button>
        <button><FaFileExport /> Export PDF</button>
      </section>

      <section className="chart-section">
        <h2>Flight Hours This Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#1890ff" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="activity-feed">
        <h2>Recent Activity</h2>
        <ul>
          {activityLogs.map((log, idx) => (
            <li key={idx}>{log}</li>
          ))}
        </ul>
      </section>

      <section className="dashboard-fleet-section">
        <div className="fleet-header">
          <h2>Our Helicopter Fleet</h2>
          <p>Explore our world-class fleet designed for performance, safety, and comfort.</p>
        </div>
        <div className="fleet-grid">
          {loading ? (
            <div style={{ textAlign: 'center', margin: '32px 0' }}>
              <div className="spinner" style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #ccc', borderTop: '4px solid #646cff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <div style={{ marginTop: 12 }}>Loading fleet...</div>
            </div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : fleet.length === 0 ? (
            <div>No helicopters found.</div>
          ) : (
            fleet.map((heli) => (
              <div className="fleet-card" key={heli._id}>
                <img src={heli.imageUrl || "https://via.placeholder.com/400x220?text=No+Image"} alt={heli.name} />
                <div className="fleet-overlay">
                  {heli.name} - {heli.type}<br />
                  Capacity: {heli.capacity} | Status: {heli.status}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="dashboard-footer">
        <p>Last updated: Aug 4, 2025 · All systems operational.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
