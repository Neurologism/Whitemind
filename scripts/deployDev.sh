#!/bin/bash
PATH="/home/gh-actions/.local/share/pnpm:/home/gh-actions/.nvm/versions/node/v20.18.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
cd /home/gh-actions/Whitemind
npm install pm2@latest -g
pm2 update
git reset --hard
git clean -f
git checkout development
git pull
pnpm install
NODE_OPTIONS="--max-old-space-size=2048"
pnpm run build
pm2 delete whitemind-server
pnpm run start
pm2 save --force
