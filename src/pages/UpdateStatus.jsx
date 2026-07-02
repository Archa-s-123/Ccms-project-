import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateStatus() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    axios
      .get("http://localhost:5000/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = async () => {
    if (!selectedId) {
      alert("Please select a complaint");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/complaints/${selectedId}`,
        {
          status,
        }
      );

      alert("Status updated successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      alert("Error updating status");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto shadow"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="mb-3">Update Status</h2>

        <select
          className="form-control mb-3"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Select Complaint</option>

          {complaints.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <select
          className="form-control mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <button
          className="btn btn-primary w-100"
          onClick={handleUpdate}
        >
          Update Status
        </button>

        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin-dashboard")}
          >
            ⬅ Back to Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatus;