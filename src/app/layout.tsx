import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EPA Digital Full Stack',
  description: 'NextJS + Go fullstack template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
