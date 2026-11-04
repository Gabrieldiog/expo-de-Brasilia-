#!/usr/bin/env bash
# Totem - Expo Brasília (IHGG) — macOS / Linux
# Uso: ./totem/iniciar-totem.sh          (usa o build existente)
#      ./totem/iniciar-totem.sh rebuild  (gera o build de novo)
set -e
PORTA=3000
REABRIR=1
cd "$(dirname "$0")/.."

command -v node >/dev/null || { echo "[ERRO] Node.js não instalado (https://nodejs.org)"; exit 1; }
[ -d node_modules ] || { echo "Instalando dependências..."; npm install --legacy-peer-deps; }
[ "$1" = "rebuild" ] && rm -rf build
[ -f build/index.html ] || { echo "Gerando o build..."; npm run build; }

node totem/servidor.js "$PORTA" &
SERVIDOR=$!
trap 'kill $SERVIDOR 2>/dev/null' EXIT
sleep 2

# Impede descanso de tela no Mac enquanto o totem roda
command -v caffeinate >/dev/null && { caffeinate -dimsu -w $$ & }

NAV=""
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
         "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
         "/Applications/Chromium.app/Contents/MacOS/Chromium" \
         google-chrome google-chrome-stable chromium chromium-browser microsoft-edge; do
  if [ -x "$c" ] || command -v "$c" >/dev/null 2>&1; then NAV="$c"; break; fi
done
[ -z "$NAV" ] && { echo "[ERRO] Chrome/Edge/Chromium não encontrado."; exit 1; }

PERFIL="$HOME/.expo-brasilia-totem/perfil"; mkdir -p "$PERFIL"
echo "Totem rodando. Para sair: Ctrl+C aqui e depois Cmd+Q / Alt+F4."
set +e
while :; do
  "$NAV" --kiosk "http://localhost:$PORTA" --user-data-dir="$PERFIL" \
    --no-first-run --no-default-browser-check --disable-session-crashed-bubble \
    --disable-infobars --noerrdialogs --disable-features=TranslateUI,Translate \
    --overscroll-history-navigation=0 \
    --autoplay-policy=no-user-gesture-required --password-store=basic
  [ "$REABRIR" = "1" ] || break
  echo "Navegador fechado. Reabrindo em 3 s... (Ctrl+C cancela)"; sleep 3
done
