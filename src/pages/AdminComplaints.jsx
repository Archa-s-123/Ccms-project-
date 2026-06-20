import { useNavigate } from "react-router-dom";

function AdminComplaints() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">

      <h2 className="mb-4">All Complaints</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>WiFi Not Working</td>
            <td>Internet/Wi-Fi</td>
            <td>Pending</td>
          </tr>

          <tr>
            <td>Fan Not Working</td>
            <td>Electrical</td>
            <td>Resolved</td>
          </tr>

          <tr>
            <td>Projector Issue</td>
            <td>Classroom</td>
            <td>In Progress</td>
          </tr>
        </tbody>
      </table>

      {/* 🔙 Back Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin-dashboard")}
        >
          ⬅ Back to Admin Dashboard
        </button>
      </div>

    </div>
  );
}

export default AdminComplaints;