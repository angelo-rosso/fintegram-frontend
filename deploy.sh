#!/bin/bash

# 1. Build the app
npm run build

# 2. Zip the output folder (default is 'dist' for Vue CLI/Vite)
cd dist
zip -r ../app.zip .
cd ..

# 3. Deploy to Azure
az webapp deploy \
  --resource-group fintegram00_group \
  --name fintegram-frontend \
  --src-path app.zip \
  --type zip
