#!/usr/bin/env node
/* eslint-disable no-fallthrough */
/* eslint-disable no-console */

/**
 * Module dependencies.
 */
import http from 'http';
import app from '../app';
import models from '../data/models';
import settings from '../config';
import { storeUsers } from '../scripts/storeUsers';
import { storePerformances } from '../scripts/storePerformanceData';

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
  case 'EADDRINUSE':
    console.error(`${bind} is already in use`);
    process.exit(1);
  default:
    throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
  storeUsers().then((userResult) => {
    console.log('result users');
    console.log(userResult);
  });

  storePerformances().then((perfResult) => {
    console.log('result performance');
    console.log(perfResult);
  });
};
/**
 * Listen on provided port, on all network interfaces.
 */
models.sequelize
  .sync({ force: settings.nodeEnvironment !== 'production' })
  .then(() => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  })
  .catch((error) => console.error({ error }));
