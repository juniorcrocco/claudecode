# Lady Co Reel — Direção de Vídeo & Prompts Cinematográficos

Um prompt realista por clipe de fundo. Os nomes dos arquivos batem com o campo `bg` do
`src/scenes.ts` — gere, exporte em 9:16 (1080×1920), renomeie e jogue em `public/video/`.
Prompts em inglês (rendem melhor em Veo / Kling / Runway / Sora). A intenção de cada cena
está em português.

## Specs globais (vale pra todos)

- **Formato:** vertical 9:16, 1080×1920, 24–30fps.
- **Duração:** gere 5–8s por clipe (precisa ser ≥ a duração da cena no Remotion; clipes da
  rajada ≥ 2s, rituais/fechamento ≥ 4s). Gere com folga e corte.
- **Estética da marca:** cuidado e autocuidado, não luxo ostensivo. Quente, íntimo, tátil,
  luz natural suave. Nada de ouro berrante, mármore frio ou "hotel 5 estrelas". Pele real,
  mãos, flores, toque humano.
- **Paleta:** creme, nude, rosé suave, café, toques de verde-sage e dourado discreto.
  Temperatura ~3500–4200K (luz quente).
- **Movimento:** lento e contínuo (slow motion, push-in suave, dolly delicado). Evite cortes
  internos — cada clipe é um plano só.
- **Sem texto na imagem:** os clipes NÃO podem ter texto, legenda, logo ou marca d'água — o
  lettering entra por cima no Remotion.
- **Composição p/ texto:** deixe espaço negativo no centro/terço inferior (parede desfocada,
  bokeh, área lisa) pra o texto respirar.

### Negative prompt (cole junto em todas)

```
text, captions, watermark, logo, subtitles, distorted hands, extra fingers, deformed face, oversaturated, harsh flash, plastic skin, busy background, clutter, fast cuts, jump cuts, low resolution
```

### Sufixo de estilo (acrescente ao fim de cada prompt)

```
cinematic, shot on ARRI Alexa, 35mm, shallow depth of field, soft natural light, warm color grade, subtle film grain, photorealistic, vertical 9:16, slow motion
```

---

## ABERTURA

### `bg-fachada.mp4` — O lugar
**Intenção:** estabelecer um espaço acolhedor e sofisticado (não frio). Convida pra dentro.

```
Interior of an intimate, elegant beauty salon at golden hour, warm sunlight filtering through sheer curtains, fresh flowers and soft plants on a cream marble reception, dust particles floating in the light, a slow dolly-in pushing gently toward the warm interior, cozy and welcoming atmosphere, no people in frame
```
Câmera: 35mm, push-in lento. Luz & cor: luz de janela difusa, creme e rosé. Espaço p/ texto: centro desfocado ao fundo.

### `bg-espelho.mp4` — O reflexo
**Intenção:** a cliente se reconhecendo bonita. Emoção sutil.

```
A woman seen from behind looking at her reflection in a large salon mirror framed by soft warm bulbs, she gently touches her freshly styled hair and smiles softly, shallow focus on her reflection, warm intimate lighting, slow subtle push-in, genuine quiet emotion, real natural skin
```
Câmera: 50mm, push-in mínimo. Luz & cor: practicals quentes ao redor do espelho. Espaço p/ texto: terço inferior escuro.

---

## RAJADA (planos rápidos, táteis, macro)

Aqui o ritmo é rápido — cada clipe é um macro/close sensorial de 2–4s, gesto único, slow
motion. Mantenha a mesma talent e a mesma DP quando aparecer pessoa, pra parecer o mesmo filme.

### `bg-cabelo.mp4` — Corte
```
Extreme close-up of sharp scissors gliding through healthy dark hair in slow motion, single strands falling softly, hairstylist's hands precise and calm, warm key light, creamy bokeh background, macro lens
```
Câmera: macro 100mm, fixo com micro-movimento. Espaço p/ texto: bokeh ao fundo.

### `bg-cor.mp4` — Coloração
```
Macro shot of a tinting brush spreading glossy hair color onto a section of hair held in foil, smooth controlled motion, rich pigment, warm soft light, blurred salon background, shallow depth of field
```
Câmera: macro, leve pan acompanhando o pincel.

