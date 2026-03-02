# Sensitive Values Toggle — Design

**Date:** 2026-03-01
**Feature:** Mask auth tokens/passwords in Testar API screen by default, reveal on demand.

## Problem

The Testar API screen shows real authentication values (Bearer tokens, API keys, passwords) in plain text in the Headers table and the resolved Body. Anyone looking at the screen sees secrets directly.

## Scope

Masking applies to:
- **Headers table** (after execution): `response.requestHeaders` values
- **Body (form mode)**: `resolvedBody` rendered via CodeBlock

Masking does NOT apply to:
- **cURL string** (in TestResponse): copied as-is to n8n and other tools
- **Body (raw mode)**: user is editing, masking would break the editor

## How Sensitive Values Are Detected

`company.authConfig` holds all auth secrets (token, password, api key, custom header values, body fields). Any string value in `authConfig` with length > 4 is treated as sensitive.

```ts
function buildSensitiveValues(authConfig: Record<string, string> | null): Set<string> {
  if (!authConfig) return new Set()
  return new Set(Object.values(authConfig).filter(v => typeof v === 'string' && v.length > 4))
}
```

## UI

**Toggle button** placed in the Request panel header, right side, alongside the Body mode toggle:

- Icon: `EyeOff` (masked state) / `Eye` (revealed state)
- Label: "Ocultar" / "Revelar"
- Style: `var(--text-muted)`, no border, small (font 11px) — unobtrusive
- Default state: masked (`showSensitive = false`)

```
Headers                              [👁 Revelar]
```

## Masking Logic

Replace any occurrence of a sensitive value in the displayed string with `"••••••••"`:

```ts
function maskSensitive(text: string, sensitiveValues: Set<string>, show: boolean): string {
  if (show || sensitiveValues.size === 0) return text
  let result = text
  for (const val of sensitiveValues) {
    result = result.replaceAll(val, '••••••••')
  }
  return result
}
```

Applied to:
- Each header value cell in the headers table
- The full `resolvedBody` string before passing to CodeBlock (form mode only)

## State & Props

- `showSensitive: boolean` — state in `TestRequest`
- `sensitiveValues: Set<string>` — derived in `test-page.tsx` from `company.authConfig`, passed as prop to `TestRequest`
- Reset to `false` when company changes (handled by `key` prop or explicit reset in `onCompanyChange`)

## Files Changed

| File | Change |
|------|--------|
| `apps/web/app/test/test-page.tsx` | Derive `sensitiveValues` from `company.authConfig`, pass to `TestRequest` |
| `apps/web/app/test/components/test-request.tsx` | Add `showSensitive` state + toggle button + masking in headers and body |
