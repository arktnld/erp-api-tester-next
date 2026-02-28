# Deploy em VPS

Stack: Next.js 16 monorepo + PostgreSQL + pgvector

## 1. Preparar a VPS

```bash
# Ubuntu/Debian
apt update && apt upgrade -y

# Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# pnpm + PM2
npm i -g pnpm pm2

# PostgreSQL
apt install -y postgresql postgresql-contrib
```

## 2. Configurar o PostgreSQL

```bash
sudo -u postgres psql
CREATE USER arktnld WITH PASSWORD 'senha';
CREATE DATABASE erp_tester OWNER arktnld;
\q

# pgvector (obrigatório)
apt install -y postgresql-16-pgvector
```

## 3. Clonar e configurar

```bash
git clone https://github.com/seu-user/erp-api-tester-next.git /var/www/erp-tester
cd /var/www/erp-tester

# Copiar e preencher variáveis de ambiente
cp .env.example .env
# Editar .env com DATABASE_URL e as chaves de IA necessárias
```

## 4. Build

```bash
pnpm install --frozen-lockfile
pnpm db:generate
DATABASE_URL="postgresql://arktnld:senha@localhost:5432/erp_tester" \
  pnpm --filter db exec prisma migrate deploy
pnpm build
```

## 5. PM2

```bash
pm2 start "pnpm start" --name erp-tester --cwd /var/www/erp-tester
pm2 save
pm2 startup  # configura autostart no boot
```

## 6. Nginx

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
nginx -t && systemctl reload nginx
```

## 7. SSL (se tiver domínio)

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com
```

## Checklist

| Item | Detalhe |
|------|---------|
| pgvector | Instalar extensão no PostgreSQL da VPS |
| ENV vars | Preencher `.env` a partir do `.env.example` |
| Build | Rodar `pnpm build` na VPS ou via CI/CD |
| Porta padrão | App sobe na **9000** |

## Atualizar após mudanças

```bash
cd /var/www/erp-tester
git pull
pnpm install --frozen-lockfile
pnpm build
pm2 restart erp-tester
```
