function Register() {
  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
        />

        <button className="btn btn-success w-100">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;