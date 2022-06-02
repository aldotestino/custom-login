#!/bin/bash

sleep 15
echo "--> Running migration..."
npm run prisma:generate
echo "--> Running generation..."
npm run prisma:push
echo "--> Server starting..."
npm run dev