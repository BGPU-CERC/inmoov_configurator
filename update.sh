#!/bin/bash

git pull

cd client
npm update
npm run build

cd ../server
npm update
