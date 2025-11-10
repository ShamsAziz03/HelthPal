const express = require("express");
const dotenv = require("dotenv");
const sponsorshipRoutes = require("./routes/sponsorshipRoutes");
const userRoutes = require("./routes/userRoutes");
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
