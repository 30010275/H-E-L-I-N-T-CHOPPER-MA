// File: src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaPlus, FaFileExport, FaSun, FaMoon } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // Fleet data state
  const [fleet, setFleet] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ name: string; hours: number }[]>([]);
  const [activityLogs, setActivityLogs] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/fleet")
      .then((res: { data: any[] }) => {
        setFleet(res.data);
        setLoading(false);
        // Build chart data from backend fleet data
        const chart = res.data.map((heli: any) => ({
          name: heli.name || heli.registration || "Unknown",
          hours: heli.hours || 0
        }));
        setChartData(chart);
      })
      .catch((_err: unknown) => {
        setError("Failed to load fleet data");
        setLoading(false);
      });

    // Fetch activity logs from backend
    axios.get("http://localhost:5000/api/maintenance/activity")
      .then((res: { data: string[] }) => {
        setActivityLogs(res.data);
      })
      .catch(() => {
        setActivityLogs(["No recent activity."]);
      });

    // Fetch alerts/notifications from backend
    axios.get("http://localhost:5000/api/maintenance/alerts")
      .then((res: { data: string[] }) => {
        setAlerts(res.data);
        if (res.data.length > 0) {
          setToastMsg(res.data[0]);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        }
      })
      .catch(() => {
        setAlerts(["No alerts."]);
      });
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleAddMaintenance = () => {
    window.location.href = "/add-maintenance";
  };

  const handleExportCSV = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fleet/export/csv", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "fleet.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setToastMsg("Failed to export CSV.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const handleExportPDF = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fleet/export/pdf", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "fleet.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setToastMsg("Failed to export PDF.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      {showToast && (
        <div className="toast success">{toastMsg}</div>
      )}
      <header className="dashboard-hero">
        <div className="hero-text">
          <h1>Helint Aircraft Dashboard</h1>
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
              {alerts.map((alert, idx) => (
                <li key={idx}>{alert}</li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <section className="dashboard-stats">
        <div className="stat-card total">
          <h3>Total Aircraft</h3>
          <p>{fleet.length}</p>
        </div>
        <div className="stat-card maintenance">
          <h3>Scheduled Maintenance</h3>
          <p>{fleet.filter(heli => heli.status && heli.status.toLowerCase().includes("maintenance")).length}</p>
        </div>
        <div className="stat-card active">
          <h3>Active Aircraft</h3>
          <p>{fleet.filter(heli => heli.status && heli.status.toLowerCase() === "active").length}</p>
        </div>
        <div className="stat-card grounded">
          <h3>Grounded</h3>
          <p>{fleet.filter(heli => heli.status && heli.status.toLowerCase() === "grounded").length}</p>
        </div>
      </section>

      <section className="quick-actions">
        <button onClick={handleAddMaintenance}><FaPlus /> Add Maintenance Log</button>
        <button onClick={handleExportCSV}><FaFileExport /> Export CSV</button>
        <button onClick={handleExportPDF}><FaFileExport /> Export PDF</button>
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
        <div className="fleet-gallery" style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <img src="https://heliflite.com/wp-content/uploads/2021/07/the-fleet-cover.jpg" alt="Helicopter 1" style={{ width: 220, height: 140, objectFit: 'cover', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
          <img src="https://www.slashgear.com/img/gallery/12-of-the-most-iconic-military-helicopters-in-history/intro-1742960640.jpg" alt="Helicopter 2" style={{ width: 220, height: 140, objectFit: 'cover', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
          <img src="https://www.rotorhub.com/wp-content/uploads/2024/02/MD-Helicopteres-Helint.png" alt="Helicopter 3" style={{ width: 220, height: 140, objectFit: 'cover', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
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
            <div>manage your helicopter fleet with precision.</div>
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
