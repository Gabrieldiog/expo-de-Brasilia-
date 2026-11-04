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

set +e   # daqui em diante, erros não derrubam o totem
node totem/servidor.js "$PORTA" &
SERVIDOR=$!
trap 'kill $SERVIDOR ${INIBIDOR:-} 2>/dev/null' EXIT
sleep 2

# Impede descanso/bloqueio de tela enquanto o totem roda
if command -v caffeinate >/dev/null; then            # macOS
  caffeinate -dimsu -w $$ &
else                                                 # Linux
  command -v xset >/dev/null && { xset s off; xset -dpms; xset s noblank; } 2>/dev/null
  if command -v gsettings >/dev/null; then           # GNOME (Ubuntu etc.)
    gsettings set org.gnome.desktop.session idle-delay 0 2>/dev/null
    gsettings set org.gnome.desktop.screensaver lock-enabled false 2>/dev/null
    gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type 'nothing' 2>/dev/null
  fi
  command -v systemd-inhibit >/dev/null && \
    { systemd-inhibit --what=idle:sleep --why="Totem" --mode=block sleep infinity & INIBIDOR=$!; }
fi

NAV=""
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
         "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
         "/Applications/Chromium.app/Contents/MacOS/Chromium" \
         google-chrome google-chrome-stable chromium chromium-browser microsoft-edge \
         /snap/bin/chromium; do
  if [ -x "$c" ] || command -v "$c" >/dev/null 2>&1; then NAV="$c"; break; fi
done
[ -z "$NAV" ] && { echo "[ERRO] Chrome/Edge/Chromium não encontrado."; exit 1; }

PERFIL="$HOME/expo-brasilia-totem-perfil"; mkdir -p "$PERFIL"   # nao oculta: Chromium snap nao grava em pastas com ponto
echo "Totem rodando. Para sair: Ctrl+C aqui e depois Cmd+Q / Alt+F4."
while :; do
  "$NAV" --kiosk "http://localhost:$PORTA" --user-data-dir="$PERFIL" \
    --no-first-run --no-default-browser-check --disable-session-crashed-bubble \
    --disable-infobars --noerrdialogs --disable-features=TranslateUI,Translate \
    --overscroll-history-navigation=0 \
    --autoplay-policy=no-user-gesture-required --password-store=basic
  [ "$REABRIR" = "1" ] || break
  echo "Navegador fechado. Reabrindo em 3 s... (Ctrl+C cancela)"; sleep 3
done
