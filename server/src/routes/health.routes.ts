import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    res.json({
      ok: true,
      service: 'uiverse-api',
      database: 'connected',
    });
  } else {
    res.status(503).json({
      ok: false,
      service: 'uiverse-api',
      database: 'disconnected',
    });
  }
});

export default router;
