#!/usr/bin/env bash
#
# deploy.sh — zero-downtime деплой Next.js-приложения
# 1) гарантируем Node 22 + pnpm
# 2) при первом запуске ставим pm2
# 3) стопим старый процесс, тянем свежий код, ставим deps, билдим, перезапускаем
#
# сделайте chmod +x deploy.sh и запускайте из корня проекта (или укажите PROJECT_DIR ниже)

set -euo pipefail

### ————————————————————————————————————————————————
### 0) параметры
### ————————————————————————————————————————————————
APP_NAME="timestock-frontend"          # как будет называться процесс в pm2
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"   # каталог, где лежит проект
BRANCH="main"                       # какую ветку тянем
NODE_VERSION="22"                   # LTS (2025)
PNPM_HOME="$HOME/.local/share/pnpm" # куда pnpm кладёт свои бинарники

### ————————————————————————————————————————————————
### 1) Node 22 + pnpm (через nvm)
### ————————————————————————————————————————————————
export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
  echo "⏬  Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi
# shellcheck source=/dev/null
source "$NVM_DIR/nvm.sh"

echo "🔧  Ensuring Node $NODE_VERSION..."
nvm install "$NODE_VERSION" >/dev/null
nvm use "$NODE_VERSION"    >/dev/null

export PATH="$PNPM_HOME:$PATH"
if ! command -v pnpm >/dev/null 2>&1; then
  echo "⏬  Installing pnpm..."
  npm install -g pnpm
fi

### ————————————————————————————————————————————————
### 2) PM2 (auto-install при первом деплое)
### ————————————————————————————————————————————————
if ! command -v pm2 >/dev/null 2>&1; then
  echo "⏬  Installing pm2..."
  pnpm add -g pm2
fi

### ————————————————————————————————————————————————
### 3) Деплой
### ————————————————————————————————————————————————
cd "$PROJECT_DIR"

echo "🛑  Stopping old instance (if any)…"
pm2 stop "$APP_NAME" || true

echo "🔄  Pulling $BRANCH…"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "📦  Installing dependencies (pnpm)…"
pnpm install --frozen-lockfile

echo "⚙️   Building project…"
pnpm build

echo "🚀  Starting app with PM2…"
# если процесс уже есть в базе — перезапустим, иначе создадим
if pm2 list | grep -q "$APP_NAME"; then
  pm2 restart "$APP_NAME"
else
  pm2 start "pnpm start" --name "$APP_NAME"
fi

echo "💾  Saving PM2 state & enabling startup…"
pm2 save
pm2 startup --silent

echo "✅  Deploy finished!"
