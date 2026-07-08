const multer = require("multer");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Complaint = require("./models/Complaint");
const User = require("./models/User");
const transporter = require("./config/mailer");
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
      userId: req.body.userId,
      status: "Pending",
      date: new Date().toLocaleString(),
      image: req.file ? req.file.filename : "",
    });

    await complaint.save();

    // Find the student
    const user = await User.findById(req.body.userId);

    // Send confirmation email
    if (user) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Complaint Submitted Successfully",
        text: `Hello ${user.name},

Your complaint has been submitted successfully.

Complaint Details
-----------------------
Title: ${complaint.title}
Category: ${complaint.category}
Status: ${complaint.status}
Date: ${complaint.date}

Our team will review your complaint and keep you updated.

Thank you,
CCMS Team`,
      });
    }

    res.status(201).json({
      message: "Complaint saved successfully",
      complaint,
    });

  } catch (error) {
    console.log(error);

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
    // Update complaint status
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    // Find the student who submitted the complaint
    const user = await User.findById(updatedComplaint.userId);

    if (user) {
      let subject = "";
      let text = "";

      if (updatedComplaint.status === "In Progress") {
        subject = "Complaint Status Updated";
        text = `Hello ${user.name},

Your complaint "${updatedComplaint.title}" is now In Progress.

Our team has started working on your complaint.

Thank you,
CCMS Team`;
      }

      if (updatedComplaint.status === "Resolved") {
        subject = "Complaint Resolved";
        text = `Hello ${user.name},

Good news!

Your complaint "${updatedComplaint.title}" has been resolved.

Thank you for using CCMS.

CCMS Team`;
      }

      if (subject !== "") {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject,
          text,
        });
      }
    }

    res.json(updatedComplaint);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating status",
    });
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

    // Send Welcome Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Complaint Management System (CCMS)",
      text: `Hello ${name},

Welcome to Complaint Management System (CCMS)!

Your account has been created successfully.

You can now log in and submit complaints.

Thank you,
CCMS Team`,
    });

    res.status(201).json({
      message: "Account created successfully",
    });

  } catch (error) {
    console.log(error);

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
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email is not registered.",
      });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiry (5 minutes)
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "CCMS Password Reset OTP",
      text: `Hello ${user.name},

Your OTP for resetting your password is:

${otp}

This OTP is valid for 5 minutes.

If you did not request a password reset, please ignore this email.

Thank you,
CCMS Team`,
    });

    res.json({
      message: "OTP sent successfully to your email.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP has expired.",
      });
    }
    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+^()])[A-Za-z\d@$!%*?&#+^()]{8,}$/;

if (!passwordRegex.test(password)) {
  return res.status(400).json({
    message:
      "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.",
  });
}

    user.password = password;
    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    res.json({
      message: "Password reset successful. Please login.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});