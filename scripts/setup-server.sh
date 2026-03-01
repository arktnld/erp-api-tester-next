#!/bin/bash
# Setup inicial do servidor — roda UMA vez
# Uso: bash setup-server.sh

set -e

SERVER="cleberson-gomes@10.32.54.201"
REPO="https://github.com/arktnld/erp-api-tester-next.git"
APP_DIR="/opt/erp-api-tester-next"
DB_NAME="erp_api"
DB_USER="erp_user"
DB_PASS="$(openssl rand -base64 24)"

echo "==> Conectando em $SERVER..."
ssh "$SERVER" bash -s <<REMOTE
set -e

echo "--- Atualizando pacotes ---"
sudo apt-get update -y

echo "--- Instalando Node.js 22 ---"
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "--- Instalando pnpm e PM2 ---"
sudo npm install -g pnpm pm2

echo "--- Instalando PostgreSQL ---"
sudo apt-get install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

echo "--- Criando banco de dados ---"
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null || echo "Usuário já existe"
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || echo "Banco já existe"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

echo "--- Clonando repositório ---"
sudo git clone $REPO $APP_DIR
sudo chown -R \$(whoami):\$(whoami) $APP_DIR

echo "--- Criando .env ---"
cat > $APP_DIR/apps/web/.env << 'ENV'
DATABASE_URL="postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME"

# Clerk — preencha com as chaves do seu projeto Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# AI — opcional
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GEMINI_API_KEY=

# Prompt customizado — opcional
# BYTE_PROMPT_PATH=/opt/byte_prompt.md
ENV

echo ""
echo "=== IMPORTANTE: preencha as variáveis do Clerk em $APP_DIR/apps/web/.env ==="
echo "DATABASE_URL=postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME"
REMOTE

echo ""
echo "==> Setup concluído!"
echo "    Edite o .env no servidor e rode: bash scripts/deploy.sh"
