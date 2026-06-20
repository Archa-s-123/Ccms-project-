import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddComplaint() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description || !location) {
      alert("Please fill all fields");
      return;
    }

    const newComplaint = {
      title,
      category,
      description,
      location,
      status: "Pending"
    };

    let complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push(newComplaint);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    alert("Complaint submitted successfully!");

    setTitle("");
    setCategory("");
    setDescription("");
    setLocation("");
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "650px" }}>

        {/* Header */}
        <div className="text-center mb-4">
          <h3>📝 Add Complaint</h3>
          <p className="text-muted">Submit your issue clearly</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <label className="form-label">Complaint Title</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Category */}
          <label className="form-label">Category</label>
          <select
            className="form-control mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Classroom</option>
            <option>Laboratory</option>
            <option>Hostel</option>
            <option>Library</option>
            <option>Internet/Wi-Fi</option>
            <option>Electrical</option>
          </select>

          {/* Description */}
          <label className="form-label">Description</label>
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Describe your issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Location */}
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Buttons */}
          <button className="btn btn-primary w-100 mb-2" type="submit">
            Submit Complaint
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate("/dashboard")}
          >
            ⬅ Back to Dashboard
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddComplaint;