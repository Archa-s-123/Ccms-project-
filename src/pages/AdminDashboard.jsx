import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  // FIXED PRESENTATION VALUES
  const total = 3;
  const pending = 1;
  const resolved = 1;

  return (
    <div className="bg-light min-vh-100">

      {/* TOP BAR */}
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

      {/* MAIN */}
      <main className="container-xl py-5 px-4">

        {/* WELCOME */}
        <div className="mb-4">
          <h2 className="fw-bold">Welcome Admin 👋</h2>
          <p className="text-muted">
            Manage student complaints and update their status.
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <div className="card shadow-sm p-4 rounded-4 text-center">
              <p className="text-muted mb-1">Total Complaints</p>
              <h2 className="fw-bold">{total}</h2>
              <i className="bi bi-clipboard-data fs-3 text-primary"></i>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 rounded-4 text-center">
              <p className="text-muted mb-1">Pending</p>
              <h2 className="fw-bold">{pending}</h2>
              <i className="bi bi-hourglass-split fs-3 text-warning"></i>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 rounded-4 text-center">
              <p className="text-muted mb-1">Resolved</p>
              <h2 className="fw-bold">{resolved}</h2>
              <i className="bi bi-check-circle fs-3 text-success"></i>
            </div>
          </div>

        </div>

        {/* ACTION CARDS */}
        <div className="row g-4 mt-3">

          <div className="col-md-4">
            <div
              className="card shadow-sm p-4 text-center rounded-4 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin-complaints")}
            >
              <i className="bi bi-clipboard-data fs-2 text-primary mb-2"></i>
              <h5>View Complaints</h5>
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
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;