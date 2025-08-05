import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MaintenanceLogs.css";
import { getAuthToken } from "./Login";

interface MaintenanceLog {
  _id: string;
  registration: string;
  date: string;
  technician: string;
  description: string;
  hours: number;
  comments?: { text: string; author: string; createdAt: string }[];
  createdBy?: string;
  updatedBy?: string;
}

const MaintenanceLogs: React.FC = () => {
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterAircraft, setFilterAircraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newLog, setNewLog] = useState({
    registration: "",
    date: "",
    technician: "",
    description: "",
    hours: 0,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [alert, setAlert] = useState<string | null>(null);

  // Fetch logs from backend
  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    // Show alert if any aircraft is due for maintenance soon (demo: status is 'maintenance')
    if (
      logs.some(
        (l) =>
          l.description.toLowerCase().includes("due") ||
          l.registration.toLowerCase().includes("maintenance")
      )
    ) {
      setAlert("Some aircraft are due for maintenance soon!");
    } else {
      setAlert(null);
    }
  }, [logs]);

  const fetchLogs = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/maintenance", {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((res: { data: MaintenanceLog[] }) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load logs");
        setLoading(false);
      });
  };

  // Add log
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/maintenance",
        newLog,
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      )
      .then(() => {
        fetchLogs();
        setNewLog({
          registration: "",
          date: "",
          technician: "",
          description: "",
          hours: 0,
        });
      })
      .catch(() => setError("Failed to add log"));
  };

  // Edit log
  const handleEdit = (log: MaintenanceLog) => {
    setEditId(log._id);
    setNewLog({
      registration: log.registration,
      date: log.date,
      technician: log.technician,
      description: log.description,
      hours: log.hours,
    });
  };

  // Save edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    axios
      .put(
        `http://localhost:5000/api/maintenance/${editId}`,
        newLog,
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      )
      .then(() => {
        fetchLogs();
        setEditId(null);
        setNewLog({
          registration: "",
          date: "",
          technician: "",
          description: "",
          hours: 0,
        });
      })
      .catch(() => setError("Failed to update log"));
  };

  // Delete log
  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this log?")) return;
    axios
      .delete(`http://localhost:5000/api/maintenance/${id}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then(() => fetchLogs())
      .catch(() => setError("Failed to delete log"));
  };

  const handleAddComment = async (id: string) => {
    if (!commentText.trim()) return;
    setCommentLoading(true);
    await axios.post(
      `http://localhost:5000/api/maintenance/${id}/comment`,
      {
        text: commentText,
        author: "Admin", // Replace with real user if available
      },
      {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      }
    );
    setCommentText("");
    fetchLogs();
    setCommentLoading(false);
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.registration.toLowerCase().includes(search.toLowerCase()) &&
      (filterDate === "" || log.date === filterDate) &&
      (filterAircraft === "" || log.registration === filterAircraft)
  );

  const sortKeys: { [key: string]: (l: MaintenanceLog) => string | number } = {
    registration: (l) => l.registration,
    date: (l) => l.date,
    technician: (l) => l.technician,
    hours: (l) => l.hours,
  };
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = sortKeys[sortField]?.(a);
    const bVal = sortKeys[sortField]?.(b);
    if (aVal == null || bVal == null) return 0;
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  function exportCSV(data: MaintenanceLog[]) {
    const headers = [
      "Registration",
      "Date",
      "Technician",
      "Description",
      "Flight Hours",
    ];
    const rows = data.map((l) => [
      l.registration,
      l.date,
      l.technician,
      l.description,
      l.hours,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "maintenance_logs.csv");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div className="modern-card">
      <h2>Maintenance Logs</h2>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by Registration"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <select
          value={filterAircraft}
          onChange={(e) => setFilterAircraft(e.target.value)}
        >
          <option value="">All Aircraft</option>
          {[...new Set(logs.map((log) => log.registration))].map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="registration">Registration</option>
          <option value="date">Date</option>
          <option value="technician">Technician</option>
          <option value="hours">Flight Hours</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "asc" | "desc")
          }
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <button
          type="button"
          onClick={() => exportCSV(sortedLogs)}
          disabled={loading}
        >
          Export CSV
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {alert && (
        <div
          style={{
            background: "#fff3cd",
            color: "#856404",
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "12px",
            fontWeight: 500,
          }}
        >
          {alert}
        </div>
      )}
      {loading ? (
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <div
            className="spinner"
            style={{
              display: "inline-block",
              width: 40,
              height: 40,
              border: "4px solid #ccc",
              borderTop: "4px solid #646cff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <div style={{ marginTop: 12 }}>Loading logs...</div>
        </div>
      ) : (
        <div className="log-table-wrapper">
          <table className="log-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Registration</th>
                <th>Date</th>
                <th>Technician</th>
                <th>Description</th>
                <th>Flight Hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((log, index) => (
                <React.Fragment key={log._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{log.registration}</td>
                    <td>{log.date}</td>
                    <td>{log.technician}</td>
                    <td>{log.description}</td>
                    <td>{log.hours}</td>
                    <td>
                      <button onClick={() => handleEdit(log)}>Edit</button>
                      <button
                        onClick={() => handleDelete(log._id)}
                        style={{ marginLeft: 8 }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={7}>
                      <div style={{ marginTop: 8 }}>
                        <strong>Comments:</strong>
                        <ul>
                          {log.comments?.map((c, i) => (
                            <li key={i}>
                              <b>{c.author}:</b> {c.text}{" "}
                              <span
                                style={{
                                  color: "#888",
                                  fontSize: "0.9em",
                                }}
                              >
                                ({new Date(c.createdAt).toLocaleString()})
                              </span>
                            </li>
                          ))}
                        </ul>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddComment(log._id);
                          }}
                          style={{ display: "flex", gap: 8, marginTop: 4 }}
                        >
                          <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add comment..."
                            disabled={commentLoading}
                            style={{ flex: 1 }}
                          />
                          <button
                            type="submit"
                            disabled={
                              commentLoading || !commentText.trim()
                            }
                          >
                            {commentLoading ? "Adding..." : "Add"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h3 style={{ marginTop: 32 }}>{editId ? "Edit Log" : "Add Log"}</h3>
      <form
        onSubmit={editId ? handleSaveEdit : handleAdd}
        className="maintenance-form"
      >
        <div className="form-group">
          <label>Registration</label>
          <input
            type="text"
            value={newLog.registration}
            onChange={(e) =>
              setNewLog({ ...newLog, registration: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={newLog.date}
            onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Technician</label>
          <input
            type="text"
            value={newLog.technician}
            onChange={(e) =>
              setNewLog({ ...newLog, technician: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={newLog.description}
            onChange={(e) =>
              setNewLog({ ...newLog, description: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Flight Hours</label>
          <input
            type="number"
            value={newLog.hours}
            onChange={(e) =>
              setNewLog({ ...newLog, hours: Number(e.target.value) })
            }
            required
            min={0}
          />
        </div>
        <button type="submit" className="save-button">
          {editId ? "Save Changes" : "Add Log"}
        </button>
        {editId && (
          <button
            type="button"
            style={{ marginLeft: 8 }}
            onClick={() => {
              setEditId(null);
              setNewLog({
                registration: "",
                date: "",
                technician: "",
                description: "",
                hours: 0,
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default MaintenanceLogs;