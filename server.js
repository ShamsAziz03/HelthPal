// server.js

import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

// Medical Sponsorship System
import sponsorshipRoutes from "./routes/MedicalSponsorshipSystem/sponsorshipRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import medicalRecordRoutes from "./routes/MedicalSponsorshipSystem/medicalRecordRoutes.js";
import sharedRecordRoutes from "./routes/MedicalSponsorshipSystem/sharedRecordRoutes.js";
import transactionRoutes from "./routes/MedicalSponsorshipSystem/transactionRoutes.js";
import patientUpdateRoutes from "./routes/MedicalSponsorshipSystem/patientUpdateRoutes.js";
import invoiceRoutes from "./routes/MedicalSponsorshipSystem/invoiceRoutes.js";
import patientFeedbackRoutes from "./routes/MedicalSponsorshipSystem/patientFeedbackRoutes.js";

// Alerts and educational posts
import publichealthaleartRouter from "./routes/publicHealthAlertRoutes.js";
import healtheducationRouter from "./routes/healtheducationRoutes.js";

//Partnerships & Medical Missions
import ngoRoutes from "./routes/ngoRoutes.js";
import collaborationRoutes from "./routes/collaborationRoutes.js";
import availabilityRoutes from "./routes/drAvailabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import missionRoutes from "./routes/missionRoutes.js";

//Medication & Equipment Coordination
import equipmentRouter from "./routes/equipmentRoutes.js";
import medicationRouter from "./routes/medicationRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route to check server status
app.get("/", (req, res) => res.send("HealthPal API is running"));

app.use("/api/sponsorships", sponsorshipRoutes);
app.use("/api/users", userRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/shared-records", sharedRecordRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/patient-updates", patientUpdateRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/patient-feedbacks", patientFeedbackRoutes);

app.use("/api/ngos", ngoRoutes);
app.use("/api/collaborations", collaborationRoutes);
app.use("/api/drAvailability", availabilityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/missions", missionRoutes);

app.use("/equipment", equipmentRouter);
app.use("/medication", medicationRouter);
app.use("/alerts", publichealthaleartRouter);
app.use("/education", healtheducationRouter);
app.get("/", (req, res) => res.send("project API is running"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

(async () => {
  try {
    const conn = await db.getConnection();
    await conn.ping();
    conn.release();
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection failed:", err?.message || err);
  }
})();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
