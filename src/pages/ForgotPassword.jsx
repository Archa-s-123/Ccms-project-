import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/forgot-password",
        {
          email,
        }
      );

      setLoading(false);

      alert(res.data.message);

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (error) {
      setLoading(false);

      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleReset}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <p className="text-center mt-3">
          <span
            style={{
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;