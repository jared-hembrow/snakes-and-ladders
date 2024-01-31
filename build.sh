# Fontend
cd frontend
npm install
npm run build

# Backend Build
cd ../backend
npm install
rm -rf build
npm run build
cp -r ../frontend/out build/public


