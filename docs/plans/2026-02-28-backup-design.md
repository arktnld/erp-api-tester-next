# Backup do Banco — Design

**Goal:** Export manual de toda a configuração em JSON via botão na UI, protegendo contra perda de dados em caso de falha no Postgres.

**Architecture:** Rota `GET /api/backup` serializa ERPs, endpoints, fieldSchemas, companies, testClients e settings em um único JSON. Retorna como download de arquivo. Botão na homepage dispara o download via `window.location.href`.

**Out of scope:** import/restore automático (YAGNI — restore pode ser feito manualmente via seed script se necessário).

---

## Rota

`apps/web/app/api/backup/route.ts`

Faz uma query com include aninhado:

```ts
prisma.erp.findMany({
  include: {
    endpoints: true,
    fieldSchemas: true,
    companies: {
      include: { testClients: true }
    }
  },
  orderBy: { id: 'asc' }
})
```

E `prisma.setting.findMany()` separado.

Retorna `Response` com headers:
- `Content-Type: application/json`
- `Content-Disposition: attachment; filename="backup-YYYY-MM-DD.json"`

## Estrutura do JSON

```json
{
  "exportedAt": "2026-02-28T20:00:00.000Z",
  "version": 1,
  "erps": [
    {
      "name": "IXC",
      "endpoints": [...],
      "fieldSchemas": [...],
      "companies": [
        {
          "name": "Empresa ABC",
          "baseUrl": "https://...",
          "authType": "bearer",
          "authConfig": "{}",
          "environments": "[]",
          "testClients": [
            { "name": "Cliente 001", "fieldsData": "{}" }
          ]
        }
      ]
    }
  ],
  "settings": [
    { "key": "...", "value": "..." }
  ]
}
```

IDs são omitidos — irrelevantes para restore.

## UI

Botão "Exportar backup" na página de ERPs (`apps/web/app/page.tsx` ou componente client da homepage), próximo ao botão "Importar" existente. Clique faz `window.location.href = '/api/backup'`.
