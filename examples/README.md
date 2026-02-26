# remote-scrcpy Examples

This directory contains example configurations and code snippets to help you get started with remote-scrcpy.

## 🚀 Quick Setup

```bash
# Navigate to examples directory
cd examples

# Install dependencies
npm install

# Run basic server
npm run basic

# Or run Express integration
npm run express
```

## 📁 Files

### Basic Examples

- **`basic-server.js`** - Simplest way to start a remote-scrcpy server
  ```bash
  npm install remote-scrcpy
  node basic-server.js
  ```

- **`express-integration.js`** - Integrate remote-scrcpy into an Express app
  ```bash
  npm install express remote-scrcpy
  node express-integration.js
  ```

- **`react-component.jsx`** - React component for embedding device streams
  ```jsx
  import DeviceStream from './react-component';
  <DeviceStream deviceId="192.168.1.100:5555" />
  ```

### Production Deployment

- **`pm2-ecosystem.config.js`** - PM2 process manager configuration
  ```bash
  npm install -g pm2
  pm2 start pm2-ecosystem.config.js
  ```

- **`docker-compose.yml`** - Docker Compose setup with USB device access
  ```bash
  docker-compose up -d
  ```

- **`nginx.conf`** - Nginx reverse proxy with HTTPS and WebSocket support
  ```bash
  sudo cp nginx.conf /etc/nginx/sites-available/remote-scrcpy
  sudo ln -s /etc/nginx/sites-available/remote-scrcpy /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl reload nginx
  ```

## 🚀 Quick Start

### Installation

```bash
# Clone or download the examples
cd examples

# Install dependencies (includes remote-scrcpy)
npm install
```

### 1. Basic Server

The simplest way to get started:

```bash
# Using npm script
npm run basic

# Or directly
node basic-server.js

# Access
open http://localhost:8009
```

### 2. Express Integration

```bash
# Using npm script
npm run express

# Or directly
node express-integration.js

# Access
# Main app: http://localhost:3000
# Device server: http://localhost:8009
```

### 3. PM2 Deployment

```bash
# Start with PM2
npm run pm2:start

# Monitor
npm run pm2:monit

# View logs
npm run pm2:logs

# Restart
npm run pm2:restart

# Stop
npm run pm2:stop
```

### 4. Docker Deployment

```bash
# Start containers
npm run docker:up

# View logs
npm run docker:logs

# Stop containers
npm run docker:down
```

## 📖 Usage Scenarios

### Scenario 1: Local Development

Use `basic-server.js` for quick testing:

```bash
npm install
npm run basic
```

### Scenario 2: Web Application Integration

Use `express-integration.js` to embed device control in your web app:

```bash
npm install
npm run express
# Main app: http://localhost:3000
# Device server: http://localhost:8009
```

### Scenario 3: React/Vue Application

Copy `react-component.jsx` to your project:

```bash
# In your React project
npm install remote-scrcpy

# Copy the component
cp examples/react-component.jsx src/components/DeviceStream.jsx

# Use it
import DeviceStream from './components/DeviceStream';
<DeviceStream 
  deviceId="192.168.1.100:5555"
  player="mse"
  scrcpyUrl="http://localhost:8009"
/>
```

### Scenario 4: Production Deployment with PM2

Use PM2 for process management:

```bash
npm install
npm run pm2:start
pm2 save
pm2 startup
```

### Scenario 5: Docker Deployment

Use Docker Compose for containerized deployment:

```bash
npm run docker:up
```

### Scenario 6: HTTPS with Nginx

Use Nginx as reverse proxy:

```bash
# Copy config
sudo cp nginx.conf /etc/nginx/sites-available/remote-scrcpy

# Enable site
sudo ln -s /etc/nginx/sites-available/remote-scrcpy /etc/nginx/sites-enabled/

# Get SSL certificate (Let's Encrypt)
sudo certbot --nginx -d your-domain.com

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Configuration

### Available Scripts

After running `npm install` in the examples directory, you can use:

```bash
# Basic server
npm run basic              # Start basic server

# Express integration
npm run express            # Start Express app with remote-scrcpy

# PM2 commands
npm run pm2:start          # Start with PM2
npm run pm2:stop           # Stop PM2 process
npm run pm2:restart        # Restart PM2 process
npm run pm2:logs           # View PM2 logs
npm run pm2:monit          # Monitor PM2 processes

# Docker commands
npm run docker:up          # Start Docker containers
npm run docker:down        # Stop Docker containers
npm run docker:logs        # View Docker logs
```

### Environment Variables

All examples support these environment variables:

- `PORT` - Server port (default: 8009)
- `HOST` - Server host (default: localhost)
- `NODE_ENV` - Environment mode (development/production)

### URL Parameters

When embedding device streams:

- `udid` - Device identifier (required)
  - USB: `emulator-5554`
  - Network: `192.168.1.100:5555`
- `player` - Video decoder (optional, default: mse)
  - `mse` - H264 Converter (best quality)
  - `broadway` - Broadway.js (universal)
  - `tinyh264` - Tiny H264 (lightweight)
  - `webcodecs` - WebCodecs (Chrome/Edge only)

Example:
```
http://localhost:8009/embed.html?udid=192.168.1.100:5555&player=mse
```

## 🛠️ Troubleshooting

### Port already in use

```bash
# Find process
lsof -i :8009

# Use different port
PORT=9000 node basic-server.js
```

### Cannot connect to device

```bash
# Check ADB connection
adb devices

# Connect network device
adb connect 192.168.1.100:5555
```

### WebSocket connection failed

- Check firewall rules
- Ensure WebSocket support in proxy (Nginx/Apache)
- Verify CORS headers if accessing from different domain

## 📚 Additional Resources

- [Main Documentation](../README.md)
- [Deployment Guide](../README.md#deployment-guide)
- [Troubleshooting](../README.md#troubleshooting)
- [Security Best Practices](../README.md#security-best-practices)

## 💡 Tips

1. **Development**: Use `basic-server.js` for quick testing
2. **Integration**: Use `express-integration.js` as a starting point
3. **Production**: Use PM2 or Docker for reliability
4. **Security**: Always use HTTPS in production
5. **Performance**: Use MSE decoder for best quality

## 🤝 Contributing

Have a useful example? Feel free to contribute!

1. Create your example file
2. Add documentation
3. Test thoroughly
4. Submit a pull request

## 📄 License

All examples are provided under the same license as remote-scrcpy (MIT).
