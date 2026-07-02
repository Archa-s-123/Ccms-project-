import { useLocation, useNavigate } from "react-router-dom";

function ComplaintDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="container mt-5 text-center">
        <h3>No Complaint Selected</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/my-complaints")}
        >
          ⬅ Back to My Complaints
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "700px" }}
      >

        <h2 className="text-center mb-4">
          Complaint Details
        </h2>

        <table className="table table-bordered">

          <tbody>
            <tr>
              <th>Image</th>
              <td>
                 {state.image ? (
                 <img
                    src={`http://localhost:5000/uploads/${state.image}`}
                    alt="Complaint"
                    className="img-fluid rounded"
                    style={{ maxWidth: "300px" }}
                 />
                ) : (
                    "No image uploaded"
                  )}
               </td>
           </tr>

            <tr>
              <th width="30%">Title</th>
              <td>{state.title}</td>
            </tr>

            <tr>
              <th>Category</th>
              <td>{state.category}</td>
            </tr>

            <tr>
              <th>Location</th>
              <td>{state.location}</td>
            </tr>

            <tr>
              <th>Status</th>
              <td>{state.status}</td>
            </tr>

            <tr>
              <th>Description</th>
              <td>{state.description}</td>
            </tr>

            <tr>
              <th>Date & Time</th>
              <td>{state.date || "N/A"}</td>
            </tr>

          </tbody>

        </table>

        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/my-complaints")}
          >
            ⬅ Back to My Complaints
          </button>
        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;