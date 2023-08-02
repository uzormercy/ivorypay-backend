/* eslint-disable no-console */
import 'dotenv/config';
import 'reflect-metadata';
import { createServer } from 'http';
import app from './application';
import { AppDataSource } from './config/database';

const server = createServer(app);
const { PORT, HOST } = process.env;

AppDataSource.initialize()
  .then(res => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.log('Connection error', err);
  });

server.listen(PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Server running on ${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('Server shut down.');
    process.exit(0);
  });
});

// Error handling
process.on('uncaughtException', err => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});
