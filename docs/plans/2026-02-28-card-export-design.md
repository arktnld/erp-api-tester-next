# Design: Card Visual Exportável

**Data:** 2026-02-28
**Feature:** Item 5 do backlog — exportar resultado de teste como imagem/PDF

---

## Contexto

O ERP API Tester precisa de uma forma de compartilhar resultados de teste como evidência visual. A solução é um card compacto que pode ser copiado como imagem, baixado como PNG ou exportado como PDF.

---

## Decisões de Design

### Posição do botão
- **Tela de teste:** ao lado do botão "Copiar" na status bar
- **Histórico:** no header do Sheet, ao lado do botão fechar

### Formato do card
Compacto, largura fixa 600px, fundo branco (independente do tema do usuário):

```
┌───────────────────────────────────────────────────┐
│  ⬡ ERP Tester                    28/02/2026 14:30 │
├───────────────────────────────────────────────────┤
│  POST  /api/v1/clientes/consultar                 │
│  ERP Central  ·  Empresa ABC Ltda                 │
├───────────────────────────────────────────────────┤
│  ● 200 OK                              234ms      │
├───────────────────────────────────────────────────┤
│  {                                                │
│    "id": 123,                                     │
│    ...                                            │
│    +8 linhas omitidas                             │
│  }                                                │
│                                                   │
│  [PDF · 28 KB · relatorio.pdf]  ← se binário     │
└───────────────────────────────────────────────────┘
```

- Status colorido: verde (2xx), amarelo (3xx), vermelho (4xx/5xx)
- Truncamento: máximo 15 linhas, depois `+ N linhas omitidas`
- Resposta binária: mostra `[mimeType · KB · filename]` em vez do body

### Abordagem técnica
**html2canvas** — captura o DOM diretamente, sem reimplementar o layout.

Alternativas descartadas:
- Canvas API manual: frágil, quebra com mudanças de design
- SVG: complexo, difícil de manter

**Nota:** ExportCard usa valores CSS fixos (hex), não CSS custom properties, pois html2canvas não resolve variáveis de contextos isolados de forma confiável.

---

## Arquitetura

### Novos arquivos

```
apps/web/app/test/components/
  ExportCard.tsx    ← card oculto no DOM, estilizado para captura
  ExportButton.tsx  ← botão com dropdown (3 ações)
  useExport.ts      ← hook: html2canvas + clipboard + download + print
```

### Fluxo de dados

```
TestResponse / HistoryClient
  └─ <ExportButton data={exportData} />
        ├─ <ExportCard ref={cardRef} data={exportData} /> (hidden)
        └─ ao clicar:
              html2canvas(cardRef.current)
                ├─ "Copiar imagem" → navigator.clipboard.write(blob)
                ├─ "Baixar PNG"    → <a download> programático
                └─ "Baixar PDF"    → window.print() com CSS @media print
```

### Tipo ExportData

```ts
interface ExportData {
  method: string
  url: string
  erpName: string
  companyName: string
  status: number
  duration: number
  timestamp: Date
  responseBody: string | null      // null se binário
  binaryMeta?: {
    mimeType: string
    sizeKB: number
    fileName: string | null
  }
}
```

### ExportButton UI

Dropdown com 3 opções:
- Copiar imagem (clipboard)
- Baixar PNG (arquivo)
- Baixar PDF (window.print)

Estado durante captura: botão desabilitado + spinner (~1-2s).

---

## Pontos de integração

| Arquivo | Mudança |
|---------|---------|
| `test-response.tsx` | Adicionar `<ExportButton>` na status bar ao lado de "Copiar" |
| `history-client.tsx` | Adicionar `<ExportButton>` no header do Sheet |

Sem novos endpoints de API. Todo o processamento é client-side.
