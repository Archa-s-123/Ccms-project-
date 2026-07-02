import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.log(err));
  }, []);

  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const chartData = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "In Progress",
      value: inProgress,
    },
    {
      name: "Resolved",
      value: resolved,
    },
  ];

  return (

   <div className="bg-light min-vh-100">

  {/* Top Bar */}
  <header className="d-flex justify-content-between align-items-center bg-white px-4 py-3 border-bottom shadow-sm">
    <div>
      <h5 className="mb-0 fw-bold">Admin Dashboard</h5>
      <small className="text-muted">Complaint Management System</small>
    </div>

    <div className="d-flex align-items-center gap-2">
      <span className="text-secondary small">Admin</span>

      <div
        className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: "32px", height: "32px" }}
      >
        <i className="bi bi-shield-lock"></i>
      </div>
    </div>
  </header>

  <main className="container py-5">

    <div className="mb-4">
      <h2 className="fw-bold">Welcome Admin 👋</h2>
      <p className="text-muted">
        Manage student complaints efficiently.
      </p>
    </div>

    {/* Statistics */}
    <div className="row g-4 mb-5">

      <div className="col-md-3">
        <div className="card shadow-sm p-4 text-center">
          <h6>Total</h6>
          <h2>{total}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm p-4 text-center">
          <h6>Pending</h6>
          <h2>{pending}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm p-4 text-center">
          <h6>In Progress</h6>
          <h2>{inProgress}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm p-4 text-center">
          <h6>Resolved</h6>
          <h2>{resolved}</h2>
        </div>
      </div>

    </div>

    {/* Analytics */}
    <div className="card shadow-sm p-4 mb-5">

      <h4 className="text-center mb-4">
        Complaint Analytics
      </h4>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>

    </div>

    {/* Action Cards */}
    <div className="row g-4">
    <div className="col-md-4">
        <div
          className="card shadow-sm p-4 text-center rounded-4 h-100"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin-complaints")}
        >
          <i className="bi bi-clipboard-data fs-2 text-primary mb-2"></i>
          <h5>View Complaints</h5>
          <p className="text-muted">
            View all student complaints
          </p>
        </div>
      </div>

      <div className="col-md-4">
        <div
          className="card shadow-sm p-4 text-center rounded-4 h-100"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/update-status")}
        >
          <i className="bi bi-arrow-repeat fs-2 text-warning mb-2"></i>
          <h5>Update Status</h5>
          <p className="text-muted">
            Change complaint status
          </p>
        </div>
      </div>

      <div className="col-md-4">
        <div
          className="card shadow-sm p-4 text-center rounded-4 h-100"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <i className="bi bi-box-arrow-right fs-2 text-danger mb-2"></i>
          <h5>Logout</h5>
          <p className="text-muted">
            Logout from Admin Panel
          </p>
        </div>
      </div>

    </div>

  </main>

</div>
  );
}

export default AdminDashboard;
