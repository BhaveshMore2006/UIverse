import mongoose from 'mongoose';
import { env } from '../config/env';
import { seedCounters } from '../seed/seed';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log('MongoDB connected');
    await seedCounters();
  } catch (error) {
    console.error('MongoDB connection error');
    // Never log credentials
    if (error instanceof Error) {
       console.error(error.message);
    }
    // Don't exit the process so the health check endpoint can return 503
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnection error', error);
  }
};

// Graceful shutdown handling is usually handled in the main server.ts
