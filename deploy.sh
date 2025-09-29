#!/bin/bash
set -e

# build into static build dir
cd ./gazbolt
echo "Building Svelte app..."
bun run build

# copy build files to 
mkdir -p /var/www/gazbolt
cp -r build/* /var/www/gazbolt/
echo "Build complete!"

