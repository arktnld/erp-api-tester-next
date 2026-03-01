import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Login' }

import { SignInClient } from './sign-in-client'

export default function SignInPage() {
  return <SignInClient />
}
