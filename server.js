const express = require("express");
const dotenv = require("dotenv");
const ngoRoutes = require('./routes/ngoRoutes');
const collaborationRoutes = require('./routes/collaborationRoutes');
const availabilityRoutes = require('./routes/drAvailabilityRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const missionRoutes = require('./routes/missionRoutes')
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