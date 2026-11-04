@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
title Totem - Expo Brasilia (IHGG)

rem ============================================================
rem  CONFIGURACAO
rem ============================================================
set "PORTA=3000"
rem  Reabrir o navegador se ele for fechado/travar? (1/0)
set "REABRIR=1"
rem  Impedir que a tela/PC entre em descanso? (1/0)
set "SEM_DESCANSO=1"
rem ============================================================

rem Vai para a pasta do projeto (um nivel acima desta pasta totem\)
cd /d "%~dp0.."

where node >nul 2>nul || (
  echo [ERRO] Node.js nao esta instalado. Instale em https://nodejs.org e rode de novo.
  pause & exit /b 1
)

rem 1) Dependencias (so na primeira vez)
if not exist "node_modules\" (
  echo Instalando dependencias... ^(so na primeira vez, precisa de internet^)
  call npm install --legacy-peer-deps || (echo [ERRO] npm install falhou. & pause & exit /b 1)
)

rem 2) Gera a versao final do app (se nao existir ou com o parametro "rebuild")
if /i "%~1"=="rebuild" if exist "build\" rmdir /s /q "build"
if not exist "build\index.html" (
  echo Gerando o build do totem... ^(pode levar alguns minutos^)
  call npm run build || (echo [ERRO] npm run build falhou. & pause & exit /b 1)
)

rem 3) Sem descanso de tela enquanto o totem estiver ligado
if "%SEM_DESCANSO%"=="1" (
  powercfg /change monitor-timeout-ac 0 >nul 2>nul
  powercfg /change standby-timeout-ac 0 >nul 2>nul
  powercfg /change hibernate-timeout-ac 0 >nul 2>nul
)

rem 4) Servidor local (offline) em segundo plano
echo Iniciando servidor local na porta %PORTA%...
start "Servidor do Totem" /min cmd /c "node totem\servidor.js %PORTA%"
timeout /t 3 >nul

rem 5) Navegador em modo quiosque (Chrome, senao Edge)
set "NAV="
for %%P in (
  "%ProgramFiles%\Google\Chrome\Application\chrome.exe"
  "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
  "%LocalAppData%\Google\Chrome\Application\chrome.exe"
  "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
  "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
) do if not defined NAV if exist %%P set "NAV=%%~P"
if not defined NAV (
  echo [ERRO] Nao encontrei Google Chrome nem Microsoft Edge.
  pause & exit /b 1
)

set "PERFIL=%LocalAppData%\ExpoBrasiliaTotem\perfil"
if not exist "%PERFIL%" mkdir "%PERFIL%"

echo.
echo Totem rodando. Para SAIR: feche esta janela primeiro e depois Alt+F4.
echo.

:loop
"!NAV!" --kiosk "http://localhost:%PORTA%" ^
  --user-data-dir="!PERFIL!" ^
  --no-first-run --no-default-browser-check ^
  --disable-session-crashed-bubble --disable-infobars --noerrdialogs ^
  --disable-features=TranslateUI,Translate ^
  --overscroll-history-navigation=0 ^
  --autoplay-policy=no-user-gesture-required ^
  --password-store=basic

if "%REABRIR%"=="1" (
  echo Navegador fechado. Reabrindo em 3 segundos... ^(Ctrl+C para cancelar^)
  timeout /t 3 >nul
  goto loop
)
endlocal
