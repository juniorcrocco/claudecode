#!/usr/bin/env bash
# Converte os .mov do iPhone (HEVC) para .mp4 H.264 que o Remotion/Chromium
# toca, e gera um quadro-pôster de cada clipe para escolha editorial.
# Uso: bash scripts/transcode.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/downloads"
OUT="$ROOT/public/footage"
POSTERS="$ROOT/posters"

command -v ffmpeg >/dev/null 2>&1 || { echo "✗ ffmpeg não encontrado. Instale antes (apt-get install -y ffmpeg)."; exit 1; }

mkdir -p "$OUT" "$POSTERS"

i=1
# ordena por nome para numeração estável
for f in $(ls "$SRC"/*.mov "$SRC"/*.MOV 2>/dev/null | sort); do
  n=$(printf "clip%02d" "$i")
  echo "▶ [$n] $(basename "$f")"
  # H.264, yuv420p (compatível web), 1080p de altura no máximo, sem áudio.
  ffmpeg -y -loglevel error -i "$f" \
    -vf "scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease" \
    -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -an \
    -movflags +faststart "$OUT/$n.mp4"
  # pôster no segundo 1 para escolha
  ffmpeg -y -loglevel error -ss 1 -i "$f" -frames:v 1 "$POSTERS/$n.jpg"
  i=$((i + 1))
done

echo "✓ Transcodificados $((i - 1)) clipes em $OUT"
echo "✓ Pôsteres (para escolher os melhores) em $POSTERS"
