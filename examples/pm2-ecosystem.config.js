/**
 * PM2 Ecosystem Configuration for remote-scrcpy
 * 
 * This configuration file is used to deploy remote-scrcpy with PM2 process manager.
 * 
 * Install PM2:
 *   npm install -g pm2
 * 
 * Start:
 *   pm2 start ecosystem.config.js
 * 
 * Monitor:
 *   pm2 monit
 * 
 * Logs:
 *   pm2 logs remote-scrcpy
 * 
 * Stop:
 *   pm2 stop remote-scrcpy
 * 
 * Restart:
 *   pm2 restart remote-scrcpy
 */

module.exports = {
  apps: [
    {
      name: 'remote-scrcpy',
      script: 'remote-scrcpy',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8009,
        HOST: '0.0.0.0'
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 8009,
        HOST: 'localhost'
      },
      error_file: './logs/remote-scrcpy-error.log',
      out_file: './logs/remote-scrcpy-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Restart policy
      min_uptime: '10s',
      max_restarts: 10,
      
      // Advanced features
      kill_timeout: 5000,
      listen_timeout: 3000,
      shutdown_with_message: true
    }
  ]
};

/**
 * Usage examples:
 * 
 * # Start in production mode
 * pm2 start ecosystem.config.js --env production
 * 
 * # Start in development mode
 * pm2 start ecosystem.config.js --env development
 * 
 * # Save PM2 process list
 * pm2 save
 * 
 * # Setup PM2 to start on system boot
 * pm2 startup
 * 
 * # Delete from PM2
 * pm2 delete remote-scrcpy
 */
