# ChatFusion — Folder impresso (A4 → 4 faces A5)

Folder comercial da ChatFusion para donos de academia, seguindo a estrutura definitiva do briefing:

**Fluxo de leitura:** Capa → Problemas → Soluções → Teste agora

- **Formato:** A4 horizontal, dobrado ao meio, formando quatro faces A5 (148 × 210 mm).
- **Folha externa:** Contracapa (esquerda) · Capa (direita)
- **Folha interna:** Problemas (esquerda) · Soluções (direita), com a faixa **Disparos em massa** atravessando a dobra na base.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Arte do folder (autocontido, sem dependências externas). Abre no navegador. |
| `ChatFusion-folder.pdf` | PDF pronto para impressão — A4 paisagem, 2 páginas (folha externa e interna). |
| `preview-sheet1.png` / `preview-sheet2.png` | Prévias em imagem das duas folhas. |
| `render.cjs` | Script que regenera o PDF e as prévias a partir do `index.html`. |

## Conteúdo por face

**Capa** — reconhecimento imediato: ecossistema visual (WhatsApp · Instagram · Webchat convergindo para o núcleo *ChatFusion · IA*), selo **"Conectado à API oficial do WhatsApp"**, headline *Inteligência Artificial para todas as academias — Atender. Vender. Reter.*, composição com celular (conversa WhatsApp + notificação Instagram + "Respondido pela IA" + campanha), faixa de 3 benefícios e chamada de abertura.

**Problemas** — *Quantas oportunidades sua academia perde todos os dias?*: seis problemas com ícones, frase de transição e tela de conversa às 23h14 com a legenda *"Enquanto sua academia está fechada, a conversa continua."*

**Soluções** — três pilares **ATENDER · VENDER · RETER**.

**Disparos em massa** — faixa que cruza a dobra: lógica em 3 passos, frase-âncora *"Você dispara. A IA conversa. Sua equipe vende."* e duas telas (campanha + respostas).

**Contracapa** — *Não imagine. Teste agora.*: QR Code, seis agentes de IA para testar e chamada para o estande (número, mini palestras, Instagram, site, WhatsApp).

## Gerar o PDF final

Pelo navegador: abra `index.html` → **Imprimir** → *Salvar como PDF*, papel **A4 paisagem**, margens **Nenhuma**, com **gráficos de fundo** ativados.

Ou regenere com o script (usa o Chromium do ambiente):

```bash
node render.cjs
```

## Pontos para a arte final

- **QR Code:** o QR na contracapa é **ilustrativo**. Substituir pelo QR real do link de teste antes de imprimir.
- **Dados de contato/estande:** número do estande (`#B-42`), telefone, @ do Instagram e horários das mini palestras são exemplos — ajustar aos dados reais do evento.
- **Selo de confiança:** usamos apenas *"Conectado à API oficial do WhatsApp"*. Nenhuma alegação de certificação Meta / *Meta Business Partner* foi criada, conforme a ressalva do briefing.
- **Tipografia:** o layout usa a família de sistema (grotesca) para máxima portabilidade. Para a gráfica, é possível trocar por uma fonte de marca embutida sem alterar a estrutura.
