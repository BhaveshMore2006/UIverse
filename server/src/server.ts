import app from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './database/connection';

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    console.log(`UIverse backend running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  const gracefulShutdown = async () => {
    console.log('Shutting down gracefully...');
    server.close(async () => {
      console.log('HTTP server closed.');
      await disconnectDatabase();
      process.exit(0);
    });
    
    // Force close if it takes too long
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
