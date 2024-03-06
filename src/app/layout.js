import React from 'react'
import { Work_Sans, Spline_Sans_Mono } from 'next/font/google'
import clsx from 'clsx'

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants'

import UserMotionPreferences from '@/components/UserMotionPreferences'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './styles.css'

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
})
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
})

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const theme = 'light'

  return (
    <html
      lang='en'
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <UserMotionPreferences>
          <Header theme={theme} />
          <main>{children}</main>
          <Footer />
        </UserMotionPreferences>
      </body>
    </html>
  )
}

export default RootLayout
