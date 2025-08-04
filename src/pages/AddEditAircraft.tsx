import React from "react";
import "./AddEditAircraft.css"; // Create this CSS file

const AddEditAircraft: React.FC = () => (
  <div className="aircraft-container">
    <div className="aircraft-card">
      <h2>Add / Edit Aircraft</h2>
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
    </div>
  </div>
);

export default AddEditAircraft;
