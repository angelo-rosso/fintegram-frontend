#!/bin/bash

# 0. Increment version number
VERSION=$(cat .deploy-version)
VERSION=$((VERSION + 1))
echo $VERSION > .deploy-version
echo "Deploying version $VERSION"

# 1. Build the app with the version
npm run build -- --mode production

# 2. Create version file inside dist
echo "Fintegram version $VERSION" > dist/version.txt

# 5. Deploy to Azure
npx swa deploy \
  --app-location dist \
  --deployment-token de95ec7f81c72f980aa1e1b8bd3172b31b014a4f86a8358a12ed7e5dbb5b149c06-84fb60a8-d129-4406-9526-d0526b7dee6000f2227040fba10f \
  --env production
