# 🎬 Palestra Trailer

Super trailer cinematográfico para abrir uma palestra. Renderiza nas **duas
proporções** a partir do mesmo projeto:

- `Trailer16x9` — 1920×1080 (telão / projeção)
- `Trailer9x16` — 1080×1920 (Reels / Stories)

Feito em [Remotion](https://remotion.dev) (vídeo via React). Roda **hoje**, sem
nenhum vídeo, usando gradientes cinematográficos como placeholder — depois é só
trocar pelos clipes reais.

---

## Rodar agora (preview)

```bash
npm install
npm run dev          # abre o Remotion Studio em http://localhost:3000
```

No Studio você vê as duas composições e pode arrastar a timeline.

## Renderizar

```bash
npm run render:both       # gera os dois MP4 em out/
# ou individualmente:
npm run render:wide       # out/trailer-16x9.mp4
npm run render:vertical   # out/trailer-9x16.mp4
```

---

## Colocar os SEUS vídeos

1. **Baixar a pasta do Drive** (precisa de rede liberada para o Google):
   ```bash
   bash scripts/fetch.sh "URL_DA_SUA_PASTA"
   ```
2. **Transcodificar** os `.mov` (HEVC do iPhone) para `.mp4` H.264 + gerar
   pôsteres para escolha:
   ```bash
   bash scripts/transcode.sh
   ```
   Isso cria `public/footage/clip01.mp4 …` e `posters/clip01.jpg …`.
3. **Apontar os clipes** no roteiro: abra `src/timeline.ts` e ajuste o campo
   `src` de cada shot (`clip01.mp4`, `clip02.mp4`, …), `trimBefore` (pular o
   começo) e `speed` se quiser slow-motion.
4. **Ligar o footage**: em `src/config.ts`, troque `USE_PLACEHOLDER = false`.
5. Renderize.

## Trilha sonora

Coloque `public/audio/track.mp3` e ponha `HAS_AUDIO = true` em `src/config.ts`.
Os cortes da "rajada" já estão em ~120 BPM (cortes a cada 0,5s) para casar com
uma batida; ajuste as durações em `src/timeline.ts` conforme a sua música.

---

## Onde editar o quê

| Quero mudar… | Arquivo |
|---|---|
| Seu nome, evento, @, tagline | `src/config.ts` |
| Textos, ordem, durações, cortes | `src/timeline.ts` |
| Cores / fontes | `src/theme.ts` |
| Look cinematográfico (grão, vinheta, leak) | `src/components/CinematicGrade.tsx` |
| Frases sobre os clipes (kickers/captions) | `src/timeline.ts` |

Tudo em frames @ 30fps (`1s = 30 frames`).
