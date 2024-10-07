#!/bin/bash
PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/snap/bin"
cd /home/brainet/Whitemind
pm2 delete whitemind-server
git reset --hard
git clean -f
git checkout main
git pull
pnpm i
pnpm run build
pnpm run start
pm2 save --force
