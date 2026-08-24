import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

import healthRoutes from './routes/health.routes';
import generateRoutes from './routes/generate.routes';
import sectionRoutes from './routes/sections.routes';
import elementRoutes from './routes/elements.routes';
import authRoutes from './routes/auth.routes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploads (wireframes/images)
app.use('/storage', express.static(path.join(__dirname, '../uploads')));
app.use('/storage/default/images', express.static(path.join(__dirname, '../storage/default/images')));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/elements', elementRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    ok: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Internal Server Error',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    ok: false,
    error: { code: 'NOT_FOUND', message: 'Endpoint not found' }
  });
});

export default app;
