import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(search.toLowerCase()) ||
      complaint.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">My Complaints</h2>

        <div className="row mb-4">

          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title or Category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

        </div>

        <p className="fw-bold">
          Total Complaints: {filteredComplaints.length}
        </p>

        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.title}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.location}</td>
                  <td>{complaint.status}</td>
                  <td>{complaint.date || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        navigate("/complaint-details", {
                          state: complaint,
                        })
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-danger">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/dashboard")}
          >
            ⬅ Back to Dashboard
          </button>
        </div>

      </div>

    </div>
  );
}

export default MyComplaints;