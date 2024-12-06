#!/bin/bash
PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/snap/bin"
cd /home/brainet/Whitemind
npm install pm2@latest -g
pm2 update
pm2 delete whitemind-server
git reset --hard
git clean -f
git checkout main
git pull
pnpm install
NODE_OPTIONS="--max-old-space-size=2048"
pnpm run build
pnpm run start
pm2 save --force
