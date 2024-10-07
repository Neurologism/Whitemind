#!/bin/bash
PATH="/home/gh-actions/.local/share/pnpm:/home/gh-actions/.nvm/versions/node/v20.18.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
cd /home/gh-actions/Whitemind
pm2 delete whitemind-server
git reset --hard
git clean -f
git checkout developement
git pull
pnpm i
pnpm run build
pnpm run start
pm2 save --force
