import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#3b82f6)",
      }}
    >
      <div
        className="text-center text-white p-5"
        style={{
          backdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "25px",
          width: "90%",
          maxWidth: "650px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: "3.5rem",
            letterSpacing: "2px",
          }}
        >
          CCMS
        </h1>

        <h3 className="fw-semibold mb-4">
          Complaint Management System
        </h3>

        <p
          className="mb-5"
          style={{
            fontSize: "18px",
            color: "#e2e8f0",
            lineHeight: "1.8",
          }}
        >
          A modern platform to submit complaints,
          track progress, receive email notifications,
          and communicate efficiently with the administration.
        </p>

        <button
          className="btn btn-light btn-lg px-5 py-3 fw-bold rounded-pill"
          onClick={() => navigate("/login")}
        >
          Get Started →
        </button>

        <p
          className="mt-5 mb-0"
          style={{
            fontSize: "14px",
            color: "#cbd5e1",
          }}
        >
          © 2026 Complaint Management System
        </p>
      </div>
    </div>
  );
}

export default LandingPage;