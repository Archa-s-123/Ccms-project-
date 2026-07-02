const multer = require("multer");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Complaint = require("./models/Complaint");
const User = require("./models/User");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Make uploads folder publicly accessible
app.use("/uploads", express.static("uploads"));

console.log(process.env.MONGO_URI); // 👈 Add this line

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("CCMS Backend Running");
});
app.post("/complaints", upload.single("image"), async (req, res) => {
  try {
    const complaint = new Complaint({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      status: "Pending",
      date: new Date().toLocaleString(),
      image: req.file ? req.file.filename : "",
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint saved successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving complaint",
      error,
    });
  }
});
app.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaints",
    });
  }
});
app.put("/complaints/:id", async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
});
app.delete("/complaints/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting complaint",
      error,
    });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const user = new User({
      name,
      email,
      password,
      role: "student",
    });

    await user.save();

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) {
  return res.status(404).json({
    message: "Email is not registered.",
  });
}

if (user.password !== password) {
  return res.status(401).json({
    message: "Incorrect password.",
  });
}

res.status(200).json({
  message: "Login successful",
  user,
});
    
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
});
app.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.put("/profile/:id", async (req, res) => {
  try {
    const { name, password } = req.body;

    const updateData = {
      name,
    };

    // Only update password if a new one is entered
    if (password && password.trim() !== "") {
      updateData.password = password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
    });
  }
});
app.put(
  "/profile/:id/image",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          profileImage: req.file
            ? req.file.filename
            : "",
        },
        { new: true }
      );

      res.json({
        message: "Profile image updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error uploading profile image",
      });
    }
  }
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});