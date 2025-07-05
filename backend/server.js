require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// ✅ Security middlewares
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

// ✅ Correct allowed origins
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://multi-step-user-profile.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Allow preflight requests
app.options("*", cors());

// ✅ Allow preflight requests for all routes
app.options("*", cors());

// ✅ Body & file handling
app.use(express.json());
app.use(fileUpload());

// ✅ Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ API Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("💥 Server error:", err.message);
  if (err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