### `bg-loiro.mp4` — Loiro / mechas
```
Close-up of luminous blonde balayage hair catching warm light, fingers gently running through silky strands revealing dimension and shine, slow motion, soft golden glow, dreamy bokeh
```
Câmera: 85mm, rack focus dos fios. Cor: dourado quente, sem amarelar.

### `bg-tratamento.mp4` — Tratamento / reconstrução
```
Macro of a creamy hair mask being applied to wet hair, glossy texture, hands gently massaging the strands, water droplets, soft steam, warm spa lighting, intimate and tactile, slow motion
```
Câmera: macro, fixo. Mood: cuidado, vapor leve.

### `bg-escova.mp4` — Escova / finalização
```
Slow motion of a round brush blow-drying long hair, strands lifting and flowing in the warm airflow, glossy healthy movement, soft window light, elegant and fluid, shallow focus
```
Câmera: 50mm, acompanha o movimento do cabelo.

### `bg-unhas.mp4` — Unhas
```
Extreme close-up of a manicurist painting a nail with a nude polish, precise delicate brushstroke, well-groomed hands resting on a soft towel, warm diffused light, creamy background, macro lens, slow motion
```
Câmera: macro 100mm. Cor: nude/rosé, alinhado à marca.

### `bg-pes.mp4` — Spa dos pés
```
Serene close-up of feet being gently bathed in a warm bowl of water with rose petals, soft steam rising, hands cupping water, candlelight reflections, spa ambiance, slow motion, warm and calming
```
Câmera: 50mm, fixo. Mood: relaxamento, pétalas.

### `bg-sobrancelha.mp4` — Sobrancelha
```
Macro close-up of an eyebrow being shaped and brushed with a precise spoolie, focus on the eye area of a calm woman, fine detailed work, warm soft beauty light, shallow depth of field, slow motion
```
Câmera: macro, fixo. Foco: olhar sereno ao fundo desfocado.

### `bg-pele.mp4` — Pele / skincare
```
Close-up of a woman receiving a gentle facial treatment, esthetician's gloved fingers applying serum, dewy glowing skin, soft warm light, calm spa setting, slow motion, fresh and clean, real skin texture
```
Câmera: 85mm, micro push-in. Mood: pele que respira.

### `bg-make.mp4` — Maquiagem
```
Macro of a makeup brush sweeping soft blush across a cheekbone, fine powder catching the light, flawless natural makeup, warm beauty lighting, elegant and refined, slow motion, shallow focus
```
Câmera: macro, leve pan do pincel.

### `bg-noiva.mp4` — Noiva
```
Delicate close-up of a bridal updo being finished, hands placing a fine pin near a soft veil and baby's breath flowers, warm romantic light, ethereal and tender, soft focus, slow motion
```
Câmera: 85mm, fixo. Mood: romântico, etéreo.

### `bg-eles.mp4` — Eles também (barba)
```
Cinematic close-up of a straight razor gliding through shaving cream along a man's jawline, warm towel steam, barbershop ambiance with warm practical lights, confident and clean, slow motion, shallow depth of field
```
Câmera: macro/close, acompanha a navalha. Cor: quente, masculino-aconchegante.

---

## RESPIRA / RITUAIS (planos longos, contemplativos)

Câmera mais parada, respiração lenta, profundidade. Aqui o vídeo desacelera junto com o texto.

### `bg-headspa.mp4` — Head spa
```
Overhead serene shot of a woman lying back with eyes closed receiving a relaxing head and scalp massage, therapist's hands working gently through her hair, soft dim warm light, peaceful spa atmosphere, slow motion, deeply calming
```
Câmera: plano cenital (de cima), quase estático. Mood: entrega total, paz.

### `bg-rituais.mp4` — Rituais
```
Still life of a calm spa ritual setup, warm oils in a small glass bottle, fresh rose petals, a cup of tea with rising steam, lit candle, soft warm light, gentle camera drift, meditative and sensorial, slow motion
```
Câmera: drift lateral suave (slider). Mood: sensorial, silêncio.

