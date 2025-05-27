require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

app.use(helmet());

const allowedOrigins = [
  process.env.CLIENT_URL || "https://multi-step-user-profile.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
   
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
    }
  },
  optionsSuccessStatus: 200, t
}));

app.use(express.json());
app.use(fileUpload());
app.use(compression());
app.use(morgan("combined"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "API endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});
