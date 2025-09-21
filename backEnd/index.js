import dotenv from 'dotenv';
dotenv.config();   // Load env vars immediately

import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';

import studyRoutes from "./routes/studyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL

const allowedOrigins = [
CLIENT_URL ||'http://localhost:5173'

];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.json());
// Allow frontend dev server to call the API
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
// }));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Connect DB after env is loaded
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/study", studyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));