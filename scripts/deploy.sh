#!/bin/bash
# Deploy da aplicação — roda a cada atualização
# Uso: bash scripts/deploy.sh

set -e

SERVER="cleberson-gomes@10.32.54.201"
APP_DIR="/opt/erp-api-tester-next"
PM2_APP="erp-api"

echo "==> Deploy iniciado em $SERVER"

ssh "$SERVER" bash -s << REMOTE
set -e

export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && source "\$NVM_DIR/nvm.sh"

cd $APP_DIR

echo "--- Baixando últimas alterações ---"
git pull origin master

echo "--- Instalando dependências ---"
pnpm install --frozen-lockfile

echo "--- Rodando migrations do banco ---"
pnpm --filter @erp/db exec prisma migrate deploy

echo "--- Gerando Prisma Client ---"
pnpm --filter @erp/db exec prisma generate

echo "--- Build da aplicação ---"
pnpm --filter web build

echo "--- Reiniciando PM2 ---"
if pm2 list | grep -q "$PM2_APP"; then
  pm2 restart $PM2_APP
else
  cd $APP_DIR/apps/web
  pm2 start 'node_modules/.bin/next start --port 9000' --name "$PM2_APP"
  pm2 save
fi

echo ""
echo "==> Deploy concluído! App rodando em http://$SERVER:9000"
REMOTE
