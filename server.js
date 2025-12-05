// server.js

const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");

// Medical Sponsorship System
const sponsorshipRoutes = require("./routes/MedicalSponsorshipSystem/sponsorshipRoutes");
const userRoutes = require("./routes/userRoutes");
const medicalRecordRoutes = require("./routes/MedicalSponsorshipSystem/medicalRecordRoutes");
const transactionRoutes = require("./routes/MedicalSponsorshipSystem/transactionRoutes");
const patientUpdateRoutes = require("./routes/MedicalSponsorshipSystem/patientUpdateRoutes");
const invoiceRoutes = require("./routes/MedicalSponsorshipSystem/invoiceRoutes");
const patientFeedbackRoutes = require("./routes/MedicalSponsorshipSystem/patientFeedbackRoutes");

// Alerts and educational posts
const publichealthaleartRouter = require("./routes/publicHealthAlertRoutes");
const healtheducationRouter = require("./routes/healtheducationRoutes");

//Partnerships & Medical Missions
const ngoRoutes = require("./routes/ngoRoutes");
const collaborationRoutes = require("./routes/collaborationRoutes");
const availabilityRoutes = require("./routes/drAvailabilityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const missionRoutes = require("./routes/missionRoutes");

//Medication & Equipment Coordination
const equipmentRouter = require("./routes/equipmentRoutes");
const medicationRouter = require("./routes/medicationRoutes");


//Remote Medical Consulation
const doctorConsultationRoutes = require("./routes/remoteMedicalConsultations/doctorConsultationRoutes");
const bookingRequestRoutes = require("./routes/remoteMedicalConsultations/bookingRequestRoutes");
const consultationRoutes = require("./routes/remoteMedicalConsultations/consultaionRoutes");
const chatConsultationRoutes = require("./routes/remoteMedicalConsultations/chatConsultationRoutes");
const translationRoutes = require("./routes/remoteMedicalConsultations/translationRoutes");
const sessionRoutes = require("./routes/remoteMedicalConsultations/sessionRoutes");


// Mental Health & Trauma Support
const therapySessionRoutes = require("./routes/MentalHealth&TraumaSupport/therapySessionRoutes");
const supportGroupRoutes = require("./routes/supportGroupRoutes");
const therapyChattingRoutes = require("./routes/MentalHealth&TraumaSupport/therapyChattingRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route to check server status
app.get("/", (req, res) => res.send("HealthPal API is running"));

app.use("/api/sponsorships", sponsorshipRoutes);
app.use("/api/users", userRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/patient-updates", patientUpdateRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/patient-feedbacks", patientFeedbackRoutes);

app.use("/api/ngos", ngoRoutes);
app.use("/api/collaborations", collaborationRoutes);
app.use("/api/drAvailability", availabilityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/missions", missionRoutes);

app.use("/api/doctorConsultation",doctorConsultationRoutes);
app.use("/api/bookingReqForConsultation",bookingRequestRoutes);
app.use("/api/consultation",consultationRoutes);


app.use("/equipment", equipmentRouter);
app.use("/medication", medicationRouter);
app.use("/alerts", publichealthaleartRouter);
app.use("/education", healtheducationRouter);

app.use("/api/therapy-sessions", therapySessionRoutes);
app.use("/api/support-groups", supportGroupRoutes);
app.use("/api/therapy-chats", therapyChattingRoutes);

app.use("/api/chatConsultation",chatConsultationRoutes);
app.use("/api/translation",translationRoutes);
app.use("/api/consultationSession",sessionRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

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
