import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Configurações' }

import { Download } from 'lucide-react'
import { getSettings } from '@/lib/actions/settings'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { AdminSections } from './admin-sections'

const sectionTitle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-muted)',
  marginBottom: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div style={{ padding: 32, maxWidth: 640 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 32 }}>Configurações</h1>

      {/* Aparência */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={sectionTitle}>Aparência</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
          <div>
            <div style={{ fontWeight: 500, marginBottom: 2 }}>Tema</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Alternar entre tema escuro e claro</div>
          </div>
          <ThemeToggle />
        </div>
      </section>


      {/* Dados */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={sectionTitle}>Dados</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
          <div>
            <div style={{ fontWeight: 500, marginBottom: 2 }}>Exportar backup</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Baixar todos os ERPs, empresas e endpoints em JSON</div>
          </div>
          <a href="/api/backup" download
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px',
              backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6,
              fontSize: 13, color: 'var(--text)', textDecoration: 'none' }}>
            <Download size={14} />
            Exportar
          </a>
        </div>
      </section>

      <AdminSections settings={settings} />
    </div>
  )
}
