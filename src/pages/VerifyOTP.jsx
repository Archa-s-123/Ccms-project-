import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/reset-password",
        {
          email,
          otp,
          password,
        }
      );

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
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
          Verify OTP
        </h2>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;