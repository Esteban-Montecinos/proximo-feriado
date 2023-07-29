import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Próximo feriado',
  description: 'Aplicación que muestra los días faltantes para el próximo feriado',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-blue-50`}>{children}</body>
    </html>
  )
}
