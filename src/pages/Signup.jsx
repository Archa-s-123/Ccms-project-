import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // check all fields
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    // password match check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Account created successfully!");

    // go back to login page
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto shadow" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSignup}>
          {/* Name */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Button */}
          <button className="btn btn-success w-100" type="submit">
            Sign Up
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center mt-3">
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;