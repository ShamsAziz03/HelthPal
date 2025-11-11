// server.js
import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import equipmentRouter from './routes/equipmentRoutes.js';
import medicationRouter from './routes/medicationRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/equipment', equipmentRouter);
app.use('/medication', medicationRouter);

app.get('/', (req, res) => res.send('project API is running'));

// Test DB connection (promise style)
(async () => {
    try {
        const conn = await db.getConnection();
        await conn.ping();        // optional sanity check
        conn.release();
        console.log('DB connected successfully');
    } catch (err) {
        console.error('DB connection failed:', err && err.message ? err.message : err);

    }
})();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
