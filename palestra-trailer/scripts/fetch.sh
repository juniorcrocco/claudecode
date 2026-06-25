#!/usr/bin/env bash
# Baixa a pasta do Google Drive para ./downloads
# Pré-requisito: a rede do ambiente precisa liberar o Google Drive.
# Uso: bash scripts/fetch.sh [URL_DA_PASTA]
set -euo pipefail

FOLDER_URL="${1:-https://drive.google.com/drive/folders/1fpCaWvySbVP8UMKRfjED0NMHXJUegL-Y}"
DEST="$(dirname "$0")/../downloads"

echo "▶ Instalando gdown..."
pip install -q --upgrade gdown

echo "▶ Baixando pasta do Drive para $DEST ..."
mkdir -p "$DEST"
gdown --folder "$FOLDER_URL" -O "$DEST" --remaining-ok

echo "✓ Download concluído. Arquivos em: $DEST"
ls -lh "$DEST"
