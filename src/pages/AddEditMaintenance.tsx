import React, { useState } from "react";
import "./AddEditMaintenance.css";

const AddEditMaintenance: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Simulate loading for edit mode (replace with real fetch if needed)
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => setLoading(false), 1200);
  // }, []);

  return (
    <div className="maintenance-container">
      <div className="maintenance-card">
        <h2>Add / Edit Maintenance</h2>
        {loading ? (
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <div className="spinner" style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #ccc', borderTop: '4px solid #646cff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <div style={{ marginTop: 12 }}>Loading maintenance log...</div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AddEditMaintenance;
