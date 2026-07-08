import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check all fields
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Strong password validation
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPassword.test(password)) {
      alert(
        "Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character."
      );
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto shadow"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;