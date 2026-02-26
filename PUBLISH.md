# Publishing Guide for remote-scrcpy

## Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm:
   ```bash
   npm login
   ```

## Before Publishing

1. **Update version** in `package.json`:
   ```bash
   npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
   npm version minor  # for new features (1.0.0 -> 1.1.0)
   npm version major  # for breaking changes (1.0.0 -> 2.0.0)
   ```

2. **Build the project**:
   ```bash
   npm run dist:prod
   ```

3. **Test locally**:
   ```bash
   npm pack
   # This creates remote-scrcpy-1.0.0.tgz
   
   # Test installation
   npm install -g ./remote-scrcpy-1.0.0.tgz
   remote-scrcpy
   ```

4. **Check package contents**:
   ```bash
   npm pack --dry-run
   ```

## Publishing

### First time publish

```bash
# Make sure you're logged in
npm whoami

# Publish
npm publish
```

### Update existing package

```bash
# Update version
npm version patch

# Publish
npm publish
```

## Post-publish

1. Create a git tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Create a GitHub release with changelog

3. Test installation:
   ```bash
   npm install -g remote-scrcpy
   ```

## Troubleshooting

### Package name already exists
If `remote-scrcpy` is taken, you can:
1. Use a scoped package: `@trinhminhieu/remote-scrcpy`
2. Choose a different name

Update `package.json`:
```json
{
  "name": "@trinhminhieu/remote-scrcpy"
}
```

Then publish:
```bash
npm publish --access public
```

### Build errors
Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dist:prod
```

## Package Info

- **Name**: remote-scrcpy
- **Author**: trinhminhieu
- **License**: MIT
- **Repository**: https://github.com/trinhminhieu/remote-scrcpy

## Files Included in Package

The package includes:
- `dist/` - Built application
- `README.md` - Documentation
- `LICENSE` - License file
- `package.json` - Package metadata

Files excluded (see `.npmignore`):
- Source code (`src/`)
- Development files
- Documentation (`docs/`)
- Build configuration
