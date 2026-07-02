import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
    console.log("Profile page loaded");
    console.log(localStorage.getItem("userId"));
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/profile/${userId}`
      );
      console.log(res.data);

      setName(res.data.name);
      setEmail(res.data.email);
      setProfileImage(res.data.profileImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/profile/${userId}`,
        {
          name,
          password,
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
  console.log(error.response);

  alert(
    error.response?.data?.error ||
    error.response?.data?.message ||
    "Error updating profile"
  );
}
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      await axios.put(
        `http://localhost:5000/profile/${userId}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile picture updated!");

      fetchProfile();
    } catch (error) {
      alert("Image upload failed");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">
          My Profile
        </h2>

        <div className="text-center mb-4">

          {profileImage ? (
            <img
              src={`http://localhost:5000/uploads/${profileImage}`}
              alt="Profile"
              className="rounded-circle"
              width="130"
              height="130"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              className="rounded-circle"
              width="130"
              height="130"
            />
          )}

          <input
            type="file"
            className="form-control mt-3"
            onChange={(e) =>
              setSelectedImage(e.target.files[0])
            }
          />

          <button
            className="btn btn-primary mt-3"
            onClick={uploadImage}
          >
            Upload Picture
          </button>

        </div>

        <label>Name</label>

        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <label>Email</label>

        <input
          type="email"
          className="form-control mb-3"
          value={email}
          disabled
        />

        <label>New Password</label>

        <input
          type="password"
          className="form-control mb-4"
          placeholder="Enter new password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

       <button
  className="btn btn-success w-100"
  onClick={handleUpdate}
>
  Save Changes
</button>

<button
  className="btn btn-secondary w-100 mt-3"
  onClick={() => navigate("/dashboard")}
>
  ← Back to Dashboard
</button>
      </div>
    </div>
  );
}

export default Profile;