import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./MaintenanceLogs.css";

const MaintenanceLogs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterAircraft, setFilterAircraft] = useState("");

  const logs = [
    {
      id: 1,
      registration: "5Y-HLI",
      date: "2025-07-25",
      technician: "John Mwangi",
      description: "Routine check - no issues found",
      hours: 1205,
    },
    {
      id: 2,
      registration: "5Y-KZL",
      date: "2025-07-28",
      technician: "Grace Kamau",
      description: "Replaced rotor blade, oil top-up",
      hours: 1420,
    },
  ];

  const filteredLogs = logs.filter(
    (log) =>
      log.registration.toLowerCase().includes(search.toLowerCase()) &&
      (filterDate === "" || log.date === filterDate) &&
      (filterAircraft === "" || log.registration === filterAircraft)
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Maintenance Logs", 14, 16);
    (doc as any).autoTable({
      head: [["#", "Registration", "Date", "Technician", "Description", "Flight Hours"]],
      body: filteredLogs.map((log, index) => [
        index + 1,
        log.registration,
        log.date,
        log.technician,
        log.description,
        log.hours,
      ]),
    });
    doc.save("maintenance_logs.pdf");
  };

  const exportCSV = () => {
    const headers = ["#", "Registration", "Date", "Technician", "Description", "Flight Hours"];
    const rows = filteredLogs.map((log, index) => [
      index + 1,
      log.registration,
      log.date,
      log.technician,
      log.description,
      log.hours,
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
  };

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
        <button onClick={exportPDF}>Export PDF</button>
        <button onClick={exportCSV}>Export CSV</button>
      </div>

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
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => (
              <tr key={log.id}>
                <td>{index + 1}</td>
                <td>{log.registration}</td>
                <td>{log.date}</td>
                <td>{log.technician}</td>
                <td>{log.description}</td>
                <td>{log.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceLogs;