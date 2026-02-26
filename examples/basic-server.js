/**
 * Basic remote-scrcpy server example
 * 
 * This is the simplest way to start a remote-scrcpy server.
 * Just run: node basic-server.js
 */

const { spawn } = require('child_process');
const path = require('path');

// Configuration
const PORT = process.env.PORT || 8009;
const HOST = process.env.HOST || 'localhost';

console.log('Starting remote-scrcpy server...');
console.log(`Port: ${PORT}`);
console.log(`Host: ${HOST}`);

// Find remote-scrcpy executable
const scrcpyPath = require.resolve('remote-scrcpy');
const scrcpyDir = path.dirname(scrcpyPath);
const scrcpyIndex = path.join(scrcpyDir, 'index.js');

// Start server
const server = spawn('node', [scrcpyIndex], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: PORT,
    HOST: HOST,
  }
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nShutting down server...');
  server.kill('SIGTERM');
});
