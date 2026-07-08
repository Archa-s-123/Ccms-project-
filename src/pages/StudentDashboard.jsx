import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentDashboard() {
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
  .get(`http://localhost:5000/profile/${userId}`)
  .then((res) => setUser(res.data))
  .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.log(err));

    const iconLink =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";

    if (!document.querySelector(`link[href="${iconLink}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = iconLink;
      document.head.appendChild(link);
    }
  }, []);

  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="bg-light min-vh-100">

      <header className="d-flex justify-content-between align-items-center bg-white px-4 py-3 border-bottom shadow-sm">
        <div>
          <h5 className="mb-0 fw-bold">Student Dashboard</h5>
          <small className="text-muted">Complaint Management System</small>
        </div>

       <div
  className="d-flex align-items-center gap-2"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/profile")}
>
  <div className="d-flex align-items-center gap-2">
  <span className="small text-secondary fw-medium">
    {user.name}
  </span>

  {user.profileImage ? (
    <img
      src={`http://localhost:5000/uploads/${user.profileImage}`}
      alt="Profile"
      className="rounded-circle"
      width="35"
      height="35"
      style={{
        objectFit: "cover",
        cursor: "pointer",
      }}
      onClick={() => navigate("/profile")}
    />
  ) : (
    <div
      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
      style={{
        width: "35px",
        height: "35px",
        cursor: "pointer",
      }}
      onClick={() => navigate("/profile")}
    >
      <i className="bi bi-person-fill"></i>
    </div>
  )}
</div>

</div>
      </header>

      <main className="container py-5">

        <div className="mb-4">
          <h2 className="fw-bold">Welcome Student 👋</h2>
          <p className="text-muted">
            Manage your complaints easily.
          </p>
        </div>

        {/* Statistics */}
        <div className="row g-4 mb-5">

          <div className="col-md-3">
            <div className="card shadow-sm text-center p-3">
              <h6>Total</h6>
              <h3>{total}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm text-center p-3">
              <h6>Pending</h6>
              <h3>{pending}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm text-center p-3">
              <h6>In Progress</h6>
              <h3>{inProgress}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm text-center p-3">
              <h6>Resolved</h6>
              <h3>{resolved}</h3>
            </div>
          </div>

        </div>

        {/* Action Cards */}
        <div className="row g-4">

          <div className="col-md-4">
            <div
              className="card shadow-sm p-4 text-center rounded-4 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/add-complaint")}
            >
              <i className="bi bi-plus-circle fs-2 text-primary mb-2"></i>
              <h5>Submit Complaint</h5>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card shadow-sm p-4 text-center rounded-4 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/my-complaints")}
            >
              <i className="bi bi-list-check fs-2 text-success mb-2"></i>
              <h5>My Complaints</h5>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card shadow-sm p-4 text-center rounded-4 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              <i className="bi bi-box-arrow-right fs-2 text-danger mb-2"></i>
              <h5>Logout</h5>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;