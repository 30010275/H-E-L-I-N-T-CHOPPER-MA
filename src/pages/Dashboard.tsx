// File: src/pages/Dashboard.tsx
import React, { useState } from "react";
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

      <section className="dashboard-gallery">
        <h2>Fleet Highlights</h2>
        <div className="gallery-grid">
          <img src="https://www.pcc.edu/programs/aviation-maintenance/wp-content/uploads/sites/88/2019/07/aviation-maintenance1-1000x563.jpg" alt="Helicopter 1" />
          <img src="https://img.aviationpros.com/files/base/cygnus/cavc/image/2011/01/mro1_10218716.png?auto=format,compress&fit=fill&fill=blur&q=45&w=640&width=640" alt="Helicopter 2" />
          <img src="https://helicoptermaintenancemagazine.com/sites/default/files/covers/dom_202506.jpg" alt="Helicopter 3" />
        </div>
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

      <footer className="dashboard-footer">
        <p>Last updated: Aug 4, 2025 · All systems operational.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
