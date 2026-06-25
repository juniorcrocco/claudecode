#!/usr/bin/env bash
# Renderiza as duas versões. Detecta um Chromium headless pré-instalado
# (ambientes Claude Code/Playwright); na sua máquina, o Remotion baixa o dele.
# Uso: bash scripts/render.sh [wide|vertical|both]   (padrão: both)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
WHAT="${1:-both}"

# Procura o headless_shell pré-instalado (old-headless, exigido pelo Remotion).
SHELL_BIN=$(find /opt/pw-browsers -type f -name 'headless_shell' 2>/dev/null | head -1 || true)
ARGS=()
if [ -n "$SHELL_BIN" ]; then
  echo "▶ Usando Chromium pré-instalado: $SHELL_BIN"
  ARGS+=(--browser-executable="$SHELL_BIN")
fi

mkdir -p out
[ "$WHAT" = "wide" ] || [ "$WHAT" = "both" ] && \
  npx remotion render Trailer16x9 out/trailer-16x9.mp4 --codec=h264 --crf=18 "${ARGS[@]}"
[ "$WHAT" = "vertical" ] || [ "$WHAT" = "both" ] && \
  npx remotion render Trailer9x16 out/trailer-9x16.mp4 --codec=h264 --crf=18 "${ARGS[@]}"

echo "✓ Pronto. Veja out/"
ls -lh out/ 2>/dev/null || true
