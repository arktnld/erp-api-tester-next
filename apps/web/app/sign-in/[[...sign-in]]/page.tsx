import { SignIn } from '@clerk/nextjs'

const appearance = {
  variables: {
    colorBackground: '#111111',
    colorInputBackground: '#161616',
    colorInputText: '#ededed',
    colorText: '#ededed',
    colorTextSecondary: '#888888',
    colorPrimary: '#6366f1',
    colorDanger: '#ef4444',
    colorSuccess: '#10b981',
    colorNeutral: '#888888',
    colorTextOnPrimaryBackground: '#ffffff',
    borderRadius: '8px',
    fontFamily: 'inherit',
    fontSize: '14px',
  },
  elements: {
    card: {
      backgroundColor: '#111111',
      border: '1px solid #1f1f1f',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    },
    headerTitle: {
      color: '#ededed',
      fontSize: '18px',
      fontWeight: '600',
    },
    headerSubtitle: {
      color: '#888888',
    },
    socialButtonsBlockButton: {
      backgroundColor: '#161616',
      border: '1px solid #1f1f1f',
      color: '#ededed',
      '&:hover': { backgroundColor: '#1f1f1f' },
    },
    dividerLine: { backgroundColor: '#1f1f1f' },
    dividerText: { color: '#555555' },
    formFieldLabel: { color: '#888888' },
    formFieldInput: {
      backgroundColor: '#161616',
      border: '1px solid #1f1f1f',
      color: '#ededed',
      '&:focus': { borderColor: '#6366f1' },
    },
    footerActionLink: { color: '#6366f1' },
    identityPreviewEditButton: { color: '#6366f1' },
  },
}

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      gap: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: '#6366f1' }}>
          {'</>'}
        </span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#ededed' }}>
          <span style={{ color: '#6366f1' }}>ERP</span> Tester
        </span>
      </div>
      <SignIn appearance={appearance} />
    </div>
  )
}
