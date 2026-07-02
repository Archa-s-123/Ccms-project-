import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AddComplaint from "./pages/AddComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import UpdateStatus from "./pages/UpdateStatus";
import ComplaintDetails from "./pages/ComplaintDetails";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./pages/PrivateRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/add-complaint" element={<AddComplaint />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-complaints" element={<AdminComplaints />} />
        <Route path="/update-status" element={<UpdateStatus />} />
        <Route path="/complaint-details" element={<ComplaintDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route
  path="/student-dashboard"
  element={
    <PrivateRoute>
      <StudentDashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/admin-dashboard"
  element={
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;