import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddComplaint() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !description || !location) {
      alert("Please fill all fields");
      return;
    }

   const formData = new FormData();

formData.append("title", title);
formData.append("category", category);
formData.append("description", description);
formData.append("location", location);

if (image) {
  formData.append("image", image);
}

try {
  await axios.post(
    "http://localhost:5000/complaints",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  alert("Complaint submitted successfully!");

  setTitle("");
  setCategory("");
  setDescription("");
  setLocation("");
  setImage(null);

  navigate("/my-complaints");
} catch (error) {
      console.log(error);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "650px" }}
      >

        <div className="text-center mb-4">
          <h3>📝 Add Complaint</h3>
          <p className="text-muted">
            Submit your complaint clearly
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <label className="form-label">Complaint Title</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

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

          <label className="form-label">Description</label>
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Describe your issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label className="form-label">Upload Image</label>

          <input
             type="file"
             className="form-control mb-4"
             accept="image/*"
             onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            className="btn btn-primary w-100 mb-2"
            type="submit"
          >
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