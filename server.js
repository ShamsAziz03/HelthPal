import express from "express";
import dotenv from "dotenv";
import equipmentRouter from './routes/equipmentRoutes.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use("/equipment", equipmentRouter);

app.get("/", (req, res) => res.send("project API is running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));