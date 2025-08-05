import React, { useState } from "react";
import "./AddEditAircraft.css";

const AddEditAircraft: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Simulate loading for edit mode (replace with real fetch if needed)
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => setLoading(false), 1200);
  // }, []);

  return (
    <div className="aircraft-container">
      <div className="aircraft-card">
        <h2>Add / Edit Aircraft</h2>
        {loading ? (
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <div className="spinner" style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #ccc', borderTop: '4px solid #646cff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <div style={{ marginTop: 12 }}>Loading aircraft...</div>
          </div>
        ) : (
          <form className="aircraft-form">
            <div className="form-group">
              <label htmlFor="registration">Registration</label>
              <input type="text" id="registration" name="registration" required />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input type="text" id="model" name="model" required />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input type="number" id="year" name="year" min="1900" max="2099" required />
            </div>

            <button type="submit" className="save-button">Save</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddEditAircraft;
