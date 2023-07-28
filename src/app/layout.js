import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Próximo feriado',
  description: 'Aplicación que muestra los días faltantes para el próximo feriado',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-t from-slate-400 via-30% via-slate-500 to-75% to-slate-900`}>{children}</body>
    </html>
  )
}
