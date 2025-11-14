import express from "express";
import dotenv from "dotenv";
import ngoRoutes from "./routes/ngoRoutes.js";
import collaborationRoutes from "./routes/collaborationRoutes.js";
import availabilityRoutes from "./routes/drAvailabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import missionRoutes from "./routes/missionRoutes.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/ngos', ngoRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/drAvailability', availabilityRoutes);
app.use('/api/booking', bookingRoutes)
app.use('/api/missions', missionRoutes)

app.get("/", (req, res) => res.send("project API is running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));