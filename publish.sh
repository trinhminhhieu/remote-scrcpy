#!/bin/bash

# Script to publish remote-scrcpy to npm
# Author: trinhminhieu

set -e

echo "🚀 Publishing @trinhminhhieu/remote-scrcpy to npm..."
echo ""

# Check if logged in to npm
echo "📝 Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ You are not logged in to npm!"
    echo "Please run: npm login"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Build the project
echo "🔨 Building project..."
npm run dist:prod

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist folder not found."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Show what will be published
echo "📦 Package contents:"
npm pack --dry-run
echo ""

# Confirm before publishing
read -p "Do you want to publish @trinhminhhieu/remote-scrcpy@1.0.0? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Publishing to npm..."
    npm publish --access public
    
    echo ""
    echo "✅ Successfully published!"
    echo ""
    echo "📦 Package: @trinhminhhieu/remote-scrcpy@1.0.0"
    echo "🔗 View at: https://www.npmjs.com/package/@trinhminhhieu/remote-scrcpy"
    echo ""
    echo "Install with:"
    echo "  npm install -g @trinhminhhieu/remote-scrcpy"
else
    echo "❌ Publish cancelled."
    exit 1
fi
