import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Task Management API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

export { app }; // Export app for testing

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err); // Log error to console
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

