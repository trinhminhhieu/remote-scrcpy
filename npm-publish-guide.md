# NPM Publish Guide - Two-Factor Authentication Required

## Error
```
403 Forbidden - Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

## Solution: Create Access Token

### Step 1: Create Token on npmjs.com

1. Go to: https://www.npmjs.com/settings/trinhminhhieu/tokens
2. Click "Generate New Token"
3. Select "Classic Token"
4. Choose "Automation" (allows publishing without 2FA)
5. Copy the token (starts with `npm_...`)

### Step 2: Login with Token

```bash
npm logout
npm login
```

When prompted:
- Username: `trinhminhhieu`
- Password: Paste your token (npm_...)
- Email: Your email

### Step 3: Publish

```bash
cd /home/softpc/Downloads/demoui/ws-scrcpy
npm publish --access public
```

## Alternative: Enable 2FA

1. Go to: https://www.npmjs.com/settings/trinhminhhieu/tfa
2. Enable Two-Factor Authentication
3. Use authenticator app (Google Authenticator, Authy, etc.)
4. When publishing, you'll need to enter the 6-digit code

## After Successful Publish

Your package will be available at:
- https://www.npmjs.com/package/@trinhminhhieu/remote-scrcpy

Install with:
```bash
npm install -g @trinhminhhieu/remote-scrcpy
```

Run with:
```bash
remote-scrcpy
```
