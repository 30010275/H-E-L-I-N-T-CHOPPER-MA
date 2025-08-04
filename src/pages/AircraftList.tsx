import React, { useState } from "react";
import "./AircraftList.css";

const AircraftList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const aircraft = [
    { id: 1, registration: "5Y-HLI", model: "Bell 407", status: "Active" },
    { id: 2, registration: "5Y-KZL", model: "Eurocopter AS350", status: "Maintenance" },
    { id: 3, registration: "5Y-NYX", model: "Sikorsky S-76", status: "Active" },
  ];

  const filteredAircraft = aircraft.filter(
    (a) =>
      a.registration.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || a.status === statusFilter)
  );

  return (
    <div className="modern-card">
      <h2>Aircraft List</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by Registration"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="log-table-wrapper">
        <table className="log-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Registration</th>
              <th>Model</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAircraft.map((a, index) => (
              <tr key={a.id}>
                <td>{index + 1}</td>
                <td>{a.registration}</td>
                <td>{a.model}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AircraftList;
