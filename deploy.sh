#!/usr/bin/env sh

#abort on errors

set -

#build
npm run build

# navigate into the build output directory
cd dist

#if you are deplying to a custon domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -D
git commit -m 'deploy


#git push -f git@github.com:lucasicepeda/segudies.git main:gh-pages


cd -