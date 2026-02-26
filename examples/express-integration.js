/**
 * Express integration example
 * 
 * This example shows how to integrate remote-scrcpy into an Express application.
 * The main app runs on port 3000, and remote-scrcpy runs on port 8009.
 * 
 * Install dependencies:
 *   npm install express remote-scrcpy
 * 
 * Run:
 *   node express-integration.js
 */

const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;
const SCRCPY_PORT = process.env.SCRCPY_PORT || 8009;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/scrcpy-url', (req, res) => {
  res.json({ 
    url: `http://localhost:${SCRCPY_PORT}`,
    embedUrl: `http://localhost:${SCRCPY_PORT}/embed.html`
  });
});

// Serve a simple HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Remote Device Control</title>
      <style>
        body {
          margin: 0;
          padding: 20px;
          font-family: Arial, sans-serif;
          background: #1a1a1a;
          color: #fff;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
        .device-frame {
          width: 100%;
          height: 80vh;
          border: none;
          border-radius: 8px;
          background: #000;
        }
        .info {
          text-align: center;
          margin-top: 20px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎮 Remote Device Control</h1>
        <iframe 
          class="device-frame"
          src="http://localhost:${SCRCPY_PORT}"
          allow="autoplay"
        ></iframe>
        <div class="info">
          <p>Main App: http://localhost:${PORT}</p>
          <p>Device Server: http://localhost:${SCRCPY_PORT}</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Start remote-scrcpy server
function startScrcpyServer() {
  console.log(`Starting remote-scrcpy on port ${SCRCPY_PORT}...`);
  
  const scrcpyPath = require.resolve('remote-scrcpy');
  const scrcpyIndex = path.join(path.dirname(scrcpyPath), 'index.js');
  
  const scrcpyServer = spawn('node', [scrcpyIndex], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: SCRCPY_PORT,
      HOST: 'localhost',
    }
  });

  scrcpyServer.on('error', (err) => {
    console.error('Failed to start remote-scrcpy:', err);
  });

  scrcpyServer.on('exit', (code) => {
    console.log(`remote-scrcpy exited with code ${code}`);
  });

  // Cleanup on exit
  process.on('exit', () => {
    scrcpyServer.kill();
  });

  process.on('SIGINT', () => {
    scrcpyServer.kill('SIGINT');
    process.exit();
  });

  return scrcpyServer;
}

// Start servers
app.listen(PORT, () => {
  console.log(`✓ Express app running on http://localhost:${PORT}`);
  startScrcpyServer();
});
