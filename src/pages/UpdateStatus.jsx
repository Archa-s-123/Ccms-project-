import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateStatus() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [status, setStatus] = useState("Pending");

  // Load complaints from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(data);
  }, []);

  const handleUpdate = () => {
    if (complaints.length === 0) {
      alert("No complaints available");
      return;
    }

    if (selectedIndex === "") {
      alert("Please select a complaint");
      return;
    }

    const updatedComplaints = [...complaints];
    updatedComplaints[selectedIndex].status = status;

    localStorage.setItem(
      "complaints",
      JSON.stringify(updatedComplaints)
    );

    setComplaints(updatedComplaints);

    alert("Status updated successfully!");

    navigate("/admin-dashboard");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto shadow" style={{ maxWidth: "500px" }}>
        
        <h2 className="mb-3">Update Status</h2>

        {/* Complaint Dropdown */}
        <select
          className="form-control mb-3"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(e.target.value)}
        >
          <option value="">Select Complaint</option>

          {complaints.length === 0 ? (
            <option disabled>No complaints available</option>
          ) : (
            complaints.map((c, index) => (
              <option key={index} value={index}>
                {c.title}
              </option>
            ))
          )}
        </select>

        {/* Status Dropdown */}
        <select
          className="form-control mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        {/* Update Button */}
        <button
          className="btn btn-primary w-100"
          onClick={handleUpdate}
        >
          Update Status
        </button>

        {/* Back Button */}
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