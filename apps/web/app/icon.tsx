import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0d0d0d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#6366f1',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '-1px',
            lineHeight: 1,
          }}
        >
          {'</>'}
        </span>
      </div>
    ),
    { ...size }
  )
}
