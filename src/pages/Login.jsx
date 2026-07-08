import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const handleLogin = async (e) => {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    console.log(res.data);
    localStorage.setItem("userId", res.data.user._id);
    localStorage.setItem("role", res.data.user.role);

    if (res.data.user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      
      navigate("/dashboard");
    }

  } catch (error) {
    setLoading(false);

    console.log(error.response);

    setError(
      error.response?.data?.message || "Login failed"
    );
  }
};

return (
<div className="container mt-5">
<div className="card p-4 mx-auto shadow" style={{ maxWidth: "400px" }}>
<h2 className="text-center mb-4">CCMS Login</h2>

<form onSubmit={handleLogin}>  
      <input  
        type="email"  
        className="form-control mb-3"  
        placeholder="Email"  
        value={email}  
        onChange={(e) => setEmail(e.target.value)}  
      />  

     <input  
        type={showPassword ? "text" : "password"}  
        className="form-control mb-3"  
        placeholder="Password"  
        value={password}  
       onChange={(e) => setPassword(e.target.value)}  
      />  
    <div className="form-check mb-3">  
     <input  
         className="form-check-input"  
         type="checkbox"  
         checked={showPassword}  
         onChange={() => setShowPassword(!showPassword)}  
         id="showPassword"  
      />  

        <label className="form-check-label" htmlFor="showPassword">  
          Show Password  
        </label>  
    </div>  

       

      <button className="btn btn-primary w-100" type="submit">  
        {loading ? "Logging in..." : "Login"}  
      </button>  

      <p className="text-center mt-3">  
       <span  
        style={{ color: "blue", cursor: "pointer" }}  
       onClick={() => navigate("/forgot-password")}  
       >  
        Forgot Password?  
       </span>  
      </p>  

    {/* Sign Up link */}  
    <p className="text-center mt-2">  
    <span  
        style={{ color: "blue", cursor: "pointer" }}  
        onClick={() => navigate("/signup")}  
    >  
      Sign Up  
    </span>  
    </p>  
    </form>  
  </div>  
</div>

);
}

export default Login;