### `bg-deus.mp4` — Tempo com Deus e comigo
```
A woman sitting peacefully by a sunlit window with eyes closed, soft warm light wrapping her face, sheer curtains moving gently in the breeze, serene and reflective mood, dust motes in sunlight, slow motion, quiet and spiritual
```
Câmera: 50mm, push-in quase imperceptível. Mood: propósito, serenidade (sem religiosidade explícita).

### `bg-casal.mp4` — Pra dois
```
A couple side by side in a calm spa relaxing together, soft towels, warm low light, both at ease and content, intimate and tender atmosphere, shallow focus, slow motion, genuine connection
```
Câmera: 85mm, fixo com leve respiração. Mood: cuidar junto.

---

## FECHAMENTO

### `bg-fechamento.mp4` — Ela, renovada
**Intenção:** o "depois". A mulher que se reencontrou. É o plano mais importante —
reaproveitado em 5 cenas, então gere um clipe mais longo (8–10s).

```
A radiant Brazilian woman with beautifully styled hair walking slowly toward camera in warm golden light, she turns and smiles a genuine, confident, content smile, soft hair movement, dreamy bokeh background of an elegant salon, slow motion, emotional and uplifting, real natural beauty
```
Câmera: 85mm, dolly-back lento acompanhando ela. Luz & cor: dourado quente, glow. Espaço p/ texto: fundo em bokeh + terço inferior limpo pra logo e CTA.

---

## Fluxo de trabalho

1. Gere cada clipe na ferramenta escolhida (sugestão: Veo 3 ou Kling 2.x pra movimento humano
   realista; Runway Gen-4 pra macros de produto). Use o prompt + negative + sufixo de estilo.
2. **Continuidade:** se aparecer pessoa, tente manter a mesma talent e a mesma temperatura de
   cor entre clipes, pra parecer um filme só.
3. Exporte **9:16 (1080×1920)**. Se a ferramenta só entregar 16:9, gere já pensando em corte
   vertical com a ação centralizada.
4. Renomeie **exatamente** como o `src/scenes.ts` (`bg-cabelo.mp4`, `bg-cor.mp4`…).
5. Coloque em `public/video/` e mude `USE_PLACEHOLDER_BG = false` em `src/config.ts`.
6. Confira que cada clipe é ≥ a duração da cena (senão o frame congela). Veja a tabela de
   durações mínimas abaixo.
7. `npm run render`.

## Dica de cor (pra amarrar tudo)

Depois de montar, aplique um grade quente único no render (ou já peça aos prompts) pra todos os
clipes ficarem na mesma família: realça creme/rosé, levanta sombras levemente quentes, satura
pouco. É o que faz parecer campanha de marca e não clipes soltos.

---

## Notas técnicas do projeto (importante)

**Duração mínima de cada clipe.** Como cada cena é uma `<Sequence>` independente, o vídeo de
fundo toca **a partir do início** em cada cena. Ou seja, um arquivo só precisa ser ≥ à **maior
cena** que o usa — não à soma. Tabela (30fps):

| Arquivo | Cenas que o usam | Maior cena | Mínimo do clipe |
|---|---|---|---|
| `bg-fechamento.mp4` | close1, words, central, sign, cta | central (165f) | **≥ 5,5s** (gere 8–10s) |
| `bg-headspa.mp4` | bridge, headspa | headspa (90f) | ≥ 3s |
| `bg-deus.mp4` | deus | 90f | ≥ 3s |
| `bg-rituais.mp4`, `bg-casal.mp4` | — | 75f | ≥ 2,5s |
| `bg-fachada.mp4`, `bg-espelho.mp4` | abertura | 45f | ≥ 1,5s |
| `bg-*` da rajada (cabelo, cor, loiro, …) | rajada | 30f | ≥ 1s (gere ≥ 2s) |

> Portanto o `bg-fechamento.mp4` **não** precisa cobrir 16,5s — bastam ~6s, porque cada uma das
> 5 cenas finais reinicia o vídeo do zero. Gere 8–10s e sobra folga.

**Proteção contra congelamento (opcional).** Para nunca congelar mesmo se um clipe ficar curto,
dá pra ativar `loop` no `<OffthreadVideo>` em `src/components/Background.tsx`. Peça que eu ativo.
