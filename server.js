import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

//Partnerships & Medical Missions
import ngoRoutes from "./routes/ngoRoutes.js";
import collaborationRoutes from "./routes/collaborationRoutes.js";
import availabilityRoutes from "./routes/drAvailabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import missionRoutes from "./routes/missionRoutes.js";

app.use("/api/ngos", ngoRoutes);
app.use("/api/collaborations", collaborationRoutes);
app.use("/api/drAvailability", availabilityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/missions", missionRoutes);

//Medication & Equipment Coordination
import equipmentRouter from "./routes/equipmentRoutes.js";
import medicationRouter from "./routes/medicationRoutes.js";

app.use("/equipment", equipmentRouter);
app.use("/medication", medicationRouter);


app.get("/", (req, res) => res.send("project API is running"));


(async () => {
    try {
        const conn = await db.getConnection();
        await conn.ping();
        conn.release();
        console.log("DB connected successfully");
    } catch (err) {
        console.error(
            "DB connection failed:",
            err?.message || err
        );
    }
})();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log(`server running on port ${PORT}`)
);
