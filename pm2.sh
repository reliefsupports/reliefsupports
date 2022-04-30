pm2 stop all

cd ~reliefsupports/web/
yarn build

cd ~reliefsupports/strapi/
NODE_ENV="production" yarn build

pm2 start all

# cd ~reliefsupports/web/
# pm2 serve build 3000 --spa --name relief-web
# cd ~reliefsupports/strapi/
# pm2 yarn start --name relief-strapi
