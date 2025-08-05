import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AircraftList.css";
import { getAuthToken } from "./Login";

interface Helicopter {
  _id: string;
  name: string;
  type: string;
  imageUrl?: string;
  capacity: number;
  status: string;
}

const AircraftList: React.FC = () => {
  const [aircraft, setAircraft] = useState<Helicopter[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAircraft, setNewAircraft] = useState({
    name: "",
    type: "",
    imageUrl: "",
    capacity: 0,
    status: "active"
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch aircraft
  useEffect(() => {
    fetchAircraft();
  }, []);

  const fetchAircraft = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/fleet", {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    })
      .then((res: { data: Helicopter[] }) => {
        setAircraft(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load aircraft");
        setLoading(false);
      });
  };

  // Add aircraft
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/fleet", newAircraft, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    })
      .then(() => {
        fetchAircraft();
        setNewAircraft({ name: "", type: "", imageUrl: "", capacity: 0, status: "active" });
      })
      .catch(() => setError("Failed to add aircraft"));
  };

  // Edit aircraft
  const handleEdit = (heli: Helicopter) => {
    setEditId(heli._id);
    setNewAircraft({
      name: heli.name,
      type: heli.type,
      imageUrl: heli.imageUrl || "",
      capacity: heli.capacity,
      status: heli.status
    });
  };

  // Save edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    axios.put(`http://localhost:5000/api/fleet/${editId}`, newAircraft, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    })
      .then(() => {
        fetchAircraft();
        setEditId(null);
        setNewAircraft({ name: "", type: "", imageUrl: "", capacity: 0, status: "active" });
      })
      .catch(() => setError("Failed to update aircraft"));
  };

  // Delete aircraft
  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this aircraft?")) return;
    axios.delete(`http://localhost:5000/api/fleet/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    })
      .then(() => fetchAircraft())
      .catch(() => setError("Failed to delete aircraft"));
  };

  const filteredAircraft = aircraft.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || a.status === statusFilter)
  );

  const sortKeys: { [key: string]: (a: Helicopter) => string | number } = {
    name: a => a.name,
    type: a => a.type,
    capacity: a => a.capacity,
    status: a => a.status
  };
  const sortedAircraft = [...filteredAircraft].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = sortKeys[sortField]?.(a);
    const bVal = sortKeys[sortField]?.(b);
    if (aVal == null || bVal == null) return 0;
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  function exportCSV(data: Helicopter[]) {
    const headers = ["Name", "Type", "Capacity", "Status", "Image URL"];
    const rows = data.map(a => [a.name, a.type, a.capacity, a.status, a.imageUrl || ""]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "aircraft_list.csv");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div className="modern-card">
      <h2>Aircraft List</h2>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="grounded">Grounded</option>
        </select>
        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="capacity">Capacity</option>
          <option value="status">Status</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <button type="button" onClick={() => exportCSV(sortedAircraft)}>Export CSV</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <div className="spinner" style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #ccc', borderTop: '4px solid #646cff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <div style={{ marginTop: 12 }}>Loading aircraft...</div>
        </div>
      ) : (
        <div className="log-table-wrapper">
          <table className="log-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAircraft.map((a, index) => (
                <tr key={a._id}>
                  <td>{index + 1}</td>
                  <td>{a.name}</td>
                  <td>{a.type}</td>
                  <td>{a.capacity}</td>
                  <td>{a.status}</td>
                  <td>
                    {a.imageUrl ? (
                      <img src={a.imageUrl} alt={a.name} style={{ width: 60, height: 40, objectFit: 'cover' }} />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(a)}>Edit</button>
                    <button onClick={() => handleDelete(a._id)} style={{ marginLeft: 8 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h3 style={{ marginTop: 32 }}>{editId ? "Edit Aircraft" : "Add Aircraft"}</h3>
      <form onSubmit={editId ? handleSaveEdit : handleAdd} className="aircraft-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={newAircraft.name}
            onChange={e => setNewAircraft({ ...newAircraft, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            value={newAircraft.type}
            onChange={e => setNewAircraft({ ...newAircraft, type: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={newAircraft.imageUrl}
            onChange={e => setNewAircraft({ ...newAircraft, imageUrl: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Capacity</label>
          <input
            type="number"
            value={newAircraft.capacity}
            onChange={e => setNewAircraft({ ...newAircraft, capacity: Number(e.target.value) })}
            required
            min={1}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={newAircraft.status}
            onChange={e => setNewAircraft({ ...newAircraft, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="grounded">Grounded</option>
          </select>
        </div>
        <button type="submit" className="save-button">{editId ? "Save Changes" : "Add Aircraft"}</button>
        {editId && (
          <button type="button" style={{ marginLeft: 8 }} onClick={() => { setEditId(null); setNewAircraft({ name: "", type: "", imageUrl: "", capacity: 0, status: "active" }); }}>Cancel</button>
        )}
      </form>
    </div>
  );
};

export default AircraftList;
