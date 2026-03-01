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
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 10,
            fontWeight: 900,
            color: '#4f8ef7',
            letterSpacing: '-0.5px',
            lineHeight: 1,
          }}
        >
          /ERP
        </span>
      </div>
    ),
    { ...size }
  )
}
