/**
 * React component example for remote-scrcpy integration
 * 
 * This example shows how to create a React component that embeds
 * remote-scrcpy device streams.
 * 
 * Usage:
 *   import DeviceStream from './DeviceStream';
 *   
 *   function App() {
 *     return <DeviceStream deviceId="192.168.1.100:5555" />;
 *   }
 */

import React, { useState, useEffect } from 'react';

/**
 * DeviceStream Component
 * 
 * @param {Object} props
 * @param {string} props.deviceId - Device identifier (e.g., "192.168.1.100:5555")
 * @param {string} props.player - Video decoder: 'mse', 'broadway', 'tinyh264', 'webcodecs'
 * @param {string} props.scrcpyUrl - remote-scrcpy server URL
 * @param {Object} props.style - Custom styles for the iframe
 */
export default function DeviceStream({ 
  deviceId, 
  player = 'mse',
  scrcpyUrl = 'http://localhost:8009',
  style = {}
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build embed URL
  const embedUrl = `${scrcpyUrl}/embed.html?udid=${encodeURIComponent(deviceId)}&player=${player}`;

  useEffect(() => {
    // Check if server is reachable
    fetch(`${scrcpyUrl}/`)
      .then(() => {
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError('Cannot connect to remote-scrcpy server');
        console.error('Connection error:', err);
      });
  }, [scrcpyUrl]);

  const defaultStyle = {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#000',
    ...style
  };

  if (error) {
    return (
      <div style={{ 
        ...defaultStyle, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#fff',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ fontSize: '48px' }}>⚠️</div>
        <div>{error}</div>
        <div style={{ fontSize: '12px', color: '#888' }}>
          Server: {scrcpyUrl}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        ...defaultStyle, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#fff'
      }}>
        <div>Loading device stream...</div>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      style={defaultStyle}
      allow="autoplay"
      sandbox="allow-same-origin allow-scripts allow-forms"
      title={`Device ${deviceId}`}
    />
  );
}

/**
 * Example usage in a React app:
 */

/*
import React from 'react';
import DeviceStream from './DeviceStream';

function App() {
  const [deviceId, setDeviceId] = React.useState('192.168.1.100:5555');

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '20px' }}>
      <h1>Remote Device Control</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Device ID: 
          <input 
            type="text" 
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            placeholder="192.168.1.100:5555"
          />
        </label>
      </div>

      <div style={{ height: 'calc(100vh - 120px)' }}>
        <DeviceStream 
          deviceId={deviceId}
          player="mse"
          scrcpyUrl={process.env.REACT_APP_SCRCPY_URL || 'http://localhost:8009'}
        />
      </div>
    </div>
  );
}

export default App;
*/
