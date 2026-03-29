// 1️⃣ Load environment variables FIRST
require("dotenv").config();

// 2️⃣ Imports
const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes"); 
const testRoutes = require("./routes/testRoutes");
const statsRoutes = require("./routes/stats");


// 3️⃣ Create app
const app = express();

// 4️⃣ Middlewares
app.use(cors());
app.use(express.json());

// 5️⃣ Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/stats", statsRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

// 6️⃣ Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🔥 Show all crashes clearly
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE REJECTION:", err);
});