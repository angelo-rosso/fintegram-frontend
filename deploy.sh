#!/bin/bash

# 0. Increment version number
VERSION=$(cat .deploy-version)
VERSION=$((VERSION + 1))
echo $VERSION > .deploy-version
echo "Deploying version $VERSION"

# 1. Build the app with the version
npm run build

# 2. Create version file inside dist
echo "Fintegram version $VERSION" > dist/version.txt

# Optional: inject into index.html if needed (not required for text file)
# sed -i "s|__BUILD_VERSION__|$VERSION|g" dist/index.html

# 3. Copy nginx.conf into dist
# cp nginx.conf dist/

# 4. Zip the dist folder
# cd dist
# zip -r ../app.zip .
# cd ..

# 5. Deploy to Azure
npx swa deploy \
  --app-location dist \
  --deployment-token de95ec7f81c72f980aa1e1b8bd3172b31b014a4f86a8358a12ed7e5dbb5b149c06-84fb60a8-d129-4406-9526-d0526b7dee6000f2227040fba10f \
  --env production

# # 6. Set Nginx startup command
# az webapp config set \
#   --resource-group fintegram00_group \
#   --name fintegram-frontend \
#   --startup-file "nginx -c /home/site/wwwroot/nginx.conf"
