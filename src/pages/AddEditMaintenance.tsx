import React from "react";
import "./AddEditMaintenance.css"; // Create this file

const AddEditMaintenance: React.FC = () => (
  <div className="maintenance-container">
    <div className="maintenance-card">
      <h2>Add / Edit Maintenance</h2>
      <form className="maintenance-form">
        <div className="form-group">
          <label htmlFor="aircraft">Aircraft</label>
          <input type="text" id="aircraft" name="aircraft" required />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={4} required />
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  </div>
);

export default AddEditMaintenance;
