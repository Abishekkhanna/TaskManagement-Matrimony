import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
