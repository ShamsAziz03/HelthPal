const express = require("express");
const dotenv = require("dotenv");
const sponsorshipRoutes = require("./routes/sponsorshipRoutes");
const userRoutes = require("./routes/userRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const sharedRecordRoutes = require("./routes/sharedRecordRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const patientUpdateRoutes = require("./routes/patientUpdateRoutes");
const db = require("./config/db");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route to check server status
app.get("/", (req, res) => res.send("HealthPal API is running"));

// Use sponsorship routes
app.use("/api/sponsorships", sponsorshipRoutes);

// Use user routes
app.use("/api/users", userRoutes);

// Use medical record routes
app.use("/api", medicalRecordRoutes);

// Use shared record routes
app.use("/api", sharedRecordRoutes);

// Use transaction routes
app.use("/api/transactions", transactionRoutes);

// Use patient update routes
app.use("/api/patient-updates", patientUpdateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Test database connection
db.execute("SELECT 1")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test at: http://localhost:${PORT}`);
  console.log(`API endpoints: http://localhost:${PORT}/api/sponsorships`);
});
