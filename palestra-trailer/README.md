# Palestra Trailer 🎬

Trailer cinematográfico (estilo trailer de cinema) para **abertura de palestras**,
montado em [Remotion](https://www.remotion.dev) a partir dos seus clipes do Google Drive.

- **Formato:** 16:9 — 1920×1080 (telão/projetor). Dá pra mudar em `src/config.ts`.
- **Estilo:** letterbox cinemascope, color grade _teal & orange_, vinheta + grão de
  filme, cortes no ritmo da trilha, _title drop_ com impacto, rajada final com
  camera shake e palavras de impacto, e cartão final com seu nome/CTA.
- **Usa todos os 35 vídeos** da pasta do Drive (manifesto em `clips.manifest.json`).

---

## Como gerar o trailer (3 passos)

> Rode **na sua máquina** (onde o Google Drive abre normalmente). Precisa de Node 18+.

```bash
cd palestra-trailer
npm install

# 1) baixa TODOS os clipes do Drive para public/video/  (~2 GB, pasta pública)
npm run fetch          # use:  npm run fetch -- --photos   para baixar também as fotos

# 2) abra o estúdio pra revisar/ajustar (opcional, mas recomendado)
npm run dev

# 3) renderize o trailer final -> out/trailer.mp4
npm run render
```

Pronto: o arquivo final fica em **`out/trailer.mp4`**.

---

## Editando os textos

Tudo que muda no trailer está em **`src/config.ts`**:

```ts
hook:     'CHEGOU A HORA',              // frase de abertura (sobre o preto)
title:    { line1: 'O FUTURO', line2: 'COMECA AGORA' },  // título grande
subtitle: 'Uma experiencia que vai mudar a forma como voce pensa',
kickers:  ['IDEIAS', 'CORAGEM', 'ACAO', 'TRANSFORMACAO'], // palavras de impacto
speaker:  'SEU NOME AQUI',              // cartão final
endline:  'AO VIVO  •  2026',
cta:      '@seu_instagram',
bpm:      100,                          // ritmo dos cortes
```

> As fontes usam letras maiúsculas com acento. Pode escrever com acento normalmente
> (`AÇÃO`, `CORAÇÃO`) — as fontes locais (Anton/Archivo) cobrem o português.

## Trilha sonora (recomendado pra ficar épico)

1. Coloque um arquivo `track.mp3` em `public/audio/`.
2. Em `src/config.ts`, troque `hasAudio: false` por `true`.
3. Ajuste o `bpm` pro mesmo da música — os cortes caem no beat.

Renderize de novo. Dica: escolha uma trilha de _trailer/epic cinematic_ com uma
batida forte por volta dos 10–12 s (cai junto com o _title drop_).

---

## Teaser (preview do estilo, sem footage)

Existe uma segunda composição, **`Teaser`** (9 s), 100% motion-graphics — não
precisa dos vídeos. Útil pra validar o visual e os textos rápido:

```bash
npm run render:teaser   # -> out/teaser.mp4
```

---

## Estrutura

```
src/
  config.ts            ← EDITE AQUI (textos, formato, bpm, áudio)
  theme.ts             paleta e fontes
  clips.ts             monta a linha do tempo (usa TODOS os clipes)
  Trailer.tsx          composição completa (com sua filmagem)
  Teaser.tsx           composição motion-graphics (preview)
  Fonts.tsx            carrega as fontes locais (offline)
  components/          Clip, TitleCard, EndCard, Letterbox, CinematicGrade, ...
scripts/
  fetch-drive.mjs      baixa os clipes da pasta pública do Drive
public/
  fonts/               Anton + Archivo (woff2 locais, versionados)
  video/               seus clipes (baixados; não versionados)
  audio/               sua trilha (não versionada)
clips.manifest.json    IDs do Drive de cada clipe/foto
```

## Notas

- **Por que baixar localmente?** O ambiente de nuvem onde este projeto foi montado
  bloqueia o Google Drive por política de rede, então o download/render final roda
  na sua máquina. A pasta do Drive está como _"qualquer pessoa com o link"_, então o
  `fetch` funciona sem login.
- Os clipes de celular (verticais) são preenchidos em _cover_ no 16:9 (corta as
  bordas) pra dar energia de trailer. Se preferir mostrar o vídeo inteiro com
  fundo desfocado, dá pra ajustar em `src/components/Clip.tsx`.
- Render lento? Use `--concurrency=4` e `--scale=1`. Pra rascunho rápido:
  `npx remotion render PalestraTrailer out/draft.mp4 --jpeg-quality=70`.
