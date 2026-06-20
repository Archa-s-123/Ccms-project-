import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const iconLink =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";

    if (!document.querySelector(`link[href="${iconLink}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = iconLink;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="bg-light min-vh-100">

      {/* ================= TOP BAR ================= */}
      <header className="d-flex justify-content-between align-items-center bg-white px-4 py-3 border-bottom shadow-sm">

        {/* SEARCH (UI only) */}
        <div className="position-relative" style={{ width: "280px" }}>
          <span
            className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
          >
            <i className="bi bi-search"></i>
          </span>

          <input
            type="text"
            placeholder="Search complaints..."
            className="form-control form-control-sm ps-5 bg-light rounded-3"
          />
        </div>

        {/* USER */}
        <div className="d-flex align-items-center gap-2">
          <span className="small text-secondary fw-medium">Student</span>
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
               style={{ width: "32px", height: "32px" }}>
            <i className="bi bi-person-fill"></i>
          </div>
        </div>

      </header>

      {/* ================= MAIN ================= */}
      <main className="container py-5">

        {/* TITLE */}
        <div className="mb-4">
          <h2 className="fw-bold">Student Dashboard</h2>
          <p className="text-muted">
            Manage your complaints easily
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="row g-4">

          {/* Submit Complaint */}
          <div className="col-md-4">
            <div
              className="card shadow-sm p-4 text-center rounded-4 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/add-complaint")}
            >
              <i className="bi bi-plus-circle fs-2 text-primary mb-2"></i>
              <h5 className="fw-bold">Submit Complaint</h5>
              <p className="text-muted small">
                Raise a new issue or complaint
              </p>
            </div>
          </div>

          {/* My Complaints */}
          <div className="col-md-4">
            <div
              className="card shadow-sm p-4 text-center rounded-4 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/my-complaints")}
            >
              <i className="bi bi-list-check fs-2 text-success mb-2"></i>
              <h5 className="fw-bold">My Complaints</h5>
              <p className="text-muted small">
                View and track your complaints
              </p>
            </div>
          </div>

          {/* Logout */}
          <div className="col-md-4">
            <div
              className="card shadow-sm p-4 text-center rounded-4 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <i className="bi bi-box-arrow-right fs-2 text-danger mb-2"></i>
              <h5 className="fw-bold">Logout</h5>
              <p className="text-muted small">
                Exit from dashboard
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default StudentDashboard;