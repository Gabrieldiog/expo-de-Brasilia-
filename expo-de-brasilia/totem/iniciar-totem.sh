#!/usr/bin/env bash
set -e
PORTA=3000
REABRIR=1
cd "$(dirname "$0")/.."

[ "$1" = "rebuild" ] && rm -rf build
if [ ! -f build/index.html ]; then
  command -v npm >/dev/null || { echo "[ERRO] Sem a pasta build e sem Node.js. Mande a pasta com o build pronto ou instale o Node.js."; exit 1; }
  [ -d node_modules ] || { echo "Instalando dependências..."; npm install --legacy-peer-deps; }
  echo "Gerando o build..."; npm run build
fi

set +e
if command -v node >/dev/null; then
  node totem/servidor.js "$PORTA" &
elif command -v python3 >/dev/null; then
  python3 -m http.server "$PORTA" --bind 127.0.0.1 --directory build >/dev/null 2>&1 &
else
  echo "[ERRO] Não encontrei Node.js nem Python 3 para servir o totem."; exit 1
fi
SERVIDOR=$!
trap 'kill $SERVIDOR ${INIBIDOR:-} 2>/dev/null' EXIT
sleep 2

if command -v caffeinate >/dev/null; then
  caffeinate -dimsu -w $$ &
else
  command -v xset >/dev/null && { xset s off; xset -dpms; xset s noblank; } 2>/dev/null
  if command -v gsettings >/dev/null; then
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
FIREFOX=0
if [ -z "$NAV" ] && command -v firefox >/dev/null; then NAV=firefox; FIREFOX=1; fi
[ -z "$NAV" ] && { echo "[ERRO] Nenhum navegador encontrado (Chromium, Chrome ou Firefox)."; exit 1; }

PERFIL="$HOME/expo-brasilia-totem-perfil"; mkdir -p "$PERFIL"
echo "Totem rodando. Para sair: Ctrl+C aqui e depois Cmd+Q / Alt+F4."
while :; do
  if [ "$FIREFOX" = "1" ]; then
    firefox --kiosk --profile "$PERFIL" "http://localhost:$PORTA"
  else
  "$NAV" --kiosk "http://localhost:$PORTA" --user-data-dir="$PERFIL" \
    --no-first-run --no-default-browser-check --disable-session-crashed-bubble \
    --disable-infobars --noerrdialogs --disable-features=TranslateUI,Translate \
    --overscroll-history-navigation=0 \
    --autoplay-policy=no-user-gesture-required --password-store=basic
  fi
  [ "$REABRIR" = "1" ] || break
  echo "Navegador fechado. Reabrindo em 3 s... (Ctrl+C cancela)"; sleep 3
done
